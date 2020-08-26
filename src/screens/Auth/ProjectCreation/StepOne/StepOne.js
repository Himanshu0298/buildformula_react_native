import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {withTheme, Title, Caption} from 'react-native-paper';
import FormTitle from '../../../../components/FormTitle';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import Layout from '../../../../utils/Layout';
import {theme} from '../../../../styles/theme';
import RenderInput from '../../../../components/RenderInput';
import FileInput from '../../../../components/FileInput';

const schema = {};

function StepOne(props) {
  const {theme, navigation} = props;

  const {t} = useTranslation();

  const emailRef = React.useRef();
  const panRef = React.useRef();
  const tanRef = React.useRef();
  const gstRef = React.useRef();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <FormTitle title={t('StepOneTitle')} subTitle={t('StepOneSubTitle')} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={async (values) => {
          navigation.navigate('ProjectCreationStepTwo');
        }}>
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
                autoFocus
                name="company_name"
                label={t('CompanyName')}
                ref={emailRef}
                value={values.company_name}
                onChangeText={handleChange('company_name')}
                onBlur={handleBlur('company_name')}
                placeholder={t('CompanyName')}
                autoCapitalize="none"
                returnKeyType={'next'}
                onSubmitEditing={() => panRef && panRef.current.focus()}
                error={errors.company_name}
              />
              <FileInput
                name="company_pan"
                label={t('pan')}
                ref={panRef}
                value={values.company_pan}
                file={values.pan_image}
                onChangeText={handleChange('company_pan')}
                onChoose={(image) => setFieldValue('pan_image', image)}
                onBlur={handleBlur('company_pan')}
                placeholder={t('pan')}
                autoCapitalize="none"
                returnKeyType={'next'}
                onSubmitEditing={() => tanRef && tanRef.current.focus()}
                error={errors.company_pan}
              />
            </View>
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  topImageContainer: {
    height: '40%',
  },
  bannerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  banner: {
    width: Layout.window.width * 0.75,
    height: Layout.window.width * 0.75 * (5 / 12),
  },
  imageContainer: {
    display: 'flex',
    marginBottom: -30,
    right: 10,
    alignItems: 'center',
  },
  image: {
    width: Layout.window.width * 0.75,
    height: Layout.window.width * 0.75 * (15 / 22),
  },
  header: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  contentContainer: {
    backgroundColor: theme.colors.primary,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headlineContainer: {
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginError: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputMainContainer: {
    width: '100%',
    height: '80%',
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  inputsContainer: {
    width: '100%',
    padding: 20,
  },
  loginButton: {
    marginTop: 25,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  forgotContainer: {
    display: 'flex',
    width: '100%',
    padding: 2,
    alignItems: 'flex-end',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerContainer: {
    display: 'flex',
    marginTop: 20,
    padding: 3,
    width: '100%',
    alignItems: 'center',
  },
});

export default withTheme(StepOne);
