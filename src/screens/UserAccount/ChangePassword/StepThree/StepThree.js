import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  Subheading,
  TextInput,
  withTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';

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

function StepThree(props) {
  const {theme, navigation} = props;

  const {t} = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPass, toggleShowCnfPass] = useState(false);

  const cnfPassRef = React.useRef();
  const passwordRef = React.useRef();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          validationSchema={schema}
          onSubmit={async values => {
            navigation.pop(2);
          }}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => (
            <View style={styles.contentContainer}>
              <Subheading>Reset Password</Subheading>
              <Caption>Set new password</Caption>

              <View style={styles.inputsContainer}>
                <RenderInput
                  name="password"
                  label={t('passwordLabel')}
                  ref={passwordRef}
                  containerStyles={{marginTop: 10}}
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={t('msgBlankPassword')}
                  autoCapitalize="none"
                  returnKeyType={'done'}
                  onSubmitEditing={handleSubmit}
                  error={errors.password}
                  right={
                    <TextInput.Icon
                      name={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(show => !show)}
                    />
                  }
                />
                <RenderInput
                  name="confirmPassword"
                  label={t('cnfPasswordLabel')}
                  containerStyles={{marginTop: 10}}
                  ref={cnfPassRef}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={t('msgBlankCnfPassword')}
                  autoCapitalize="none"
                  returnKeyType={'done'}
                  error={errors.confirmPassword}
                  secureTextEntry={!showCnfPass}
                  right={
                    <TextInput.Icon
                      name={showCnfPass ? 'eye-off' : 'eye'}
                      onPress={() => toggleShowCnfPass(v => !v)}
                    />
                  }
                />
              </View>

              <View style={styles.actionContainer}>
                <Button
                  style={{width: '50%'}}
                  mode="contained"
                  contentStyle={{padding: 1}}
                  theme={{roundness: 12}}
                  onPress={handleSubmit}>
                  Submit
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  inputsContainer: {
    marginVertical: 10,
  },
  actionContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default withTheme(StepThree);
