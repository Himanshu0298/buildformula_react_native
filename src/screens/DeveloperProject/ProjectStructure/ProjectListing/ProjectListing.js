import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useMemo} from 'react';
import {
  Caption,
  Divider,
  FAB,
  Menu,
  Searchbar,
  Text,
  Title,
  Badge,
} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import BuilderIcon from 'assets/images/projectHouseOwner.svg';
import PrimeIcon from 'assets/images/primeBuilding.svg';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAlert} from 'components/Atoms/Alert';

const PROJECT_STATUS = {
  0: {label: 'Inactive', color: '#FF5E5E'},
  1: {label: 'Active', color: '#07CA03'},
};

const Header = props => {
  const {navToFilter, filterCount} = props;

  return (
    <View style={styles.headerWrapper}>
      <Title>Project Listing</Title>
      <View>
        {filterCount ? (
          <Badge style={styles.filterCount}>{filterCount}</Badge>
        ) : undefined}
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

const ProjectCard = props => {
  const {item, navigation, handleDelete} = props;
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

  const projectDetails = item || {};
  const projectId = item?.id || {};

  const navToEdit = () => {
    navigation.navigate('ProjectStructureDetails', {projectId, projectDetails});
    toggleMenu();
  };

  const deleteProject = () => {
    handleDelete(id);
    toggleMenu();
  };
  return (
    <TouchableOpacity
      style={styles.projectCardWrapper}
      onPress={() => navigation.navigate('ProjectDetail', {id})}>
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
            <Menu.Item onPress={navToEdit} title="Edit" />
            <Menu.Item onPress={deleteProject} title="Delete" />
          </Menu>
        </View>
      </View>
      <Divider />
      <View style={styles.bodyWrapper}>
        <Text>{project_name?.toUpperCase()}</Text>
        <Caption>{`${area} ,${city} ,${state} ,${country} ,${pincode}`}</Caption>
        <View style={styles.builderDetail}>
          <View style={styles.row}>
            <BuilderIcon fill="#041d36" style={styles.builderdetailIcon} />
            <Text style={styles.developer}>{developer_name}</Text>
          </View>

          {premium_project ? (
            <View style={styles.row}>
              <PrimeIcon fill="#041d36" style={styles.builderdetailIcon} />
              <Text>Prime Building</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

function ProjectListing(props) {
  const {navigation, route} = props;

  const alert = useAlert();

  const {getProjectList, deleteProject} = useProjectStructureActions();
  const [searchQuery, setSearchQuery] = React.useState('');

  const {
    projectList = [],
    loading,
    projectFilters,
  } = useSelector(s => s.projectStructure);

  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    await getProjectList({project_id: selectedProject.id});
  };

  // for filters
  const filterCount = useMemo(() => {
    const tempCount = Object.values(projectFilters);
    return tempCount?.filter(i => i !== '').length;
  }, [projectFilters]);

  const checkRange = (value, key = {}) => {
    const {low = 0, high = 0} = key;
    let isRangeValid = false;

    if (value > 0) {
      if (value >= low && value <= high) {
        isRangeValid = true;
        return isRangeValid;
      }
    }
    return isRangeValid;
  };

  const filteredProjectData = useMemo(() => {
    if (filterCount > 0) {
      const {
        projectNames,
        developerNames,
        area,
        status,
        premium,
        possession,
        rera,
        projectType,
        restrictedUser,
        projectStatus,
        projectQuality,
        bhk,
        category,
        towers,
        units,
        bungalows,
        plots,
        owners,
        security,
      } = projectFilters;

      return projectList.filter(i => {
        const validations = [
          projectNames?.includes(i?.project_name),
          developerNames?.includes(i?.developer_name),
          area?.includes(i?.area),
          (status === 'Active' ? 1 : 0) === i?.status,
          (premium === 'Yes' ? 1 : 0) === i?.premium_project,
          Object.values(possession)?.includes(i?.possesion_year),
          Object.values(rera)?.includes(i?.rera_no),
          projectType?.includes(i?.project_type),
          restrictedUser?.includes(i?.restricted_user),
          projectStatus?.includes(i?.project_status),
          projectQuality?.includes(i?.project_quality),
          i?.bhk_configuration
            ?.split(',')
            ?.some(value => Object.values(bhk)?.includes(value?.toUpperCase())),
          i?.project_category
            .split(',')
            ?.some(cat => category?.includes(Number(cat))),
          i?.owner_info?.some(e => owners?.includes(e.name)),
          i?.security_info?.some(e => security?.includes(e.name)),
          checkRange(i?.total_no_of_towers, towers),
          checkRange(i?.total_no_of_units, units),
          checkRange(i?.total_no_of_bunglows, bungalows),
          checkRange(i?.total_no_of_plots, plots),
        ];
        return validations.find(valid => valid);
      });
    }
    return projectList;
  }, [filterCount, projectFilters, projectList]);

  const filteredProject = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return filteredProjectData.filter(
      i =>
        i?.project_name?.toLowerCase().includes(query) ||
        i?.developer_name?.toLowerCase().includes(query) ||
        i?.city?.toLowerCase().includes(query) ||
        i?.state?.toLowerCase().includes(query) ||
        i?.country?.toLowerCase().includes(query) ||
        i?.area?.toLowerCase().includes(query),
    );
  }, [filteredProjectData, searchQuery]);

  const onSearch = v => setSearchQuery(v);

  const handleDelete = async projectId => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteProject({
          project_id: selectedProject.id,
          id: projectId,
        });
        getList();
      },
    });
  };

  const navToFilter = () => {
    navigation.navigate('ProjectFilter');
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />

      <Header navToFilter={navToFilter} filterCount={filterCount} />
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
            return (
              <ProjectCard
                item={item}
                navigation={navigation}
                handleDelete={handleDelete}
              />
            );
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  developer: {
    textTransform: 'capitalize',
  },
  filterCount: {
    position: 'absolute',
    top: -13,
    right: 15,
  },
});
