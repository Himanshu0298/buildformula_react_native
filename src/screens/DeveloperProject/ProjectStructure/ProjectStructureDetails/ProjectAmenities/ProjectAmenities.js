import ActionButtons from 'components/Atoms/ActionButtons';
import {cloneDeep} from 'lodash';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Switch, Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';

const parseData = data =>
  cloneDeep(data).map(i => ({
    id: i.building_amenities_id || i.id,
    status: i.status,
    title: i.title,
  }));

function ProjectAmenities(props) {
  const {navigation, route} = props;
  const {projectId} = route?.params || {};

  const {getProjectMasterList, updateProjectAmenities, getProjectDetails} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {masterList, projectDetails} = useSelector(s => s.projectStructure);

  const projectAmenities = projectDetails?.building_amenities;

  const {project_structure_building_amenities: defaultAmenities = []} =
    masterList;

  const [amenities, setAmenities] = React.useState(
    parseData(projectAmenities) || [],
  );

  React.useEffect(() => {
    if (!amenities.length) {
      if (projectAmenities?.length) {
        setAmenities(parseData(projectAmenities));
      }
      setAmenities(parseData(defaultAmenities));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectAmenities, defaultAmenities]);

  React.useEffect(() => {
    getProjectMasterList({project_id: selectedProject.id});
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () =>
    getProjectDetails({project_id: selectedProject.id, id: projectId});

  const handelSaveAmenities = (itemId, updatedValue) => {
    const _buildingAmenities = [...amenities];
    const index = _buildingAmenities.findIndex(i => i.id === itemId);
    _buildingAmenities[index].status = updatedValue;
    setAmenities(_buildingAmenities);
  };

  const handleSubmit = async () => {
    const amenitiesData = amenities.map(i => ({
      id: i.id,
      status: i.status,
    }));
    const data = {
      project_id: selectedProject.id,
      id: projectId,
      amenities: amenitiesData,
    };
    await updateProjectAmenities(data);
    getData();
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Building Amenities </Title>
      </View>
      <ScrollView style={styles.cardContainer}>
        {amenities?.map(item => {
          return (
            <View style={styles.extraDetailsRow}>
              <View style={styles.extraDetailsSwitchWrap}>
                <Switch
                  value={Boolean(item.status)}
                  onValueChange={() =>
                    handelSaveAmenities(item.id, item.status ? 0 : 1)
                  }
                  color="#77E675"
                />
              </View>
              <View style={styles.title}>
                <Text>{item.title}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  mainContainer: {
    flexGrow: 1,
    margin: 10,
  },
  extraDetailsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
  },
  cardContainer: {
    marginBottom: 30,
    flexGrow: 1,
  },
});

export default ProjectAmenities;
