import React, {useState, useMemo} from 'react';
import {StyleSheet, View, StatusBar, Keyboard, ScrollView} from 'react-native';
import {
  withTheme,
  Button,
  Searchbar,
  Menu,
  Divider,
  Caption,
  Paragraph,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import useSalesActions from 'redux/actions/salesActions';
import dayjs from 'dayjs';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import CustomBadge from 'components/Atoms/CustomBadge';
import {useAlert} from 'components/Atoms/Alert';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TABS = [
  {key: 0, title: 'Personal details'},
  {key: 1, title: 'Follow up details'},
];

const schema = Yup.object().shape({
  follow_up_date: Yup.date('Invalid').required('Required'),
  follow_up_time: Yup.date('Invalid').required('Required'),
  assign_to: Yup.string('Invalid').required('Required'),
  remarks: Yup.string('Invalid').required('Required'),
});

export function VisitorSelector(props) {
  const {
    visitors,
    searchQuery,
    selectedVisitor,
    onSelectVisitor,
    onChangeText,
  } = props;

  const {t} = useTranslation();

  const [isFocused, setFocused] = useState(false);

  return (
    <>
      <Searchbar
        theme={{roundness: 12}}
        placeholder={t('label_search_visitors')}
        onFocus={() => setFocused(true)}
        style={{backgroundColor: 'rgba(4,29,54,0.1)', ...getShadow(0)}}
        value={searchQuery}
        onChangeText={v => {
          onChangeText(v);
          if (!v || (v && selectedVisitor)) {
            onSelectVisitor();
          }
        }}
      />

      {isNaN(selectedVisitor) && isFocused && visitors?.length > 0 ? (
        <View style={styles.listContainer}>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            {visitors.map((visitor, index) => {
              const label = `${visitor.first_name} ${visitor.last_name}`;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Keyboard.dismiss();
                    onChangeText(label);
                    onSelectVisitor(visitor.id);
                  }}>
                  <Menu.Item icon="account-question-outline" title={label} />
                  <Divider />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
}

function RenderVisitorDetails(props) {
  const {visitor, occupationOptions, sourceTypeOptions, onNext} = props;

  const occupation = occupationOptions.find(v => v.id === visitor.occupation);
  const source = sourceTypeOptions.find(v => v.id === visitor.source_type);

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Paragraph>Name</Paragraph>
        <Caption>
          {visitor.first_name} {visitor.last_name}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Email</Paragraph>
        <Caption>{visitor.email}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Phone no.</Paragraph>
        <Caption>+91 {visitor.phone}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Occupation</Paragraph>
        <Caption>{occupation?.label || 'NA'}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Date</Paragraph>
        <Caption>{dayjs(visitor.follow_up_date).format('DD MMM YYYY')}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Inquiry for</Paragraph>
        <Caption>
          {STRUCTURE_TYPE_LABELS[visitor.inquiry_for]}
          {visitor.bhk ? ` - ${visitor.bhk} BHK` : null}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Budget Range</Paragraph>
        <Caption>
          {/*TODO: Add amount formatting */}
          Rs. {visitor.budget_from} - Rs.{visitor.budget_to}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Current Locality</Paragraph>
        <Caption>{visitor.current_locality}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Source type</Paragraph>
        <Caption style={styles.value}>{source || 'NA'}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Priority</Paragraph>
        <Caption>
          <CustomBadge
            color={PRIORITY_COLORS[visitor.priority]}
            label={visitor.priority}
            style={styles.badge}
          />
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph>Status</Paragraph>
        <Caption>
          <CustomBadge
            color="rgba(72,114,244,0.15)"
            label={'NEGOTIATIONS'}
            labelStyles={{color: theme.colors.primary}}
          />
        </Caption>
      </View>
      <Button
        style={{flex: 1, position: 'absolute', right: 0, bottom: 0}}
        mode="contained"
        contentStyle={{paddingHorizontal: 20, paddingVertical: 2}}
        theme={{roundness: 15}}
        onPress={onNext}>
        Next
      </Button>
    </View>
  );
}

function PersonalTab(props) {
  const {selectedVisitor, setSelectedVisitor, setSelectedTab} = props;

  const [searchQuery, setSearchQuery] = useState();

  const {
    visitorSuggestions,
    visitors,
    occupationOptions,
    sourceTypeOptions,
  } = useSelector(state => state.sales);

  const filteredVisitors = useMemo(() => {
    if (searchQuery) {
      return visitorSuggestions.filter(visitor => {
        const {first_name, last_name, phone, email} = visitor;
        return (
          first_name.includes(searchQuery) ||
          last_name.includes(searchQuery) ||
          phone.includes(searchQuery) ||
          email.includes(searchQuery)
        );
      });
    }
    return visitorSuggestions;
  }, [searchQuery, visitorSuggestions]);

  const visitorDetails = useMemo(() => {
    return visitors.find(visitor => visitor.id === selectedVisitor);
  }, [selectedVisitor, visitors]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.personalContainer}>
          <VisitorSelector
            visitors={filteredVisitors}
            searchQuery={searchQuery}
            selectedVisitor={selectedVisitor}
            onSelectVisitor={setSelectedVisitor}
            onChangeText={setSearchQuery}
          />

          {visitorDetails ? (
            <RenderVisitorDetails
              onNext={() => setSelectedTab(1)}
              visitor={visitorDetails}
              occupationOptions={occupationOptions}
              sourceTypeOptions={sourceTypeOptions}
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

function FollowUpTab({
  navigation,
  user,
  setSelectedTab,
  selectedVisitor,
  assignOptions,
}) {
  const {t} = useTranslation();
  const alert = useAlert();

  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();
  const assignToRef = React.useRef();

  const {selectedProject} = useSelector(state => state.project);

  const {addFollowUp, getFollowUps, getSalesData} = useSalesActions();

  const onSubmit = async values => {
    if (isNaN(selectedVisitor)) {
      alert.show({
        title: 'Error',
        message: 'Select a visitor from the previous screen first!',
        dismissable: false,
        onConfirm: () => setSelectedTab(0),
      });
      return;
    }

    let data = {
      hdn_followup_id: selectedVisitor,
      datepicker_followup: dayjs(values.follow_up_date).format('DD-MM-YYYY'),
      timepicker_followup: dayjs(values.follow_up_time).format('HH:mm'),
    };

    delete values.follow_up_date;
    delete values.follow_up_time;

    data = {
      ...data,
      ...values,
      project_id: selectedProject.id,
      user_id: user.id,
    };

    addFollowUp(data).then(() => {
      getFollowUps(selectedProject.id);
      getSalesData(selectedProject.id);
      navigation.goBack();
    });
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {({
        handleChange,
        setFieldValue,
        values,
        handleSubmit,
        handleBlur,
        errors,
      }) => (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <RenderDatePicker
                name="follow_up_date"
                ref={followUpDateRef}
                label={t('label_follow_up_date')}
                containerStyles={styles.input}
                value={values.follow_up_date}
                error={errors.follow_up_date}
                min={new Date()}
                onChange={date => {
                  setFieldValue('follow_up_date', date);
                  followUpTimeRef?.current?.focus?.();
                }}
              />
              <RenderDatePicker
                mode="time"
                ref={followUpTimeRef}
                name="follow_up_time"
                label={t('label_follow_up_time')}
                containerStyles={styles.input}
                value={values.follow_up_time}
                error={errors.follow_up_time}
                onChange={date => {
                  setFieldValue('follow_up_time', date);
                  assignToRef?.current?.focus?.();
                }}
              />
              <RenderSelect
                name="assign_to"
                ref={assignToRef}
                label={t('label_assign_to')}
                options={assignOptions}
                containerStyles={styles.input}
                value={values.assign_to}
                error={errors.assign_to}
                onSelect={value => {
                  setFieldValue('assign_to', value);
                }}
              />
              <RenderInput
                name="remarks"
                multiline
                numberOfLines={8}
                label={t('label_remark')}
                containerStyles={styles.input}
                value={values.remarks}
                onChangeText={handleChange('remarks')}
                onBlur={handleBlur('remarks')}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                error={errors.remark}
              />
            </View>
            <View style={styles.actionContainer}>
              <Button
                style={{flex: 1, marginHorizontal: 5}}
                contentStyle={{padding: 3}}
                theme={{roundness: 15}}
                onPress={() => setSelectedTab(0)}>
                {'Cancel'}
              </Button>
              <Button
                style={{flex: 1, marginHorizontal: 5}}
                mode="contained"
                contentStyle={{padding: 3}}
                theme={{roundness: 15}}
                onPress={handleSubmit}>
                {'Save'}
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

function AddFollowUp(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedVisitor, setSelectedVisitor] = useState();
  const [routes] = React.useState(TABS);

  const {user} = useSelector(state => state.user);
  const {loading} = useSelector(state => state.sales);
  const {assignOptions} = useSelector(state => state.sales);

  const updatedAssignOptions = useMemo(() => {
    const data = [...assignOptions];
    const index = data.findIndex(item => item.value === user.id);
    if (index === -1) {
      data.unshift({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
      });
    }

    return data;
  }, [assignOptions, user]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return (
          <PersonalTab
            {...props}
            selectedVisitor={selectedVisitor}
            setSelectedTab={setSelectedTab}
            setSelectedVisitor={setSelectedVisitor}
          />
        );
      case 1:
        return (
          <FollowUpTab
            {...props}
            user={user}
            selectedVisitor={selectedVisitor}
            setSelectedTab={setSelectedTab}
            assignOptions={updatedAssignOptions}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <StatusBar barStyle="light-content" />
      <View style={styles.body}>
        <TabView
          navigationState={{index: selectedTab, routes}}
          renderScene={renderScene}
          onIndexChange={setSelectedTab}
          initialLayout={{width: Layout.window.width}}
          renderTabBar={tabBarProps => {
            return (
              <View style={styles.headerContainer}>
                <ProjectHeader {...props} />
                <MaterialTabBar {...tabBarProps} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default withTheme(AddFollowUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  personalContainer: {
    padding: 20,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 5,
    maxHeight: 200,
    ...getShadow(2),
  },
  detailsContainer: {
    position: 'relative',
    paddingTop: 20,
    paddingLeft: 5,
  },
  detailRow: {
    flexShrink: 1,
    marginBottom: 5,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  body: {
    flex: 1,
    paddingBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  inputsContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  input: {
    paddingVertical: 7,
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
