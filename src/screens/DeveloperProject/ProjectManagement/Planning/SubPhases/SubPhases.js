import {useAlert} from 'components/Atoms/Alert';
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
  Subheading,
  Text,
  Title,
  withTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  subPhase: Yup.string().trim().required('Required'),
});

function RenderPhase(props) {
  const {
    theme,
    item,
    index,
    menuIndex,
    toggleMenu,
    navToActivity,
    onEdit,
    onDelete,
  } = props;
  const {subphase, subphase_title, notifications, start_date, end_date} = item;

  return (
    <TouchableOpacity
      onPress={() => navToActivity(item)}
      style={styles.detailsContainer}>
      <View style={styles.detailsTop}>
        <View style={styles.rowBetween}>
          <Text style={{fontSize: 15}}>{subphase || subphase_title}</Text>

          <View style={styles.row}>
            {notifications ? (
              <>
                <MaterialCommunityIcons
                  name="bell"
                  size={16}
                  color={theme.colors.red}
                />
                <Caption style={{marginLeft: 3, color: theme.colors.red}}>
                  {notifications}
                </Caption>
              </>
            ) : null}
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
        <View style={styles.details}>
          <Caption>
            {start_date} - {end_date}
          </Caption>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function AddDialog(props) {
  const {open, selectedPhase, handleClose, onSave, onUpdate} = props;

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleClose} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text>
            {selectedPhase ? 'Update Sub Phase' : 'Add new Sub Phase'}
          </Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            subPhase: selectedPhase?.subphase || selectedPhase?.subphase_title,
          }}
          validationSchema={schema}
          onSubmit={selectedPhase ? onUpdate : onSave}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="subPhase"
                  label="Sub Phase"
                  containerStyles={styles.input}
                  value={values.subPhase}
                  onChangeText={handleChange('subPhase')}
                  onBlur={handleBlur('subPhase')}
                  onSubmitEditing={handleSubmit}
                  error={errors.subPhase}
                />

                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%'}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    {selectedPhase ? 'Update' : 'Save'}
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
      <Caption>No Sub Phases Found.</Caption>
    </View>
  );
}

function SubPhases(props) {
  const {theme, route, navigation} = props;
  const {phase} = route?.params || {};
  const {id, phase_title, phase_type_id} = phase || {};

  const alert = useAlert();

  const {getSubPhases, addSubPhase, updateSubPhase, deleteSubPhase} =
    useProjectManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {loading, refreshing, subPhases} = useSelector(
    s => s.projectManagement,
  );

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedPhase, setSelectedPhase] = React.useState();

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, selectedProject.id]);

  const getList = refresh =>
    getSubPhases(
      {phase_type_id, project_id: selectedProject.id, phase_id: id},
      refresh,
    );

  const toggleMenu = v => setMenuIndex(v);
  const toggleAddDialog = v => setAddDialog(v);

  const navToActivity = subPhase => {
    navigation.navigate('SubPhaseActivity', {subPhase, phase});
  };

  const onAddNewPhase = async ({subPhase}) => {
    await addSubPhase({
      title: subPhase,
      phase_type_id,
      phase_id: id,
      project_id: selectedProject.id,
    });

    getList();
    toggleAddDialog();
  };

  const onUpdatePhase = async ({subPhase}) => {
    await updateSubPhase({
      title: subPhase,
      subphase_id: selectedPhase.id,
      project_id: selectedProject.id,
      phase_type_id,
    });

    getList();
    setSelectedPhase();
    toggleAddDialog();
  };

  const onEditPhase = () => {
    setSelectedPhase(subPhases[menuIndex]);
    toggleMenu();
    toggleAddDialog(true);
  };

  const onDeletePhase = () => {
    const phaseId = subPhases[menuIndex].id;

    toggleMenu();

    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteSubPhase({
          subphase_id: phaseId,
          phase_type_id,
          project_id: selectedProject.id,
        }).then(() => {
          getList();
        });
      },
    });
  };

  const emptyComponent = () => <EmptyComponent />;

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      {addDialog ? (
        <AddDialog
          {...props}
          open={Boolean(addDialog)}
          selectedPhase={selectedPhase}
          handleClose={toggleAddDialog}
          onSave={onAddNewPhase}
          onUpdate={onUpdatePhase}
        />
      ) : null}
      <View style={styles.headingContainer}>
        <Subheading>{phase_title}</Subheading>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.phasesHeadingContainer}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={18}
            style={{marginRight: 10}}
          />
          <Title>Subphases</Title>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={subPhases}
        extraData={subPhases}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={emptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getList(true)}
          />
        }
        renderItem={({item, index}) => (
          <RenderPhase
            {...props}
            item={item}
            index={index}
            menuIndex={menuIndex}
            toggleMenu={toggleMenu}
            navToActivity={navToActivity}
            onEdit={onEditPhase}
            onDelete={onDeletePhase}
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
  phasesHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    height: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default withTheme(SubPhases);
