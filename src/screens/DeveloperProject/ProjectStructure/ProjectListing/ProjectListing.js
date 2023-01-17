import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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
import BuilderIcon from 'assets/images/projectHouseOwner.svg';
import PrimeIcon from 'assets/images/primeBuilding.svg';
import {ProjectData} from './ProjectData';

const PROJECT_STATUS = {
  0: {label: 'Inactive', color: '#FF5E5E'},
  1: {label: 'Active', color: '#07CA03'},
};

const Header = ({navToFilter}) => {
  return (
    <View style={styles.headerWrapper}>
      <Title>Project Listing</Title>
      <View style={styles.editIconContainer}>
        <OpacityButton
          color="#4872f4"
          opacity={0.18}
          style={styles.editIcon}
          onPress={() => navToFilter()}>
          <MaterialIcon name="filter-variant" color="#4872f4" size={16} />
        </OpacityButton>
      </View>
    </View>
  );
};

const ProjectCard = ({item}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleMenu = () => setVisible(v => !v);

  const {
    id,
    project_name,
    developer_name,
    area,
    pincode,
    city,
    state,
    country,
    status,
    premium_project,
  } = item;
  return (
    <TouchableOpacity style={styles.projectCardWrapper}>
      <View style={styles.headerWrapper}>
        <View style={styles.idBox}>
          <Text style={styles.idText}>{id}</Text>
        </View>
        <View style={styles.headerWrapper}>
          <View style={styles.status}>
            <View
              style={[
                styles.statusIndicator,
                {backgroundColor: PROJECT_STATUS[status]?.color},
              ]}
            />
            <Caption>{PROJECT_STATUS[status]?.label}</Caption>
          </View>
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
        <View style={styles.builderDetail}>
          <Text>
            <BuilderIcon fill="#041d36" style={styles.builderdetailIcon} />
            {developer_name}
          </Text>
          {premium_project ? (
            <Text>
              <PrimeIcon fill="#041d36" style={styles.builderdetailIcon} />
              Prime Building
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

function ProjectListing(props) {
  const {theme, navigation} = props;

  const navToFilter = () => {
    navigation.navigate('ProjectFilter');
  };

  return (
    <View style={styles.mainContainer}>
      <Header navToFilter={navToFilter} />
      <Searchbar
        style={styles.searchBar}
        placeholder="Search Project"
        onChangeText={() => console.log('Search')}
      />
      <View style={styles.bodyWrapper}>
        <FlatList
          data={ProjectData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <ProjectCard item={item} />;
          }}
        />
        <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => navigation.navigate('AddProject')}
        />
      </View>
    </View>
  );
}

export default ProjectListing;

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
  },
  statusIndicator: {
    marginHorizontal: 5,
    borderRadius: 50,
    height: 10,
    width: 10,
    backgroundColor: 'green',
  },
  builderDetail: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  builderdetailIcon: {
    marginRight: 5,
  },
  fab: {
    position: 'absolute',
    right: 5,
    bottom: 15,
    backgroundColor: '#4872f4',
  },
});
