import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Caption, FAB, IconButton, Subheading} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {getShadow} from 'utils';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import {useAlert} from 'components/Atoms/Alert';
import Spinner from 'react-native-loading-spinner-overlay';

const SNAP_POINTS = [0, '25%'];

function AddTower(props) {
  const {formikProps, dialog, onClose} = props;
  const {values, errors, handleChange, handleBlur, handleSubmit} = formikProps;
  const bottomSheetRef = useRef();
  const fall = new Animated.Value(1);
  useEffect(() => {
    if (dialog) {
      bottomSheetRef?.current?.snapTo(1);
    } else {
      bottomSheetRef?.current?.snapTo(0);
    }
  }, [dialog]);
  return (
    <>
      {dialog ? (
        <Animated.View
          style={[
            styles.backdrop,
            {opacity: Animated.sub(1, Animated.multiply(fall, 0.9))},
          ]}
        />
      ) : null}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={SNAP_POINTS}
        initialSnap={0}
        borderRadius={30}
        callbackNode={fall}
        renderHeader={() => <View />}
        renderContent={() => (
          <View style={styles.sheetContentContainer}>
            <View style={styles.closeContainer}>
              <IconButton
                icon="close-circle"
                size={25}
                onPress={onClose}
                color="grey"
              />
            </View>
            <Subheading> Add Field</Subheading>
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
              mode="contained"
              onPress={handleSubmit}>
              Add
            </Button>
          </View>
        )}
      />
    </>
  );
}

function ListData(props) {
  const {towerList, handleDelete} = props;

  return (
    <View>
      {towerList.map(item => {
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
              <Caption>{item.label}</Caption>
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
function TowerList(props) {
  const {navigation, route} = props;
  const {id} = route?.params || {};

  const alert = useAlert();

  const [dialog, setDialog] = useState();

  const {getTowerList, addTower, deleteTower} = useProjectStructureActions();
  const {selectedProject} = useSelector(s => s.project);
  const {towerList, loading} = useSelector(s => s.projectStructure);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getTowerList({project_id: selectedProject.id, id});
  };

  const toggleAdd = () => setDialog(v => !v);
  const onClose = () => toggleAdd();

  const onSubmit = async values => {
    const data = {
      project_id: selectedProject.id,
      id,
      contact_type: values.contact_type,
      name: values.towerName,
    };

    await addTower(data);
    toggleAdd();
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
  return (
    <>
      {dialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={onSubmit}>
          {formikProps => (
            <AddTower
              {...props}
              dialog={dialog}
              toggleDialog={toggleAdd}
              onClose={onClose}
              formikProps={formikProps}
            />
          )}
        </Formik>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <ListData towerList={towerList} handleDelete={handleDelete} />
        </ScrollView>
        <FAB style={styles.fab} large icon="plus" onPress={toggleAdd} />
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
    bottom: 1,
    backgroundColor: '#4872F4',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  scrollView: {
    marginBottom: 20,
  },
});
export default TowerList;
