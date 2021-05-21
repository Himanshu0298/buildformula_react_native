import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import {withTheme, Subheading, Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {getShadow} from 'utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {PRIORITY_COLORS} from 'utils/constant';
import Radio from 'components/Atoms/Radio';
import useSalesActions from 'redux/actions/salesActions';
import dayjs from 'dayjs';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import RenderTextBox from 'components/Atoms/RenderTextbox';

const schema = Yup.object().shape({
  first_name: Yup.string('Invalid').required('Required'),
  last_name: Yup.string('Invalid').required('Required'),
  email: Yup.string('Invalid').email('Invalid').required('Required'),
  phone: Yup.number('Invalid').required('Required'),
  occupation: Yup.string('Invalid').required('Required'),
  occupation_input: Yup.string('Invalid').when('occupation', {
    is: 'Other',
    then: Yup.string('Invalid').required('Required'),
  }),
  current_locality: Yup.string('Invalid').required('Required'),
  budget_from: Yup.number('Invalid').required('Required'),
  budget_to: Yup.number('Invalid').required('Required'),
  follow_up_date: Yup.date('Invalid').required('Required'),
  follow_up_time: Yup.date('Invalid').required('Required'),
  assign_to: Yup.string('Invalid').required('Required'),
  inquiry_for: Yup.string('Invalid').required('Required'),
});

function PersonalTab(props) {
  const {
    navigation,
    formikProps,
    occupationOptions,
    sourceTypeOptions,
    setSelectedTab,
  } = props;
  const {handleChange, setFieldValue, values, handleBlur, errors} = formikProps;
  const {t} = useTranslation();

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();
  const occupationRef = React.useRef();
  const occupationInputRef = React.useRef();
  const localityRef = React.useRef();
  const sourceTypeRef = React.useRef();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <RenderInput
            name="first_name"
            label={t('label_first_name')}
            ref={firstNameRef}
            containerStyles={styles.input}
            value={values.first_name}
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            onSubmitEditing={() => lastNameRef && lastNameRef.current.focus()}
            error={errors.first_name}
          />
          <RenderInput
            name="last_name"
            label={t('label_last_name')}
            ref={lastNameRef}
            containerStyles={styles.input}
            value={values.last_name}
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            onSubmitEditing={() => emailRef && emailRef.current.focus()}
            error={errors.last_name}
          />
          <RenderInput
            name="email"
            label={t('label_email')}
            ref={emailRef}
            containerStyles={styles.input}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            onSubmitEditing={() => phoneRef && phoneRef.current.focus()}
            error={errors.email}
          />
          <RenderInput
            name="phone"
            label={t('label_phone')}
            ref={phoneRef}
            keyboardType="number-pad"
            maxLength={10}
            containerStyles={styles.input}
            value={values.phone}
            onChangeText={handleChange('phone')}
            onSubmitEditing={() => {
              occupationRef && occupationRef.current.focus();
            }}
            onBlur={handleBlur('phone')}
            error={errors.phone}
            left={
              <TextInput.Affix
                text="+91"
                theme={{
                  colors: {
                    text: '#000',
                  },
                }}
              />
            }
          />
          <RenderSelect
            name="occupation"
            ref={occupationRef}
            label={
              values.occupation
                ? t('label_occupation')
                : t('placeholder_occupation')
            }
            options={occupationOptions}
            containerStyles={styles.input}
            value={values.occupation}
            placeholder={t('placeholder_occupation')}
            error={errors.occupation}
            onSelect={value => {
              setFieldValue('occupation', value);
              if (value === 'Other') {
                occupationInputRef?.current?.focus();
              } else {
                localityRef?.current?.focus();
              }
            }}
          />
          {values.occupation === 'Other' ? (
            <RenderInput
              ref={occupationInputRef}
              name="occupation_input"
              label={t('label_other_occupation')}
              containerStyles={styles.input}
              value={values.occupation_input}
              onChangeText={handleChange('occupation_input')}
              onBlur={handleBlur('occupation_input')}
              error={errors.occupation_input}
            />
          ) : null}
          <RenderInput
            ref={localityRef}
            returnKeyType="done"
            name="current_locality"
            label={t('label_current_locality')}
            containerStyles={styles.input}
            value={values.current_locality}
            onChangeText={handleChange('current_locality')}
            onBlur={handleBlur('current_locality')}
            onSubmitEditing={() => setSelectedTab(1)}
            error={errors.email}
          />
          <RenderSelect
            name="source_type"
            ref={sourceTypeRef}
            label={t('label_source')}
            options={sourceTypeOptions}
            containerStyles={styles.input}
            value={values.source_type}
            error={errors.source_type}
            onSelect={value => setFieldValue('source_type', value)}
          />
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={{flex: 1, marginHorizontal: 5}}
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={navigation.goBack}>
            {'Cancel'}
          </Button>
          <Button
            style={{flex: 1, marginHorizontal: 5}}
            mode="contained"
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={() => setSelectedTab(1)}>
            {'Next'}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

function InquiryTab({
  navigation,
  formikProps,
  setSelectedTab,
  inquiryOptions,
  bhkOptions,
  assignOptions,
}) {
  const {
    handleChange,
    setFieldValue,
    values,
    handleSubmit,
    handleBlur,
    errors,
  } = formikProps;

  const {t} = useTranslation();

  const budgetFromRef = React.useRef();
  const budgetToRef = React.useRef();
  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();
  const assignToRef = React.useRef();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <RenderInput
            name="budget_from"
            label={t('label_budget_from')}
            ref={budgetFromRef}
            keyboardType="number-pad"
            containerStyles={styles.input}
            value={values.budget_from}
            onChangeText={handleChange('budget_from')}
            onBlur={handleBlur('budget_from')}
            onSubmitEditing={() => budgetToRef?.current.focus()}
            error={errors.budget_from}
          />
          <RenderInput
            name="budget_to"
            label={t('label_budget_to')}
            keyboardType="number-pad"
            ref={budgetToRef}
            containerStyles={styles.input}
            value={values.budget_to}
            onChangeText={handleChange('budget_to')}
            onBlur={handleBlur('budget_to')}
            error={errors.budget_to}
          />
          <RenderDatePicker
            name="follow_up_date"
            ref={followUpDateRef}
            label={t('label_follow_up_date')}
            containerStyles={styles.input}
            value={values.follow_up_date}
            error={errors.follow_up_date}
            onChange={date => {
              setFieldValue('follow_up_date', date);
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
          <View style={styles.priorityContainer}>
            <Subheading>Lead Priority</Subheading>
            <View style={styles.radioContainer}>
              <Radio
                label={'Low'}
                value="low"
                color={PRIORITY_COLORS.low}
                checked={values.priority === 'low'}
                onChange={value => setFieldValue('priority', value)}
              />
              <Radio
                label={'Medium'}
                value="medium"
                color={PRIORITY_COLORS.medium}
                checked={values.priority === 'medium'}
                onChange={value => setFieldValue('priority', value)}
              />
              <Radio
                label={'High'}
                value="high"
                color={PRIORITY_COLORS.high}
                checked={values.priority === 'high'}
                onChange={value => setFieldValue('priority', value)}
              />
            </View>
          </View>
          <RenderSelect
            name="inquiry_for"
            label={t('label_inquiry_for')}
            options={inquiryOptions}
            containerStyles={styles.input}
            value={values.inquiry_for}
            error={errors.inquiry_for}
            onSelect={value => {
              setFieldValue('inquiry_for', value);
            }}
          />
          {(values.inquiry_for === 1 || values.inquiry_for === 4) &&
          bhkOptions[values.inquiry_for] ? (
            <RenderSelect
              name="for_bhk"
              label={t('label_for_bhk')}
              options={bhkOptions?.[values.inquiry_for].map(v => v.toString())}
              containerStyles={styles.input}
              value={values.for_bhk}
              error={errors.for_bhk}
              onSelect={value => {
                setFieldValue('for_bhk', value);
              }}
            />
          ) : null}
          <RenderTextBox
            name="remark"
            numberOfLines={5}
            minHeight={120}
            label={t('label_remark')}
            containerStyles={styles.input}
            value={values.remark}
            onChangeText={handleChange('remark')}
            onBlur={handleBlur('remark')}
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
            {'Back'}
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
  );
}

function RenderForm({formikProps, user, ...restProps}) {
  const {errors} = formikProps;

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Personal details'},
    {key: 1, title: 'Inquiry details'},
  ]);

  const {
    bhkOptions,
    occupationOptions,
    inquiryOptions,
    assignOptions,
    sourceTypeOptions,
  } = useSelector(state => state.sales);

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

  useEffect(() => {
    if (
      (errors.first_name ||
        errors.last_name ||
        errors.phone ||
        errors.occupation ||
        errors.occupation_input ||
        errors.current_locality) &&
      selectedTab === 1
    ) {
      setSelectedTab(0);
    } else if (Object.keys(errors).length > 0 && selectedTab === 0) {
      setSelectedTab(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return (
          <PersonalTab
            {...restProps}
            setSelectedTab={setSelectedTab}
            occupationOptions={occupationOptions}
            sourceTypeOptions={sourceTypeOptions}
            formikProps={formikProps}
          />
        );
      case 1:
        return (
          <InquiryTab
            {...restProps}
            setSelectedTab={setSelectedTab}
            inquiryOptions={inquiryOptions}
            bhkOptions={bhkOptions}
            assignOptions={updatedAssignOptions}
            formikProps={formikProps}
          />
        );
    }
  };

  return (
    <TabView
      navigationState={{index: selectedTab, routes}}
      renderScene={renderScene}
      onIndexChange={setSelectedTab}
      initialLayout={{width: Layout.window.width}}
      renderTabBar={tabBarProps => {
        return (
          <View style={styles.headerContainer}>
            <ProjectHeader />
            <MaterialTabBar {...tabBarProps} />
          </View>
        );
      }}
    />
  );
}

function AddVisitor(props) {
  const {navigation} = props;

  const {selectedProject} = useSelector(state => state.project);
  const {user} = useSelector(state => state.user);
  const {loading} = useSelector(state => state.sales);

  const {
    addVisitor,
    getVisitors,
    getFollowUps,
    getSalesData,
  } = useSalesActions();

  return (
    <>
      <SafeAreaView
        edges={['right', 'left', 'bottom']}
        style={styles.container}>
        <Spinner visible={loading} textContent={''} />
        <StatusBar barStyle="light-content" />
        <View style={styles.body}>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{priority: 'low'}}
            validationSchema={schema}
            onSubmit={async values => {
              const formData = new FormData();

              formData.append(
                'follow_up_date',
                dayjs(values.follow_up_date).format('DD-MM-YYYY'),
              );
              formData.append(
                'follow_up_time',
                dayjs(values.follow_up_time).format('HH:mm'),
              );
              formData.append(
                'occupation',
                values.occupation === 'Other'
                  ? values.occupation_input
                  : values.occupation,
              );

              delete values.follow_up_date;
              delete values.follow_up_time;
              delete values.occupation;
              delete values.occupation_input;

              Object.keys(values).map(key => {
                formData.append(key, values[key]);
              });

              formData.append('project_id', selectedProject.id);
              formData.append('user_id', user.id);

              addVisitor(formData).then(() => {
                getVisitors(selectedProject.id);
                getFollowUps(selectedProject.id);
                getSalesData(selectedProject.id);
                navigation.goBack();
              });
            }}>
            {formikProps => (
              <RenderForm formikProps={formikProps} user={user} {...props} />
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
}

export default withTheme(AddVisitor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
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
  priorityContainer: {
    marginVertical: 5,
    marginLeft: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
});
