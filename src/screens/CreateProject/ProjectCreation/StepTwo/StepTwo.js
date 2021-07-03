import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
import FormTitle from 'components/Atoms/FormTitle';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import RenderInput from 'components/Atoms/RenderInput';
import FileInput from 'components/Atoms/FileInput';
import useAddProjectActions from 'redux/actions/addProjectActions';
import * as Yup from 'yup';
import {PHONE_REGEX} from 'utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {handleDebounce} from 'utils';
import RenderTextBox from 'components/Atoms/RenderTextbox';

const schema = Yup.object().shape({
  project_name: Yup.string().required('name is required'),
  project_address: Yup.string()
    // .matches(PAN_REGEX, 'PAN number is invalid')
    .required('address is required'),
  // project_rera: Yup.string().required('RERANo. is required'),
  // rera_image: Yup.object().required('RERA image is required'),
  project_email: Yup.string()
    .email('email is invalid')
    .label('email')
    .required('email is required'),
  project_phone: Yup.string()
    .required('phone is required')
    .matches(PHONE_REGEX, 'phone is not valid')
    .min(10, 'to short')
    .max(10, 'to long'),
  project_state: Yup.string().required('state is required'),
  project_city: Yup.string().required('city is required'),
  project_pin: Yup.string().required('pin is required'),
});

function StepTwo(props) {
  const {navigation, route} = props;
  const {stepOneData} = route.params;

  const nameRef = React.useRef();
  const addressRef = React.useRef();
  const reraRef = React.useRef();
  const websiteRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();
  const stateRef = React.useRef();
  const cityRef = React.useRef();
  const pinRef = React.useRef();

  const {t} = useTranslation();
  const snackbar = useSnackbar();
  const {createProject, getCities} = useAddProjectActions();

  const {user} = useSelector(state => state.user);
  const {loading, statesData, citiesData} = useSelector(s => s.addProject);

  const stateOptions = useMemo(() => {
    return statesData
      .filter(i => i.status)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(i => ({label: i.name, value: i.id}));
  }, [statesData]);

  const cityOptions = useMemo(() => {
    return citiesData
      .filter(i => i.status)
      .sort((a, b) => a?.city_name?.localeCompare(b?.city_name))
      .map(i => ({label: i.city_name, value: i.id}));
  }, [citiesData]);

  const onSubmit = async values => {
    Keyboard.dismiss();

    snackbar.showMessage({
      message: "This may take a while, please don't close the app",
      variant: 'warning',
      duration: 6000,
    });

    const formData = new FormData();
    formData.append('project_rera', values.project_rera);
    formData.append('project_website', values.project_website);
    formData.append('project_name', values.project_name);
    formData.append('project_email', values.project_email);
    formData.append('project_phone', values.project_phone);
    formData.append('project_address', values.project_address);
    formData.append('project_state', values.project_state);
    formData.append('project_city', values.project_city);
    formData.append('project_pin', values.project_pin);
    formData.append('rera_image', values.rera_image);
    formData.append('company_gst', stepOneData.company_gst);
    formData.append('company_name', stepOneData.company_name);
    formData.append('company_pan', stepOneData.company_pan);
    formData.append('company_tan', stepOneData.company_tan);
    formData.append('pan_image', stepOneData.pan_image);
    formData.append('tan_image', stepOneData.tan_image);
    formData.append('gst_image', stepOneData.gst_image);
    formData.append('user_id', user.id);
    formData.append('terms', 1);

    createProject(formData).then(() => {
      navigation.navigate('ProjectStructureStepOne');
    });
  };

  return (
    <>
      <FormTitle title={t('StepOneTitle')} subTitle={t('StepOneSubTitle')} />
      <Spinner visible={loading} textContent={''} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
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
            isValid,
            errors,
          }) => (
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <RenderInput
                  name="project_name"
                  label={t('projectName')}
                  ref={nameRef}
                  containerStyles={styles.input}
                  value={values.project_name}
                  onChangeText={handleChange('project_name')}
                  onBlur={handleBlur('project_name')}
                  onSubmitEditing={() => reraRef?.current.focus()}
                  error={errors.project_name}
                />
                <FileInput
                  name="project_rera"
                  label={t('projectRera')}
                  ref={reraRef}
                  containerStyles={styles.input}
                  value={values.project_rera}
                  file={values.rera_image}
                  onChangeText={handleChange('project_rera')}
                  onChoose={v => setFieldValue('rera_image', v)}
                  onBlur={handleBlur('project_rera')}
                  onSubmitEditing={() => websiteRef?.current.focus()}
                  error={errors.project_rera || errors.rera_image}
                />
                <RenderInput
                  name="project_website"
                  label={t('projectWebsite')}
                  ref={websiteRef}
                  containerStyles={styles.input}
                  value={values.project_website}
                  onChangeText={handleChange('project_website')}
                  onBlur={handleBlur('project_website')}
                  onSubmitEditing={() => phoneRef?.current.focus()}
                  error={errors.project_website}
                />
                <RenderInput
                  name="project_phone"
                  label={t('label_project_phone')}
                  ref={phoneRef}
                  maxLength={10}
                  keyboardType="number-pad"
                  containerStyles={styles.input}
                  value={values.project_phone}
                  onChangeText={handleChange('project_phone')}
                  onBlur={handleBlur('project_phone')}
                  onSubmitEditing={() => emailRef?.current.focus()}
                  error={errors.project_phone}
                  left={<TextInput.Affix text="+91" />}
                />
                <RenderInput
                  name="project_email"
                  label={t('projectEmail')}
                  ref={emailRef}
                  containerStyles={styles.input}
                  value={values.project_email}
                  onChangeText={handleChange('project_email')}
                  onBlur={handleBlur('project_email')}
                  onSubmitEditing={() => addressRef?.current.focus()}
                  error={errors.project_email}
                />
                <RenderTextBox
                  name="project_address"
                  label={t('projectAddress')}
                  numberOfLines={5}
                  ref={addressRef}
                  containerStyles={styles.input}
                  value={values.project_address}
                  onChangeText={handleChange('project_address')}
                  onBlur={handleBlur('project_address')}
                  error={errors.project_address}
                />
                <RenderSelect
                  name="project_state"
                  label={t('label_project_state')}
                  ref={stateRef}
                  containerStyles={styles.input}
                  value={values.project_state}
                  options={stateOptions}
                  onSelect={value => {
                    setFieldValue('project_state', value);
                    getCities({state_id: value});
                  }}
                  error={errors.project_state}
                />
                <RenderSelect
                  name="project_city"
                  label={t('label_project_city')}
                  ref={cityRef}
                  options={cityOptions}
                  containerStyles={styles.input}
                  value={values.project_city}
                  onSelect={value => setFieldValue('project_city', value)}
                  onSubmitEditing={() => pinRef?.current.focus()}
                  error={errors.project_city}
                />
                <RenderInput
                  name="project_pin"
                  label={t('label_project_pin')}
                  ref={pinRef}
                  keyboardType="number-pad"
                  containerStyles={styles.input}
                  value={values.project_pin}
                  onChangeText={handleChange('project_pin')}
                  onBlur={handleBlur('project_pin')}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  error={errors.project_pin}
                />
              </View>
              <View style={styles.button}>
                <Button
                  mode="contained"
                  style={{width: '40%'}}
                  contentStyle={{padding: 3}}
                  theme={{roundness: 15}}
                  onPress={handleDebounce(handleSubmit)}>
                  {'Save'}
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  input: {
    paddingVertical: 7,
  },
  button: {
    marginTop: 25,
    width: '95%',
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default withTheme(StepTwo);
