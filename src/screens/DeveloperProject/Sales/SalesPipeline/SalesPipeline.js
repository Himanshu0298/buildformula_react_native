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
import {COLORS} from 'utils/constant';
import BaseText from 'components/Atoms/BaseText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Board, BoardRepository} from 'components/Molecules/Board/components';
import {useAlert} from 'components/Atoms/Alert';
import {getPermissions, getShadow} from 'utils';
import RenderInput from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
// import {BoardRepository, Board} from 'react-native-draganddrop-board';

function RenderContacts({item}) {
  const {get_user = {}, get_role = {}} = item?.get_role_user || {};

  return (
    <View style={styles.contactContainer}>
      <View style={styles.leftContainer}>
        <MaterialIcons
          name={'drag-indicator'}
          color={'rgba(4,29,54,0.15)'}
          size={30}
        />
        <View style={styles.visitorContainer}>
          <Subheading>
            {item.first_name} {item.last_name}
          </Subheading>
          <Caption>+91 {item.phone}</Caption>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Subheading>
          {get_user.first_name} {get_user.last_name}
        </Subheading>
        <Caption>{get_role.role_name}</Caption>
      </View>
    </View>
  );
}

function RenderHeader(props) {
  const {data = {}, modulePermission, toggleModal, handleDelete} = props;
  const {pipeline = {}, id} = data?.attributes?.data || {};
  const {id: pipelineId, title, get_visitors = []} = pipeline;

  return (
    <>
      <View style={styles.headContainer}>
        <Subheading>{title}</Subheading>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <MaterialIcons
              name={'search'}
              color={'rgba(4,29,54,0.6)'}
              size={19}
            />
          </TouchableOpacity>
          {id !== 1 && modulePermission?.editor && modulePermission?.admin ? (
            <TouchableOpacity
              onPress={() => handleDelete(pipelineId, get_visitors.length)}
              style={[styles.icon, {backgroundColor: COLORS.deleteLight}]}>
              <MaterialIcons
                name={'delete'}
                color={theme.colors.red}
                size={19}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={[
              styles.icon,
              {backgroundColor: COLORS.primaryLight, paddingHorizontal: 8},
            ]}>
            <BaseText style={{color: theme.colors.primary}}>
              {get_visitors.length}
            </BaseText>
          </TouchableOpacity>
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
  const [stage, setStage] = React.useState();

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
        contentStyle={{paddingVertical: 3, paddingHorizontal: 10}}
        theme={{roundness: 10}}
        onPress={() => {
          if (stage) {
            setStage();
            handleAddNew(stage);
          }
        }}>
        {'Save'}
      </Button>
    </View>
  );
}

function DotIndicator({count, selected}) {
  return (
    <View style={styles.dotContainer}>
      {new Array(count + 1).fill(0).map((_, i) => {
        const backgroundColor =
          i === selected ? theme.colors.primary : 'rgba(4,29,54,0.1)';

        return (
          <View key={i} style={[styles.dotIndicator, {backgroundColor}]} />
        );
      })}
    </View>
  );
}

function AddContactDialog({open, t, handleClose, moveContact}) {
  const [searchQuery, setSearchQuery] = React.useState();
  const [selectedVisitor, setSelectedVisitor] = React.useState();

  const {visitorSuggestions} = useSelector(state => state.sales);

  const filteredVisitors = React.useMemo(() => {
    if (searchQuery) {
      return visitorSuggestions.filter(visitor => {
        return (
          visitor.first_name.includes(searchQuery) ||
          visitor.last_name.includes(searchQuery) ||
          visitor.phone.includes(searchQuery) ||
          visitor.email.includes(searchQuery)
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
    <View>
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
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps="handled">
                    {filteredVisitors.map((visitor, index) => {
                      const label = `${visitor.first_name} ${visitor.last_name}`;
                      return (
                        <TouchableOpacity
                          key={index}
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
                disabled={isNaN(selectedVisitor)}
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
    </View>
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
  } = props;

  const alert = useAlert();

  const modulePermission = getPermissions('Sales Pipeline');

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

    const formData = new FormData();
    formData.append('status_id', id);
    deletePipeline(id, formData);
  };

  const boardRepository = React.useMemo(() => {
    const data = pipelines.map((pipeline, i) => ({
      id: i + 1,
      name: pipeline.title,
      rows: pipeline.get_visitors,
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

  return (
    <View style={styles.boardContainer}>
      <Board
        boardBackground="#fff"
        boardRepository={boardRepository}
        dragDisabled={!(modulePermission?.editor || modulePermission?.admin)}
        renderHeader={column => (
          <RenderHeader
            data={column}
            modulePermission={modulePermission}
            toggleModal={toggleModal}
            handleDelete={onDeletePipeline}
          />
        )}
        cardContent={item => <RenderContacts item={item} />}
        renderAddNew={() => <RenderAddNew handleAddNew={handleAddNew} />}
        onChangeTab={setSelectedTab}
        open={() => console.log('-----> open')}
        onDragEnd={(srcColumnId, destColumnId, draggedItem) => {
          const {row} = draggedItem?.attributes;
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

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showAddContact, setShowAddContact] = React.useState(false);

  const {
    getPipelineData,
    addPipeline,
    deletePipeline,
    moveVisitor,
  } = useSalesActions();

  const {pipelines, loading} = useSelector(state => state.sales);
  const {selectedProject} = useSelector(state => state.project);
  const {user} = useSelector(state => state.user);

  React.useEffect(() => {
    getPipelineData(selectedProject.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNew = title => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('project_id', selectedProject.id);
    formData.append('user_id', user.id);

    addPipeline(formData).then(() => {
      getPipelineData(selectedProject.id);
    });
  };

  const moveContact = visitorId => {
    moveVisitor({
      projectId: selectedProject.id,
      visitorId,
      pipelineId: pipelines[selectedTab].id,
    });
  };

  const toggleModal = () => setShowAddContact(v => !v);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      {pipelines.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Subheading>{'No Data Found'}</Subheading>
        </View>
      ) : (
        <>
          <RenderBoard
            pipelines={pipelines}
            setSelectedTab={setSelectedTab}
            deletePipeline={deletePipeline}
            handleAddNew={handleAddNew}
            toggleModal={toggleModal}
            moveContact={moveContact}
          />
          <DotIndicator count={pipelines.length} selected={selectedTab} />
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
  },
  pipelineInput: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 10,
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
});
