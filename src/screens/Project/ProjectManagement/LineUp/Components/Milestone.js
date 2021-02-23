import React from 'react';
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
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {useAlert} from 'components/Atoms/Alert';

const ROW_HEIGHT = 50;

const schema = Yup.object().shape({
  milestone: Yup.string().trim().required('Required'),
});

function AddMilestoneDialog(props) {
  const {visible, toggleDialog, onSubmit} = props;

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
          initialValues={{}}
          validationSchema={schema}
          onSubmit={(values) => onSubmit(values)}>
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
  const {item, index, menuIndex, toggleMenu, onDelete} = props;

  return (
    <View style={styles.workContainer}>
      <View style={styles.titleContainer}>
        <MaterialIcon
          name="drag-indicator"
          size={24}
          color="rgba(4, 29, 54, 0.15)"
        />
        <CustomBadge label={(index + 1).toString()} style={styles.badge} />
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
        <Menu.Item
          icon="delete"
          onPress={() => onDelete(item.id)}
          title="Delete"
        />
      </Menu>
    </View>
  );
}

function Milestone(props) {
  const {theme, selectedProject, getMilestoneData} = props;

  const alert = useAlert();

  const {milestones} = useSelector((state) => state.projectManagement);

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  const {
    createLineupEntity,
    updateMilestoneOrder,
    deleteLineupEntity,
  } = useProjectManagementActions();

  const toggleMenu = (v) => setMenuIndex(v);
  const toggleDialog = () => setShowDialog((v) => !v);

  const createMilestone = ({milestone}) => {
    createLineupEntity({
      title: milestone,
      type: 'milestone',
      project_id: selectedProject.id,
    }).then(() => {
      toggleDialog();
      getMilestoneData();
    });
  };

  const handleDragEnd = (fromIndex, toIndex) => {
    // TODO: update ordering request based on changes in api by nilesh
    updateMilestoneOrder({
      id: milestones[fromIndex].id,
      order_by: toIndex,
    }).then(() => {
      getMilestoneData();
    });
  };

  const handleDelete = (id) => {
    toggleMenu();
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteLineupEntity({id, type: 'milestone'}).then(() => {
          getMilestoneData();
        });
      },
    });
  };

  return (
    <>
      <AddMilestoneDialog
        visible={showDialog}
        toggleDialog={toggleDialog}
        onSubmit={createMilestone}
      />
      <View style={styles.container}>
        {milestones.length ? (
          <AutoDragSortableView
            dataSource={milestones}
            maxScale={1.03}
            style={{width: '100%'}}
            childrenWidth={Layout.window.width}
            childrenHeight={ROW_HEIGHT}
            keyExtractor={(_, i) => i.toString()}
            renderItem={(item, index) => (
              <RenderMilestone
                {...{
                  item,
                  index,
                  menuIndex,
                  toggleMenu,
                  onDelete: handleDelete,
                }}
              />
            )}
            onDataChange={(data) => {
              console.log('-----> onDataChange', data);
            }}
            onDragEnd={handleDragEnd}
          />
        ) : (
          <NoResult />
        )}
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
