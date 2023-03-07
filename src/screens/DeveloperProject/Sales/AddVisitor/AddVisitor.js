import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {withTheme, Subheading, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {getShadow} from 'utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
import RenderSelect from 'components/Atoms/RenderSelect';
import {BHK_OPTIONS, PHONE_REGEX, PRIORITY_COLORS} from 'utils/constant';
import Radio from 'components/Atoms/Radio';
import useSalesActions from 'redux/actions/salesActions';
import dayjs from 'dayjs';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import _ from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelectMultiple from 'components/Atoms/RenderSelectMultiple';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';

const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const defaultPriority = ['none'];

const schema = Yup.object().shape({
  first_name: Yup.string('Invalid').required('Required'),
  priority: Yup.string('Invalid')
    .required('Required')
    .notOneOf(defaultPriority, 'Select an option'),

  last_name: Yup.string('Invalid').required('Required'),
  email: Yup.string('Invalid').email('Invalid'),
  phone: Yup.string()
    .label('phone')
    .required('Required')
    .matches(PHONE_REGEX, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long'),
  occupation: Yup.string('Invalid'),
  other_occupation: Yup.string('Invalid').when('occupation', {
    is: 0,
    then: Yup.string('Invalid'),
  }),
  current_locality: Yup.string('Invalid'),

  bhk: Yup.string('Invalid').when('bhk_required', {
    is: true,
    then: Yup.string('Invalid').required('Required'),
  }),
  assign_to: Yup.string('Invalid'),
  inquiry_for: Yup.string('Invalid').required('Required'),
  remarks: Yup.string('Invalid').required('Required'),
  budget_from: Yup.number('Invalid').required('Required'),
  budget_to: Yup.number('Invalid').when('budget_from', (budgetFrom, Schema) => {
    return budgetFrom
      ? Schema.min(
          Number(budgetFrom),
          'Budget To is less then Budget From',
        ).required('Budget To is less then Budget From')
      : Schema;
  }),
});

function PersonalTab(props) {
  const {
    navigation,
    formikProps,
    occupationOptions,
    sourceTypeOptions,
    setSelectedTab,
    mobileCodes,
    assigntoOptions,
  } = props;
  const {handleChange, setFieldValue, values, handleBlur, errors} = formikProps;
  const {t} = useTranslation();

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();
  const countryCodeRef = React.useRef();
  const phone2Ref = React.useRef();
  const occupationRef = React.useRef();
  const assignToRef = React.useRef();
  const occupationInputRef = React.useRef();
  const localityRef = React.useRef();
  const sourceTypeRef = React.useRef();

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
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
            onSubmitEditing={() => lastNameRef?.current?.focus()}
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
            onSubmitEditing={() => emailRef?.current?.focus()}
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
            onSubmitEditing={() => phoneRef?.current?.focus()}
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
            onSubmitEditing={() => phone2Ref?.current?.focus()}
            onBlur={handleBlur('phone')}
            error={errors.phone}
            left={<TextInput.Affix text="+91" />}
          />
          <RenderSelect
            name="mobile_code"
            label="Country Code for Phone No 2"
            ref={countryCodeRef}
            options={mobileCodes}
            containerStyles={styles.input}
            value={values.mobile_code}
            placeholder="Country Code for Phone 2"
            error={errors.mobile_code}
            onSelect={value => {
              setFieldValue('mobile_code', value);
            }}
          />
          <RenderInput
            name="phone2"
            ref={phone2Ref}
            label="Phone No 2"
            keyboardType="number-pad"
            maxLength={10}
            containerStyles={styles.input}
            value={values.phone2}
            onChangeText={handleChange('phone2')}
            onSubmitEditing={() => occupationRef?.current?.focus()}
            onBlur={handleBlur('phone2')}
            error={errors.phone2}
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
              if (value === 0) {
                occupationInputRef?.current?.focus();
              } else {
                localityRef?.current?.focus();
              }
            }}
          />
          <RenderSelect
            name="assign_to"
            ref={assignToRef}
            label="Assign To"
            options={assigntoOptions}
            containerStyles={styles.input}
            value={values.assign_to}
            placeholder="Assign To"
            error={errors.assign_to}
            onSelect={value => {
              setFieldValue('assign_to', value);
              if (value === 0) {
                occupationInputRef?.current?.focus();
              } else {
                localityRef?.current?.focus();
              }
            }}
          />
          {values.occupation === 0 ? (
            <RenderInput
              ref={occupationInputRef}
              name="other_occupation"
              label={t('label_other_occupation')}
              containerStyles={styles.input}
              value={values.other_occupation}
              onChangeText={handleChange('other_occupation')}
              onBlur={handleBlur('other_occupation')}
              error={errors.other_occupation}
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
        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Next"
          onSubmit={() => setSelectedTab(1)}
          onCancel={navigation.goBack}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

function InquiryTab(props) {
  const {
    formikProps,
    setSelectedTab,
    inquiryOptions,
    interestedOptions,
    edit,
    brokerOptions,
  } = props;

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
  const followUpTitleRef = React.useRef();
  const followUpDateRef = React.useRef();
  const followUpTimeRef = React.useRef();

  useEffect(() => {
    setFieldValue(
      'bhk_required',
      values.inquiry_for === 1 || values.inquiry_for === 4,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inquiry_for]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
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

          <View style={styles.priorityContainer}>
            <Subheading>Lead Priority</Subheading>
            <View style={styles.radioContainer}>
              <Radio
                label="Low"
                value="low"
                color={PRIORITY_COLORS.low}
                checked={values.priority === 'low'}
                onChange={value => setFieldValue('priority', value)}
              />
              <Radio
                label="Medium"
                value="medium"
                color={PRIORITY_COLORS.medium}
                checked={values.priority === 'medium'}
                onChange={value => setFieldValue('priority', value)}
              />
              <Radio
                label="High"
                value="high"
                color={PRIORITY_COLORS.high}
                checked={values.priority === 'high'}
                onChange={value => setFieldValue('priority', value)}
              />
            </View>
          </View>
          <RenderError error={errors.priority} />

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
          <RenderSelect
            name="brokers_id"
            label="Broker"
            options={brokerOptions}
            containerStyles={styles.input}
            value={values.brokers_id}
            error={errors.brokers_id}
            onSelect={value => {
              setFieldValue('brokers_id', value);
            }}
          />
          <RenderSelectMultiple
            name="interested_property"
            label="Interested Property"
            options={interestedOptions}
            value={values.interested_property}
            containerStyles={styles.input}
            error={errors.interested_property}
            onSelect={v => {
              setFieldValue('interested_property', v);
            }}
          />
          {values.bhk_required ? (
            <RenderSelect
              name="bhk"
              label={t('label_for_bhk')}
              options={BHK_OPTIONS.map(({type}) => ({
                label: type.toString(),
                value: type.toString(),
              }))}
              containerStyles={styles.input}
              value={values.bhk}
              error={errors.bhk}
              onSelect={value => {
                setFieldValue('bhk', value);
              }}
            />
          ) : null}
          <RenderDatePicker
            name="Inquiry_date"
            label="Inquiry Date"
            containerStyles={styles.input}
            value={values.Inquiry_date}
            error={errors.Inquiry_date}
            onChange={date => {
              setFieldValue('Inquiry_date', date);
            }}
          />
          <RenderTextBox
            name="remarks"
            numberOfLines={5}
            minHeight={120}
            label={t('label_remark')}
            containerStyles={styles.input}
            value={values.remarks}
            onChangeText={handleChange('remarks')}
            onBlur={handleBlur('remarks')}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            error={errors.remarks}
          />
        </View>
        <View style={styles.followupDetails}>
          <Subheading>Followup Details</Subheading>
          <View style={styles.inputsContainer}>
            <RenderInput
              name="title"
              label="Task Title"
              ref={followUpTitleRef}
              containerStyles={styles.input}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={errors.title}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.flex}>
            <RenderDatePicker
              name="date"
              label="Date"
              ref={followUpDateRef}
              containerStyles={styles.input}
              value={values.date}
              error={errors.date}
              onChange={date => {
                setFieldValue('date', date);
                followUpTimeRef?.current?.focus?.();
              }}
            />
          </View>
          <View style={styles.flex}>
            <RenderDatePicker
              mode="time"
              label="Time"
              ref={followUpTimeRef}
              name="time"
              containerStyles={styles.input}
              value={values.time}
              error={errors.time}
              onChange={date => {
                setFieldValue('time', date);
              }}
            />
          </View>
        </View>
        <ActionButtons
          cancelLabel="Back"
          submitLabel={edit ? 'Update' : 'Save'}
          onCancel={() => setSelectedTab(0)}
          onSubmit={handleSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

function RenderForm(props) {
  const {
    formikProps,
    user,
    mobileCodes,
    assigntoOptions,
    brokerOptions,
    ...restProps
  } = props;
  const {errors} = formikProps;

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Personal details'},
    {key: 1, title: 'Inquiry details'},
  ]);

  const {
    occupationOptions,
    inquiryOptions,
    interestedOptions,
    assignOptions,
    sourceTypeOptions,
  } = useSelector(s => s.sales);
  const {selectedProject} = useSelector(s => s.project);

  const {getVisitorInterestedProperty} = useSalesActions();

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
        errors.other_occupation ||
        errors.current_locality) &&
      selectedTab === 1
    ) {
      setSelectedTab(0);
    } else if (Object.keys(errors).length > 0 && selectedTab === 0) {
      setSelectedTab(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  React.useEffect(() => {
    getVisitorInterestedProperty({
      project_id: selectedProject.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            mobileCodes={mobileCodes}
            assigntoOptions={assigntoOptions}
          />
        );
      case 1:
        return (
          <InquiryTab
            {...restProps}
            setSelectedTab={setSelectedTab}
            inquiryOptions={inquiryOptions}
            interestedOptions={interestedOptions}
            assignOptions={updatedAssignOptions}
            formikProps={formikProps}
            brokerOptions={brokerOptions}
          />
        );
      default:
        return <View />;
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
            <ProjectHeader {...props} />
            <MaterialTabBar {...tabBarProps} />
          </View>
        );
      }}
    />
  );
}

function AddVisitor(props) {
  const {navigation, route} = props;
  const {visitor} = route?.params || {};

  const edit = Boolean(visitor?.id);

  const {selectedProject} = useSelector(s => s.project);
  const {user} = useSelector(s => s.user);
  const {loading, countrycodes, assigntoData, brokersList} = useSelector(
    s => s.sales,
  );

  const mobileCodes = countrycodes.map(i => ({
    label: `+${i.phone_code}, ${i.country_name}`,
    value: i.id,
  }));

  const assigntoOptions = assigntoData.map(i => ({
    label: `${i.first_name} ${i.last_name} - ${i.email}`,
    value: i.id,
  }));

  const brokerOptions = brokersList.map(i => ({
    label: `${i.first_name} ${i.last_name}`,
    value: i.id,
  }));

  const {
    addVisitor,
    updateVisitor,
    getVisitors,
    getVisitor,
    // getFollowUps,
    getSalesData,
  } = useSalesActions();

  const initialValues = useMemo(() => {
    if (edit) {
      const visitorData = _.cloneDeep(visitor);

      delete visitorData.created;
      delete visitorData.modified;
      delete visitorData.id;
      delete visitorData.inquiry_status_id;

      return {
        ..._.omitBy(visitorData, _.isNil),
        follow_up_time: dayjs(visitorData.follow_up_time, 'HH:mm:ss').toDate(),
        bhk: visitorData.bhk,
        remarks: visitorData.remarks,
        interested_for: [],
      };
    }
    return {priority: 'none'};
  }, [edit, visitor]);

  const onSubmit = async values => {
    const inputs = _.cloneDeep(values);

    let data = {
      follow_up_date: dayjs(inputs.follow_up_date).format('DD-MM-YYYY'),
      follow_up_time: dayjs(inputs.follow_up_time).format('HH:mm'),
    };

    delete inputs.follow_up_date;
    delete inputs.follow_up_time;
    delete inputs.bhk_required;

    const arrString = inputs?.interested_property?.join(',') || undefined;

    data = {
      ...data,
      ...inputs,
      project_id: selectedProject.id,
      user_id: user.id,
      interested_property: arrString,
      occupation: inputs?.occupation || 0,
      other_occupation: inputs?.other_occupation || 0,
      budget_from: inputs?.budget_from || 0,
      budget_to: inputs?.budget_to || 0,
    };

    if (edit) {
      await updateVisitor({...data, visitor_id: visitor.id});
      await getVisitor({
        project_id: selectedProject.id,
        visitor_id: visitor.id,
      });
    } else {
      await addVisitor(data);
    }

    await getVisitors({project_id: selectedProject.id, filter_mode: 'all'});

    await getSalesData({project_id: selectedProject.id});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <StatusBar barStyle="dark-content" />
      <View style={styles.body}>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => (
            <RenderForm
              {...props}
              {...{formikProps, user, edit}}
              mobileCodes={mobileCodes}
              assigntoOptions={assigntoOptions}
              brokerOptions={brokerOptions}
            />
          )}
        </Formik>
      </View>
    </View>
  );
}

export default withTheme(AddVisitor);

const styles = StyleSheet.create({
  container: {
    margin: 10,
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
    paddingTop: 5,
  },
  input: {
    paddingVertical: 7,
  },
  priorityContainer: {
    marginVertical: 5,
    marginLeft: 5,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  followupDetails: {
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  flex: {
    flex: 1,
    marginHorizontal: 10,
  },
});
