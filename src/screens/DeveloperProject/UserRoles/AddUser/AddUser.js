import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import {Formik} from 'formik';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Caption, Title, withTheme} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';

const ROLES = [{}, {}, {}];

const schema = Yup.object().shape({
  email: Yup.string('Invalid').email('Invalid').required('Email is required'),
});

function AddUser(props) {
  const {theme, navigation, route} = props;
  const {user} = route?.params || {};

  const {t} = useTranslation();

  const handleDelete = () => {};

  const updateRole = (index, role) => {};

  const handleSubmit = () => {};

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={async values => {}}>
      {({values, errors, handleChange, handleBlur}) => (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title>{user ? 'Edit User' : 'Add new User'}</Title>
            {user ? (
              <OpacityButton
                opacity={0.1}
                color={theme.colors.red}
                style={{borderRadius: 50}}
                onPress={handleDelete}>
                <MaterialIcon
                  name="delete"
                  color={theme.colors.red}
                  size={18}
                />
              </OpacityButton>
            ) : null}
          </View>

          {user ? (
            <View style={styles.userCardContainer}>
              <View style={styles.rowBetween}>
                <Text>Unnat Thamma</Text>
              </View>
              <View style={styles.rowBetween}>
                <Caption>+91 6546 980008</Caption>
                <Caption>unaattamma@xyz.com</Caption>
              </View>
            </View>
          ) : (
            <RenderInput
              name="email"
              label={t('label_email')}
              containerStyles={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
            />
          )}

          <View style={styles.rolesContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}>
              {ROLES.map((role, index) => {
                return (
                  <View style={styles.roleContainer}>
                    <RenderSelect
                      name="role"
                      label={'Role'}
                      options={[]}
                      value={role}
                      onSelect={value => updateRole(index, value)}
                    />
                    <View style={styles.deleteContainer}>
                      <TouchableOpacity>
                        <Caption style={{color: theme.colors.red}}>
                          Delete
                        </Caption>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}

              <View style={styles.addButtonContainer}>
                <Button
                  style={styles.addButton}
                  mode="outlined"
                  uppercase={false}>
                  + Add another role
                </Button>
              </View>
            </ScrollView>
          </View>

          <View style={styles.actionContainer}>
            <Button
              style={{width: '40%'}}
              contentStyle={{padding: 1}}
              theme={{roundness: 12}}
              onPress={navigation.goBack}>
              Cancel
            </Button>
            <Button
              style={{width: '40%'}}
              mode="contained"
              contentStyle={{padding: 1}}
              theme={{roundness: 12}}
              onPress={handleSubmit}>
              {user ? 'Update' : 'Save'}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userCardContainer: {
    backgroundColor: '#F2F4F5',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  input: {
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rolesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  roleContainer: {
    marginVertical: 10,
  },
  deleteContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButton: {
    width: '75%',
  },
  actionContainer: {
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default withTheme(AddUser);
