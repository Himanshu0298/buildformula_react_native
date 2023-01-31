import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Caption,
  Dialog,
  FAB,
  IconButton,
  Portal,
  Subheading,
} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {getShadow} from 'utils';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useAlert} from 'components/Atoms/Alert';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NoResult from 'components/Atoms/NoResult';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

function AddTowerModel(props) {
  const {visible, onClose, onSubmit} = props;

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      onSubmit={onSubmit}>
      {({values, handleChange, handleBlur, errors, handleSubmit}) => {
        return (
          <ActionSheetProvider>
            <Portal>
              <Dialog
                visible={visible}
                onDismiss={onClose}
                style={styles.dialogContainer}>
                <View>
                  <View style={styles.sheetContentContainer}>
                    <View style={styles.closeContainer}>
                      <IconButton
                        icon="close-circle"
                        size={25}
                        onPress={onClose}
                        color="grey"
                      />
                    </View>
                    <Subheading> Add Floor</Subheading>
                    <RenderInput
                      name="floorName"
                      label="Floor Name"
                      containerStyles={styles.inputStyles}
                      value={values.floorName}
                      onChangeText={handleChange('floorName')}
                      onBlur={handleBlur('floorName')}
                      autoCapitalize="none"
                      returnKeyType="next"
                      error={errors.floorName}
                    />
                    <Button
                      style={styles.button}
                      theme={{roundness: 10}}
                      mode="contained"
                      onPress={handleSubmit}>
                      Add
                    </Button>
                  </View>
                </View>
              </Dialog>
            </Portal>
          </ActionSheetProvider>
        );
      }}
    </Formik>
  );
}

function ListData(props) {
  const {handleDelete, floorList} = props;

  return (
    <View>
      {floorList?.map(item => {
        return (
          <View style={styles.listContainer}>
            <View style={styles.subContainer}>
              <MaterialIcons
                name="drag-indicator"
                size={24}
                color="rgba(4, 29, 54, 0.15)"
              />
            </View>
            <View style={styles.listSubContainer}>
              <Caption>{item.floor}</Caption>
            </View>
            <View>
              <OpacityButton
                color="#FF5D5D"
                opacity={0.18}
                onPress={() => handleDelete(item.id)}
                style={styles.deleteIcon}>
                <MaterialIcons name="delete" color="#FF5D5D" size={13} />
              </OpacityButton>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function FloorList(props) {
  const {navigation, route} = props;
  const {id, towerId} = route?.params || {};

  const alert = useAlert();
  const snackbar = useSnackbar();

  const {getFloorList, addFloor, deleteFloor} = useProjectStructureActions();
  const {selectedProject} = useSelector(s => s.project);
  const {towerList, floorList, loading} = useSelector(s => s.projectStructure);

  const [dialog, setDialog] = useState(false);
  const [selectedTower, setSelectedTower] = useState(towerId);

  const towerOptions = useMemo(() => {
    return towerList?.map(i => ({
      label: i.label,
      value: i.id,
    }));
  }, [towerList]);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTower]);

  const getData = async () => {
    await getFloorList({
      project_id: selectedProject.id,
      id,
      tower_id: selectedTower,
    });
  };

  const toggleAddDialog = () => setDialog(v => !v);

  const onSubmit = async values => {
    const floors = floorList.find(i => i.floor === values.floorName);

    if (floors) {
      snackbar.showMessage({
        message: 'Floor Already Added',
        variant: 'warning',
      });
      toggleAddDialog();
      return;
    }

    const data = {
      project_id: selectedProject.id,
      id,
      tower_id: towerId,
      contact_type: values.contact_type,
      name: values.floorName,
    };

    await addFloor(data);
    toggleAddDialog();
    getData();
  };

  const handleDelete = async floor_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteFloor({
          project_id: selectedProject.id,
          floor_id,
          id,
        });
        getData();
      },
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton
            icon="keyboard-backspace"
            style={styles.backIcon}
            size={18}
          />
        </TouchableOpacity>
        <Subheading>Floor List</Subheading>
      </View>
      <ScrollView
        style={{marginBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <RenderSelect
          name="tower"
          label="Select Tower"
          value={selectedTower}
          options={towerOptions}
          containerStyles={styles.inputStyles}
          onSelect={setSelectedTower}
        />

        {floorList?.length ? (
          <ListData handleDelete={handleDelete} floorList={floorList} />
        ) : (
          <NoResult title="No Floor available, please first add floor" />
        )}
      </ScrollView>

      {dialog ? (
        <AddTowerModel
          {...props}
          visible={dialog}
          onClose={toggleAddDialog}
          onSubmit={onSubmit}
        />
      ) : null}

      <FAB style={styles.fab} large icon="plus" onPress={toggleAddDialog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },

  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    borderRadius: 20,
  },
  listContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listSubContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '80%',
    borderColor: '#0000004d',
  },
  fab: {
    position: 'absolute',
    right: 5,
    bottom: 80,

    backgroundColor: '#4872f4',
    zIndex: 1,
  },

  dialogContainer: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 280,
    width: '100%',
    left: -25,
  },
  sheetContentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexGrow: 1,
    height: '100%',
    ...getShadow(2),
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  inputStyles: {
    marginVertical: 10,
  },
});

export default FloorList;
