import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {Formik} from 'formik';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Button,
  Caption,
  Chip,
  Subheading,
  TextInput,
  Title,
  withTheme,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import useRoleActions from 'redux/actions/roleActions';
import * as Yup from 'yup';

const addSchema = Yup.object().shape({
  emails: Yup.array()
    .of(Yup.string('Invalid Email').email('Invalid Email'))
    .ensure('Email is required')
    .min(1, 'Email is required'),
  selectedRoles: Yup.array()
    .ensure('Role is required')
    .min(1, 'Role is required'),
});
const editSchema = Yup.object().shape({
  selectedRoles: Yup.array()
    .ensure('Role is required')
    .min(1, 'Role is required'),
});

function RenderForm(props) {
  const {theme, navigation, user, formikProps} = props;
  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formikProps;

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const {roles, loading} = useSelector(s => s.role);

  const roleOptions = useMemo(() => {
    return roles.map(i => ({label: i.role_name, value: i.id}));
  }, [roles]);

  const handleDelete = () => {};

  const addEmail = () => {
    const {emails = [], email} = values;
    if (email && !emails.includes(email)) {
      emails.push(email);
      setFieldValue('emails', emails);
      setFieldValue('email', '');
    }
  };

  const removeEmail = index => {
    const {emails = []} = values;
    emails.splice(index, 1);
    setFieldValue('emails', emails);
  };

  const addRole = () => {
    setFieldValue('selectedRoles', [...values.selectedRoles, '']);
  };

  const updateRole = (index, role) => {
    const _selectedRoles = cloneDeep(values.selectedRoles);

    if (!_selectedRoles.includes(role)) {
      _selectedRoles[index] = role;
      setFieldValue('selectedRoles', _selectedRoles);
    } else {
      snackbar.showMessage({
        message: 'Role already assigned to the user',
        variant: 'warning',
      });
    }
  };

  const deleteRole = index => {
    const _selectedRoles = cloneDeep(values.selectedRoles);
    _selectedRoles.splice(index, 1);
    setFieldValue('selectedRoles', _selectedRoles);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.titleContainer}>
        <Subheading>{user ? 'Edit Member' : 'Add new Member'}</Subheading>
        {user ? (
          <OpacityButton
            opacity={0.1}
            color={theme.colors.red}
            style={{borderRadius: 50}}
            onPress={handleDelete}>
            <MaterialIcon name="delete" color={theme.colors.red} size={18} />
          </OpacityButton>
        ) : null}
      </View>

      {user ? (
        <View style={styles.userCardContainer}>
          <View style={styles.rowBetween}>
            <Text>
              {user.first_name} {user.last_name}
            </Text>
          </View>
          <View style={styles.rowBetween}>
            <Caption>+91 {user.phone}</Caption>
            <Caption>{user.email}</Caption>
          </View>
        </View>
      ) : (
        <>
          <RenderInput
            name="email"
            label={t('label_email')}
            containerStyles={styles.input}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.emails}
            right={<TextInput.Icon size={20} name="check" onPress={addEmail} />}
          />
          {values?.emails?.length ? (
            <View style={styles.emailsContainer}>
              {values?.emails?.map((email, index) => (
                <View style={{margin: 5}}>
                  <Chip mode="outlined" onClose={() => removeEmail(index)}>
                    {email}
                  </Chip>
                </View>
              ))}
            </View>
          ) : null}
        </>
      )}

      <View style={styles.rolesContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}>
          {values.selectedRoles.map((role, index) => {
            return (
              <View style={styles.roleContainer} key={index}>
                <RenderSelect
                  name="role"
                  disabled={role === 'Admin'}
                  label="Role"
                  options={roleOptions}
                  value={role}
                  onSelect={value => updateRole(index, value)}
                />
                {role !== 'Admin' ? (
                  <View style={styles.deleteContainer}>
                    <TouchableOpacity onPress={() => deleteRole(index)}>
                      <Caption style={{color: theme.colors.red}}>
                        Delete
                      </Caption>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          })}

          <View style={styles.addButtonContainer}>
            <Button
              style={styles.addButton}
              mode="outlined"
              onPress={addRole}
              uppercase={false}>
              + Add another role
            </Button>
          </View>
          {errors.selectedRoles ? (
            <RenderError style={{marginTop: 10}} error={errors.selectedRoles} />
          ) : null}
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
  );
}

function AddUser(props) {
  const {navigation, route} = props;
  const {user} = route?.params || {};

  const edit = Boolean(user?.id);

  const {addUsers, editUser, getMembers} = useRoleActions();

  const {selectedProject} = useSelector(s => s.project);

  const onSubmit = async values => {
    const project_id = selectedProject.id;
    const {emails, selectedRoles} = values;

    if (edit) {
      await editUser({
        project_id,
        role_user_user_id: user?.id,
        roles: selectedRoles,
      });
    } else {
      await addUsers({project_id, emails, roles: selectedRoles});
    }
    getMembers({project_id});
    navigation.goBack();
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{selectedRoles: user?.roles || [], emails: []}}
      validationSchema={edit ? editSchema : addSchema}
      onSubmit={onSubmit}>
      {formikProps => <RenderForm {...props} {...{formikProps, user}} />}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
    marginVertical: 5,
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

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emailsContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default withTheme(AddUser);
