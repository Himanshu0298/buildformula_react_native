import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  Switch,
  Subheading,
  Title,
  withTheme,
  IconButton,
  Button,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';

const SCREENS = [
  {
    title: 'Sales',
    screens: [
      {label: 'Sales module screen 1', status: 0, permission: 0},
      {label: 'Sales module screen 2', status: 0, permission: 0},
      {label: 'Sales module screen 3', status: 0, permission: 0},
      {label: 'Sales module screen 4', status: 0, permission: 0},
      {label: 'Sales module screen 5', status: 0, permission: 0},
      {label: 'Sales module screen 6', status: 0, permission: 0},
      {label: 'Sales module screen 7', status: 0, permission: 0},
      {label: 'Sales module screen 8', status: 0, permission: 0},
      {label: 'Sales module screen 9', status: 0, permission: 0},
      {label: 'Sales module screen 10', status: 0, permission: 0},
    ],
  },
];

const PERMISSIONS = [
  {value: 0, icon: 'cancel'},
  {value: 1, icon: 'eye'},
  {value: 2, icon: 'pencil'},
  {value: 3, icon: 'check-all'},
  {value: 4, icon: 'shield-account'},
];

const schema = Yup.object().shape({
  email: Yup.string('Invalid').required('Name is required'),
});

function RenderPermission(props) {
  const {icon, value, checked, onChange, theme} = props;
  return (
    <View style={styles.permissionContainer}>
      <CustomCheckbox
        color={theme.colors.primary}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <IconButton size={18} icon={icon} />
    </View>
  );
}

function AddRole(props) {
  const {theme, navigation, route} = props;
  const {role} = route?.params || {};

  const {t} = useTranslation();

  const [modules, setModules] = React.useState(cloneDeep(SCREENS));

  const handleDelete = () => {};

  const updateScreen = (moduleIndex, screenIndex, key, value) => {
    const updatedScreenData = cloneDeep(modules);
    updatedScreenData[moduleIndex].screens[screenIndex][key] = value;

    setModules(updatedScreenData);
  };

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
            <Title>{role ? 'Edit Role' : 'Add new Role'}</Title>
            {role ? (
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

          <RenderInput
            name="name"
            label={t('label_name')}
            containerStyles={styles.input}
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name}
          />

          <View style={styles.screensContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}>
              {modules.map((module, index) => {
                const {title, screens} = module;
                return (
                  <View style={styles.moduleContainer}>
                    <Subheading style={{color: theme.colors.primary}}>
                      {title} module screen
                    </Subheading>

                    {screens.map((screen, screenIndex) => {
                      const {label, status, permission} = screen;

                      const onChangeStatus = () => {
                        updateScreen(index, screenIndex, 'status', !status);
                      };

                      const onChangePermission = value => {
                        updateScreen(index, screenIndex, 'permission', value);
                      };

                      return (
                        <View style={styles.screenContainer}>
                          <View style={styles.rowBetween}>
                            <Text>{label}</Text>
                            <Switch
                              value={status}
                              color={theme.colors.primary}
                              style={{
                                transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                              }}
                              onValueChange={onChangeStatus}
                            />
                          </View>
                          {status ? (
                            <View style={styles.permissionsContainer}>
                              {PERMISSIONS.map(({value, icon}) => {
                                return (
                                  <RenderPermission
                                    {...props}
                                    icon={icon}
                                    value={value}
                                    checked={permission >= value}
                                    onChange={onChangePermission}
                                  />
                                );
                              })}
                            </View>
                          ) : null}
                        </View>
                      );
                    })}
                  </View>
                );
              })}
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
              {role ? 'Update' : 'Save'}
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
    paddingHorizontal: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    marginVertical: 10,
  },
  screensContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  moduleContainer: {
    marginTop: 5,
  },
  screenContainer: {marginVertical: 5},
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  permissionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  permissionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default withTheme(AddRole);
