import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
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
import {ProjectData} from '../ProjectListing/ProjectData';

const PROJECT_STATUS = {
  0: {label: 'Inactive', color: '#FF5E5E'},
  1: {label: 'Active', color: '#07CA03'},
};

const AreaCard = ({item}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleMenu = () => setVisible(v => !v);

  const {id, project_name, area, pincode, city, state, country, status} = item;
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
      <View style={styles.bodyWrapper}>
        <Text>{project_name}</Text>
        <Caption>{`${area} ${city} ${state} ${country} ${pincode}`}</Caption>
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <Title>Area Listing</Title>
      </View>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={() => console.log('Search')}
      />
      <View style={styles.bodyWrapper}>
        <FlatList
          data={ProjectData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <AreaCard item={item} />;
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
    marginTop: 10,
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
    margin: 10,
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
