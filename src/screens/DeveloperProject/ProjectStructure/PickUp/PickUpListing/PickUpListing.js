import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {
  Button,
  Dialog,
  Divider,
  FAB,
  IconButton,
  Portal,
  Subheading,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import {useAlert} from 'components/Atoms/Alert';
import Spinner from 'react-native-loading-spinner-overlay';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import * as Yup from 'yup';
import {isNumber} from 'lodash';

const schema = Yup.object().shape({
  title: Yup.string('Invalid').required('Required'),
});

function PickUpList(props) {
  const {item, index, handleDelete, editDialog} = props;

  const {title, bhk_title, id} = item;

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
          <Subheading> {title || bhk_title} </Subheading>
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
          <View>
            <OpacityButton
              color={theme.colors.error}
              opacity={0.18}
              onPress={() => handleDelete(id)}
              style={styles.deleteIcon}>
              <MaterialIcons
                name="delete"
                color={theme.colors.error}
                size={13}
              />
            </OpacityButton>
          </View>
        </View>
      </View>
    </>
  );
}

function AddFieldModel(props) {
  const {visible, pickUp, onClose, onSubmit} = props;

  const initialValues = useMemo(() => {
    return {title: pickUp?.title || ''};
  }, [pickUp]);

  const edit = Boolean(pickUp);

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={schema}
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
                  <Subheading> Add Field</Subheading>
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
                    onPress={handleSubmit}>
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

function PickUpListing(props) {
  const {navigation, route} = props;
  const {fieldId: field_id, fieldLabel} = route?.params || {};

  const alert = useAlert();

  const {getPickUpList, addPickUp, updatePickUp, deletePickUp} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {pickUpList = [], loading} = useSelector(s => s.projectStructure);

  const [dialog, setDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => {
    getPickUpList({project_id: selectedProject.id, field_id});
  };

  const onSubmit = async values => {
    const data = {
      project_id: selectedProject.id,
      field_id,
      title: values.title,
    };
    if (isNumber(selectedIndex)) {
      await updatePickUp({id: pickUpList?.[selectedIndex].id, ...data});
    } else {
      await addPickUp(data);
    }
    getList();
    toggleAddDialog();
  };

  const handleDelete = async pick_up_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deletePickUp({
          project_id: selectedProject.id,
          id: pick_up_id,
          field_id,
        });
        getList();
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

  return (
    <ActionSheetProvider>
      <>
        <View style={styles.mainContainer}>
          <Spinner visible={loading} textContent="" />

          <View style={styles.headerWrapper}>
            <IconButton
              icon="keyboard-backspace"
              size={18}
              color="#4872f4"
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            />
            <Subheading>{fieldLabel}</Subheading>
          </View>
          <ScrollView>
            {pickUpList?.map((item, index) => {
              return (
                <PickUpList
                  item={item}
                  index={index}
                  editDialog={editDialog}
                  handleDelete={handleDelete}
                />
              );
            })}
            <Divider style={styles.divider} />
          </ScrollView>

          <FAB style={styles.fab} icon="plus" onPress={toggleAddDialog} />
        </View>

        {dialog ? (
          <AddFieldModel
            {...props}
            visible={dialog}
            pickUp={pickUpList?.[selectedIndex]}
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
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    backgroundColor: theme.colors.primary,
  },
  divider: {
    borderWidth: 0.4,
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
    flex: 0.3,
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 280,
    width: '100%',
    left: -25,
  },
});

export default PickUpListing;
