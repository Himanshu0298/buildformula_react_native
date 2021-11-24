import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  withTheme,
  Caption,
  FAB,
  Title,
  Subheading,
  Text,
  Button,
} from 'react-native-paper';
import {getPermissions} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NoDataFound from 'assets/images/NoDataFound.png';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
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
  const {first_name, last_name, id, email, phone} = broker;

  const edit = Boolean(broker?.id);

  console.log('----->broker in add broker', broker);

  const {loading} = useSelector(s => s.sales);

  const {selectedProject} = useSelector(s => s.project);

  const projectId = selectedProject.id;

  const {addBroker, getBrokersList, updateBroker} = useSalesActions();

  const initialValues = useMemo(() => {
    if (edit) {
      return {
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: phone,
      };
    }
    return {firstName: '', lastName: '', email: '', phone: ''};
  }, []);

  const onSubmit = async values => {
    if (edit) {
      await updateBroker({
        project_id: projectId,
        broker_id: id,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
      });
    } else {
      await addBroker({
        project_id: projectId,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
      });
    }

    await getBrokersList({project_id: projectId});
    navigation.goBack();
  };

  return (
    <View style={{padding: 15}}>
      <Spinner visible={loading} textContent={''} />
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
                name="firstName"
                label={'First Name'}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                placeholder={'First Name'}
                autoCapitalize="none"
                returnKeyType={'next'}
                error={errors.firstName}
              />
              <RenderInput
                name="lastName"
                label={'Last Name'}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                placeholder={'Last Name'}
                autoCapitalize="none"
                returnKeyType={'next'}
                error={errors.lastName}
              />
              <RenderInput
                name="email"
                label={'Email'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder={'Email'}
                autoCapitalize="none"
                returnKeyType={'next'}
                error={errors.email}
              />
              <RenderInput
                name="phone"
                label={'phone'}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                placeholder={'Phone'}
                autoCapitalize="none"
                returnKeyType={'next'}
                error={errors.phone}
              />
              <View style={styles.dialogActionContainer}>
                <Button
                  style={styles.Button}
                  mode="text"
                  onPress={() => console.log('Pressed')}>
                  Cancel
                </Button>
                <Button
                  style={styles.Button}
                  mode="contained"
                  onPress={handleSubmit}>
                  Save
                </Button>
                {/* <OpacityButton
                  color={'#4872F4'}
                  opacity={0.18}
                  style={styles.Button}
                  onPress={() => console.log('----->Edit button pressed')}>
                  <MaterialIcons
                    style={{marginRight: 10}}
                    name="edit"
                    color={theme.colors.primary}
                    size={20}
                  />
                  <Text style={{color: theme.colors.primary}}>Edit</Text>
                </OpacityButton>
                <OpacityButton
                  color={theme.colors.error}
                  opacity={0.18}
                  style={styles.Button}
                  onPress={() => console.log('----->Edit button pressed')}>
                  <MaterialIcons
                    name="delete"
                    color={theme.colors.error}
                    style={{marginRight: 10}}
                    size={20}
                  />
                  <Text style={{color: theme.colors.primary}}>Delete</Text>
                </OpacityButton> */}
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
});
