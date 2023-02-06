import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Caption,
  Dialog,
  FAB,
  IconButton,
  Portal,
  Subheading,
} from 'react-native-paper';
import Layout from 'utils/Layout';

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
import {AutoDragSortableView} from 'react-native-drag-sort';
import {SafeTouchable} from 'components/Atoms/SafeTouchable';

const ROW_HEIGHT = 50;

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
                  <SafeTouchable onPress={handleSubmit}>
                    <Button
                      style={styles.button}
                      theme={{roundness: 10}}
                      mode="contained"
                      onPress={handleSubmit}>
                      Add
                    </Button>
                  </SafeTouchable>
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
  const {handleDelete, item} = props;

  return (
    <View style={styles.listMainContainer}>
      <View style={styles.subContainer}>
        <MaterialIcons
          name="drag-indicator"
          size={24}
          color="rgba(4, 29, 54, 0.15)"
        />
      </View>
      <View style={styles.listSubContainer}>
        <Caption>{item?.floor}</Caption>
      </View>
      <OpacityButton
        color="#FF5D5D"
        opacity={0.18}
        onPress={() => handleDelete(item.id)}
        style={styles.deleteIcon}>
        <MaterialIcons name="delete" color="#FF5D5D" size={13} />
      </OpacityButton>
    </View>
  );
}

function FloorList(props) {
  const {navigation, route} = props;
  const {projectId, towerId} = route?.params || {};

  const alert = useAlert();
  const snackbar = useSnackbar();

  const {getFloorList, addFloor, deleteFloor, updateFloorOrder} =
    useProjectStructureActions();
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
      id: projectId,
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
      id: projectId,
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
          id: projectId,
        });
        getData();
      },
    });
  };

  const handleDragEnd = async data => {
    const sortedList = {};

    data.map((i, index) => {
      sortedList[i.id] = index;
      return i;
    });

    await updateFloorOrder({
      project_id: selectedProject.id,
      data: sortedList,
    });
    getData();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="please wait" />
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
      <RenderSelect
        name="tower"
        label="Select Tower"
        value={selectedTower}
        options={towerOptions}
        containerStyles={styles.inputStyles}
        onSelect={setSelectedTower}
      />

      <View style={styles.autoDragView}>
        {floorList?.length ? (
          <AutoDragSortableView
            dataSource={floorList}
            maxScale={1.03}
            childrenWidth={Layout.window.width}
            childrenHeight={ROW_HEIGHT}
            keyExtractor={(_, i) => i.toString()}
            renderItem={item => (
              <ListData
                handleDelete={handleDelete}
                floorList={floorList}
                item={item}
              />
            )}
            onDataChange={handleDragEnd}
          />
        ) : (
          <NoResult title="No Floor available, please first add floor" />
        )}
      </View>

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
    marginLeft: 10,
  },

  listSubContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    borderColor: '#0000004d',
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    right: 5,
    bottom: 80,
    backgroundColor: '#4872f4',
  },

  dialogContainer: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 250,
    width: '100%',
    left: -25,
  },
  sheetContentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 50,
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
  autoDragView: {
    width: '100%',
    flexGrow: 1,
  },
  listMainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 260,
  },
});

export default FloorList;
