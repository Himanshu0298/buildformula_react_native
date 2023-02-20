import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {RefreshControl, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import towerunit from 'assets/images/towerunit.png';
import plot from 'assets/images/plot.png';
import bungalow from 'assets/images/bungalow.png';
import industrial from 'assets/images/industrial.png';
import {
  Caption,
  Divider,
  FAB,
  Menu,
  Searchbar,
  Subheading,
  Text,
} from 'react-native-paper';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const UnitCard = ({item, navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleMenu = () => setVisible(!visible);
  const {
    id,
    project_unit,
    project_name,
    tower_name,
    floor_name,
    unit_type,
    project_type,
    unit_for,
  } = item;
  return (
    <View style={styles.projectCardWrapper}>
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
            <Menu.Item
              onPress={() => {
                toggleMenu();
              }}
              title="Edit"
            />
            <Menu.Item
              onPress={() => {
                toggleMenu();
              }}
              title="Delete"
            />
          </Menu>
        </View>
      </View>
      <Divider />
      <TouchableOpacity
        onPress={() =>
          project_type === 1 || 2 || 3
            ? navigation.navigate('UnitPreview')
            : project_type === 4
            ? navigation.navigate('BungalowUnitPreview')
            : project_type === 5
            ? navigation.navigate('PlotUnitPreview')
            : navigation.navigate('IndustrialUnitPreview')
        }>
        <View style={styles.bodyWrapper}>
          <Text>{`${unit_type} - ${project_unit}`}</Text>
          <Caption>{`${project_name} > ${tower_name} > ${floor_name}`}</Caption>
        </View>
        <View style={{marginVertical: 10}}>
          <Text>{unit_for}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function UnitList(props) {
  const {navigation} = props;
  const {getUnitList} = useProjectStructureActions();

  const {colors} = theme;
  const [selectDialog, setSelectDialog] = React.useState(false);
  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const [searchQuery, setSearchQuery] = React.useState('');

  const {unitList = [], loading} = useSelector(s => s.projectStructure);
  const {selectedProject} = useSelector(s => s.project);

  const loadData = async () => {
    await getUnitList({project_id: selectedProject.id});
  };

  const filteredUnit = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return unitList.filter(
      i =>
        i?.project_unit?.toLowerCase().includes(query) ||
        i?.project_name?.toLowerCase().includes(query) ||
        i?.unit_type?.toLowerCase().includes(query) ||
        i?.tower_name?.toLowerCase().includes(query) ||
        i?.floor_name?.toLowerCase().includes(query) ||
        i?.unit_for?.toLowerCase().includes(query),
    );
  }, [unitList, searchQuery]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FAB_ACTIONS = [
    {
      icon: towerunit,
      color: theme.colors.primary,
      label: 'Add Tower Unit',
      onPress: () => navigation.navigate('AddUnit'),
    },
    {
      icon: bungalow,
      color: theme.colors.primary,
      label: 'Add Bungalow',
      onPress: () => navigation.navigate('AddBungalowUnit'),
    },
    {
      icon: plot,
      color: theme.colors.primary,
      label: 'Add Plot',
      onPress: () => navigation.navigate('AddPlotUnit'),
    },
    {
      icon: industrial,
      color: theme.colors.primary,
      label: 'Add Industrial Unit',
      onPress: () => navigation.navigate('AddIndustrialUnit'),
    },
  ];

  const onSearch = v => setSearchQuery(v);

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />

      <Subheading> Unit List</Subheading>
      <Searchbar
        style={styles.searchBar}
        value={searchQuery}
        placeholder="Search Unit"
        onChangeText={onSearch}
      />

      <View style={styles.bodyWrapper}>
        <FlatList
          data={filteredUnit}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={loadData} />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <UnitCard item={item} navigation={navigation} />;
          }}
        />
      </View>

      <FAB.Group
        open={selectDialog}
        fabStyle={{
          backgroundColor: colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        small
        onPress={toggleSelectDialog}
        actions={FAB_ACTIONS}
        onStateChange={() => {
          console.log('-----> onStateChange');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexGrow: 1,
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
});
export default UnitList;
