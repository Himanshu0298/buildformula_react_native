import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Caption, FAB, IconButton, Subheading} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {getShadow} from 'utils';
import RenderSelect from 'components/Atoms/RenderSelect';

const SNAP_POINTS = [0, '25%'];

const DATA = [
  {name: 'Ground Floor'},
  {name: '1st Floor'},
  {name: '2nd Floor'},
  {name: '3rd Floor'},
  {name: '4th Floor'},
];

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
              returnKeyType="floorName"
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
  const {formikProps} = props;

  const {values, handleBlur, setFieldValue} = formikProps;

  const options = [];
  return (
    <View>
      <RenderSelect
        name="selectTower"
        label="Select Tower"
        value={values.selectTower}
        options={options}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('selectTower')}
        onSelect={value => {
          setFieldValue('selectTower', value);
        }}
      />
      {DATA.map(item => {
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
              <Caption>{item.name}</Caption>
            </View>
            <View>
              <OpacityButton
                color="#FF5D5D"
                opacity={0.18}
                onPress={{}}
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
  const {navigation} = props;

  const [dialog, setDialog] = useState();

  const toggleAdd = () => setDialog(v => !v);

  const onClose = () => toggleAdd();

  const handleSave = () => {
    console.log('===========> ');
  };

  return (
    <>
      {dialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={handleSave}>
          {formikProps => (
            <AddFloor
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
          onSubmit={handleSave}>
          {formikProps => <ListData formikProps={formikProps} />}
        </Formik>
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
    backgroundColor: '#4872f4',
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
