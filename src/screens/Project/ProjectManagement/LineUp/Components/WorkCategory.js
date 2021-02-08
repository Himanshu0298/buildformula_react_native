import RenderDropDown from 'components/Atoms/RenderDropDown';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Button,
  Caption,
  Dialog,
  Divider,
  FAB,
  IconButton,
  Menu,
  Portal,
  Text,
  withTheme,
} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import * as Yup from 'yup';

const WORK = [
  {title: 'work1'},
  {title: 'work1'},
  {title: 'work1'},
  {title: 'work1'},
  {title: 'work1'},
  {title: 'work1'},
];

const ACTIVITY = [
  {title: 'Activity Name here', description: 'description'},
  {title: 'Activity Name here', description: 'description'},
  {title: 'Activity Name here', description: 'description'},
  {title: 'Activity Name here', description: 'description'},
];

const schema = Yup.object().shape({
  work: Yup.string().trim().required('Required'),
});

function AddWorkDialog(props) {
  const {visible, toggleDialog} = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Add work category</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{accepted: false}}
          validationSchema={schema}
          onSubmit={async (values) => {}}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="work"
                  label={t('label_work')}
                  containerStyles={styles.input}
                  value={values.work}
                  onChangeText={handleChange('work')}
                  onBlur={handleBlur('work')}
                  onSubmitEditing={handleSubmit}
                  error={errors.work}
                />
                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%'}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>{'Save'}</Text>
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

function AddActivityDialog(props) {
  const {visible, toggleDialog} = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Add work</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{accepted: false}}
          validationSchema={schema}
          onSubmit={async (values) => {}}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="activity"
                  label={t('label_activity_name')}
                  containerStyles={styles.input}
                  value={values.activity}
                  onChangeText={handleChange('activity')}
                  onBlur={handleBlur('activity')}
                  onSubmitEditing={handleSubmit}
                  error={errors.activity}
                />
                <RenderDropDown
                  name="unit"
                  label={t('label_select_unit')}
                  options={[
                    {label: 'sqft', value: 'sqft'},
                    {label: 'mt', value: 'mt'},
                    {label: 'km', value: 'km'},
                  ]}
                  containerStyles={styles.input}
                  value={values.unit}
                  error={errors.unit}
                  onChange={(value) => {
                    setFieldValue('unit', value);
                  }}
                />
                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%'}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    <Text theme={secondaryTheme}>{'Save'}</Text>
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
    </Portal>
  );
}

function RenderActivity(props) {
  const {item, index, menuIndex, toggleMenu} = props;

  return (
    <View style={styles.activityContainer}>
      <View style={styles.titleContainer}>
        <Text>
          {index + 1}. {item.title}
        </Text>
        <Caption>{item.description}</Caption>
      </View>
      <Menu
        visible={index === menuIndex}
        contentStyle={{borderRadius: 10}}
        onDismiss={toggleMenu}
        anchor={
          <IconButton icon="dots-vertical" onPress={() => toggleMenu(index)} />
        }>
        <Menu.Item icon="pencil" onPress={() => {}} title="Edit" />
        <Divider />
        <Menu.Item icon="delete" onPress={() => {}} title="Delete" />
      </Menu>
    </View>
  );
}

function RenderWork(props) {
  const {item, index, menuIndex, toggleMenu, onPress} = props;

  return (
    <TouchableOpacity
      style={styles.workContainer}
      onPress={() => onPress(item)}>
      <View style={styles.titleContainer}>
        <Text>{item.title}</Text>
      </View>
      <Menu
        visible={index === menuIndex}
        contentStyle={{borderRadius: 10}}
        onDismiss={toggleMenu}
        anchor={
          <IconButton icon="dots-vertical" onPress={() => toggleMenu(index)} />
        }>
        <Menu.Item icon="pencil" onPress={() => {}} title="Edit" />
        <Divider />
        <Menu.Item icon="delete" onPress={() => {}} title="Delete" />
      </Menu>
    </TouchableOpacity>
  );
}

function RenderWorks(props) {
  const {theme, setSelectedWork} = props;

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addWorkDialog, setAddWorkDialog] = React.useState(false);

  const toggleMenu = (v) => setMenuIndex(v);
  const toggleDialog = () => setAddWorkDialog((v) => !v);

  return (
    <>
      <AddWorkDialog visible={addWorkDialog} toggleDialog={toggleDialog} />
      <View style={styles.container}>
        <FlatList
          data={WORK}
          extraData={WORK}
          keyExtractor={(_, i) => i.toString()}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item, index}) => (
            <RenderWork
              {...{
                item,
                index,
                toggleMenu,
                menuIndex,
                onPress: setSelectedWork,
              }}
            />
          )}
        />
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleDialog}
        />
      </View>
    </>
  );
}

function RenderWorkActivities(props) {
  const {theme, selectedWork, setSelectedWork} = props;

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addActivityDialog, setAddActivityDialog] = React.useState(false);

  const toggleMenu = (v) => setMenuIndex(v);
  const toggleDialog = () => setAddActivityDialog((v) => !v);

  return (
    <>
      <AddActivityDialog
        visible={addActivityDialog}
        toggleDialog={toggleDialog}
      />

      <View style={styles.workHeadingContainer}>
        <IconButton
          icon="chevron-left"
          size={30}
          onPress={() => setSelectedWork()}
        />
        <View style={styles.workHeading}>
          <Text>{selectedWork.title}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={ACTIVITY}
          extraData={ACTIVITY}
          keyExtractor={(_, i) => i.toString()}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item, index}) => (
            <RenderActivity {...{item, index, toggleMenu, menuIndex}} />
          )}
        />
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleDialog}
        />
      </View>
    </>
  );
}

function WorkCategory(props) {
  const [selectedWork, setSelectedWork] = useState();

  if (selectedWork) {
    return (
      <RenderWorkActivities {...props} {...{selectedWork, setSelectedWork}} />
    );
  }

  return <RenderWorks {...props} setSelectedWork={setSelectedWork} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
  workContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10,
  },
  input: {marginVertical: 5},
  titleContainer: {
    flexGrow: 1,
  },
  dialogTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
  workHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workHeading: {
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginLeft: 0,
    flexGrow: 1,
  },
});

export default withTheme(WorkCategory);
