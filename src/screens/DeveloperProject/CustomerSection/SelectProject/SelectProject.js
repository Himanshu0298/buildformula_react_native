import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useMemo} from 'react';
import {Caption, Divider, Searchbar, Text, Title} from 'react-native-paper';
import {getShadow} from 'utils';
import BuilderIcon from 'assets/images/projectHouseOwner.svg';
import Spinner from 'react-native-loading-spinner-overlay';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

const Header = () => {
  return (
    <View style={styles.headerWrapper}>
      <View>
        <Title>Customer Section</Title>
        <Caption>Select project for which you want to book property</Caption>
      </View>
    </View>
  );
};

const ProjectCard = props => {
  const {item, navigation} = props;

  const {
    id,
    project_name,
    developer_name,
    area,
    pincode,
    city,
    state,
    country,
  } = item;

  const loadProjectCategories = () => {
    navigation.navigate('CS_Step_dot_One', {projectData: item});
  };

  return (
    <TouchableOpacity
      style={styles.projectCardWrapper}
      onPress={loadProjectCategories}>
      <View style={styles.bodyWrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.idBox}>
            <Text style={styles.idText}>{id}</Text>
          </View>
          <Text>{project_name?.toUpperCase()}</Text>
        </View>
        <Divider />
        <Caption>{`${area} ,${city} ,${state} ,${country} ,${pincode}`}</Caption>
        <View style={styles.builderDetail}>
          <View style={styles.row}>
            <BuilderIcon fill="#041d36" style={styles.builderdetailIcon} />
            <Text style={styles.developer}>{developer_name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function SelectProject(props) {
  const {navigation} = props;

  const {getProjectList} = useProjectStructureActions();
  const [searchQuery, setSearchQuery] = React.useState('');

  const {projectList = [], loading} = useSelector(s => s.projectStructure);
  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    await getProjectList({project_id: selectedProject.id});
  };
  const filteredProject = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return projectList.filter(
      i =>
        i?.project_name?.toLowerCase().includes(query) ||
        i?.developer_name?.toLowerCase().includes(query) ||
        i?.city?.toLowerCase().includes(query) ||
        i?.state?.toLowerCase().includes(query) ||
        i?.country?.toLowerCase().includes(query) ||
        i?.area?.toLowerCase().includes(query),
    );
  }, [projectList, searchQuery]);

  const onSearch = v => setSearchQuery(v);

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />

      <Header />
      <Searchbar
        style={styles.searchBar}
        value={searchQuery}
        placeholder="Search Project"
        onChangeText={onSearch}
      />
      <View style={styles.bodyWrapper}>
        <FlatList
          data={filteredProject}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getList} />
          }
          renderItem={({item}) => {
            return <ProjectCard item={item} navigation={navigation} />;
          }}
          ListEmptyComponent={
            <Caption style={styles.blank}>No Projects available</Caption>
          }
        />
      </View>
    </View>
  );
}

export default SelectProject;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    marginRight: 10,
  },
  idText: {
    color: '#4872f4',
  },
  builderDetail: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  builderdetailIcon: {
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  developer: {
    textTransform: 'capitalize',
  },
  blank: {
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
