import Radio from 'components/Atoms/Radio';
import RenderInput from 'components/Atoms/RenderInput';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {Formik} from 'formik';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Subheading,
  TextInput,
  withTheme,
  Text,
  Button,
  Caption,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import {theme} from 'styles/theme';
import * as Yup from 'yup';
import {VisitorSelector} from '../../AddFollowUp/AddFollowUp';

const schema = Yup.object().shape({
  customer_first_name: Yup.string('Invalid').required('Required'),
  customer_last_name: Yup.string('Invalid').required('Required'),
  customer_email: Yup.string('Invalid').email('Invalid').required('Required'),
  customer_phone: Yup.number('Invalid').required('Required'),
  broker_first_name: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  broker_last_name: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  broker_email: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').email('Invalid').required('Required'),
  }),
  broker_phone: Yup.number('Invalid').when('broker', {
    is: 'yes',
    then: Yup.number('Invalid').required('Required'),
  }),
});

function RenderItem({label, value}) {
  return (
    <View style={styles.itemContainer}>
      <Text>{label}</Text>
      <Caption style={{lineHeight: 14}}>{value || 'NA'}</Caption>
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
  const brokerFirstNameRef = React.useRef();
  const brokerLastNameRef = React.useRef();
  const brokerEmailRef = React.useRef();
  const brokerPhoneRef = React.useRef();

  const [searchQuery, setSearchQuery] = useState();

  const {visitorSuggestions, visitors} = useSelector(state => state.sales);

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
    return visitors.find(visitor => visitor.id === values.selectedVisitor);
  }, [values.selectedVisitor, visitors]);

  const handleCancel = () => navigation.goBack();

  const setSelectedVisitor = v => setFieldValue('selectedVisitor', v);

  return (
    <TouchableWithoutFeedback
      style={{flexGrow: 1}}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 10}}>
        <View style={styles.container}>
          <View style={styles.radioRow}>
            <Text>Select user type</Text>
            <View style={styles.radioContainer}>
              <Radio
                label={'New user'}
                value="new"
                checked={values.userType === 'new'}
                onChange={value => setFieldValue('userType', value)}
              />
              <Radio
                label={'Existing visitor'}
                value="visitor"
                checked={values.userType === 'visitor'}
                onChange={value => setFieldValue('userType', value)}
              />
            </View>
          </View>
          {values.userType === 'visitor' ? (
            <View style={{marginBottom: 10}}>
              <VisitorSelector
                visitors={filteredVisitors}
                searchQuery={searchQuery}
                selectedVisitor={values.selectedVisitor}
                onSelectVisitor={setSelectedVisitor}
                onChangeText={setSearchQuery}
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
                maxLength={10}
                containerStyles={styles.input}
                value={values.customer_phone}
                onChangeText={handleChange('customer_phone')}
                onBlur={handleBlur('customer_phone')}
                error={errors.customer_phone}
                left={
                  <TextInput.Affix
                    text="+91"
                    theme={{colors: {text: '#000'}}}
                  />
                }
              />
            </>
          ) : (
            <View style={styles.visitorContainer}>
              <RenderItem
                label={'First name'}
                value={visitorDetails?.first_name}
              />
              <RenderItem
                label={'Last name'}
                value={visitorDetails?.last_name}
              />
              <RenderItem label={' Email'} value={visitorDetails?.email} />
              <RenderItem label={'Phone no.'} value={visitorDetails?.phone} />
            </View>
          )}
          <View style={styles.radioRow}>
            <Text>Through broker?</Text>
            <View style={styles.radioContainer}>
              <Radio
                label={'Yes'}
                value="yes"
                checked={values.broker === 'yes'}
                onChange={value => setFieldValue('broker', value)}
              />
              <Radio
                label={'No'}
                value="no"
                color={theme.colors.error}
                checked={values.broker === 'no'}
                onChange={value => setFieldValue('broker', value)}
              />
            </View>
          </View>
          {values.broker === 'yes' ? (
            <>
              <Subheading style={{color: theme.colors.primary}}>
                Broker Details
              </Subheading>
              <RenderInput
                name="broker_first_name"
                label={t('label_first_name')}
                ref={brokerFirstNameRef}
                containerStyles={styles.input}
                value={values.broker_first_name}
                onChangeText={handleChange('broker_first_name')}
                onBlur={handleBlur('broker_first_name')}
                error={errors.broker_first_name}
                onSubmitEditing={() => brokerLastNameRef?.current?.focus?.()}
              />
              <RenderInput
                name="broker_last_name"
                label={t('label_last_name')}
                ref={brokerLastNameRef}
                containerStyles={styles.input}
                value={values.broker_last_name}
                onChangeText={handleChange('broker_last_name')}
                onBlur={handleBlur('broker_last_name')}
                onSubmitEditing={() => brokerEmailRef?.current?.focus?.()}
                error={errors.broker_last_name}
              />
              <RenderInput
                name="broker_email"
                label={t('label_email')}
                ref={brokerEmailRef}
                containerStyles={styles.input}
                value={values.broker_email}
                onChangeText={handleChange('broker_email')}
                onBlur={handleBlur('broker_email')}
                onSubmitEditing={() => brokerPhoneRef?.current?.focus?.()}
                error={errors.broker_email}
              />
              <RenderInput
                name="broker_phone"
                label={t('label_phone')}
                ref={brokerPhoneRef}
                keyboardType="number-pad"
                maxLength={10}
                containerStyles={styles.input}
                value={values.broker_phone}
                onChangeText={handleChange('broker_phone')}
                onBlur={handleBlur('broker_phone')}
                error={errors.broker_phone}
                left={
                  <TextInput.Affix
                    text="+91"
                    theme={{colors: {text: '#000'}}}
                  />
                }
              />
              <RenderTextBox
                name="remark"
                blurOnSubmit={false}
                numberOfLines={5}
                minHeight={120}
                label={t('label_remark')}
                containerStyles={styles.input}
                value={values.remark}
                onChangeText={handleChange('remark')}
                onBlur={handleBlur('remark')}
                onSubmitEditing={handleSubmit}
                error={errors.remark}
              />
            </>
          ) : null}
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={{flex: 1, marginHorizontal: 5}}
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={handleCancel}>
            {'Back'}
          </Button>
          <Button
            style={{flex: 1, marginHorizontal: 5}}
            mode="contained"
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            {'Next'}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

function BookingDetails(props) {
  const {navigation, route} = props;
  const {params = {}} = route;

  const {getSalesData} = useSalesActions();

  const {selectedProject} = useSelector(state => state.project);

  useEffect(() => {
    // getSalesData(selectedProject.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject.id]);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{broker: 'no', userType: 'new'}}
      validationSchema={schema}
      onSubmit={async values => {
        if (values.userType === 'visitor') {
          values.user_id_info = values.selectedVisitor;

          delete values.customer_first_name;
          delete values.customer_last_name;
          delete values.customer_email;
          delete values.customer_phone;
        }
        delete values.selectedVisitor;

        navigation.navigate('BC_Step_Five', {...values, ...params});
      }}>
      {formikProps => <FormContent {...props} formikProps={formikProps} />}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    marginTop: 5,
  },
  radioRow: {
    marginTop: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visitorContainer: {
    marginTop: 10,
  },
  itemContainer: {
    marginVertical: 5,
  },
});

export default withTheme(BookingDetails);
