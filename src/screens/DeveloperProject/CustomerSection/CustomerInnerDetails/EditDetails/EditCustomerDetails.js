import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, TextInput, Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
import RenderSelect from 'components/Atoms/RenderSelect';
import {PHONE_REGEX} from 'utils/constant';
import dayjs from 'dayjs';
import _ from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {theme} from 'styles/theme';
import useCustomerActions from 'redux/actions/customerActions';

const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const schema = Yup.object().shape({
  first_name: Yup.string('Invalid').required('Required'),
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
});

function PersonalTab(props) {
  const {navigation, formikProps, filteredOptions, occupationOptions} = props;
  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    handleBlur,
    errors,
  } = formikProps;

  const {t} = useTranslation();

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();
  const occupationRef = React.useRef();
  const occupationInputRef = React.useRef();
  const localityRef = React.useRef();
  const brokerRef = React.useRef();
  const dateRef = React.useRef();
  const addressRef = React.useRef();
  const anniversaryDateRef = React.useRef();

  return (
    <KeyboardAwareScrollView
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
            onSubmitEditing={() => occupationRef?.current?.focus()}
            onBlur={handleBlur('phone')}
            error={errors.phone}
            left={<TextInput.Affix text="+91" />}
          />

          <RenderSelect
            ref={brokerRef}
            name="broker"
            label="Through Broker"
            containerStyles={styles.input}
            options={filteredOptions}
            value={values.broker}
            onSelect={value => {
              setFieldValue('broker', value);
            }}
            error={errors.broker}
          />

          <RenderDatePicker
            name="dob"
            label="BirthDate"
            ref={dateRef}
            containerStyles={styles.input}
            value={values.dob}
            onChange={v => setFieldValue('dob', v)}
            error={errors.dob}
          />

          <RenderDatePicker
            name="anniversary_date"
            label="Anniversary Date"
            ref={anniversaryDateRef}
            containerStyles={styles.input}
            value={values.anniversary_date}
            onChange={v => setFieldValue('anniversary_date', v)}
            error={errors.anniversaryDate}
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

          <RenderTextBox
            name="address"
            label="Enter Address"
            ref={addressRef}
            containerStyles={styles.input}
            value={values.address}
            onChangeText={handleChange('address')}
            numberOfLines={4}
          />
        </View>
        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Next"
          onSubmit={handleSubmit}
          onCancel={navigation.goBack}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

function EditCustomerDetails(props) {
  const {navigation, route} = props;
  const {brokers, visitorId, visitors_info} = route?.params || {};

  const edit = Boolean(visitors_info?.id);

  const {selectedProject} = useSelector(s => s.project);

  const project_id = selectedProject.id;

  const {user} = useSelector(s => s.user);
  const {loading} = useSelector(s => s.sales);

  const {occupationOptions} = useSelector(s => s.sales);

  const {
    updateCustomerDetails,
    getVisitorCustomerListDetails,
    getVisitorCustomerList,
  } = useCustomerActions();

  const filteredOptions = useMemo(() => {
    return brokers?.map(i => ({
      label: `${i.first_name} ${i.last_name}`,
      value: i.id,
    }));
  }, [brokers]);

  const initialValues = useMemo(() => {
    if (edit) {
      const visitorData = _.cloneDeep(visitors_info);

      delete visitorData.created;
      delete visitorData.modified;
      delete visitorData.id;
      delete visitorData.inquiry_status_id;

      return {
        ..._.omitBy(visitorData, _.isNil),
        address: visitorData.address,
      };
    }
    return {priority: 'none'};
  }, [edit, visitors_info]);

  const handleSubmit = async values => {
    const inputs = _.cloneDeep(values);

    const data = {
      anniversary_date: dayjs(inputs.anniversary_date).format('DD-MM-YYYY'),
      dob: dayjs(inputs.birthDate).format('DD-MM-YYYY'),
    };

    await updateCustomerDetails({
      project_id: inputs.project_id,
      visitors_id: visitorId,
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      email: inputs.email,
      phone: inputs.phone,
      brokers_id: inputs.broker,
      dob: data.dob,
      anniversary_date: data.anniversary_date,
      occupation: inputs.occupation,
      other_occupation: inputs.other_occupation,
      address: inputs.address,
    });

    await getVisitorCustomerListDetails({project_id, visitors_id: visitorId});
    await getVisitorCustomerList({project_id});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <Subheading style={styles.subHeading}>Edit Customer Info</Subheading>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}>
        {formikProps => (
          <PersonalTab
            {...props}
            {...{formikProps, user, edit, filteredOptions, occupationOptions}}
          />
        )}
      </Formik>
    </View>
  );
}

export default withTheme(EditCustomerDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
  subHeading: {
    paddingHorizontal: 15,
    fontSize: 19,
    color: theme.colors.primary,
  },
});
