import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React, {useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
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
  Title,
  withTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  activity_title: Yup.string().trim().required('Required'),
});

function RenderPhase(props) {
  const {
    theme,
    item,
    index,
    menuIndex,
    toggleMenu,
    navToPlanning,
    onEdit,
    onDelete,
  } = props;
  const {planing_title, planing_description, pd_start_date, pd_end_date} = item;

  return (
    <TouchableOpacity onPress={navToPlanning} style={styles.detailsContainer}>
      <View style={styles.detailsTop}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <OpacityButton style={styles.badge} opacity={0.15}>
              <Caption style={{color: theme.colors.primary, lineHeight: 16}}>
                {index + 1}
              </Caption>
            </OpacityButton>
            <Text style={{marginLeft: 5, fontSize: 15}}>{planing_title}</Text>
          </View>

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="bell"
              size={16}
              color={theme.colors.red}
            />
            <Caption style={{marginLeft: 3, color: theme.colors.red}}>
              2
            </Caption>
            <Menu
              visible={index === menuIndex}
              contentStyle={{borderRadius: 10}}
              onDismiss={toggleMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={18}
                  onPress={() => toggleMenu(index)}
                />
              }>
              <Menu.Item
                style={styles.menuItem}
                icon="pencil"
                onPress={onEdit}
                title="Rename"
              />
              <Divider />
              <Menu.Item
                style={styles.menuItem}
                icon="delete"
                onPress={onDelete}
                title="Delete"
              />
            </Menu>
          </View>
        </View>
        {planing_description ? (
          <Caption numberOfLines={1}>{planing_description}</Caption>
        ) : null}
        <View style={styles.dateRow}>
          <MaterialCommunityIcons
            name="calendar-blank"
            size={16}
            color="#A2AAB1"
            style={{marginRight: 5}}
          />
          <Caption>
            {pd_start_date} - {pd_end_date}
          </Caption>
        </View>
        <View style={styles.chipContainer}>
          <View style={styles.textIcon}>
            <MaterialCommunityIcons
              name="text-subject"
              size={16}
              color="#A2AAB1"
              style={{marginRight: 5}}
            />
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="clipboard-account"
              size={16}
              color="#A2AAB1"
              style={{marginRight: 5}}
            />
            <Caption>3</Caption>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={16}
              color="#A2AAB1"
              style={{marginRight: 5}}
            />
            <Caption>0/3</Caption>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="attachment"
              size={18}
              color="#A2AAB1"
              style={{marginRight: 5}}
            />
            <Caption>3</Caption>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="message-reply"
              size={16}
              color="#A2AAB1"
              style={{marginRight: 5}}
            />
            <Caption>3</Caption>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function AddDialog(props) {
  const {open, selectedActivity, handleClose, onSave, onUpdate} = props;

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleClose} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text>{selectedActivity ? 'Update Activity' : 'Add Activity'}</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            activity_title: selectedActivity?.planing_title,
          }}
          validationSchema={schema}
          onSubmit={selectedActivity ? onUpdate : onSave}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="activity_title"
                  label="Activity name"
                  containerStyles={styles.input}
                  value={values.activity_title}
                  onChangeText={handleChange('activity_title')}
                  onBlur={handleBlur('activity_title')}
                  onSubmitEditing={handleSubmit}
                  error={errors.activity_title}
                />

                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%'}}
                    mode="contained"
                    contentStyle={{padding: 1}}
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

function EmptyComponent() {
  return (
    <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Caption>No Activities Found.</Caption>
    </View>
  );
}

function SubPhasesActivity(props) {
  const {theme, route, navigation} = props;
  const {phase, subPhase} = route?.params || {};

  const {
    getGeneralPhaseActivities,
    addGeneralPhaseActivity,
    updateGeneralActivity,
  } = useProjectManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {loading, activities} = useSelector(s => s.projectManagement);

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState();

  useEffect(() => {
    getList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => {
    if (phase.phase_type_id === 1) {
      getGeneralPhaseActivities({
        project_id: selectedProject.id,
        subphase_id: subPhase.id,
      });
    }
  };

  const toggleMenu = v => setMenuIndex(v);
  const toggleAddDialog = () => setAddDialog(v => !v);

  const navToPlanning = () => navigation.navigate('PlanningDetails');

  const onEditActivity = () => {
    setSelectedActivity(activities[menuIndex]);
    toggleMenu();
    toggleAddDialog(true);
  };

  const onDeleteActivity = () => {
    const activityId = activities[menuIndex].id;

    toggleMenu();

    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        console.log('----->delete ');
      },
    });
  };

  const onAddNewActivity = async values => {
    if (phase.phase_type_id === 1) {
      await addGeneralPhaseActivity({
        project_id: selectedProject.id,
        subphase_id: subPhase.id,
        ...values,
      });
      toggleAddDialog();
      getList();
    }
  };

  const onUpdateActivity = async values => {
    if (phase.phase_type_id === 1) {
      await updateGeneralActivity({
        activity_id: selectedActivity.id,
        project_id: selectedProject.id,
        allitems: [],
        ...values,
      });
      toggleAddDialog();
      getList();
    }
  };

  const emptyComponent = () => <EmptyComponent />;

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      {addDialog ? (
        <AddDialog
          {...props}
          open={Boolean(addDialog)}
          selectedActivity={selectedActivity}
          handleClose={toggleAddDialog}
          onSave={onAddNewActivity}
          onUpdate={onUpdateActivity}
        />
      ) : null}

      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={18}
              style={{marginRight: 10}}
            />
            <Title>{subPhase.subphase_title || subPhase.subphase}</Title>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={activities}
        extraData={activities}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={emptyComponent}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => getList(true)} />
        }
        renderItem={({item, index}) => (
          <RenderPhase
            {...props}
            item={item}
            index={index}
            menuIndex={menuIndex}
            navToPlanning={navToPlanning}
            toggleMenu={toggleMenu}
            onEdit={onEditActivity}
            onDelete={onDeleteActivity}
          />
        )}
      />
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={toggleAddDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
  headingContainer: {
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 6,
    flexGrow: 1,
    marginVertical: 5,
  },
  detailsTop: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 5,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  menuItem: {
    height: 35,
  },
  chipContainer: {
    marginHorizontal: -8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    flex: 1,
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textIcon: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 5,
    paddingHorizontal: 2,
    flex: 0.5,
    marginLeft: 8,
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default withTheme(SubPhasesActivity);
