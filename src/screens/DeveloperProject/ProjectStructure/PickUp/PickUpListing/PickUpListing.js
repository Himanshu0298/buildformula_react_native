import ActionButtons from 'components/Atoms/ActionButtons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import {Button, Divider, FAB, IconButton, Subheading} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from 'styles/theme';
import Animated from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getShadow} from 'utils';

const SNAP_POINTS = [0, '25%'];

const DATA = [
  {name: 'Very Good'},
  {name: 'Good'},
  {name: 'Medium'},
  {name: 'Bad'},
];

function AddField(props) {
  const {formikProps, dialog, onClose} = props;

  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

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
              name="fieldName"
              label="Field Name"
              containerStyles={styles.inputStyles}
              value={values.fieldName}
              onChangeText={handleChange('fieldName')}
              onBlur={handleBlur('fieldName')}
              autoCapitalize="none"
              returnKeyType="fieldName"
              error={errors.fieldName}
            />
            <Button
              style={styles.button}
              theme={{roundness: 10}}
              mode="contained"
              onPress={() => console.log('===========> ')}>
              Add
            </Button>
          </View>
        )}
      />
    </>
  );
}

function PickUpListing(props) {
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
            <AddField
              {...props}
              dialog={dialog}
              toggleDialog={toggleAdd}
              onClose={onClose}
              formikProps={formikProps}
            />
          )}
        </Formik>
      ) : null}

      <View style={styles.mainContainer}>
        <View style={styles.headerWrapper}>
          <IconButton
            icon="keyboard-backspace"
            size={18}
            color="#4872f4"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Subheading>Quality Building </Subheading>
        </View>

        <View style={styles.listContainer}>
          {DATA.map(item => {
            return (
              <>
                <Divider style={styles.divider} />
                <View style={styles.container}>
                  <View style={styles.subContainer}>
                    <MaterialIcons
                      name="drag-indicator"
                      size={24}
                      color="rgba(4, 29, 54, 0.15)"
                    />
                    <Subheading> {item.name} </Subheading>
                  </View>

                  <View style={styles.headerSubContainer}>
                    <View style={styles.editIconContainer}>
                      <OpacityButton
                        color="#4872f4"
                        opacity={0.18}
                        style={styles.editIcon}
                        onPress={{}}>
                        <MaterialIcons name="edit" color="#4872f4" size={13} />
                      </OpacityButton>
                    </View>
                    <View>
                      <OpacityButton
                        color="#FF5D5D"
                        opacity={0.18}
                        onPress={{}}
                        style={styles.deleteIcon}>
                        <MaterialIcons
                          name="delete"
                          color="#FF5D5D"
                          size={13}
                        />
                      </OpacityButton>
                    </View>
                  </View>
                </View>
              </>
            );
          })}
          <Divider style={styles.divider} />
        </View>

        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleAdd}
        />

        <ActionButtons
          cancelLabel="Cancel"
          submitLabel="Save"
          onCancel={navigation.goBack}
          onSubmit={{}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    margin: 10,
    flexGrow: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  headerSubContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },
  deleteIcon: {
    borderRadius: 20,
  },
  editIcon: {
    borderRadius: 20,
    marginLeft: 15,
  },
  editIconContainer: {
    marginRight: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 45,
  },
  divider: {
    borderWidth: 0.4,
  },
  listContainer: {
    flexGrow: 1,
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

export default PickUpListing;
