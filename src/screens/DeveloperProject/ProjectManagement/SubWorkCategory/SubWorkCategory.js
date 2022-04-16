import {useAlert} from 'components/Atoms/Alert';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import NoResult from 'components/Atoms/NoResult';
import RenderDropDown from 'components/Atoms/RenderDropDown';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  Dialog,
  Divider,
  FAB,
  IconButton,
  Menu,
  Portal,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {getShadow} from 'utils';
import * as Yup from 'yup';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBadge from 'components/Atoms/CustomBadge';

const workActivitySchema = Yup.object().shape({
  activity: Yup.string().trim().required('Required'),
  unit: Yup.number().required('Required'),
});

function getUnitLabel(units, id) {
  const unit = units.find(({value}) => value === id);
  return unit?.label;
}

const itemSeparatorComponent = () => <Divider />;

function AddWorkDialog(props) {
  const {visible, selectedActivity, unitOptions, toggleDialog, onSubmit} =
    props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleDialog}
        style={styles.toggleDialog}>
        <View style={styles.dialogTitleContainer}>
          <Text style={styles.dialogHeader}>Add Sub-work</Text>
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
                    style={styles.addWorkActionButton}
                    mode="contained"
                    contentStyle={styles.contentStyle}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    {selectedActivity ? 'Update' : 'Save'}
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
  const {item, index, unitOptions, menuIndex, toggleMenu, onDelete, onUpdate} =
    props;

  return (
    <View style={styles.activityContainer}>
      <View style={styles.subWorKConatainer}>
        <View style={styles.subWorkTextContainer}>
          <Text style={styles.subWorkText}> {index + 1}</Text>
          <Menu
            visible={index === menuIndex}
            contentStyle={styles.toggleDotIcon}
            onDismiss={toggleMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={17}
                onPress={() => toggleMenu(index)}
              />
            }>
            <Menu.Item
              icon="pencil"
              onPress={() => onUpdate(item)}
              title="Edit"
            />
            <Divider />
            <Menu.Item
              icon="delete"
              onPress={() => onDelete(item.id)}
              title="Delete"
            />
          </Menu>
        </View>
        <View>
          <Text style={styles.subWorkNameContainer}>{item.title}</Text>
          <Caption style={styles.unitCaption}>
            {getUnitLabel(unitOptions, item.unit_id)}
          </Caption>
        </View>
      </View>
      <Divider />
    </View>
  );
}

function RenderWorks(props) {
  const {
    theme,
    navigation,
    selectedProject,
    data,
    selectedWork,
    getWorkActivities,
  } = props;

  const alert = useAlert();

  const {commonData} = useSelector(s => s.project);

  const unitOptions = useMemo(() => {
    return commonData.units.map(({id, title}) => ({label: title, value: id}));
  }, [commonData]);

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addActivityDialog, setAddActivityDialog] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState();

  const {createLineupEntity, updateLineupEntity, deleteLineupEntity} =
    useProjectManagementActions();

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

      <View>
        <Subheading style={styles.subHeading}>SubWork</Subheading>
        <View style={styles.workHeadingContainer}>
          <OpacityButton
            opacity={0.2}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialIcon name="keyboard-backspace" color="#000" size={20} />
          </OpacityButton>
          <View style={styles.workHeading}>
            <View style={styles.badgeContainer}>
              <CustomBadge label="1" style={styles.badge} />
              <Text>{selectedWork.title}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<NoResult title="No work activities found!" />}
          itemSeparatorComponent={itemSeparatorComponent}
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
function SubWorkCategory(props) {
  const {route} = props;
  const {work} = route?.params || {};

  const {works} = useSelector(s => s.projectManagement);
  const {selectedProject} = useSelector(s => s.project);

  const {getWorks} = useProjectManagementActions();

  useEffect(() => {
    getWorkActivities(work.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work]);

  const getWorkActivities = category_id => {
    getWorks({
      type: 'work',
      category_id,
      project_id: selectedProject.id,
    });
  };

  return (
    <RenderWorks
      {...props}
      {...{data: works, selectedWork: work, getWorkActivities}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },

  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 5,
  },

  subWorKConatainer: {
    flexGrow: 1,
    borderRadius: 5,
    ...getShadow(2),
    backgroundColor: '#fff',
  },
  subWorkTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  subWorkText: {
    paddingHorizontal: 7,
  },

  toggleDotIcon: {
    borderRadius: 10,
  },
  subWorkNameContainer: {
    backgroundColor: '#F2F4F5',
    paddingHorizontal: 10,
  },
  unitCaption: {
    paddingHorizontal: 10,
  },
  toggleDialog: {
    top: -100,
  },
  dialogTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dialogHeader: {
    color: '#000',
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
  addWorkActionButton: {
    width: '40%',
  },
  contentStyle: {
    padding: 1,
  },
  workHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  workHeading: {
    backgroundColor: '#EDF1FE',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginLeft: 0,
    flexGrow: 1,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 10,
  },
  subHeading: {
    padding: 15,
    fontSize: 20,
  },
  badge: {
    height: 18,
    width: 18,
    marginHorizontal: 2,
    borderRadius: 3,
    marginRight: 7,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withTheme(SubWorkCategory);
