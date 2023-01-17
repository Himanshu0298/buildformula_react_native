import ActionButtons from 'components/Atoms/ActionButtons';
import {cloneDeep} from 'lodash';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Switch, Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';

function ProjectAmenities(props) {
  const {navigation, route} = props;
  const {projectId} = route?.params || {};

  const {getProjectMasterList, updateProjectAmenities} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {masterList} = useSelector(s => s.projectStructure);
  const {project_structure_building_amenities = []} = masterList;

  const [buildingAmenities, setBuildingAmenities] = React.useState(
    cloneDeep(project_structure_building_amenities),
  );

  React.useEffect(() => {
    getProjectMasterList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelSaveAmenities = (itemId, updatedValue) => {
    const _buildingAmenities = [...buildingAmenities];
    const index = _buildingAmenities.findIndex(i => i.id === itemId);
    _buildingAmenities[index].status = updatedValue;
    setBuildingAmenities(_buildingAmenities);
  };

  const handleSubmit = async () => {
    const amenities = buildingAmenities.map(i => ({
      id: i.id,
      status: i.status,
    }));
    const data = {project_id: selectedProject.id, id: projectId, amenities};
    await updateProjectAmenities(data);
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
        {buildingAmenities?.map(item => {
          return (
            <View style={styles.extraDetailsRow}>
              <View style={styles.extraDetailsSwitchWrap}>
                <Switch
                  value={Boolean(item.status)}
                  onValueChange={() =>
                    handelSaveAmenities(item.id, item.status ? 0 : 1)
                  }
                  color="#77E675"
                  style={{
                    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                  }}
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
    flexGrow: 1,
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
