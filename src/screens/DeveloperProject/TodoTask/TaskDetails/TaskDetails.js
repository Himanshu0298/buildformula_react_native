import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, Image} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FileIcon from 'assets/images/file_icon.png';
import {Caption, Text, withTheme} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import useTodoActions from 'redux/actions/todoActions';
import Layout from 'utils/Layout';
import {useAlert} from 'components/Atoms/Alert';

function TaskDetails(props) {
  const alert = useAlert();
  const {navigation, route} = props;

  const {taskID, loadLists, loadTasks, action} = route.params;

  const {TODO_COMPLETED_TASKS, TODO_TASKS, loading} = useSelector(s => s.todo);
  const {selectedProject} = useSelector(s => s.project);

  const {delete_task, mark_task_complete, mark_task_important} =
    useTodoActions();

  const projectId = selectedProject.id;

  const taskDetails =
    TODO_COMPLETED_TASKS?.find(e => e.id === taskID) ||
    TODO_TASKS?.find(e => e.id === taskID);

  const {
    task_title,
    description,
    sub_task,
    reminder_date,
    due_date,
    assign_to,
    attachments,
    completed,
    important,
  } = taskDetails || {};

  const navToEdit = () => {
    navigation.navigate('AddTask', {type: 'edit', taskID, action, taskDetails});
  };

  const toggleComplete = async (id, complete) => {
    await mark_task_complete({
      project_id: projectId,
      task_id: id,
      task_completed: complete ? String(0) : String(1),
    });
    await loadTasks();
  };

  const handleDelete = async () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await delete_task({
          project_id: projectId,
          task_id: taskID,
        });
        await loadLists();
        await loadTasks();
        await navigation.goBack();
      },
    });
  };

  const toggleFavorite = async () => {
    await mark_task_important({
      project_id: projectId,
      task_id: taskID,
      task_important: important ? String(0) : String(1),
    });
    await loadTasks();
  };

  return (
    <ScrollView>
      <Spinner visible={loading} textContent="" />
      <View style={styles.container}>
        <View style={styles.subContainer1}>
          <OpacityButton
            opacity={0.2}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialIcon name="keyboard-backspace" color="#000" size={20} />
          </OpacityButton>

          <Text style={styles.text}>Task Details</Text>
          <View style={styles.subContainer}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.error}
              onPress={handleDelete}
              style={styles.icons}>
              <MaterialCommunityIcons name="delete" size={18} color="#FF5D5D" />
            </OpacityButton>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              onPress={navToEdit}
              style={styles.icons}>
              <MaterialCommunityIcons
                name="pencil"
                size={18}
                color={theme.colors.primary}
              />
            </OpacityButton>
            <OpacityButton
              opacity={0.2}
              style={styles.icons}
              onPress={() => toggleFavorite()}>
              <MaterialCommunityIcons
                name={important ? 'star' : 'star-outline'}
                size={18}
                color={theme.colors.primary}
              />
            </OpacityButton>
          </View>
        </View>
        <View style={styles.tasks}>
          <TouchableOpacity
            opacity={0}
            onPress={() => toggleComplete(taskID, completed)}>
            <MaterialCommunityIcons
              name={
                completed
                  ? 'checkbox-marked-circle'
                  : 'checkbox-blank-circle-outline'
              }
              size={20}
              color="#005BE4"
              style={styles.circle}
            />
          </TouchableOpacity>
          <Text style={styles.header}>{task_title}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.textContainer}>{description}</Text>
        </View>
        <View>
          {sub_task?.map((element, index) => {
            return (
              <View style={styles.detailContainer}>
                <MaterialCommunityIcons
                  name={
                    element?.complete
                      ? 'checkbox-marked-circle'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={20}
                  color="#005BE4"
                  style={styles.circle}
                />
                <Text
                  style={
                    element?.complete
                      ? {textDecorationLine: 'line-through'}
                      : {}
                  }>
                  {element.title}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.captionContainer}>
          <Caption style={styles.caption}>Reminder :</Caption>
          <Text style={styles.value}>{reminder_date || ''}</Text>
        </View>
        <View style={styles.captionContainer}>
          <Caption style={styles.caption}>Due Date :</Caption>
          <Text style={styles.value}>{due_date || ''}</Text>
        </View>
        {assign_to ? (
          <>
            <View style={styles.captionContainer}>
              <Caption style={styles.caption}>Assignee:</Caption>
            </View>
            <View style={styles.headingContainer}>
              <View style={{padding: 5}}>
                <Text style={styles.textContainer}> {assign_to || ''}</Text>
              </View>
            </View>
          </>
        ) : undefined}
        {attachments?.length ? (
          <>
            <View style={styles.captionContainer}>
              <Caption style={styles.caption}>Attachments</Caption>
            </View>

            {attachments?.map((ele, index) => {
              return (
                <View style={styles.card}>
                  <View style={styles.cardContainer}>
                    <View style={styles.subCardContainer}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.pdfIcon}>
                          <Image source={FileIcon} style={styles.fileIcon} />
                        </View>
                        <View>
                          <View style={styles.InputContainer}>
                            <Text
                              numberOfLines={1}
                              style={{width: Layout.window.width - 150}}>
                              {ele.file_name}
                            </Text>
                            <View>
                              <Caption> {ele.file_size}</Caption>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.download}>
                      <AntDesign name="download" size={18} color="#4872F4" />
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

export default withTheme(TaskDetails);

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },

  value: {
    fontSize: 12,
    marginTop: 5,
  },

  header: {
    color: '#4872F4',
    margin: 5,
  },

  textContainer: {
    paddingTop: 4,
  },

  pdfIcon: {
    margin: 10,
    // backgroundColor: 'rgba(72, 114, 244, 0.2)',
  },

  tasks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  InputContainer: {
    paddingTop: 5,
  },

  download: {
    // alignSelf: 'flex-end',
    backgroundColor: 'rgba(72, 114, 244, 0.2)',
    padding: 8,
    borderRadius: 50,
    marginRight: 15,
  },

  card: {
    borderWidth: 1,
    margin: 5,
    borderColor: 'rgba(72, 114, 244, 0.2)',
    borderRadius: 5,
  },

  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 6,
  },

  description: {
    marginHorizontal: 15,
  },

  input: {
    fontStyle: 'italic',
  },

  text: {
    paddingTop: 5,
    fontSize: 15,
  },
  subContainer1: {
    flexDirection: 'row',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },

  caption: {
    margin: 15,
    fontSize: 13,
  },

  captionContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },

  icons: {
    borderRadius: 50,
    width: 28,
    marginRight: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 10,
    width: 30,
  },
  successParagraph: {
    textDecorationLine: 'line-through',
    fontSize: 12,
  },

  subCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#4872F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ' rgba(72, 114, 244, 0.1)',
    borderRadius: 5,
  },
  cardContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'rgba(4, 29, 54, 0.1)',
    borderRadius: 5,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
  },
});
