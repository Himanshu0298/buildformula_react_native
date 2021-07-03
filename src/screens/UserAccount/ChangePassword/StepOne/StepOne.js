import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, Caption, Subheading, withTheme} from 'react-native-paper';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string('Invalid').email('Invalid').required('Email is required'),
});

function StepOne(props) {
  const {theme, navigation} = props;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={async values => {
          navigation.navigate('ChangePasswordStepTwo');
        }}>
        {({values, errors, handleChange, handleSubmit}) => (
          <View style={styles.contentContainer}>
            <Subheading>Reset Password</Subheading>
            <Caption>Enter your registered email address</Caption>

            <RenderInput
              name="email"
              label={t('label_email')}
              containerStyles={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              onSubmitEditing={handleSubmit}
              error={errors.email}
            />

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
  input: {
    marginTop: 20,
  },
  actionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default withTheme(StepOne);
