import {StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useAlert} from 'components/Atoms/Alert';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Button,
  Dialog,
  Divider,
  FAB,
  IconButton,
  Portal,
  Subheading,
  Text,
} from 'react-native-paper';
import {AutoDragSortableView} from 'react-native-drag-sort';
import Layout from 'utils/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NoResult from 'components/Atoms/NoResult';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import {debounce} from 'lodash';
import {getShadow} from 'utils';

const ROW_HEIGHT = 50;

const arrowList = [
  {
    label: 'Ground Floor',
    id: 1,
  },
  {
    label: 'First Floor',
    id: 2,
  },
  {
    label: 'Second Floor',
    id: 3,
  },
  {
    label: 'Third Floor',
    id: 4,
  },
  {
    label: 'Fourth Floor',
    id: 5,
  },
  {
    label: 'Fifth Floor',
    id: 6,
  },
];

function ArrowList(props) {
  const {item, index, handleDelete, editDialog} = props;

  const {label, id} = item;

  return (
    <KeyboardAwareScrollView>
      <Divider style={styles.divider} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.id}> {id}</Text>
          <MaterialIcons
            name="drag-indicator"
            size={24}
            color="rgba(4, 29, 54, 0.15)"
          />
          <Subheading> {label} </Subheading>
        </View>
        <View style={styles.headerSubContainer}>
          <View style={styles.editIconContainer}>
            <OpacityButton
              color={theme.colors.primary}
              opacity={0.18}
              style={styles.editIcon}
              onPress={() => editDialog(index, item)}>
              <MaterialIcons
                name="edit"
                color={theme.colors.primary}
                size={13}
              />
            </OpacityButton>
          </View>
          <OpacityButton
            color={theme.colors.error}
            opacity={0.18}
            onPress={() => handleDelete(id)}
            style={styles.deleteIcon}>
            <MaterialIcons name="delete" color={theme.colors.error} size={13} />
          </OpacityButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

function AddRowModal(props) {
  const {visible, arrow, onClose, onSubmit} = props;

  const initialValues = useMemo(() => {
    return {title: arrow?.label || ''};
  }, [arrow]);

  const edit = Boolean(arrow);

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
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
                  <Subheading> Add Row</Subheading>
                  <RenderInput
                    name="title"
                    label="Field Name"
                    containerStyles={styles.inputStyles}
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errors.title}
                  />
                  <Button
                    style={styles.button}
                    theme={{roundness: 10}}
                    mode="contained"
                    onPress={debounce(handleSubmit, 200)}>
                    {edit ? 'Update' : 'Add'}
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

function AddRows(props) {
  const {navigation} = props;

  const alert = useAlert();

  const [dialog, setDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const onSubmit = async () => {
    console.log('===========> ');
  };

  const handleDelete = () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        console.log('===========> ');
      },
    });
  };

  const editDialog = index => {
    setSelectedIndex(index);
    toggleAddDialog();
  };

  const toggleAddDialog = () => {
    setDialog(v => {
      if (v) setSelectedIndex();
      return !v;
    });
  };

  const handleDragEnd = () => {
    console.log('===========> ');
  };

  return (
    <ActionSheetProvider>
      <>
        <View style={styles.mainContainer}>
          <Spinner textContent="" />

          <View style={styles.headerWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconButton
                icon="keyboard-backspace"
                size={18}
                color="#4872f4"
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
              />
              <Subheading>Rows</Subheading>
            </View>
            <OpacityButton
              opacity={0.1}
              color="#4872f4"
              style={{marginRight: 10}}
              onPress={toggleAddDialog}>
              <Text style={{color: '#4872f4', padding: 3}}>New Row</Text>
            </OpacityButton>
          </View>

          {arrowList?.length ? (
            <AutoDragSortableView
              dataSource={arrowList}
              maxScale={1.03}
              childrenWidth={Layout.window.width}
              childrenHeight={ROW_HEIGHT}
              keyExtractor={(_, i) => i.toString()}
              renderItem={(item, index) => (
                <ArrowList
                  item={item}
                  index={index}
                  editDialog={editDialog}
                  handleDelete={handleDelete}
                />
              )}
              onDataChange={handleDragEnd}
            />
          ) : (
            <NoResult />
          )}
        </View>

        {dialog ? (
          <AddRowModal
            {...props}
            visible={dialog}
            arrow={arrowList?.[selectedIndex]}
            onClose={toggleAddDialog}
            onSubmit={onSubmit}
          />
        ) : null}
      </>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
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
    width: 390,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 10,
  },

  divider: {
    borderWidth: 0.3,
    borderColor: '#ccc',
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
  dialogContainer: {
    flex: 0.9,
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 70,
    width: '100%',
    left: -25,
  },

  id: {
    backgroundColor: theme.colors.primary,
    marginLeft: 2,
    paddingRight: 5,
    paddingLeft: 3,
    paddingTop: 3,
    paddingBottom: 3,
    color: '#ffff',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 10,
  },
});

export default AddRows;
