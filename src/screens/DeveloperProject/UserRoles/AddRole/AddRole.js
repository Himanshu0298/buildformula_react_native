import ActionButtons from 'components/Atoms/ActionButtons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Switch,
  Subheading,
  Title,
  withTheme,
  IconButton,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

const PERMISSIONS = [
  {value: 'view', icon: 'eye'},
  {value: 'editor', icon: 'pencil'},
  {value: 'approval', icon: 'check-all'},
  {value: 'admin', icon: 'shield-account'},
];
const SALES_PERMISSIONS = [
  {value: 'view', icon: 'eye'},
  {value: 'editor', icon: 'pencil'},
  {value: 'admin', icon: 'shield-account'},
];

const schema = Yup.object().shape({
  name: Yup.string('Invalid').required('Name is required'),
});

function RenderPermission(props) {
  const {icon, value, checked, onChange, theme} = props;
  return (
    <View style={styles.permissionContainer}>
      <CustomCheckbox
        color={theme.colors.primary}
        checked={checked}
        onChange={() => onChange(value)}
        label={<IconButton size={18} icon={icon} />}
      />
    </View>
  );
}

function AddRole(props) {
  const {theme, navigation, route} = props;
  const {role} = route?.params || {};

  const {t} = useTranslation();

  const {commonData} = useSelector(s => s.project);
  const {modules: allModules, submodules} = commonData;

  const modulesList = React.useMemo(() => {
    return allModules.map(i => {
      const subModules = submodules
        .filter(item => item.modules_id === i.id)
        .map(item => ({...item, status: 0}));
      return {...i, subModules};
    });
  }, [allModules, submodules]);

  const [modules, setModules] = React.useState(cloneDeep(modulesList));

  const handleDelete = () => {
    console.log('----->delete function called');
  };

  const updateScreen = (moduleIndex, screenIndex, key, value) => {
    const updatedScreenData = cloneDeep(modules);
    updatedScreenData[moduleIndex].subModules[screenIndex][key] = value;

    setModules(updatedScreenData);
  };

  // const handleSubmit = () => {};

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={values => {
        console.log('----->values in on submit', values);
      }}
    >
      {({values, errors, handleChange, handleBlur, handleSubmit}) => (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title>{role ? 'Edit Role' : 'Add new Role'}</Title>
            {role ? (
              <OpacityButton
                opacity={0.1}
                color={theme.colors.red}
                style={{borderRadius: 50}}
                onPress={handleDelete}
              >
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
              contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
            >
              {modules.map((module, index) => {
                const {title, subModules} = module;

                const AllPermissions =
                  title === 'Sales' ? SALES_PERMISSIONS : PERMISSIONS;
                return (
                  <View key={index} style={styles.moduleContainer}>
                    <Subheading style={{color: theme.colors.primary}}>
                      {title} module screen
                    </Subheading>

                    {subModules.map((screen, screenIndex) => {
                      const {
                        title: subModuleTitle,
                        status,
                        permission,
                      } = screen;

                      const onChangeStatus = () => {
                        updateScreen(index, screenIndex, 'status', !status);
                      };

                      const onChangePermission = value => {
                        updateScreen(
                          index,
                          screenIndex,
                          'permission',
                          value === permission ? undefined : value,
                        );
                      };

                      return (
                        <View style={styles.screenContainer}>
                          <TouchableOpacity
                            name="title"
                            onChangeText={handleChange('title')}
                            style={styles.rowBetween}
                            onPress={onChangeStatus}
                          >
                            <Text>{subModuleTitle}</Text>
                            <Switch
                              value={Boolean(status)}
                              color={theme.colors.primary}
                              style={{
                                transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                              }}
                              onValueChange={onChangeStatus}
                            />
                          </TouchableOpacity>
                          {status ? (
                            <View style={styles.permissionsContainer}>
                              {AllPermissions.map(({value, icon}) => {
                                return (
                                  <RenderPermission
                                    {...props}
                                    icon={icon}
                                    value={value}
                                    checked={permission === value}
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

          <ActionButtons
            style={styles.actionContainer}
            cancelLabel="Cancel"
            submitLabel={role ? 'Update' : 'Save'}
            onCancel={navigation.goBack}
            onSubmit={handleSubmit}
          />
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
    marginTop: 15,
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
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    marginBottom: 40,
  },
});

export default withTheme(AddRole);
