import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, Text, Button} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Yup from 'yup';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import {useSalesLoading} from 'redux/selectors';

const schema = Yup.object().shape({
  first_name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  last_name: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  phone: Yup.string()
    .label('phone')
    .required('required')
    .min(10, 'to short')
    .max(10, 'to long'),
  email: Yup.string()
    .email('Please enter a valid email')
    .label('email')
    .required('invalid email'),
});

function AddBroker(props) {
  const {theme, navigation, route} = props;
  const {broker} = route?.params || {};
  const {first_name, last_name, id, email, phone} = broker || {};

  const edit = Boolean(broker?.id);

  const loading = useSalesLoading();

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const {addBroker, getBrokersList, updateBroker} = useSalesActions();

  const initialValues = useMemo(() => {
    return {first_name, last_name, email, phone};
  }, [email, first_name, last_name, phone]);

  const onSubmit = async values => {
    if (edit) {
      await updateBroker({
        project_id: projectId,
        broker_id: id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
      });
    } else {
      await addBroker({
        project_id: projectId,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
      });
    }

    await getBrokersList({project_id: projectId});
    navigation.navigate('BrokerList');
  };

  return (
    <View style={{padding: 15}}>
      <Spinner visible={loading} textContent="" />
      <Text style={{color: theme.colors.primary}}>AddBroker</Text>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, errors, handleChange, handleBlur, handleSubmit}) => {
          return (
            <View style={styles.dialogContentContainer}>
              <RenderInput
                name="first_name"
                label="First Name"
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                placeholder="First Name"
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.first_name}
                style={styles.input}
              />
              <RenderInput
                name="last_name"
                label="Last Name"
                value={values.last_name}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                placeholder="Last Name"
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.last_name}
                style={styles.input}
              />
              <RenderInput
                name="email"
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.email}
                style={styles.input}
              />
              <RenderInput
                name="phone"
                label="phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                placeholder="Phone"
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.phone}
                style={styles.input}
              />
              <View style={styles.dialogActionContainer}>
                <Button
                  style={styles.Button}
                  mode="text"
                  onPress={navigation.goBack}>
                  Cancel
                </Button>
                <Button
                  style={styles.Button}
                  mode="contained"
                  onPress={handleSubmit}>
                  Save
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

export default withTheme(AddBroker);

const styles = StyleSheet.create({
  dialogActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  Button: {
    margin: 10,
    borderRadius: 15,
  },
  input: {
    marginTop: 10,
  },
});
