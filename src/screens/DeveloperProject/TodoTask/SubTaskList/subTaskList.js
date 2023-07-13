import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  Caption,
  Dialog,
  FAB,
  Paragraph,
  Portal,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {RefreshControl, TouchableOpacity} from 'react-native-gesture-handler';
import useTodoActions from 'redux/actions/todoActions';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import RenderInput from 'components/Atoms/RenderInput';
import {theme} from 'styles/theme';
import {Formik} from 'formik';
import {useAlert} from 'components/Atoms/Alert';
import Layout from 'utils/Layout';
import NoResult from 'components/Atoms/NoResult';
import Spinner from 'react-native-loading-spinner-overlay';
import MenuDialog from '../Components/MenuDialog';
import ShareTask from '../TaskList/ShareTask';

function RenderTodoCard(props) {
  const {item, toggleComplete, toggleFavorite, navToDetails} = props;
  const {
    id,
    task_title,
    due_date,
    reminder_date,
    important,
    completed,
    sub_task_count,
    user,
  } = item || {};

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.subCardContainer}>
            <OpacityButton
              opacity={0}
              onPress={() => toggleComplete(id, completed)}>
              <MaterialCommunityIcons
                name={
                  completed
                    ? 'checkbox-marked-circle'
                    : 'checkbox-blank-circle-outline'
                }
                size={25}
                color={completed ? '#005BE4' : 'rgba(4, 29, 54, 0.15)'}
                style={styles.circle}
              />
            </OpacityButton>

            <TouchableOpacity onPress={() => navToDetails(id)}>
              <Paragraph
                numberOfLines={1}
                style={[
                  styles.successParagraph,
                  completed ? {textDecorationLine: 'line-through'} : {},
                  {width: Layout.window.width - 135},
                ]}>
                {task_title}
              </Paragraph>
              <Caption>
                {`${sub_task_count || ''} • ${due_date} • ${reminder_date}`}
              </Caption>
              <Caption style={{color: '#000'}}>{user}</Caption>
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <OpacityButton
              opacity={0}
              onPress={() => toggleFavorite(id, important)}>
              <MaterialCommunityIcons
                name={important ? 'star' : 'star-outline'}
                size={23}
                color={important ? '#FFC700' : undefined}
              />
            </OpacityButton>
          </View>
        </View>
      </View>
    </View>
  );
}

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
                todo_id: selectedList?.action || undefined,
                listName: selectedList?.title || '',
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
                        onPress={handleSubmit}>
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

function SubTaskList(props) {
  const {navigation, route} = props;
  const alert = useAlert();

  const {action, title} = route.params || '';

  const [listTitle, setListTitle] = React.useState(title);

  const [dialog, setDialog] = React.useState(false);
  const toggleModal = () => setDialog(v => !v);

  const [addActivityDialog, setAddActivityDialog] = React.useState(false);
  const toggleDialog = () => setAddActivityDialog(v => !v);

  const {selectedProject} = useSelector(s => s.project);
  const {TODO_COMPLETED_TASKS, TODO_TASKS, loading} = useSelector(s => s.todo);

  const {
    get_todo_list_tasks,
    share_task,
    add_todo_list,
    delete_todo_list,
    get_todo_list,
    mark_task_important,
    mark_task_complete,
  } = useTodoActions();
  const {getAssignToData} = useSalesActions();

  const projectId = selectedProject.id;

  const loadLists = () => {
    get_todo_list({
      project_id: projectId,
    });
  };

  const loadTasks = () => {
    get_todo_list_tasks({
      project_id: projectId,
      action_type: action,
    });
  };

  React.useEffect(() => {
    loadTasks();
    getAssignToData({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navToAdd = () => navigation.navigate('AddTask', {action});

  const navToDetails = taskID =>
    navigation.navigate('TaskDetails', {taskID, loadTasks, loadLists});

  const toggleComplete = async (id, complete) => {
    await mark_task_complete({
      project_id: projectId,
      task_id: id,
      task_completed: complete ? String(0) : String(1),
    });
    await loadTasks();
  };

  const toggleFavorite = async (id, important) => {
    await mark_task_important({
      project_id: projectId,
      task_id: id,
      task_important: important ? String(0) : String(1),
    });
    await loadTasks();
  };

  const handleShare = async (share_list_id, userList) => {
    await share_task({
      project_id: projectId,
      share_list_id,
      share_id: userList,
    });
  };

  const OnSubmit = async values => {
    const res = await add_todo_list({
      project_id: projectId,
      title: values?.listName,
      todo_id: values?.todo_id || 0,
    });
    await setListTitle(res?.value?.list_name);
    await loadLists({
      project_id: projectId,
    });
    await toggleDialog();
    // setSelectedList(undefined);
  };

  const handleDelete = async () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await delete_todo_list({
          project_id: projectId,
          list_id: action,
        });
        await loadLists();
        await navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <AddTaskCategory
        visible={addActivityDialog}
        selectedList={route.params}
        toggleDialog={toggleDialog}
        onSubmit={OnSubmit}
      />
      <ShareTask
        open={dialog}
        handleClose={toggleModal}
        handleSubmit={handleShare}
        selectedList={action}
      />
      <View style={styles.headingContainer2}>
        <View style={styles.subContainer}>
          <OpacityButton
            opacity={0.2}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialIcon name="keyboard-backspace" color="#4872f4" size={20} />
          </OpacityButton>
          <Subheading>{listTitle}</Subheading>
        </View>
        {Number(action) ? (
          <MenuDialog
            onUpdate={() => {
              toggleDialog();
            }}
            handleDelete={handleDelete}
            onShare={() => {
              toggleModal();
            }}
          />
        ) : undefined}
      </View>
      {/* <AutoDragSortableView
        dataSource={milestones}
        maxScale={1.03}
        style={styles.autoDragView}
        childrenWidth={Layout.window.width}
        childrenHeight={ROW_HEIGHT}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => <RenderTaskList />}
      /> */}
      <View style={{flex: TODO_COMPLETED_TASKS?.length ? 0.5 : 1}}>
        <FlatList
          data={TODO_TASKS}
          extraData={TODO_TASKS}
          keyExtractor={(_, index) => String(index)}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={loadTasks} />
          }
          renderItem={({item}) => (
            <RenderTodoCard
              item={item}
              toggleComplete={toggleComplete}
              toggleFavorite={toggleFavorite}
              navToDetails={navToDetails}
            />
          )}
          ListEmptyComponent={<NoResult />}
        />
      </View>
      {TODO_COMPLETED_TASKS?.length ? (
        <View style={styles.content}>
          <View style={styles.completeHeadingContainer}>
            <Text style={styles.completedHeading}>Completed</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="black"
            />
          </View>
          <FlatList
            data={TODO_COMPLETED_TASKS}
            extraData={TODO_COMPLETED_TASKS}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item}) => (
              <RenderTodoCard
                item={item}
                toggleComplete={toggleComplete}
                toggleFavorite={toggleFavorite}
                navToDetails={navToDetails}
              />
            )}
          />
        </View>
      ) : null}
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={navToAdd}
      />
    </View>
  );
}

export default withTheme(SubTaskList);

const styles = StyleSheet.create({
  content: {
    flex: 0.5,
  },
  container: {
    flexGrow: 1,
    padding: 10,
  },
  cardContainer: {
    marginVertical: 5,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completeHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  subCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 0,
    paddingVertical: 12,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  circle: {
    margin: 12,
    marginRight: 10,
    marginLeft: 0,
  },
  completedHeading: {
    fontSize: 17,
  },
  successParagraph: {
    fontSize: 12,
    color: '#005BE4',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ' rgba(72, 114, 244, 0.1)',
    borderRadius: 10,
  },
  headingContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  backButton: {
    borderRadius: 50,
    marginRight: 10,
    width: 30,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
    color: 'red',
  },
  dialogContainer: {
    margin: 10,
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
    flex: 1,
  },
});
