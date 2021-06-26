import OtpInput from 'components/Atoms/OtpInput';
import {RenderError} from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button, Caption, Subheading, withTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import useUserActions from 'redux/actions/userActions';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  otp: Yup.number().min(100000).required('Please enter a valid otp'),
});

function StepTwo(props) {
  const {navigation} = props;

  const {sendForgetPasswordOtp, verifyForgotPasswordOtp} = useUserActions();

  const {user, loading} = useSelector(state => state.user);

  useEffect(() => {
    sendForgetPasswordOtp({email: user.email});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values, {resetForm}) => {
    verifyForgotPasswordOtp({...values, user_id: user.id})
      .then(() => {
        resetForm();
        navigation.navigate('ChangePasswordStepThree');
      })
      .catch(() => resetForm());
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <SafeAreaView>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          validationSchema={schema}
          onSubmit={onSubmit}>
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
