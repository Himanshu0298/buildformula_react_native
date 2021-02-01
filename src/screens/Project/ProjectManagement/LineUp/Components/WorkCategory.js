import BaseText from 'components/Atoms/BaseText';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Button,
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

function RenderItem(props) {
  const {item, index, menuIndex, toggleMenu} = props;

  return (
    <View style={styles.workContainer}>
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
    </View>
  );
}

function WorkCategory(props) {
  const {navigation, theme} = props;

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addWorkDialog, setAddWorkDialog] = React.useState(true);

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
            <RenderItem {...{item, index, toggleMenu, menuIndex}} />
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
});

export default withTheme(WorkCategory);
