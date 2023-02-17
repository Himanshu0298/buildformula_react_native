import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useState} from 'react';
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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {getShadow} from 'utils';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import {useAlert} from 'components/Atoms/Alert';
import Spinner from 'react-native-loading-spinner-overlay';
import NoResult from 'components/Atoms/NoResult';
import Layout from 'utils/Layout';
import {AutoDragSortableView} from 'react-native-drag-sort';
import {debounce} from 'lodash';

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
                  <Subheading> Add Tower</Subheading>
                  <RenderInput
                    name="towerName"
                    label="Tower Name"
                    containerStyles={styles.inputStyles}
                    value={values.towerName}
                    onChangeText={handleChange('towerName')}
                    onBlur={handleBlur('towerName')}
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errors.towerName}
                  />
                  <Button
                    style={styles.button}
                    theme={{roundness: 10}}
                    onPress={debounce(handleSubmit, 200)}
                    mode="contained">
                    Add
                  </Button>
                </View>
              </View>
            </Dialog>
          </Portal>
        );
      }}
    </Formik>
  );
}

function ListData(props) {
  const {item, handleDelete} = props;

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
        <Caption>{item?.label}</Caption>
      </View>
      <OpacityButton
        color="#FF5D5D"
        opacity={0.18}
        onPress={() => handleDelete(item?.id)}
        style={styles.deleteIcon}>
        <MaterialIcons name="delete" color="#FF5D5D" size={13} />
      </OpacityButton>
    </View>
  );
}

function TowerList(props) {
  const {navigation, route} = props;
  const {id} = route?.params || {};

  const alert = useAlert();

  const [dialog, setDialog] = useState();

  const {getTowerList, addTower, deleteTower, updateTowerOrder} =
    useProjectStructureActions();
  const {selectedProject} = useSelector(s => s.project);
  const {towerList, loading} = useSelector(s => s.projectStructure);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    getTowerList({project_id: selectedProject.id, id});
  };

  const toggleAddDialog = () => setDialog(v => !v);

  const onSubmit = async values => {
    const data = {
      project_id: selectedProject.id,
      id,
      contact_type: values.contact_type,
      name: values.towerName,
    };

    await addTower(data);
    toggleAddDialog();
    getData();
  };

  const handleDelete = async tower_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete this tower?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteTower({
          project_id: selectedProject.id,
          tower_id,
          id,
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

    await updateTowerOrder({
      project_id: selectedProject.id,
      data: sortedList,
    });
    getData();
  };

  return (
    <>
      {dialog ? (
        <AddTowerModel
          {...props}
          visible={dialog}
          onClose={toggleAddDialog}
          onSubmit={onSubmit}
        />
      ) : null}

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
          <Subheading>Tower List</Subheading>
        </View>

        {towerList?.length ? (
          <AutoDragSortableView
            dataSource={towerList}
            maxScale={1.03}
            childrenWidth={Layout.window.width}
            childrenHeight={ROW_HEIGHT}
            keyExtractor={(_, i) => i.toString()}
            renderItem={item => (
              <ListData item={item} handleDelete={handleDelete} />
            )}
            onDataChange={handleDragEnd}
          />
        ) : (
          <NoResult />
        )}

        <FAB style={styles.fab} large icon="plus" onPress={toggleAddDialog} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    margin: 20,
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
  listMainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 370,
  },
  listSubContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '80%',
    borderColor: '#0000004d',
    marginRight: 5,
  },
  fab: {
    position: 'absolute',
    right: 5,
    bottom: 1,
    backgroundColor: '#4872f4',
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

  inputStyles: {
    marginVertical: 10,
  },

  dialogContainer: {
    flex: 0.9,
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 70,
    width: '100%',
    left: -25,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
});

export default TowerList;
