/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, Headline, Subheading, Button} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import {Formik} from 'formik';
import useUserActions from 'redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'components/Atoms/Snackbar';
import CustomInput from '../Components/CustomInput';
import AuthLayout from '../Components/AuthLayout';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .label('email')
    .required('Please enter a valid email'),
});

function LoginButton({label, onPress}) {
  return (
    <View style={styles.loginButton}>
      <Button
        color={theme.colors.accent}
        style={{width: '100%'}}
        mode="contained"
        contentStyle={{padding: 8}}
        theme={{roundness: 15}}
        onPress={onPress}>
        {label}
      </Button>
    </View>
  );
}

function RenderContent(props) {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    bottomSheetRef,
    navigation,
  } = props;

  const emailRef = React.useRef();

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline theme={secondaryTheme} style={{fontWeight: 'bold'}}>
          {t('title_forgot_password_heading')}
        </Headline>
        <Subheading theme={secondaryTheme} style={{marginTop: 20}}>
          {t('title_forgot_password_subHeading')}
        </Subheading>
      </View>
      <View style={styles.inputMainContainer}>
        <View style={styles.inputsContainer}>
          <CustomInput
            name="email"
            label={t('label_email')}
            ref={emailRef}
            onFocus={() => bottomSheetRef?.current?.snapTo(0)}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder={t('msgBlankEmail')}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            error={errors.email}
          />
        </View>
        <LoginButton label="Next" onPress={handleSubmit} />
        <LoginButton label="Back" onPress={navigation.goBack} />
      </View>
    </View>
  );
}

function ForgotPassword(props) {
  const {navigation} = props;
  const [loginError, setLoginError] = useState(null);

  const {sendForgetPasswordOtp} = useUserActions();

  const bottomSheetRef = React.createRef();
  const snackbar = useSnackbar();

  const {loading} = useSelector(s => s.user);

  useEffect(() => {
    if (loginError) {
      snackbar.showMessage({
        message: loginError,
        variant: 'error',
        autoHideDuration: 4000,
      });
    }
  }, [loginError]);

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={async values => {
          sendForgetPasswordOtp(values)
            .then(({value}) =>
              navigation.navigate('ForgotPasswordOtp', {
                user_id: value.data.id,
              }),
            )
            .catch(err => {
              if (err) {
                setLoginError("User with this email doesn't exist");
              }
            });
        }}>
        {formikProps => (
          <AuthLayout
            bottomSheetRef={bottomSheetRef}
            renderContent={() => {
              return (
                <RenderContent
                  {...formikProps}
                  navigation={navigation}
                  bottomSheetRef={bottomSheetRef}
                />
              );
            }}
          />
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: theme.colors.primary,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMainContainer: {
    width: '100%',
    height: '80%',
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  inputsContainer: {
    width: '100%',
  },
  loginButton: {
    marginTop: 25,
    width: '100%',

    alignItems: 'center',
  },
});

export default withTheme(ForgotPassword);
