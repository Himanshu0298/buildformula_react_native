import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {
  Caption,
  Divider,
  FAB,
  Menu,
  Searchbar,
  Title,
} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useAlert} from 'components/Atoms/Alert';
import Spinner from 'react-native-loading-spinner-overlay';

const PROJECT_STATUS = {
  0: {label: 'Inactive', color: '#FF5E5E'},
  1: {label: 'Active', color: '#07CA03'},
};

const AreaCard = props => {
  const {item, handleDelete, navigation} = props;

  const [visible, setVisible] = React.useState(false);

  const toggleMenu = () => setVisible(v => !v);

  const {id, area, pincode, city, state, country, status} = item;

  const onDelete = () => {
    handleDelete(id);
    toggleMenu();
  };

  const onEdit = () => {
    navigation.navigate('AddArea', {id, item});
    toggleMenu();
  };
  return (
    <TouchableOpacity style={styles.projectCardWrapper}>
      <View style={styles.headerWrapper}>
        <View style={styles.idBox}>
          <Text style={styles.idText}>{id}</Text>
        </View>
        <View style={styles.headerWrapper}>
          <Menu
            visible={visible}
            onDismiss={() => toggleMenu()}
            anchor={
              <OpacityButton
                opacity={0.1}
                color="#4872f4"
                style={styles.editIcon}
                onPress={toggleMenu}>
                <MaterialIcon name="dots-vertical" color="#4872f4" size={15} />
              </OpacityButton>
            }>
            <Menu.Item onPress={onEdit} title="Edit" />
            <Menu.Item onPress={onDelete} title="Delete" />
          </Menu>
        </View>
      </View>
      <Divider />

      <View style={styles.bodyWrapper}>
        <Text>{area}</Text>
        <Caption>{`${city} ,${state} ,${country}`}</Caption>
        <Text>{pincode}</Text>

        <View style={styles.status}>
          <View
            style={[
              styles.statusIndicator,
              {backgroundColor: PROJECT_STATUS[status]?.color},
            ]}
          />
          <Caption>{PROJECT_STATUS[status]?.label}</Caption>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function AreaList(props) {
  const {navigation} = props;

  const alert = useAlert();

  const {getAreaList, deleteArea} = useProjectStructureActions();
  const [searchQuery, setSearchQuery] = React.useState('');

  const {areaList, loading} = useSelector(s => s.projectStructure);
  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => getAreaList({project_id: selectedProject.id});

  const filteredArea = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return areaList.filter(
      i =>
        i?.area?.toLowerCase().includes(query) ||
        i?.city?.toLowerCase().includes(query) ||
        i?.country?.toLowerCase().includes(query) ||
        i?.state?.toLowerCase().includes(query) ||
        i?.pincode?.toLowerCase().includes(query),
    );
  }, [areaList, searchQuery]);

  const onSearch = v => setSearchQuery(v);

  const handleDelete = async areaId => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteArea({
          project_id: selectedProject.id,
          id: areaId,
        });
        getList();
      },
    });
  };

  // const navToFilter = () => {
  //   navigation.navigate('ProjectFilter');
  // };

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />

      <View style={styles.headerWrapper}>
        <Title>Area Listing</Title>
      </View>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={onSearch}
      />
      <View style={styles.bodyWrapper}>
        <FlatList
          data={filteredArea}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <AreaCard
                item={item}
                handleDelete={handleDelete}
                navigation={navigation}
              />
            );
          }}
        />
        <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => navigation.navigate('AddArea')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    margin: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  editIcon: {
    borderRadius: 20,
  },
  searchBar: {
    backgroundColor: '#EAECF11A',
    borderWidth: 1.5,
    borderColor: 'rgba(4, 29, 54, 0.2)',
    ...getShadow(0),
    marginVertical: 5,
  },
  bodyWrapper: {
    marginTop: 5,
    flex: 1,
  },
  projectCardWrapper: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  idBox: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  idText: {
    color: '#4872f4',
  },

  fab: {
    position: 'absolute',
    right: 5,
    bottom: 15,
    backgroundColor: '#4872f4',
  },

  status: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(4, 29, 54, 0.6)',
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    width: 75,
    justifyContent: 'center',
    marginVertical: 5,
  },
  statusIndicator: {
    marginHorizontal: 5,
    borderRadius: 50,
    height: 10,
    width: 10,
    backgroundColor: 'green',
  },
});

export default AreaList;
