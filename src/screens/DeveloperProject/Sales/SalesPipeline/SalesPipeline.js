import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {
  Button,
  Caption,
  Dialog,
  Divider,
  Menu,
  Portal,
  Searchbar,
  Subheading,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import BaseText from 'components/Atoms/BaseText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Board, BoardRepository} from 'components/Molecules/Board/components';
import {useAlert} from 'components/Atoms/Alert';
import {getPermissions, getShadow} from 'utils';
import RenderInput from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
import {useSalesLoading} from 'redux/selectors';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import _ from 'lodash';
import {store} from 'redux/store';

function RenderContacts({item}) {
  const {get_user = {}, get_role = {}} = item?.get_role_user || {};

  return (
    <View style={styles.contactContainer}>
      <View style={styles.leftContainer}>
        <MaterialIcons
          name="drag-indicator"
          color="rgba(4,29,54,0.15)"
          size={30}
        />
        <View style={styles.visitorContainer}>
          <Subheading>
            {item.first_name} {item.last_name}
          </Subheading>
          <Caption>+91 {item.phone}</Caption>
        </View>
      </View>
      {/* <View style={styles.rightContainer}>
        <Subheading>
          {get_user?.first_name} {get_user?.last_name}
        </Subheading>
        <Caption>{get_role?.role_name}</Caption>
      </View> */}
    </View>
  );
}

function RenderHeader(props) {
  const {
    data = {},
    modulePermission,
    toggleModal,
    handleDelete,
    navigation,
  } = props;
  const {pipeline = {}, id} = data?.attributes?.data || {};
  const {id: pipelineId, title, get_visitors = []} = pipeline;

  return (
    <>
      <View style={styles.headContainer}>
        <Subheading>{title}</Subheading>
        <Subheading>{id}</Subheading>
        <View style={styles.iconContainer}>
          <OpacityButton
            color={theme.colors.primary}
            opacity={0.3}
            onPress={() => navigation.navigate('PipelineRearrange')}
            style={styles.icon}>
            <MaterialIcons
              name="drag-indicator"
              color="rgba(4,29,54,0.6)"
              size={19}
            />
          </OpacityButton>
          <TouchableOpacity style={styles.icon}>
            <MaterialIcons name="search" color="rgba(4,29,54,0.6)" size={19} />
          </TouchableOpacity>
          {modulePermission?.editor && modulePermission?.admin ? (
            <OpacityButton
              color={theme.colors.red}
              opacity={0.2}
              onPress={() => handleDelete(pipelineId, get_visitors.length)}
              style={styles.icon}>
              <MaterialIcons name="delete" color={theme.colors.red} size={19} />
            </OpacityButton>
          ) : null}
          <OpacityButton
            color={theme.colors.primary}
            opacity={0.3}
            style={[styles.icon, {paddingHorizontal: 8}]}>
            <BaseText style={{color: theme.colors.primary}}>
              {get_visitors.length}
            </BaseText>
          </OpacityButton>
        </View>
      </View>
      {modulePermission?.editor && modulePermission?.admin ? (
        <TouchableOpacity onPress={toggleModal} style={styles.addNewButton}>
          <Caption>+ Add contact</Caption>
        </TouchableOpacity>
      ) : null}
    </>
  );
}

function RenderAddNew({handleAddNew}) {
  const [stage, setStage] = React.useState('');

  return (
    <View style={styles.addNewContainer}>
      <Subheading>Add Pipeline stage</Subheading>
      <View style={styles.pipelineInput}>
        <RenderInput
          id="stage"
          label="Stage"
          value={stage}
          onChangeText={setStage}
        />
      </View>
      <Button
        mode="contained"
        theme={{roundness: 10}}
        onPress={() => {
          if (stage) {
            setStage();
            handleAddNew(stage);
          }
        }}>
        Save
      </Button>
    </View>
  );
}

function DotIndicator({count, selected}) {
  return (
    <View style={styles.dotContainer}>
      {new Array(count + 1).fill(0).map((item, index) => {
        const backgroundColor =
          index === selected ? theme.colors.primary : 'rgba(4,29,54,0.1)';

        return (
          <View
            key={index.toString()}
            style={[styles.dotIndicator, {backgroundColor}]}
          />
        );
      })}
    </View>
  );
}

function AddContactDialog({open, t, handleClose, moveContact}) {
  const [searchQuery, setSearchQuery] = React.useState();
  const [selectedVisitor, setSelectedVisitor] = React.useState();

  const {visitorSuggestions = []} = useSelector(s => s.sales);

  const filteredVisitors = React.useMemo(() => {
    if (searchQuery) {
      return visitorSuggestions?.filter(visitor => {
        return (
          visitor?.first_name?.includes(searchQuery) ||
          visitor?.last_name?.includes(searchQuery) ||
          visitor?.phone?.includes(searchQuery) ||
          visitor?.email?.includes(searchQuery)
        );
      });
    }
    return visitorSuggestions;
  }, [searchQuery, visitorSuggestions]);

  const onSearch = v => {
    setSearchQuery(v);
    if (!v || (v && selectedVisitor)) {
      setSelectedVisitor();
    }
  };

  return (
    <Portal>
      <Dialog
        visible={open}
        onDismiss={handleClose}
        style={{marginBottom: 200}}>
        <Dialog.Content>
          <View style={styles.addContactContainer}>
            <Subheading>Add Contact</Subheading>
            <Searchbar
              theme={{roundness: 12}}
              placeholder={t('label_search_visitors')}
              style={styles.searchBar}
              value={searchQuery}
              onChangeText={onSearch}
            />

            {filteredVisitors.length > 0 ? (
              <View style={styles.listContainer}>
                <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  keyboardShouldPersistTaps="handled">
                  {filteredVisitors.map((visitor, index) => {
                    const label = `${visitor.first_name} ${visitor.last_name}`;
                    return (
                      <TouchableOpacity
                        key={index?.toString()}
                        onPress={() => {
                          Keyboard.dismiss();
                          setSearchQuery(label);
                          setSelectedVisitor(visitor.id);
                        }}>
                        <Menu.Item
                          key={index}
                          icon="account-question-outline"
                          title={label}
                        />
                        <Divider />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            ) : null}

            <Button
              mode="contained"
              disabled={!_.isFinite(selectedVisitor)}
              contentStyle={{paddingVertical: 3, paddingHorizontal: 10}}
              theme={{roundness: 10}}
              style={{marginTop: 20, width: '100%'}}
              onPress={() => {
                moveContact(selectedVisitor);
                handleClose();
                setSearchQuery();
                setSelectedVisitor();
              }}>
              Move
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const RenderBoard = React.memo(props => {
  const {
    pipelines,
    setSelectedTab,
    deletePipeline,
    toggleModal,
    handleAddNew,
    moveContact,
    modulePermission,
  } = props;

  const alert = useAlert();

  const onDeletePipeline = (id, visitorCount) => {
    if (visitorCount > 0) {
      alert.show({
        title: 'Alert',
        message: 'Only empty cards can be deleted',
        dismissable: false,
        showCancelButton: false,
      });
      return;
    }

    deletePipeline(id);
  };

  const boardRepository = React.useMemo(() => {
    const data = pipelines.map((pipeline, i) => ({
      id: i + 1,
      name: pipeline.title,
      rows: pipeline.get_visitors || [],
      pipeline,
    }));

    if (modulePermission?.editor || modulePermission?.admin) {
      data.push({
        id: pipelines.length + 1,
        name: 'Add new',
        addNew: true,
        rows: [],
      });
    }

    return new BoardRepository(data);
  }, [modulePermission, pipelines]);

  const cardContent = item => <RenderContacts item={item} />;

  return (
    <View style={styles.boardContainer}>
      <Board
        boardBackground="#fff"
        boardRepository={boardRepository}
        dragDisabled={!(modulePermission?.editor || modulePermission?.admin)}
        renderHeader={column => (
          <RenderHeader
            {...props}
            data={column}
            modulePermission={modulePermission}
            toggleModal={toggleModal}
            handleDelete={onDeletePipeline}
          />
        )}
        cardContent={cardContent}
        renderAddNew={() => <RenderAddNew handleAddNew={handleAddNew} />}
        onChangeTab={setSelectedTab}
        open={() => console.log('-----> open')}
        onDragEnd={(srcColumnId, destColumnId, draggedItem) => {
          const {row} = draggedItem?.attributes || {};
          if (row?.id && srcColumnId !== destColumnId) {
            moveContact(row.id);
          }
        }}
      />
    </View>
  );
});

export default function SalesPipeline(props) {
  const {t} = useTranslation();

  const alert = useAlert();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showAddContact, setShowAddContact] = React.useState(false);

  const {getPipelineData, addPipeline, deletePipeline, moveVisitor} =
    useSalesActions();

  const {pipelines} = useSelector(s => s.sales);
  const {selectedProject} = useSelector(s => s.project);
  const {user} = useSelector(s => s.user);

  const loading = useSalesLoading();

  const sortedPipelines = pipelines.sort((a, b) => a.order_by - b.order_by);

  const modulePermission = getPermissions('Sales Pipeline');
  const {isProjectAdmin} = store.getState().project;

  React.useEffect(() => {
    loadPipelines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPipelines = () =>
    getPipelineData({
      project_id: selectedProject.id,
      role: modulePermission?.admin || isProjectAdmin ? 'admin' : 'none',
    });

  const handleAddNew = async title => {
    await addPipeline({
      project_id: selectedProject.id,
      user_id: user.id,
      title,
    });
    loadPipelines();
  };

  const handleDelete = id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deletePipeline({status_id: id, project_id: selectedProject.id});
      },
    });
  };

  const moveContact = visitorId => {
    moveVisitor({
      projectId: selectedProject.id,
      visitorId,
      pipelineId: sortedPipelines[selectedTab].id,
    });
  };

  const toggleModal = () => setShowAddContact(v => !v);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      {sortedPipelines?.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Subheading>No Data Found</Subheading>
        </View>
      ) : (
        <>
          <RenderBoard
            {...props}
            pipelines={sortedPipelines}
            setSelectedTab={setSelectedTab}
            deletePipeline={handleDelete}
            handleAddNew={handleAddNew}
            toggleModal={toggleModal}
            moveContact={moveContact}
            modulePermission={modulePermission}
          />
          <DotIndicator count={sortedPipelines.length} selected={selectedTab} />
        </>
      )}
      <AddContactDialog
        t={t}
        open={showAddContact}
        handleClose={toggleModal}
        moveContact={moveContact}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  boardContainer: {
    flexGrow: 1,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 3,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  addNewButton: {
    width: '100%',
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 5,
    marginVertical: 10,
  },
  contactContainer: {
    width: '100%',
    paddingVertical: 7,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorContainer: {
    marginLeft: 5,
  },
  rightContainer: {
    alignItems: 'center',
  },
  addNewContainer: {
    padding: 20,
    backgroundColor: '#fff',
    ...getShadow(3),
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  pipelineInput: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 10,
    width: '100%',
  },
  dotContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotIndicator: {
    height: 8,
    width: 8,
    margin: 5,
    borderRadius: 50,
  },
  addContactContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  searchBar: {
    backgroundColor: 'rgba(4,29,54,0.1)',
    marginTop: 20,
    ...getShadow(0),
  },
  listContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 200,
    ...getShadow(2),
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
