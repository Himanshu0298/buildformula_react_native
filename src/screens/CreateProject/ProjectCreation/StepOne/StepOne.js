import React, {useEffect} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';
import FormTitle from 'components/Atoms/FormTitle';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {theme} from 'styles/theme';
import RenderInput from 'components/Atoms/RenderInput';
import FileInput from 'components/Atoms/FileInput';
import * as Yup from 'yup';
import useAddProjectActions from 'redux/actions/addProjectActions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtons from 'components/Atoms/ActionButtons';

// TODO: enable regex validation

const schema = Yup.object().shape({
  company_name: Yup.string().label('Name').required('Name is required'),
  company_pan: Yup.string().required('PAN number is required'),
  company_tan: Yup.string().trim(),
  company_gst: Yup.string(),
});

function StepOne(props) {
  const {navigation} = props;

  const {t} = useTranslation();

  const emailRef = React.useRef();
  const panRef = React.useRef();
  const tanRef = React.useRef();
  const gstRef = React.useRef();

  const {getStates} = useAddProjectActions();

  useEffect(() => {
    getStates();
  });

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <FormTitle title={t('StepOneTitle')} subTitle={t('StepOneSubTitle')} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          validationSchema={schema}
          onSubmit={async values => {
            navigation.navigate('ProjectCreationStepTwo', {
              stepOneData: values,
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
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <RenderInput
                  name="company_name"
                  label={t('CompanyName')}
                  ref={emailRef}
                  containerStyles={styles.input}
                  value={values.company_name}
                  onChangeText={handleChange('company_name')}
                  onBlur={handleBlur('company_name')}
                  onSubmitEditing={() => panRef && panRef.current.focus()}
                  error={errors.company_name}
                />
                <FileInput
                  name="company_pan"
                  label={t('label_pan')}
                  ref={panRef}
                  containerStyles={styles.input}
                  value={values.company_pan}
                  file={values.pan_image}
                  onChangeText={handleChange('company_pan')}
                  onChoose={v => setFieldValue('pan_image', v)}
                  onBlur={handleBlur('company_pan')}
                  onSubmitEditing={() => tanRef && tanRef.current.focus()}
                  error={errors.company_pan || errors.pan_image}
                />
                <FileInput
                  name="company_tan"
                  label={t('label_tan')}
                  ref={tanRef}
                  containerStyles={styles.input}
                  value={values.company_tan}
                  file={values.tan_image}
                  onChangeText={handleChange('company_tan')}
                  onChoose={v => setFieldValue('tan_image', v)}
                  onBlur={handleBlur('company_tan')}
                  onSubmitEditing={() => gstRef && gstRef.current.focus()}
                  error={errors.company_tan || errors.tan_image}
                />
                <FileInput
                  name="company_gst"
                  label={t('label_gst')}
                  ref={gstRef}
                  containerStyles={styles.input}
                  value={values.company_gst}
                  file={values.gst_image}
                  onChangeText={handleChange('company_gst')}
                  onChoose={v => setFieldValue('gst_image', v)}
                  onBlur={handleBlur('company_gst')}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  error={errors.company_gst || errors.gst_image}
                />
              </View>
              <ActionButtons
                style={styles.actionContainer}
                cancelLabel="Back"
                submitLabel="Continue"
                onCancel={navigation.goBack}
                onSubmit={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
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
    marginTop: 0,
  },
});

export default withTheme(StepOne);
