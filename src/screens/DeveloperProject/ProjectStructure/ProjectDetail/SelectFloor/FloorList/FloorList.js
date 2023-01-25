import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Caption, FAB, IconButton, Subheading} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {getShadow} from 'utils';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useAlert} from 'components/Atoms/Alert';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const SNAP_POINTS = [0, '25%'];

function AddFloor(props) {
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
        )}
      />
    </>
  );
}
function ListData(props) {
  const {formikProps, handleDelete, floorList} = props;

  const {values, handleBlur, setFieldValue} = formikProps;

  const floorOptions = useMemo(() => {
    return floorList?.map(i => ({
      label: i.floor,
      value: i.id,
    }));
  }, [floorList]);

  return (
    <View>
      <RenderSelect
        name="selectFloor"
        label="Select Floor"
        value={values.selectFloor}
        options={floorOptions}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('selectFloor')}
        onSelect={value => {
          setFieldValue('selectFloor', value);
        }}
      />

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

  const [dialog, setDialog] = useState();

  const {getFloorList, addFloor, deleteFloor} = useProjectStructureActions();
  const {selectedProject} = useSelector(s => s.project);
  const {floorList, loading} = useSelector(s => s.projectStructure);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getFloorList({
      project_id: selectedProject.id,
      id,
      tower_id: towerId,
    });
  };

  const toggleAdd = () => setDialog(v => !v);

  const onSubmit = async values => {
    const data = {
      project_id: selectedProject.id,
      id,
      tower_id: values.selectTower,
      contact_type: values.contact_type,
      name: values.floorName,
    };

    await addFloor(data);
    toggleAdd();
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
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        onSubmit={onSubmit}>
        {formikProps => (
          <>
            <ScrollView>
              <ListData
                formikProps={formikProps}
                handleDelete={handleDelete}
                floorList={floorList}
              />
            </ScrollView>
            {dialog ? (
              <AddFloor
                {...props}
                dialog={dialog}
                onClose={toggleAdd}
                formikProps={formikProps}
              />
            ) : null}
          </>
        )}
      </Formik>
      <FAB style={styles.fab} large icon="plus" onPress={toggleAdd} />
    </View>
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
});
export default FloorList;
