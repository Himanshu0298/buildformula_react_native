import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AutoDragSortableView} from 'react-native-drag-sort';
import {
  Dialog,
  Button,
  Divider,
  FAB,
  IconButton,
  Menu,
  Portal,
  Text,
  withTheme,
} from 'react-native-paper';
import Layout from 'utils/Layout';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomBadge from 'components/Atoms/CustomBadge';
import {secondaryTheme} from 'styles/theme';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';

const ROW_HEIGHT = 50;

const schema = Yup.object().shape({
  milestone: Yup.string().trim().required('Required'),
});

function AddMilestoneDialog(props) {
  const {visible, toggleDialog} = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text style={{color: '#000'}}>Add Milestone</Text>
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
                  name="milestone"
                  label={t('label_milestone')}
                  containerStyles={styles.input}
                  value={values.milestone}
                  onChangeText={handleChange('milestone')}
                  onBlur={handleBlur('milestone')}
                  onSubmitEditing={handleSubmit}
                  error={errors.milestone}
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

function RenderMilestone(props) {
  const {item, index, menuIndex, toggleMenu} = props;

  return (
    <View style={styles.workContainer}>
      <View style={styles.titleContainer}>
        <MaterialIcon
          name="drag-indicator"
          size={24}
          color="rgba(4, 29, 54, 0.15)"
        />
        <CustomBadge label={index + 1} style={styles.badge} />
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

function Milestone(props) {
  const {navigation, theme} = props;

  const [work] = useState([
    {title: 'Work1'},
    {title: 'Work2'},
    {title: 'Work3'},
    {title: 'Work4'},
    {title: 'Work5'},
  ]);
  const [menuIndex, setMenuIndex] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(true);

  const toggleMenu = (v) => setMenuIndex(v);
  const toggleDialog = () => setShowDialog((v) => !v);

  return (
    <>
      <AddMilestoneDialog visible={showDialog} toggleDialog={toggleDialog} />
      <View style={styles.container}>
        <AutoDragSortableView
          dataSource={work}
          maxScale={1.03}
          style={{width: '100%'}}
          childrenWidth={Layout.window.width}
          childrenHeight={ROW_HEIGHT}
          keyExtractor={(_, i) => i.toString()}
          renderItem={(item, index) => (
            <RenderMilestone {...{item, index, menuIndex, toggleMenu}} />
          )}
          onDataChange={(data) => {
            console.log('-----> onDataChange', data);
          }}
        />
      </View>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={toggleDialog}
      />
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
    width: Layout.window.width,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    height: 18,
    width: 18,
    marginHorizontal: 5,
    borderRadius: 3,
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

export default withTheme(Milestone);
