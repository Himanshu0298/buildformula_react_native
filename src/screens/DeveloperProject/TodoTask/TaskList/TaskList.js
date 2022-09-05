import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Button,
  Caption,
  Dialog,
  Divider,
  Portal,
  Text,
} from 'react-native-paper';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import TaskMenu from '../Components/MenuDialog';

const arr = [
  {title: "Today's Task", name: 'calendar'},
  {title: 'Important Task', name: 'star-circle-outline'},
  {title: 'My Task', name: 'note-outline'},
  {title: 'Sales Task', name: 'chevron-right'},
  {title: 'Dev Task', name: 'chevron-right'},
];

function AddTaskCategory(props) {
  const {visible, selectedCategory, toggleDialog, onSubmit} = props;

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleDialog}
        style={styles.toggleDialog}>
        <View style={{margin: 10}}>
          <View style={styles.dialogTitleContainer}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.error}
              style={styles.closeButton}
              onPress={toggleDialog}>
              <MaterialCommunityIcons
                name="close"
                size={15}
                color={theme.colors.error}
              />
            </OpacityButton>
            <Text style={styles.dialogHeader}>Add List</Text>
          </View>
          <View style={styles.taskInputDialog}>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{work: selectedCategory?.title}}
              // validationSchema={schema}
              onSubmit={async values => onSubmit(values)}>
              {({values, errors, handleChange, handleBlur, handleSubmit}) => {
                return (
                  <View style={styles.dialogContentContainer}>
                    <RenderInput
                      name="Enter list title"
                      label="Enter List Title"
                      containerStyles={styles.input}
                      value={values.work}
                      onChangeText={handleChange('task')}
                      onBlur={handleBlur('task')}
                      onSubmitEditing={handleSubmit}
                      error={errors.work}
                    />
                    <View style={styles.dialogActionContainer}>
                      <Button
                        style={styles.addWorkActionButton}
                        mode="contained"
                        contentStyle={styles.contentStyle}
                        theme={{roundness: 15}}
                        onPress={handleSubmit}>
                        {selectedCategory ? 'Update' : 'Save'}
                      </Button>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
}

function TaskList(props) {
  const {navigation, onUpdate, onDelete, onShare} = props;

  const [addActivityDialog, setAddActivityDialog] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState();

  const toggleDialog = () => setAddActivityDialog(v => !v);

  const handleSubmit = () => {
    toggleDialog();
  };

  const navToSubtask = () => navigation.navigate('SubTaskList');
  const navToShare = () => navigation.navigate('ShareTask');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer} />
      <View style={styles.headingContainer2}>
        <Text style={styles.subHeading}>Task List</Text>
        <View style={{padding: 10, width: 100}}>
          <OpacityButton mode="contained" opacity={0.2} onPress={toggleDialog}>
            <MaterialCommunityIcons name="plus" size={16} color="#005BE4" />
            <Text style={styles.add}>Add</Text>
          </OpacityButton>
        </View>
      </View>
      <AddTaskCategory
        visible={addActivityDialog}
        selectedCategory={selectedCategory}
        toggleDialog={toggleDialog}
        onSubmit={handleSubmit}
      />
      <Divider />
      {arr.map((ele, index) => {
        return (
          <View>
            <TouchableOpacity onPress={navToSubtask}>
              <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.taskContainer}>
                  <View style={styles.calenderIcon}>
                    <MaterialCommunityIcons
                      name={ele.name}
                      size={23}
                      color="black"
                    />
                  </View>
                  <Text style={styles.subHeading}>{ele.title}</Text>
                </TouchableOpacity>
                <TaskMenu
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onShare={navToShare}
                />
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        );
      })}
    </View>
  );
}
export default TaskList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // margin: 10,
  },

  add: {
    color: '#005BE4',
  },

  subHeading: {
    fontSize: 17,
    margin: 10,
    alignItems: 'center',
  },

  taskContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calenderIcon: {
    marginLeft: 15,
    marginRight: 20,
  },
  headingContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInputDialog: {
    marginTop: 25,
  },

  input: {
    marginVertical: 5,
  },

  closeButton: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
  },

  toggleDialog: {
    top: -100,
  },
  dialogTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },

  dialogHeader: {
    color: '#000',
    margin: 5,
    fontSize: 20,
  },
  dialogContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dialogActionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addWorkActionButton: {
    width: '40%',
  },
  contentStyle: {
    padding: 1,
  },
});
