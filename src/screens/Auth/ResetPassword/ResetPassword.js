import React, {useState} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {withTheme, Headline, Button, TextInput} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import {Formik} from 'formik';
import useUserActions from 'redux/actions/userActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import CustomInput from '../Components/CustomInput';
import AuthLayout from '../Components/AuthLayout';

const schema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required('Please enter a valid password')
    .min(6, 'Password must have at least 6 characters '),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
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
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPass, toggleShowCnfPass] = useState(null);

  const cnfPassRef = React.useRef();
  const passwordRef = React.useRef();

  const {t} = useTranslation();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headlineContainer}>
        <Headline theme={secondaryTheme} style={{fontWeight: 'bold'}}>
          Reset Password
        </Headline>
      </View>
      <View style={styles.inputMainContainer}>
        <View style={styles.inputsContainer}>
          <CustomInput
            name="password"
            label={t('passwordLabel')}
            ref={passwordRef}
            containerStyles={{marginTop: 10}}
            secureTextEntry={!showPassword}
            onFocus={() => bottomSheetRef?.current?.snapTo(0)}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder={t('msgBlankPassword')}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            error={errors.password}
            right={
              <TextInput.Icon
                theme={secondaryTheme}
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(show => !show)}
              />
            }
          />
          <CustomInput
            name="confirmPassword"
            label={t('cnfPasswordLabel')}
            containerStyles={{marginTop: 10}}
            ref={cnfPassRef}
            value={values.confirmPassword}
            onFocus={() => bottomSheetRef?.current?.snapTo(0)}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            placeholder={t('msgBlankCnfPassword')}
            autoCapitalize="none"
            returnKeyType="done"
            error={errors.confirmPassword}
            secureTextEntry={!showCnfPass}
            right={
              <TextInput.Icon
                theme={secondaryTheme}
                name={showCnfPass ? 'eye-off' : 'eye'}
                onPress={() => toggleShowCnfPass(v => !v)}
              />
            }
          />
        </View>
        <LoginButton label="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

function ResetPassword(props) {
  const {navigation, route} = props;
  const {user_id} = route?.params || {};

  const {resetPassword} = useUserActions();

  const bottomSheetRef = React.createRef();

  const {loading} = useSelector(s => s.user);

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={async values => {
          Keyboard.dismiss();
          resetPassword({new_password: values.password, user_id}).then(() => {
            navigation.popToTop();
          });
        }}>
        {formikProps => (
          <AuthLayout
            bottomSheetRef={bottomSheetRef}
            renderContent={() => {
              return (
                <RenderContent
                  navigation={navigation}
                  bottomSheetRef={bottomSheetRef}
                  {...formikProps}
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
    height: '90%',
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

export default withTheme(ResetPassword);
