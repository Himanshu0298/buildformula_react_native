import ActionButtons from 'components/Atoms/ActionButtons';
import Radio from 'components/Atoms/Radio';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import SearchDropdown from 'components/Atoms/SearchDropdown';
import {Formik} from 'formik';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Subheading,
  TextInput,
  withTheme,
  Text,
  Caption,
  IconButton,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import {useSalesLoading} from 'redux/selectors';
import {theme} from 'styles/theme';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  customer_first_name: Yup.string('Invalid').when('userType', {
    is: 'new',
    then: Yup.string('Invalid').required('Required'),
  }),
  customer_last_name: Yup.string('Invalid').when('userType', {
    is: 'new',
    then: Yup.string('Invalid').required('Required'),
  }),
  customer_email: Yup.string('Invalid').when('userType', {
    is: 'new',
    then: Yup.string('Invalid').email('Invalid').required('Required'),
  }),
  customer_phone: Yup.number('Invalid').when('userType', {
    is: 'new',
    then: Yup.number('Invalid').required('Required'),
  }),
  broker_id: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  selectedVisitor: Yup.string().required('Please Select a Visitor'),
});

function InfoRow(props) {
  const {data} = props;

  return (
    <View style={styles.rowContainer}>
      {data.map(({label, value}) => (
        <View key={label} style={styles.rowCell}>
          <Caption>{label}: </Caption>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function FormContent(props) {
  const {formikProps, navigation} = props;
  const {t} = useTranslation();

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
  } = formikProps;

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();

  const [visitorSearchText, setVisitorSearchText] = useState();
  const [brokerSearchText, setBrokerSearchText] = useState();

  const {visitors} = useSelector(s => s.project);
  const {brokersList} = useSelector(s => s.sales);
  const loading = useSalesLoading();

  const filteredVisitors = useMemo(() => {
    if (visitorSearchText) {
      return visitors.filter(visitor => {
        const {first_name, last_name, phone, email} = visitor;
        return (
          first_name?.includes(visitorSearchText) ||
          last_name?.includes(visitorSearchText) ||
          phone?.includes(visitorSearchText) ||
          email?.includes(visitorSearchText)
        );
      });
    }
    return visitors;
  }, [visitorSearchText, visitors]);

  const filteredBrokers = useMemo(() => {
    if (brokerSearchText) {
      return brokersList.filter(broker => {
        const {first_name, last_name, phone, email} = broker;
        return (
          first_name?.includes(brokerSearchText) ||
          last_name?.includes(brokerSearchText) ||
          phone?.includes(brokerSearchText) ||
          email?.includes(brokerSearchText)
        );
      });
    }
    return brokersList;
  }, [brokerSearchText, brokersList]);

  const visitorOptions = useMemo(() => {
    return filteredVisitors.map(i => ({
      label: `${i.first_name} ${i.last_name}`,
      value: i.id,
    }));
  }, [filteredVisitors]);

  const brokerOptions = useMemo(() => {
    return filteredBrokers.map(i => ({
      label: `${i.first_name} ${i.last_name}`,
      value: i.id,
    }));
  }, [filteredBrokers]);

  const visitorDetails = useMemo(() => {
    return visitors.find(visitor => visitor.id === values.selectedVisitor);
  }, [values.selectedVisitor, visitors]);

  const brokerDetails = useMemo(() => {
    return brokersList.find(i => i.id === values.broker_id);
  }, [values.broker_id, brokersList]);

  const handleCancel = () => navigation.goBack();

  const setSelectedVisitor = v => setFieldValue('selectedVisitor', v);

  const setSelectedBroker = v => setFieldValue('broker_id', v);

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          extraScrollHeight={30}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.headingContainer}
              onPress={navigation.goBack}>
              <IconButton
                icon="keyboard-backspace"
                color={theme.colors.primary}
              />
              <Subheading style={{color: theme.colors.primary}}>
                1. Booking Details
              </Subheading>
            </TouchableOpacity>
            <View style={styles.radioRow}>
              <Text>Select user type</Text>
              <View style={styles.radioContainer}>
                <Radio
                  label="New user"
                  value="new"
                  checked={values.userType === 'new'}
                  onChange={value => setFieldValue('userType', value)}
                />
                <Radio
                  label="Existing visitor"
                  value="visitor"
                  checked={values.userType === 'visitor'}
                  onChange={value => setFieldValue('userType', value)}
                />
              </View>
              {errors.selectedVisitor ? (
                <RenderError error={errors.selectedVisitor} />
              ) : null}
            </View>
            {values.userType === 'visitor' ? (
              <View style={styles.searchContainer}>
                <SearchDropdown
                  placeholder="label_search_visitors"
                  options={visitorOptions}
                  searchQuery={visitorSearchText}
                  selected={values.selectedVisitor}
                  onSelect={setSelectedVisitor}
                  onChangeText={setVisitorSearchText}
                />
              </View>
            ) : null}
            <Subheading style={{color: theme.colors.primary}}>
              1. {values.userType === 'new' ? 'User' : 'Visitor'} Details
            </Subheading>
            {values.userType === 'new' ? (
              <>
                <RenderInput
                  name="customer_first_name"
                  label={t('label_first_name')}
                  ref={firstNameRef}
                  containerStyles={styles.input}
                  value={values.customer_first_name}
                  onChangeText={handleChange('customer_first_name')}
                  onBlur={handleBlur('customer_first_name')}
                  onSubmitEditing={() => lastNameRef?.current?.focus()}
                  error={errors.customer_first_name}
                />
                <RenderInput
                  name="customer_last_name"
                  label={t('label_last_name')}
                  ref={lastNameRef}
                  containerStyles={styles.input}
                  value={values.customer_last_name}
                  onChangeText={handleChange('customer_last_name')}
                  onBlur={handleBlur('customer_last_name')}
                  onSubmitEditing={() => emailRef?.current?.focus()}
                  error={errors.customer_last_name}
                />
                <RenderInput
                  name="customer_email"
                  label={t('label_email')}
                  ref={emailRef}
                  containerStyles={styles.input}
                  value={values.customer_email}
                  onChangeText={handleChange('customer_email')}
                  onBlur={handleBlur('customer_email')}
                  onSubmitEditing={() => phoneRef?.current?.focus()}
                  error={errors.customer_email}
                />
                <RenderInput
                  name="customer_phone"
                  label={t('label_phone')}
                  ref={phoneRef}
                  keyboardType="number-pad"
                  maxLength={12}
                  containerStyles={styles.input}
                  value={values.customer_phone}
                  onChangeText={handleChange('customer_phone')}
                  onBlur={handleBlur('customer_phone')}
                  error={errors.customer_phone}
                  left={<TextInput.Affix text="+91" />}
                />
              </>
            ) : (
              <View style={styles.visitorContainer}>
                <InfoRow
                  data={[
                    {label: 'First name', value: visitorDetails?.first_name},
                    {label: 'Last name', value: visitorDetails?.last_name},
                  ]}
                />
                <InfoRow
                  data={[{label: 'Email', value: visitorDetails?.email}]}
                />
                <InfoRow
                  data={[{label: 'Phone no.', value: visitorDetails?.phone}]}
                />
              </View>
            )}
            <View style={styles.brokerRadioRow}>
              <Text>Through broker?</Text>
              <View style={styles.radioContainer}>
                <Radio
                  label="Yes"
                  value="yes"
                  checked={values.broker === 'yes'}
                  onChange={value => setFieldValue('broker', value)}
                />
                <Radio
                  label="No"
                  value="no"
                  color={theme.colors.error}
                  checked={values.broker === 'no'}
                  onChange={value => setFieldValue('broker', value)}
                />
              </View>
            </View>
            {values.broker === 'yes' ? (
              <>
                <View style={{}}>
                  <SearchDropdown
                    options={brokerOptions}
                    searchQuery={brokerSearchText}
                    selected={values.selectedBroker}
                    onSelect={setSelectedBroker}
                    onChangeText={setBrokerSearchText}
                  />
                </View>
                <RenderError error={errors.broker_id} />

                <Subheading style={{color: theme.colors.primary}}>
                  Broker Details
                </Subheading>

                <View style={styles.visitorContainer}>
                  <InfoRow
                    data={[
                      {label: 'First name', value: brokerDetails?.first_name},
                      {label: 'Last name', value: brokerDetails?.last_name},
                    ]}
                  />
                  <InfoRow
                    data={[{label: 'Email', value: brokerDetails?.email}]}
                  />
                  <InfoRow
                    data={[{label: 'Phone no.', value: brokerDetails?.phone}]}
                  />
                  <RenderTextBox
                    name="broker_remark"
                    blurOnSubmit={false}
                    numberOfLines={5}
                    label="Remark (optional)"
                    containerStyles={styles.input}
                    value={values.broker_remark}
                    onChangeText={handleChange('broker_remark')}
                    onBlur={handleBlur('broker_remark')}
                    onSubmitEditing={handleSubmit}
                    error={errors.broker_remark}
                  />
                </View>
              </>
            ) : null}
          </View>
          <ActionButtons
            cancelLabel="Back"
            submitLabel="Next"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

function BookingDetails(props) {
  const {navigation, route} = props;
  const {project_id, withRate, unit_id, selectedStructure} =
    route?.params || {};

  const {getBrokersList} = useSalesActions();

  useEffect(() => {
    getBrokersList({project_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project_id]);

  const onSubmit = async values => {
    const data = {...values};
    if (data.userType === 'visitor') {
      data.user_id_info = data.selectedVisitor;

      delete data.customer_first_name;
      delete data.customer_last_name;
      delete data.customer_email;
      delete data.customer_phone;
    }
    delete data.selectedVisitor;
    delete data.userType;

    const nextStep = withRate ? 'BC_Step_Seven' : 'BC_Step_Eight';
    const params = {
      ...data,
      project_id,
      withRate,
      unit_id,
      project_main_types: selectedStructure,
    };

    navigation.navigate(nextStep, params);
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{broker: 'no', userType: 'new'}}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {formikProps => <FormContent {...props} formikProps={formikProps} />}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  input: {
    marginTop: 5,
  },
  radioRow: {
    marginBottom: 10,
  },
  brokerRadioRow: {
    marginBottom: 10,
    marginTop: 30,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  visitorContainer: {
    marginTop: 10,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 3,
  },
  rowCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    marginBottom: 10,
  },
});

export default withTheme(BookingDetails);
