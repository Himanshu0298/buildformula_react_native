import React, {useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Badge,
  Button,
  Caption,
  Dialog,
  Divider,
  FAB,
  IconButton,
  Menu,
  Portal,
  Subheading,
  Text,
  Title,
  TouchableRipple,
  withTheme,
} from 'react-native-paper';
import Layout from 'utils/Layout';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AutoDragSortableView from 'components/Atoms/AutoDragSortableView';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {useAlert} from 'components/Atoms/Alert';

const ROW_HEIGHT = 200;

const schema = Yup.object().shape({
  phase: Yup.string().trim().required('Required'),
});

function Chip({children}) {
  return <View style={styles.chipContainer}>{children}</View>;
}

function RenderPhase(props) {
  const {
    theme,
    items,
    item,
    index,
    sortable,
    menuIndex,
    toggleMenu,
    toggleSortable,
    navToSubPhases,
    onEdit,
    onDelete,
  } = props;

  const {
    phase_title,
    phase_type_id,
    start_date,
    end_date,
    duration,
    notifications,
  } = item;

  return (
    <View style={styles.phaseContainer}>
      <View style={styles.bulletContainer}>
        {sortable ? (
          <MaterialIcon
            name="drag-indicator"
            size={24}
            color="rgba(4, 29, 54, 0.15)"
          />
        ) : (
          <>
            <View
              style={[
                styles.line,
                index === 0 && {top: 20},
                index === items.length - 1 && {height: 20},
                {backgroundColor: theme.colors.primary},
              ]}
            />
            <Badge style={{backgroundColor: theme.colors.primary}}>
              {index + 1}
            </Badge>
          </>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <TouchableRipple
          disabled={sortable}
          rippleColor="rgba(0, 0, 0, .1)"
          onPress={() => navToSubPhases(item)}>
          <>
            <View style={styles.detailsTop}>
              <View style={styles.rowBetween}>
                <Text style={{fontSize: 15, textTransform: 'capitalize'}}>
                  {phase_title}
                </Text>
                <Menu
                  visible={index === menuIndex}
                  contentStyle={{borderRadius: 10}}
                  onDismiss={toggleMenu}
                  anchor={
                    <IconButton
                      disabled={sortable}
                      icon="dots-vertical"
                      size={18}
                      onPress={() => toggleMenu(index)}
                    />
                  }>
                  <Menu.Item
                    style={styles.menuItem}
                    icon="pencil"
                    onPress={onEdit}
                    title="Rename"
                  />
                  <Divider />
                  <Menu.Item
                    style={styles.menuItem}
                    icon="delete"
                    onPress={onDelete}
                    title="Delete"
                  />
                  <Divider />
                  <Menu.Item
                    style={styles.menuItem}
                    icon="drag-vertical"
                    onPress={toggleSortable}
                    title="Arrange"
                  />
                </Menu>
              </View>
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Caption>Duration: </Caption>
                  <Text style={styles.value}>{duration} Days</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.value}>
                    {phase_type_id === 1 ? 'NORMAL' : 'CONSTRUCTION'}
                  </Text>
                </View>
              </View>
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Caption>Start: </Caption>
                  <Text style={styles.value}>{start_date}</Text>
                </View>
                <View style={styles.row}>
                  <Caption>Finish: </Caption>
                  <Text style={styles.value}>{end_date}</Text>
                </View>
              </View>
            </View>
            <Divider />
            <View style={styles.detailsBottom}>
              <Caption>Notification:</Caption>
              <View style={{width: '97%'}}>
                <ScrollView
                  horizontal
                  contentContainerStyle={{flexGrow: 1}}
                  showsHorizontalScrollIndicator={false}>
                  {notifications.map((notification, i) => (
                    <Chip key={i}>
                      <Caption>{notification.title}</Caption>
                    </Chip>
                  ))}
                </ScrollView>
              </View>
            </View>
          </>
        </TouchableRipple>
      </View>
    </View>
  );
}

function AddDialog(props) {
  const {theme, open, selectedPhase, handleClose, onSave, onUpdate} = props;

  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleClose} style={{top: -100}}>
        <View style={styles.dialogTitleContainer}>
          <Text>{selectedPhase ? 'Update Phase' : 'Add new Phase'}</Text>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{phase: selectedPhase?.phase_title}}
          validationSchema={schema}
          onSubmit={selectedPhase ? onUpdate : onSave}>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.dialogContentContainer}>
                <RenderInput
                  name="phase"
                  label={t('label_phase')}
                  containerStyles={styles.input}
                  value={values.phase}
                  onChangeText={handleChange('phase')}
                  onBlur={handleBlur('phase')}
                  onSubmitEditing={handleSubmit}
                  error={errors.phase}
                />
                <View style={styles.noteContainer}>
                  <Caption style={{lineHeight: 13}}>
                    <Text style={{color: theme.colors.primary}}>NOTE:</Text>{' '}
                    Duration ,Start Date and Finish Date will be calculated
                    automatically from its Sub Phases and Activitiy Data.
                  </Caption>
                </View>

                <View style={styles.dialogActionContainer}>
                  <Button
                    style={{width: '40%'}}
                    mode="contained"
                    contentStyle={{padding: 1}}
                    theme={{roundness: 15}}
                    onPress={handleSubmit}>
                    {selectedPhase ? 'Update' : 'Save'}
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

function EmptyComponent() {
  return (
    <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Caption>No Phases Found.</Caption>
    </View>
  );
}

function Phases(props) {
  const {theme, navigation} = props;

  const alert = useAlert();

  const {getPhases, addPhase, updatePhase, deletePhase, updatePhaseOrder} =
    useProjectManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {loading, refreshing, phases} = useSelector(s => s.projectManagement);

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [sortable, setSortable] = React.useState(false);
  const [selectDialog, setSelectDialog] = React.useState(false);
  const [selectedPhase, setSelectedPhase] = React.useState();
  const [sortedData, setSortedData] = React.useState([]);

  useEffect(() => {
    getPhaseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPhaseList = refresh =>
    getPhases({project_id: selectedProject.id}, refresh);

  const toggleMenu = v => setMenuIndex(v);
  const toggleSortable = () => setSortable(v => !v);
  const toggleSelectDialog = () => setSelectDialog(v => !v);
  const toggleAddDialog = v => setAddDialog(v);
  const onStateChange = ({open}) => setSelectDialog(open);

  const saveSort = async () => {
    toggleSortable();
    const sorting = {};
    sortedData.map((item, index) => {
      sorting[item.id] = index;
      return item;
    });

    await updatePhaseOrder({sorting, project_id: selectedProject.id});
    getPhaseList();
  };

  const navToSubPhases = phase => {
    navigation.navigate('SubPhases', {phase});
  };

  const onAddNewPhase = async ({phase}) => {
    await addPhase({
      phase_title: phase,
      phase_type_id: addDialog === 'normal' ? 1 : 2,
      project_id: selectedProject.id,
    });

    getPhaseList();
    toggleAddDialog();
  };

  const onUpdatePhase = async ({phase}) => {
    await updatePhase({
      phase_title: phase,
      id: selectedPhase.id,
      project_id: selectedProject.id,
    });

    getPhaseList();
    setSelectedPhase();
    toggleAddDialog();
  };

  const onEditPhase = () => {
    setSelectedPhase(phases[menuIndex]);
    toggleMenu();
    toggleAddDialog(true);
  };

  const onDeletePhase = () => {
    const phaseId = phases[menuIndex].id;

    toggleMenu();

    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deletePhase({
          id: phaseId,
          project_id: selectedProject.id,
        }).then(() => {
          getPhaseList();
        });
      },
    });
  };

  const emptyComponent = () => <EmptyComponent />;

  return (
    <View style={styles.container}>
      {addDialog ? (
        <AddDialog
          {...props}
          open={Boolean(addDialog)}
          selectedPhase={selectedPhase}
          handleClose={toggleAddDialog}
          onSave={onAddNewPhase}
          onUpdate={onUpdatePhase}
        />
      ) : null}
      <Spinner visible={loading} textContent="" />
      <View style={styles.headingContainer}>
        <Subheading>Project planning</Subheading>
        <View style={styles.phasesHeadingContainer}>
          <Title style={{marginTop: 10}}>Phases</Title>
          {sortable ? (
            <View style={styles.row}>
              <OpacityButton
                opacity={0.15}
                color={theme.colors.primary}
                style={{borderRadius: 50, marginRight: 10}}
                onPress={saveSort}>
                <MaterialIcon
                  name="check"
                  color={theme.colors.primary}
                  size={14}
                />
              </OpacityButton>
              <OpacityButton
                opacity={0.15}
                color={theme.colors.error}
                style={{borderRadius: 50}}
                onPress={toggleSortable}>
                <MaterialIcon
                  name="close"
                  color={theme.colors.error}
                  size={14}
                />
              </OpacityButton>
            </View>
          ) : null}
        </View>
      </View>
      {sortable ? (
        <AutoDragSortableView
          dataSource={phases}
          maxScale={1.03}
          style={{width: '100%'}}
          childrenWidth={Layout.window.width}
          childrenHeight={ROW_HEIGHT}
          keyExtractor={(_, i) => i.toString()}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          renderItem={(item, index) => (
            <RenderPhase
              {...props}
              items={phases}
              item={item}
              index={index}
              sortable={sortable}
              menuIndex={menuIndex}
              toggleSortable={toggleSortable}
              toggleMenu={toggleMenu}
            />
          )}
          onDataChange={setSortedData}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={phases}
          extraData={phases}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(_, i) => i.toString()}
          ListEmptyComponent={emptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getPhaseList(true)}
            />
          }
          renderItem={({item, index}) => (
            <RenderPhase
              {...props}
              items={phases}
              item={item}
              index={index}
              sortable={sortable}
              menuIndex={menuIndex}
              toggleSortable={toggleSortable}
              toggleMenu={toggleMenu}
              navToSubPhases={navToSubPhases}
              onEdit={onEditPhase}
              onDelete={onDeletePhase}
            />
          )}
        />
      )}
      <FAB.Group
        open={selectDialog}
        style={styles.fab}
        fabStyle={{
          backgroundColor: selectDialog ? '#fff' : theme.colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        onPress={toggleSelectDialog}
        onStateChange={onStateChange}
        actions={[
          {
            label: 'Normal Type',
            icon: 'plus',
            onPress: () => toggleAddDialog('normal'),
          },
          {
            label: 'Construction Type',
            icon: 'star',
            onPress: () => toggleAddDialog('construction'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headingContainer: {
    marginBottom: 10,
  },
  phasesHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phaseContainer: {
    flexDirection: 'row',
    width: Layout.window.width - 30,
  },
  bulletContainer: {
    flexDirection: 'column',
    paddingTop: 20,
    position: 'relative',
    alignItems: 'center',
  },
  line: {
    width: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  detailsContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    flexGrow: 1,
    margin: 5,
  },
  detailsTop: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  detailsBottom: {
    padding: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 13,
  },
  chipContainer: {
    backgroundColor: 'rgba(4, 29, 54, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  menuItem: {
    height: 35,
  },
  fab: {
    position: 'absolute',
    right: 0,
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
  noteContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default withTheme(Phases);
