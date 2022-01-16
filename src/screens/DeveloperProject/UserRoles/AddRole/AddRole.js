import ActionButtons from 'components/Atoms/ActionButtons';
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
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Switch,
  Subheading,
  Title,
  withTheme,
  IconButton,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useRoleActions from 'redux/actions/roleActions';
import * as Yup from 'yup';

const PERMISSIONS = [
  {value: 'view', icon: 'eye'},
  {value: 'editor', icon: 'pencil'},
  {value: 'approval', icon: 'check-all'},
  {value: 'admin', icon: 'shield-account'},
];

const schema = Yup.object().shape({
  name: Yup.string('Invalid').required('Name is required'),
});

function formatSubModules(modules) {
  const data = [];

  modules.map(({subModules}) => {
    subModules.map(subModule => {
      if (subModule.permission) {
        data.push({[subModule.id]: subModule.permission});
      }
      return subModule;
    });
    return subModules;
  });

  return data;
}

function formatInner(modules) {
  const data = [];

  modules.map(({subModules}) => {
    subModules.map(subModule => {
      if (subModule.children?.length) {
        subModule.children.map(inner => {
          if (inner.permission) {
            const index = data.findIndex(i => Boolean(i[subModule.id]));
            if (index === -1) {
              data.push({
                [subModule.id]: {
                  [inner.id]: inner.permission,
                },
              });
            } else {
              data[index][subModule.id][inner.id] = inner.permission;
            }
          }
          return inner;
        });
      }
      return subModule;
    });
    return subModules;
  });

  return data;
}

function RenderPermission(props) {
  const {icon, value, checked, onChange, theme} = props;
  return (
    <View style={styles.row}>
      <CustomCheckbox
        color={theme.colors.primary}
        checked={checked}
        onChange={() => onChange(value)}
        label={<IconButton size={18} icon={icon} />}
      />
    </View>
  );
}

function RenderSubModule(props) {
  const {theme, screen, onChangePermission} = props;
  const {title: subModuleTitle, permission} = screen;

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        style={styles.rowBetween}
        onPress={() => onChangePermission('view')}
      >
        <Text>{subModuleTitle}</Text>
        <Switch
          value={Boolean(permission)}
          color={theme.colors.primary}
          style={{
            transform: [{scaleX: 0.6}, {scaleY: 0.6}],
          }}
          onValueChange={() => onChangePermission('view')}
        />
      </TouchableOpacity>
      {permission ? (
        <View style={styles.rowBetween}>
          {PERMISSIONS.map(({value, icon}) => {
            return (
              <RenderPermission
                key={value}
                {...props}
                {...{
                  icon,
                  value,
                  checked: permission === value,
                  onChange: onChangePermission,
                }}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

function RenderChildren(props) {
  const {theme, item, onChangeChildrenPermission} = props;
  const {id, title: innerTitle, permission} = item;

  return (
    <View key={id} style={[styles.screenContainer, styles.innerContainer]}>
      <TouchableOpacity
        style={styles.rowBetween}
        onPress={() => onChangeChildrenPermission('view')}
      >
        <View style={styles.row}>
          <View
            style={[styles.badge, {backgroundColor: theme.colors.primary}]}
          />
          <Text>{innerTitle}</Text>
        </View>
        <Switch
          value={Boolean(permission)}
          color={theme.colors.primary}
          style={{
            transform: [{scaleX: 0.6}, {scaleY: 0.6}],
          }}
          onValueChange={() => onChangeChildrenPermission('view')}
        />
      </TouchableOpacity>
      {permission ? (
        <View style={styles.rowBetween}>
          {PERMISSIONS.map(({value, icon}) => {
            return (
              <RenderPermission
                key={value}
                {...props}
                {...{
                  icon,
                  value,
                  checked: permission === value,
                  onChange: onChangeChildrenPermission,
                }}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

function RenderForm(props) {
  const {theme, navigation, route, formikProps} = props;
  const {role} = route?.params || {};

  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = formikProps;

  const {t} = useTranslation();

  const updateScreen = (moduleIndex, screenIndex, key, value) => {
    const updatedScreenData = cloneDeep(values.modules);
    updatedScreenData[moduleIndex].subModules[screenIndex][key] = value;

    setFieldValue('modules', updatedScreenData);
  };

  const updateInner = (moduleIndex, screenIndex, innerIndex, key, value) => {
    const updatedScreenData = cloneDeep(values.modules);
    updatedScreenData[moduleIndex].subModules[screenIndex].children[innerIndex][
      key
    ] = value;

    setFieldValue('modules', updatedScreenData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <Title>{role ? 'Edit Role' : 'Add new Role'}</Title>
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
          {values.modules.map((module, index) => {
            const {title, subModules} = module;

            return (
              <View key={index?.toString()} style={styles.moduleContainer}>
                <Subheading style={{color: theme.colors.primary}}>
                  {title} module screen
                </Subheading>

                {subModules.map((screen, screenIndex) => {
                  const {permission, children} = screen;

                  const onChangePermission = value => {
                    updateScreen(
                      index,
                      screenIndex,
                      'permission',
                      value === permission ? undefined : value,
                    );
                  };

                  return (
                    <>
                      <RenderSubModule
                        key={screen.id}
                        {...props}
                        {...{screen, onChangePermission}}
                      />
                      {children.map((item, innerIndex) => {
                        const {permission: innerPermission} = item;
                        const onChangeChildrenPermission = value => {
                          updateInner(
                            index,
                            screenIndex,
                            innerIndex,
                            'permission',
                            value === innerPermission ? undefined : value,
                          );
                        };

                        return (
                          <RenderChildren
                            key={item.id}
                            {...props}
                            {...{item, onChangeChildrenPermission}}
                          />
                        );
                      })}
                    </>
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
  );
}

function AddRole(props) {
  const {navigation, route} = props;

  const {roleId} = route.params;

  const {addRole, getRoles, getRoleDetails} = useRoleActions();

  const {commonData, selectedProject} = useSelector(s => s.project);
  const {roleDetails, loading} = useSelector(s => s.role);

  const {modules: allModules, submodules, submodules_inner} = commonData;

  React.useEffect(() => {
    getRoleDetails({project_id: selectedProject.id, role_id: roleId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getModulePermission = subModule => {
    if (roleDetails && roleId) {
      const subModuleData = roleDetails[subModule.modules_id].find(
        i => i.sub_module_id === subModule.id,
      );

      if (subModuleData?.permissions?.id) {
        return Object.keys(subModuleData?.permissions)[
          Object.values(subModuleData?.permissions).indexOf('yes')
        ];
      }
    }

    return undefined;
  };

  const getInnerPermission = (inner, moduleId) => {
    if (roleDetails && roleId) {
      const subModuleData = roleDetails[moduleId].find(
        i => i.sub_module_id === inner.submodules_id,
      );

      const innerModuleData = subModuleData?.inner_sub_module_data?.find(
        i => i.id === inner.id,
      );

      if (innerModuleData?.permissions?.id) {
        return Object.keys(innerModuleData?.permissions)[
          Object.values(innerModuleData?.permissions).indexOf('yes')
        ];
      }
    }
    return undefined;
  };

  const modulesList = React.useMemo(() => {
    return allModules.map(mainModule => {
      const processedSubModules = submodules.map(subModule => {
        const permission = getModulePermission(subModule);

        const children = submodules_inner
          .filter(inner => inner.submodules_id === subModule.id)
          .map(i => ({
            ...i,
            permission: getInnerPermission(i, mainModule.id),
          }));

        return {...subModule, permission, children};
      });

      const subModules = processedSubModules.filter(
        item => item.modules_id === mainModule.id,
      );

      return {...mainModule, subModules};
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allModules, roleDetails, submodules, submodules_inner]);

  const onSubmit = async values => {
    const {name, modules} = values;

    const role_type = formatSubModules(modules);
    const role_type_inner = formatInner(modules);

    await addRole({
      project_id: selectedProject.id,
      role_name: name,
      role_type,
      role_type_inner,
    });
    getRoles({project_id: selectedProject.id});
    navigation.goBack();
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{modules: cloneDeep(modulesList)}}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {formikProps => <RenderForm {...props} {...{formikProps}} />}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
  screenContainer: {
    marginVertical: 5,
  },
  innerContainer: {
    marginLeft: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    marginBottom: 40,
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default withTheme(AddRole);
