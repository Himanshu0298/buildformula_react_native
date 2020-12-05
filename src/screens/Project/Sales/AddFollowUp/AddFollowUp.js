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
import ProjectHeader from 'components/Layout/ProjectHeader';
import BaseText from 'components/BaseText';
import {getShadow} from 'utils';
import {secondaryTheme, theme} from 'styles/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/RenderInput';
import {useTranslation} from 'react-i18next';
import RenderSelect from 'components/RenderSelect';
import RenderDatePicker from 'components/RenderDatePicker';
import {PRIORITY_COLORS, TYPE_LABELS} from 'utils/constant';
import useSalesActions from 'redux/actions/salesActions';
import dayjs from 'dayjs';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/MaterialTabBar';
import CustomBadge from 'components/CustomBadge';
import {useAlert} from 'components/Alert';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const schema = Yup.object().shape({
  follow_up_date: Yup.date('Invalid').required('Required'),
  follow_up_time: Yup.date('Invalid').required('Required'),
  assign_to: Yup.string('Invalid').required('Required'),
  remarks: Yup.string('Invalid').required('Required'),
});

function RenderVisitorDetails({visitor, occupationOptions, onNext}) {
  const occupation = occupationOptions.find((v) => (v.id = visitor.occupation));
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Name</Paragraph>
        <Caption theme={secondaryTheme}>
          {visitor.first_name} {visitor.last_name}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Email</Paragraph>
        <Caption theme={secondaryTheme}>{visitor.email}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Phone no.</Paragraph>
        <Caption theme={secondaryTheme}>+91 {visitor.phone}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Occupation</Paragraph>
        <Caption theme={secondaryTheme}>{occupation.label}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Date</Paragraph>
        <Caption theme={secondaryTheme}>
          {dayjs(visitor.follow_up_date).format('DD MMM YYYY')}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Inquiry for</Paragraph>
        <Caption theme={secondaryTheme}>
          {TYPE_LABELS[visitor.inquiry_for]}
          {visitor.bhk ? ` - ${visitor.bhk} BHK` : null}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Budget Range</Paragraph>
        <Caption theme={secondaryTheme}>
          {/*TODO: Add amount formatting */}
          Rs. {visitor.budget_from} - Rs.{visitor.budget_to}
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Current Locality</Paragraph>
        <Caption theme={secondaryTheme}>{visitor.current_locality}</Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Priority</Paragraph>
        <Caption>
          <CustomBadge
            color={PRIORITY_COLORS[visitor.priority]}
            label={visitor.priority}
          />
        </Caption>
      </View>
      <View style={styles.detailRow}>
        <Paragraph theme={secondaryTheme}>Status</Paragraph>
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
        <BaseText style={styles.buttonText}>{'Next'}</BaseText>
      </Button>
    </View>
  );
}

function PersonalTab({
  navigation,
  selectedVisitor,
  setSelectedVisitor,
  setSelectedTab,
}) {
  const {t} = useTranslation();

  const [searchQuery, setSearchQuery] = useState();
  const [isFocused, setFocused] = useState(false);

  let {visitorSuggestions, visitors, occupationOptions} = useSelector(
    (state) => state.sales,
  );

  const filteredVisitors = useMemo(() => {
    if (searchQuery) {
      return visitorSuggestions.filter((visitor) => {
        return (
          visitor.first_name.includes(searchQuery) ||
          visitor.last_name.includes(searchQuery) ||
          visitor.phone.includes(searchQuery) ||
          visitor.email.includes(searchQuery)
        );
      });
    }
    return visitorSuggestions;
  }, [searchQuery, visitorSuggestions]);

  const visitorDetails = useMemo(() => {
    return visitors.find((visitor) => visitor.id === selectedVisitor);
  }, [selectedVisitor, visitors]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.personalContainer}>
          <Searchbar
            theme={{...secondaryTheme, roundness: 12}}
            placeholder={t('label_search_visitors')}
            onFocus={() => setFocused(true)}
            style={{backgroundColor: 'rgba(4,29,54,0.1)', ...getShadow(0)}}
            value={searchQuery}
            onChangeText={(v) => {
              setSearchQuery(v);
              if (!v || (v && selectedVisitor)) {
                setSelectedVisitor();
              }
            }}
          />

          {isNaN(selectedVisitor) &&
          isFocused &&
          filteredVisitors.length > 0 ? (
            <View style={styles.listContainer}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                {filteredVisitors.map((visitor, index) => {
                  const label = `${visitor.first_name} ${visitor.last_name}`;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss();
                        setSearchQuery(label);
                        setSelectedVisitor(visitor.id);
                      }}>
                      <Menu.Item
                        key={index}
                        theme={secondaryTheme}
                        icon="account-question-outline"
                        title={label}
                      />
                      <Divider />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}

          {visitorDetails ? (
            <RenderVisitorDetails
              onNext={() => setSelectedTab(1)}
              visitor={visitorDetails}
              occupationOptions={occupationOptions}
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

  const {selectedProject} = useSelector((state) => state.project);

  const {addFollowUp, getFollowUps, getSalesData} = useSalesActions();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={async (values) => {
        if (isNaN(selectedVisitor)) {
          alert.show({
            title: 'Error',
            message: 'Select a visitor from the previous screen first!',
            dismissable: false,
            onConfirm: () => setSelectedTab(0),
          });
          return;
        }

        const formData = new FormData();

        formData.append('hdn_followup_id', selectedVisitor);

        formData.append(
          'datepicker_followup',
          dayjs(values.follow_up_date).format('DD-MM-YYYY'),
        );
        formData.append(
          'timepicker_followup',
          dayjs(values.follow_up_time).format('HH:mm'),
        );

        delete values.follow_up_date;
        delete values.follow_up_time;

        Object.keys(values).map((key) => {
          formData.append(key, values[key]);
        });

        formData.append('user_id', user.id);

        addFollowUp(formData).then(() => {
          getFollowUps(selectedProject.id);
          getSalesData(selectedProject.id);
          navigation.goBack();
        });
      }}>
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
                placeholder={t('label_follow_up_date')}
                error={errors.follow_up_date}
                min={new Date()}
                onChange={(date) => {
                  setFieldValue('follow_up_date', date);
                  followUpTimeRef && followUpTimeRef.current.focus();
                }}
              />
              <RenderDatePicker
                mode="time"
                ref={followUpTimeRef}
                name="follow_up_time"
                label={t('label_follow_up_time')}
                containerStyles={styles.input}
                value={values.follow_up_time}
                placeholder={t('label_follow_up_time')}
                error={errors.follow_up_time}
                onChange={(date) => {
                  setFieldValue('follow_up_time', date);
                  assignToRef && assignToRef.current.focus();
                }}
              />
              <RenderSelect
                name="assign_to"
                ref={assignToRef}
                label={t('label_assign_to')}
                options={assignOptions}
                containerStyles={styles.input}
                value={values.assign_to}
                placeholder={t('label_assign_to')}
                error={errors.assign_to}
                onSelect={(value) => {
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
                placeholder={t('label_remark')}
                error={errors.remark}
              />
            </View>
            <View style={styles.actionContainer}>
              <Button
                style={{flex: 1}}
                contentStyle={{padding: 3}}
                theme={{roundness: 15}}
                onPress={() => setSelectedTab(0)}>
                <BaseText style={styles.cancelText}>{'Cancel'}</BaseText>
              </Button>
              <Button
                style={{flex: 1}}
                mode="contained"
                contentStyle={{padding: 3}}
                theme={{roundness: 15}}
                onPress={handleSubmit}>
                <BaseText style={styles.buttonText}>{'Save'}</BaseText>
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
  const [routes] = React.useState([
    {key: 0, title: 'Personal details'},
    {key: 1, title: 'Follow up details'},
  ]);

  const {user} = useSelector((state) => state.user);
  let {loading} = useSelector((state) => state.sales);
  let {assignOptions} = useSelector((state) => state.sales);

  const updatedAssignOptions = useMemo(() => {
    let data = [...assignOptions];
    let index = data.findIndex((item) => item.value === user.id);
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
    <>
      <SafeAreaView
        edges={['bottom', 'right', 'left']}
        style={styles.container}>
        <Spinner visible={loading} textContent={''} />
        <StatusBar barStyle="light-content" />
        <View style={styles.body}>
          <TabView
            navigationState={{index: selectedTab, routes}}
            renderScene={renderScene}
            onIndexChange={setSelectedTab}
            initialLayout={{width: Layout.window.width}}
            renderTabBar={(tabBarProps) => {
              return (
                <View style={styles.headerContainer}>
                  <ProjectHeader />
                  <MaterialTabBar {...tabBarProps} />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
