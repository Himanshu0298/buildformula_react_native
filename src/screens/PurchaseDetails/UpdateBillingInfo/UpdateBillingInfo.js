import * as React from 'react';
import {Button, Title} from 'react-native-paper';
import {Text, View, StyleSheet} from 'react-native';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  address: Yup.string().required('Required'),
  pinCode: Yup.number()
    .typeError('you must specify a number')
    .min(6, 'Min value 6.')
    .max(6, 'Min value 6.'),
  state: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  gst: Yup.string().required('Required'),
});

function UpdateBillingInfo(props) {
  const {theme, route, navigation} = props;

  const {id} = route?.params || {};

  const onSubmit = values => {
    console.log('----->for submitted');
  };

  return (
    <View>
      <Title style={styles.title}>Update Billing Info</Title>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, errors, handleChange, handleBlur, handleSubmit}) => {
          return (
            <View style={styles.dialogContentContainer}>
              <RenderInput
                name="name"
                label={'Name'}
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.name}
              />

              <RenderInput
                name="address"
                label={'Address'}
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.address}
              />

              <RenderInput
                name="state"
                label={'State'}
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.state}
              />

              <RenderInput
                name="city"
                label={'City'}
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.city}
              />

              <RenderInput
                name="pinCode"
                label={'Pin Code'}
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.pinCode}
                keyboardType="number-pad"
                onChangeText={handleChange('pinCode')}
                onBlur={handleBlur('pinCode')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.pinCode}
              />

              <RenderInput
                name="gst"
                label={'GST'}
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.gst}
                onChangeText={handleChange('gst')}
                onBlur={handleBlur('gst')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.gst}
              />

              <View style={styles.dialogActionContainer}>
                <Button
                  style={{width: '40%'}}
                  mode="contained"
                  contentStyle={{padding: 1}}
                  theme={{roundness: 15}}
                  onPress={handleSubmit}>
                  {'Update'}
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dialogContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputStyles: {
    marginVertical: 4,
  },
  dialogActionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpdateBillingInfo;
