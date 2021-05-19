import {useAlert} from 'components/Atoms/Alert';
import NoResult from 'components/Atoms/NoResult';
import RenderDropDown from 'components/Atoms/RenderDropDown';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Button,
  Caption,
  Dialog,
  Divider,
  FAB,
  IconButton,
  Menu,
  Portal,
  Text,
  withTheme,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {secondaryTheme} from 'styles/theme';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  work: Yup.string().trim().required('Required'),
});

const workActivitySchema = Yup.object().shape({
  activity: Yup.string().trim().required('Required'),
  unit: Yup.number().required('Required'),
});

function getUnitLabel(units, id) {
  return units.find(({value}) => value === id).label;
}

function AddWorkCategoryDialog(props) {
  const {visible, selectedCategory, toggleDialog, onSubmit} = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Add work category</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{work: selectedCategory?.title}}
          validationSchema={schema}
          onSubmit={async values => onSubmit(values)}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="work"
                  label={t('label_work')}
                  containerStyles={styles.input}
                  value={values.work}
                  onChangeText={handleChange('work')}
                  onBlur={handleBlur('work')}
                  onSubmitEditing={handleSubmit}
                  error={errors.work}
                />
                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%'}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>
                      {selectedCategory ? 'Update' : 'Save'}
                    </Text>
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

function AddWorkDialog(props) {
  const {
    visible,
    selectedActivity,
    unitOptions,
    toggleDialog,
    onSubmit,
  } = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Add work</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            activity: selectedActivity?.title,
            unit: selectedActivity?.unit_id,
          }}
          validationSchema={workActivitySchema}
          onSubmit={values => onSubmit(values)}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="activity"
                  label={t('label_activity_name')}
                  containerStyles={styles.input}
                  value={values.activity}
                  onChangeText={handleChange('activity')}
                  onBlur={handleBlur('activity')}
                  onSubmitEditing={handleSubmit}
                  error={errors.activity}
                />
                <RenderDropDown
                  name="unit"
                  label={t('label_select_unit')}
                  options={unitOptions}
                  containerStyles={styles.input}
                  value={values.unit}
                  error={errors.unit}
                  onChange={value => {
                    setFieldValue('unit', value);
                  }}
                />
                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%'}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>
                      {selectedActivity ? 'Update' : 'Save'}
                    </Text>
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

function RenderActivity(props) {
  const {
    item,
    index,
    unitOptions,
    menuIndex,
    toggleMenu,
    onDelete,
    onUpdate,
  } = props;

  return (
    <View style={styles.activityContainer}>
      <View style={styles.titleContainer}>
        <Text>
          {index + 1}. {item.title}
        </Text>
        <Caption>{getUnitLabel(unitOptions, item.unit_id)}</Caption>
      </View>
      <Menu
        visible={index === menuIndex}
        contentStyle={{borderRadius: 10}}
        onDismiss={toggleMenu}
        anchor={
          <IconButton icon="dots-vertical" onPress={() => toggleMenu(index)} />
        }>
        <Menu.Item icon="pencil" onPress={() => onUpdate(item)} title="Edit" />
        <Divider />
        <Menu.Item
          icon="delete"
          onPress={() => onDelete(item.id)}
          title="Delete"
        />
      </Menu>
    </View>
  );
}

function RenderWork(props) {
  const {
    item,
    index,
    menuIndex,
    toggleMenu,
    onPress,
    onDelete,
    onUpdate,
  } = props;

  return (
    <TouchableOpacity
      style={styles.workContainer}
      onPress={() => onPress(item)}>
      <View style={styles.titleContainer}>
        <Text>{item.title}</Text>
      </View>
      <Menu
        visible={index === menuIndex}
        contentStyle={{borderRadius: 10}}
        onDismiss={toggleMenu}
        anchor={
          <IconButton icon="dots-vertical" onPress={() => toggleMenu(index)} />
        }>
        <Menu.Item icon="pencil" onPress={() => onUpdate(item)} title="Edit" />
        <Divider />
        <Menu.Item
          icon="delete"
          onPress={() => onDelete(item.id)}
          title="Delete"
        />
      </Menu>
    </TouchableOpacity>
  );
}

function RenderWorkCategories(props) {
  const {theme, selectedProject, data, getCategories, selectWork} = props;

  const alert = useAlert();

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addWorkDialog, setAddWorkDialog] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState();

  const {
    createLineupEntity,
    updateLineupEntity,
    deleteLineupEntity,
  } = useProjectManagementActions();

  const toggleMenu = v => setMenuIndex(v);
  const toggleDialog = () => setAddWorkDialog(v => !v);

  const handleSubmit = ({work}) => {
    if (selectedCategory) {
      updateLineupEntity({
        title: work,
        id: selectedCategory.id,
        type: 'workcategory',
        project_id: selectedProject.id,
      }).then(() => {
        setSelectedCategory();
        toggleDialog();
        getCategories();
      });
    } else {
      createLineupEntity({
        title: work,
        type: 'workcategory',
        project_id: selectedProject.id,
      }).then(() => {
        setSelectedCategory();
        toggleDialog();
        getCategories();
      });
    }
  };

  const handleDelete = id => {
    toggleMenu();
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteLineupEntity({id, type: 'workcategory'}).then(() => {
          getCategories();
        });
      },
    });
  };

  const handleUpdate = category => {
    toggleMenu();
    toggleDialog();
    setSelectedCategory(category);
  };

  return (
    <>
      <AddWorkCategoryDialog
        visible={addWorkDialog}
        selectedCategory={selectedCategory}
        toggleDialog={toggleDialog}
        onSubmit={handleSubmit}
      />
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{flexGrow: 1}}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={<NoResult />}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => getCategories()}
            />
          }
          renderItem={({item, index}) => (
            <RenderWork
              {...{
                item,
                index,
                toggleMenu,
                menuIndex,
                onPress: selectWork,
                onDelete: handleDelete,
                onUpdate: handleUpdate,
              }}
            />
          )}
        />
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleDialog}
        />
      </View>
    </>
  );
}

function RenderWorks(props) {
  const {
    theme,
    selectedProject,
    data,
    selectedWork,
    setSelectedWork,
    getWorkActivities,
  } = props;

  const alert = useAlert();

  const {commonData} = useSelector(state => state.project);

  const unitOptions = useMemo(() => {
    return commonData.units.map(({id, title}) => ({label: title, value: id}));
  }, [commonData]);

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addActivityDialog, setAddActivityDialog] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState();

  const {
    createLineupEntity,
    updateLineupEntity,
    deleteLineupEntity,
  } = useProjectManagementActions();

  const toggleMenu = v => setMenuIndex(v);
  const toggleDialog = () => setAddActivityDialog(v => !v);

  const createWorkActivity = ({activity, unit}) => {
    if (selectedActivity) {
      updateLineupEntity({
        id: selectedActivity.id,
        title: activity,
        unit_id: unit,
        type: 'work',
        category_id: selectedWork.id,
        project_id: selectedProject.id,
      }).then(() => {
        toggleDialog();
        getWorkActivities(selectedWork.id);
      });
    } else {
      createLineupEntity({
        title: activity,
        unit_id: unit,
        type: 'work',
        category_id: selectedWork.id,
        project_id: selectedProject.id,
      }).then(() => {
        toggleDialog();
        getWorkActivities(selectedWork.id);
      });
    }
  };

  const handleDelete = id => {
    toggleMenu();
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteLineupEntity({id, type: 'work'}).then(() => {
          getWorkActivities(selectedWork.id);
        });
      },
    });
  };

  const handleUpdate = activity => {
    toggleMenu();
    toggleDialog();
    setSelectedActivity(activity);
  };

  return (
    <>
      <AddWorkDialog
        visible={addActivityDialog}
        unitOptions={unitOptions}
        selectedActivity={selectedActivity}
        toggleDialog={toggleDialog}
        onSubmit={createWorkActivity}
      />

      <View style={styles.workHeadingContainer}>
        <IconButton
          icon="chevron-left"
          size={30}
          onPress={() => setSelectedWork()}
        />
        <View style={styles.workHeading}>
          <Text>{selectedWork.title}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{flexGrow: 1}}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={<NoResult title="No work activities found!" />}
          renderItem={({item, index}) => (
            <RenderActivity
              {...{
                item,
                index,
                toggleMenu,
                unitOptions,
                menuIndex,
                onDelete: handleDelete,
                onUpdate: handleUpdate,
              }}
            />
          )}
        />
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleDialog}
        />
      </View>
    </>
  );
}

function WorkCategory(props) {
  const {selectedProject, getCategories} = props;

  const [selectedWork, setSelectedWork] = useState();

  const {workCategories, works} = useSelector(state => state.projectManagement);

  const {getWorks} = useProjectManagementActions();

  const getWorkActivities = category_id => {
    getWorks({
      type: 'work',
      category_id,
      project_id: selectedProject.id,
    });
  };

  const selectWork = work => {
    getWorkActivities(work.id);
    setSelectedWork(work);
  };

  if (selectedWork) {
    return (
      <RenderWorks
        {...props}
        {...{data: works, selectedWork, setSelectedWork, getWorkActivities}}
      />
    );
  }

  return (
    <RenderWorkCategories
      {...props}
      data={workCategories}
      selectWork={selectWork}
      getCategories={getCategories}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
  workContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10,
  },
  input: {marginVertical: 5},
  titleContainer: {
    flexGrow: 1,
  },
  dialogTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dialogContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dialogActionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workHeading: {
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginLeft: 0,
    flexGrow: 1,
  },
});

export default withTheme(WorkCategory);
