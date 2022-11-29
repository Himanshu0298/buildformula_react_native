import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  Dialog,
  Portal,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {theme} from 'styles/theme';
import {useImagePicker} from 'hooks';
import ActionButtons from 'components/Atoms/ActionButtons';

function AddSubTask(props) {
  const {visible, selectedCategory, toggleDialog, onSubmit} = props;

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleDialog}
        style={styles.toggleDialog}>
        <View style={styles.dialogTitleContainer}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.error}
            style={styles.closeButton}
            onPress={toggleDialog}>
            <MaterialCommunityIcons name="close" size={17} />
          </OpacityButton>

          <Text style={styles.dialogHeader}>Add List</Text>
        </View>
        <View style={styles.taskInputDialog}>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{work: selectedCategory?.title}}
            // validationSchema={schema}
            onSubmit={onSubmit}>
            {({values, errors, handleChange, handleBlur, handleSubmit}) => {
              return (
                <View style={styles.dialogContentContainer}>
                  <RenderInput
                    name="addSubWok"
                    label="Add Sub Work"
                    containerStyles={styles.input}
                    value={values.addSubWok}
                    onChangeText={handleChange('addSubWok')}
                    onBlur={handleBlur('addSubWok')}
                    onSubmitEditing={handleSubmit}
                    error={errors.addSubWok}
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
      </Dialog>
    </Portal>
  );
}

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
                <View>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
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
  const {task, index, handleDelete} = props;
  return (
    <View>
      <MaterialIcon name="arrow-right-bottom" color="black" size={17} />
      <OpacityButton>
        <Feather
          name="circle"
          size={25}
          color="rgba(4, 29, 54, 0.15)"
          style={styles.circle}
        />
      </OpacityButton>
      <View>
        <Text style={(styles.verticalFlex, styles.text)} numberOfLines={1}>
          {task.name}
        </Text>
      </View>
      <OpacityButton
        opacity={0.1}
        color={theme.colors.error}
        style={styles.closeButton}
        onPress={() => handleDelete(index)}>
        <MaterialIcon name="close" color={theme.colors.error} size={17} />
      </OpacityButton>
    </View>
  );
}

function RenderSubTask(props) {
  const {tasks, handleDelete, type} = props;
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Add SubTask</Text>
        </View>
        {tasks?.map((task, index) => {
          return (
            <RenderSubTaskItem
              task={task}
              index={index}
              handleDelete={handleDelete}
            />
          );
        })}
      </View>
    </View>
  );
}

function CreateTask(props) {
  const {formikProps, navigation, type} = props;
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
  } = formikProps;

  const [addActivityDialog, setAddActivityDialog] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState();

  const {openImagePicker} = useImagePicker();

  const toggleDialog = () => setAddActivityDialog(v => !v);

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

  const handleSave = () => {
    toggleDialog();
  };

  const handleDelete = i => {
    values.attachments.splice(i, 1);
    setFieldValue('attachments', values.attachments);
  };

  const handleCancel = i => {
    values.tasks.splice(i, 1);
    setFieldValue('tasks', values.tasks);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.form}>
          <RenderSelect
            name="selectCategory"
            label="Task Name"
            // containerStyles={styles.input}
            value={values.selectCategory}
            // onChangeText={handleChange('selectCategory')}
            onBlur={handleBlur('selectCategory')}
            error={errors.selectCategory}
          />
          <RenderDatePicker
            name="date"
            label=" Due date"
            // ref={dateRef}
            containerStyles={styles.input}
            value={values.date}
            onChange={v => setFieldValue('date', v)}
            error={errors.date}
          />
          <RenderDatePicker
            mode="calendar-clock-outline"
            name="date"
            label="Add Reminder"
            containerStyles={styles.input}
            value={values.date}
            onChange={v => setFieldValue('date', v)}
            error={errors.date}
          />

          <RenderInput
            name="enterAssigneeName"
            label="Assign"
            containerStyles={styles.input}
            value={values.enterAssigneeName}
            onChangeText={handleChange('enterAssigneeName')}
            onBlur={handleBlur('enterAssigneeName')}
            error={errors.enterAssigneeName}
          />

          <RenderInput
            name="enterSubTaskName"
            label="Add SubTask"
            containerStyles={styles.input}
            value={values.enterSubTaskName}
            onChangeText={handleChange('enterSubTaskName')}
            onBlur={handleBlur('enterSubTaskName')}
            error={errors.enterSubTaskName}
          />

          <View style={styles.opacityButton}>
            <OpacityButton
              onPress={toggleDialog}
              mode="contained"
              opacity={0.2}
              theme={{roundness: 15}}>
              <MaterialCommunityIcons
                name="plus"
                color={theme.colors.primary}
                size={18}
              />
              <Text style={styles.add}>Add One more</Text>
            </OpacityButton>
            <AddSubTask
              visible={addActivityDialog}
              selectedCategory={selectedCategory}
              toggleDialog={toggleDialog}
              onSubmit={handleSave}
            />
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
          {type === 'edit' ? (
            <RenderSubTask
              tasks={values.tasks}
              handleDelete={i => handleCancel(i)}
            />
          ) : null}
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
  const {navigation} = props;

  const onSubmit = value => {
    console.log('-----> value', value);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subheader}>
          <View style={styles.headingContainer2}>
            <OpacityButton
              opacity={0.2}
              // color={theme.colors.primary}
              style={styles.backButton}
              onPress={navigation.goBack}>
              <MaterialIcon name="keyboard-backspace" color="#000" size={18} />
            </OpacityButton>

            <Subheading>Create Task</Subheading>
          </View>
          <View style={styles.starOpacity}>
            <OpacityButton opacity={0.2} style={styles.starButton}>
              <MaterialCommunityIcons
                name="star-outline"
                size={18}
                color="#4872F4"
              />
            </OpacityButton>
          </View>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{broker: 'no', userType: 'new'}}
          onSubmit={onSubmit}>
          {formikProps => <CreateTask {...props} formikProps={formikProps} />}
        </Formik>
      </View>
    </ScrollView>
  );
}
export default withTheme(AddTask);
const styles = StyleSheet.create({
  container: {flexGrow: 1},
  input: {
    marginTop: 10,
    // height: 90,
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
  toggleDialog: {
    top: -100,
  },
  dialogTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialogHeader: {
    color: '#000',
    marginTop: 20,
    marginBottom: -10,
  },
  closeButton: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  taskInputDialog: {
    marginTop: 25,
  },
  starOpacity: {
    alignSelf: 'flex-end',
    margin: 14,
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
  starButton: {
    borderRadius: 50,
    width: 30,
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
});
