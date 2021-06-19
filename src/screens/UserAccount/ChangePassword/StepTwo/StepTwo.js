import OtpInput from 'components/Atoms/OtpInput';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, Caption, Subheading, withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  otp: Yup.number().min(100000).required('Please enter a valid otp'),
});

function StepTwo(props) {
  const {theme, navigation} = props;

  const {t} = useTranslation();

  const {user} = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          validationSchema={schema}
          onSubmit={async (values, {resetForm}) => {
            resetForm();
            navigation.navigate('ChangePasswordStepThree');
          }}>
          {({values, errors, handleChange, setFieldValue, handleSubmit}) => (
            <View style={styles.contentContainer}>
              <Subheading>Reset Password</Subheading>
              <Caption>Enter OTP you received on {user.email}</Caption>

              <View style={styles.otpContainer}>
                <OtpInput
                  value={values.otp}
                  setValue={v => setFieldValue('otp', v)}
                />
              </View>
              {errors.otp ? <RenderError error={errors.otp} /> : null}

              <View style={styles.actionContainer}>
                <Button
                  style={{width: '50%'}}
                  mode="contained"
                  contentStyle={{padding: 1}}
                  theme={{roundness: 12}}
                  onPress={handleSubmit}>
                  Next
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
  otpContainer: {
    marginVertical: 20,
  },
  actionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default withTheme(StepTwo);
