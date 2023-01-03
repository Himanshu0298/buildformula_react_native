import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Modal} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {FAB, IconButton, Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Formik} from 'formik';

const DATA = [
  {
    name: 'Preeti kuar',
    no: +912001244481,
  },
  {
    name: 'jasline Jain',
    no: +912001244481,
  },
  {
    name: 'Ramesh rathod',
    no: +912001244481,
  },
  {
    name: 'Himanshu Jain',
    no: +912001244481,
  },
];

function AddProjectSecurity(props) {
  const {handleClose, visible, formikProps} = props;

  const {values, errors, handleChange, handleBlur, handleSubmit} = formikProps;

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={handleClose}>
      <SafeAreaProvider style={{flexGrow: 1}}>
        <SafeAreaView style={{margin: 10, flexGrow: 1}}>
          <Title>Add Security/ Caretaker Info</Title>
          <View style={{flexGrow: 1}}>
            <RenderInput
              name="name"
              label="Enter Full Name"
              containerStyles={styles.inputStyles}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              autoCapitalize="none"
              returnKeyType="next"
              error={errors.name}
            />
            <RenderInput
              name="phone_number"
              label="Enter Phone Number"
              containerStyles={styles.inputStyles}
              value={values.phone_number}
              onChangeText={handleChange('phone_number')}
              onBlur={handleBlur('phone_number')}
              returnKeyType="next"
              error={errors.phone_number}
            />
          </View>

          <ActionButtons
            cancelLabel="Cancel"
            submitLabel="Save"
            onCancel={handleClose}
            onSubmit={handleSubmit}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

function ProjectSecurityDetails(props) {
  const {item} = props;

  const {name, no} = item;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>{name.toUpperCase()}</Text>
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
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <MaterialIcons name="phone" color="#4872f4" size={18} />
        <View style={styles.rowData}>
          <Text style={styles.number}> {no}</Text>
        </View>
      </View>
    </View>
  );
}

function ProjectSecurity(props) {
  const {navigation} = props;

  const [addDialog, setAddDialog] = useState();

  const toggleAddDialog = () => setAddDialog(v => !v);

  const handleSave = () => console.log('===========> ');

  return (
    <>
      {addDialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={handleSave}>
          {formikProps => (
            <AddProjectSecurity
              {...props}
              visible={addDialog}
              toggleDialog={toggleAddDialog}
              handleClose={toggleAddDialog}
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
          <Title> Project Security/ Caretaker Info</Title>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={{marginVertical: 20}}>
            {DATA.map(item => {
              return <ProjectSecurityDetails item={item} />;
            })}
          </View>
        </ScrollView>
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleAddDialog}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    borderWidth: 1,
    padding: 20,
    borderColor: '#4872F4',
    borderRadius: 10,
    marginVertical: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    margin: 10,
    flex: 1,
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
  phoneContainer: {
    margin: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    color: '#4872f4',
  },
  scrollView: {
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  rowData: {
    marginVertical: 8,
  },
  inputStyles: {
    marginVertical: 8,
  },
});

export default ProjectSecurity;
