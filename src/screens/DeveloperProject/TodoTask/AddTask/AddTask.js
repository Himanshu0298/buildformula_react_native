import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Subheading, Text, withTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {theme} from 'styles/theme';
import {useImagePicker} from 'hooks';
import ActionButtons from 'components/Atoms/ActionButtons';
import useTodoActions from 'redux/actions/todoActions';
import {useSelector} from 'react-redux';
import Layout from 'utils/Layout';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import {getUniqueOptions} from 'utils/constant';

const schema = Yup.object().shape({
  taskName: Yup.string().required('Required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, index) => {
          return (
            <View key={attachment.name}>
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View style={{width: Layout.window.width - 150}}>
                  <Text
                    style={[styles.verticalFlex, styles.text]}
                    numberOfLines={1}>
                    {attachment.name}
                  </Text>
                </View>
              </View>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.error}
                style={styles.closeButton}
                onPress={() => handleDelete(index)}>
                <MaterialIcon
                  name="close"
                  color={theme.colors.error}
                  size={17}
                />
              </OpacityButton>
            </View>
          );
        })}
      </View>
    </View>
  );
};

function RenderSubTaskItem(props) {
  const {task, index, handleDelete, handleComplete} = props;

  return (
    <View style={styles.subTaskContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => handleComplete(index)}>
          <MaterialCommunityIcons
            name={
              Object.values(task)[0]
                ? 'checkbox-marked-circle'
                : 'checkbox-blank-circle-outline'
            }
            size={25}
            color={Object.values(task)[0] ? '#005BE4' : 'rgba(4, 29, 54, 0.15)'}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 6,
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.verticalFlex,
              styles.text,
              Object.values(task)[0]
                ? {textDecorationLine: 'line-through'}
                : {},
              {width: Layout.window.width - 150, flexWrap: 'wrap'},
            ]}>
            {Object.keys(task)[0]}
          </Text>
        </View>
      </View>
      <OpacityButton
        opacity={0.1}
        color={theme.colors.error}
        style={{borderRadius: 50, alignSelf: 'flex-start'}}
        onPress={() => handleDelete(index)}>
        <MaterialIcon name="close" color={theme.colors.error} size={17} />
      </OpacityButton>
    </View>
  );
}

function RenderSubTask(props) {
  const {tasks, handleDelete, handleComplete} = props;
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>SubTasks</Text>
        </View>
        {tasks?.map((task, index) => {
          return (
            <RenderSubTaskItem
              task={task}
              index={index}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
            />
          );
        })}
      </View>
    </View>
  );
}

function CreateTask(props) {
  const {formikProps, navigation} = props;
  const {assigntoData} = useSelector(s => s.sales);
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
  } = formikProps;

  const {openImagePicker} = useImagePicker();

  const assigntoOptions = React.useMemo(() => {
    return getUniqueOptions(
      assigntoData?.map(i => ({
        label: `${i.first_name} ${i.last_name}`,
        value: i.id,
      })),
    );
  }, [assigntoData]);

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values.attachments || [];
        attachments.push(file);
        setFieldValue('attachments', attachments);
      },
    });
  };

  const handleDelete = i => {
    values.attachments.splice(i, 1);
    setFieldValue('attachments', values.attachments);
  };

  const handleCancel = i => {
    values.subTaskList.splice(i, 1);
    setFieldValue('subTaskList', values.subTaskList);
  };

  const handleSubTasks = React.useCallback(() => {
    setFieldValue('subTaskList', [
      ...values.subTaskList,
      {[values.subTask]: 0},
    ]);
    setFieldValue('subTask', '');
  }, [setFieldValue, values.subTask, values.subTaskList]);

  const completeSubTask = index => {
    const item = values.subTaskList[index];
    const key = Object.keys(item)[0];
    const _subTaskList = [...values.subTaskList];
    _subTaskList[index][key] = _subTaskList[index][key] === 0 ? 1 : 0;

    setFieldValue('subTaskList', _subTaskList);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.form}>
          <RenderInput
            name="taskName"
            label="Task Name"
            // containerStyles={styles.input}
            value={values.taskName}
            onChangeText={handleChange('taskName')}
            onBlur={handleBlur('taskName')}
            error={errors.taskName}
          />
          <RenderDatePicker
            name="dueDate"
            label="Due date"
            // ref={dateRef}
            containerStyles={styles.input}
            value={values.dueDate}
            onChange={v => setFieldValue('dueDate', v)}
            error={errors.dueDate}
          />
          <RenderDatePicker
            name="reminderDate"
            label="Add Reminder"
            containerStyles={styles.input}
            value={values.reminderDate}
            onChange={v => setFieldValue('reminderDate', v)}
            error={errors.reminderDate}
          />

          <RenderSelect
            name="assignee"
            label="Assign"
            containerStyles={styles.input}
            options={assigntoOptions}
            value={values.assignee}
            onSelect={value => {
              setFieldValue('assignee', value);
            }}
            onBlur={handleBlur('assignee')}
            error={errors.assignee}
          />
          {values.subTaskList.length ? (
            <RenderSubTask
              tasks={values.subTaskList}
              handleDelete={i => handleCancel(i)}
              handleComplete={completeSubTask}
            />
          ) : null}
          <RenderInput
            name="subTask"
            label="Add SubTask"
            containerStyles={styles.input}
            value={values.subTask}
            onChangeText={handleChange('subTask')}
            onBlur={handleBlur('subTask')}
            error={errors.subTask}
          />

          <View style={styles.opacityButton}>
            <OpacityButton
              onPress={handleSubTasks}
              mode="contained"
              opacity={0.2}
              theme={{roundness: 15}}>
              <MaterialCommunityIcons
                name="plus"
                color={theme.colors.primary}
                size={18}
              />
              <Text style={styles.add}>Add Task</Text>
            </OpacityButton>
          </View>
          <RenderTextBox
            name="description"
            label="Description"
            containerStyles={styles.input}
            value={values.description}
            onChangeText={handleChange('description')}
            numberOfLines={4}
            onBlur={handleBlur('description')}
            error={errors.description}
          />

          <View>
            <Text style={[{color: theme.colors.primary}, styles.attachmentBox]}>
              Attachment
            </Text>
            <OpacityButton
              onPress={handleUpload}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.primary}}>
                <MaterialCommunityIcons
                  name="plus"
                  color={theme.colors.primary}
                  size={18}
                />
                Upload new File
              </Text>
            </OpacityButton>
            <RenderError error={errors.attachments} />
          </View>
          {values.attachments?.length ? (
            <RenderAttachments
              attachments={values.attachments}
              handleDelete={i => handleDelete(i)}
            />
          ) : null}
        </View>
        <ActionButtons
          submitLabel="Save"
          onCancel={navigation.goBack}
          onSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

function AddTask(props) {
  const {navigation, route} = props;

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const {get_todo_list_tasks, add_todo_task} = useTodoActions();

  const onSubmit = async values => {
    const {
      taskName,
      description,
      reminderDate,
      dueDate,
      subTaskList,
      attachments,
      assignee,
    } = values;

    const formData = new FormData();
    formData.append('project_id', projectId);
    formData.append('action_type', route.params.action || '');
    formData.append('task_title', taskName);
    formData.append('description', description);
    formData.append('due_date', dayjs(dueDate).format('YYYY-MM-DD'));
    formData.append(
      'reminder_date',
      dayjs(reminderDate).format('YYYY-MM-DD hh:mm:ss'),
    );
    formData.append('assign_to', assignee);
    formData.append('subtask', JSON.stringify(subTaskList));
    formData.append('filess', attachments[0]);

    await add_todo_task(formData);
    await get_todo_list_tasks({
      project_id: projectId,
      action_type: route.params.action,
    });
    await navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.subheader}>
          <View style={styles.headingContainer2}>
            <OpacityButton
              opacity={0.2}
              style={styles.backButton}
              onPress={navigation.goBack}>
              <MaterialIcon name="keyboard-backspace" color="#000" size={18} />
            </OpacityButton>

            <Subheading>Create Task</Subheading>
          </View>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{subTaskList: [], attachments: []}}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => <CreateTask {...props} formikProps={formikProps} />}
        </Formik>
      </View>
    </ScrollView>
  );
}

export default withTheme(AddTask);
const styles = StyleSheet.create({
  container: {flex: 1},
  input: {
    marginTop: 10,
  },
  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {fontSize: 15, marginTop: 10},

  attachmentBox: {
    marginTop: 20,
  },

  headingContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },

  form: {
    paddingHorizontal: 20,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 10,
    width: 30,
  },
  closeButton: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  add: {
    color: theme.colors.primary,
  },
  opacityButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    marginVertical: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  attachmentFileHeader: {
    color: '#000',
    fontSize: 15,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 7,
    marginHorizontal: 7,
    flexGrow: 1,
    position: 'relative',
  },
  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  subTaskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});
