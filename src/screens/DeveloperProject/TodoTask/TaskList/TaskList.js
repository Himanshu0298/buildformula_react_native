import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Dialog, Divider, Portal, Text} from 'react-native-paper';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {debounce} from 'lodash';
import RenderInput from 'components/Atoms/RenderInput';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import useTodoActions from 'redux/actions/todoActions';
import {useAlert} from 'components/Atoms/Alert';
import useSalesActions from 'redux/actions/salesActions';
import MenuDialog from '../Components/MenuDialog';
import ShareTask from './ShareTask';

const DEFAULT_LIST = [
  {title: "Today's Task", name: 'calendar', action: 'todayTask'},
  {
    title: 'Important Task',
    name: 'star-circle-outline',
    action: 'importantTask',
  },
  {title: 'My Task', name: 'note-outline', action: 'myTask'},
];

function AddTaskCategory(props) {
  const {visible, selectedList, toggleDialog, onSubmit} = props;

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleDialog}
        style={styles.toggleDialog}>
        <View style={styles.dialogContainer}>
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
            <Text style={styles.dialogHeader}>
              {selectedList ? 'Update' : 'Add'} List
            </Text>
          </View>
          <View style={styles.taskInputDialog}>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{
                todo_id: selectedList?.id || undefined,
                listName: selectedList?.list_name || '',
              }}
              // validationSchema={schema}
              onSubmit={async values => onSubmit(values)}>
              {({values, errors, handleChange, handleBlur, handleSubmit}) => {
                return (
                  <View style={styles.dialogContentContainer}>
                    <RenderInput
                      name="listName"
                      label="Enter List Title"
                      containerStyles={styles.input}
                      value={values.listName}
                      onChangeText={handleChange('listName')}
                      onBlur={handleBlur('listName')}
                      onSubmitEditing={handleSubmit}
                      error={errors.listName}
                    />
                    <View style={styles.dialogActionContainer}>
                      <Button
                        style={styles.addWorkActionButton}
                        mode="contained"
                        contentStyle={styles.contentStyle}
                        theme={{roundness: 15}}
                        onPress={debounce(handleSubmit, 500)}>
                        {selectedList ? 'Update' : 'Save'}
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

function TaskList({navigation}) {
  const alert = useAlert();

  const [addActivityDialog, setAddActivityDialog] = React.useState(false);
  const [selectedList, setSelectedList] = React.useState();

  const {selectedProject} = useSelector(s => s.project);
  const {loading, TODO_LIST} = useSelector(s => s.todo);

  const {get_todo_list, add_todo_list, delete_todo_list, share_task} =
    useTodoActions();
  const {getAssignToData} = useSalesActions();

  const projectId = selectedProject.id;

  const loadList = () => {
    get_todo_list({
      project_id: projectId,
    });
  };

  React.useEffect(() => {
    loadList();
    getAssignToData({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDialog = () => setAddActivityDialog(v => !v);

  const [dialog, setDialog] = React.useState(false);

  const toggleModal = () => setDialog(v => !v);

  const OnSubmit = async values => {
    await add_todo_list({
      project_id: projectId,
      title: values?.listName,
      todo_id: values?.todo_id || 0,
    });
    await loadList({
      project_id: projectId,
    });
    await toggleDialog();
    setSelectedList(undefined);
  };

  const handleDelete = async list_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await delete_todo_list({
          project_id: projectId,
          list_id,
        });
        loadList();
      },
    });
  };

  const handleShare = async (share_list_id, userList) => {
    await share_task({
      project_id: projectId,
      share_list_id,
      share_id: userList,
    });
  };

  const navToSubtask = (action, title) =>
    navigation.navigate('SubTaskList', {action, title});

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <AddTaskCategory
        visible={addActivityDialog}
        selectedList={selectedList}
        toggleDialog={toggleDialog}
        onSubmit={OnSubmit}
      />
      <ShareTask
        open={dialog}
        handleClose={toggleModal}
        handleSubmit={handleShare}
        selectedList={selectedList}
      />
      <View style={styles.container}>
        <View style={styles.headerContainer} />
        <View style={styles.headingContainer2}>
          <Text style={styles.subHeading}>Task List</Text>
          <View style={styles.buttonContainer}>
            <OpacityButton
              mode="contained"
              opacity={0.2}
              onPress={toggleDialog}>
              <MaterialCommunityIcons name="plus" size={16} color="#005BE4" />
              <Text style={styles.add}>Add List</Text>
            </OpacityButton>
          </View>
        </View>
        <Divider />
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          {DEFAULT_LIST.map((ele, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => navToSubtask(ele.action, ele.title)}>
                  <View style={styles.sectionContainer}>
                    <View style={styles.taskContainer}>
                      <View style={styles.calenderIcon}>
                        <MaterialCommunityIcons
                          name={ele.name}
                          size={23}
                          color="black"
                        />
                      </View>
                      <Text style={styles.subHeading}>{ele.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <Divider />
              </View>
            );
          })}
          {TODO_LIST?.map((ele, index) => {
            return (
              <View key={ele.id}>
                <TouchableOpacity
                  onPress={() => navToSubtask(ele.id, ele.list_name)}>
                  <View style={styles.sectionContainer}>
                    <View style={styles.taskContainer}>
                      <View style={styles.calenderIcon}>
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={23}
                          color="black"
                        />
                      </View>
                      <Text style={styles.subHeading}>{ele?.list_name}</Text>
                    </View>
                    <MenuDialog
                      onUpdate={() => {
                        toggleDialog();
                        setSelectedList(ele);
                      }}
                      handleDelete={handleDelete}
                      item={ele}
                      onShare={() => {
                        toggleModal();
                        setSelectedList(ele);
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <Divider />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
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

  buttonContainer: {
    padding: 10,
    width: 100,
  },

  dialogContainer: {
    margin: 10,
  },

  subHeading: {
    fontSize: 17,
    margin: 10,
    alignItems: 'center',
  },

  taskContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2,
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
