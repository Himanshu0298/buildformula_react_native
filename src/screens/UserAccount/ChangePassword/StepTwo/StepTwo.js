import ActionButtons from 'components/Atoms/ActionButtons';
import OtpInput from 'components/Atoms/OtpInput';
import {RenderError} from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Caption, Subheading, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useUserActions from 'redux/actions/userActions';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  otp: Yup.number().min(100000).required('Please enter a valid otp'),
});

function StepTwo(props) {
  const {navigation} = props;

  const {sendForgetPasswordOtp, verifyForgotPasswordOtp} = useUserActions();

  const {user, loading} = useSelector(s => s.user);

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

            <ActionButtons
              cancelLabel="Back"
              submitLabel="Next"
              onCancel={navigation.goBack}
              onSubmit={handleSubmit}
            />
          </View>
        )}
      </Formik>
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
});

export default withTheme(StepTwo);
