import React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import SelectFloor from 'screens/DeveloperProject/CustomerSection/SelectFloor';

function FloorPreview(props) {
  const {route, navigation} = props;
  const {
    selectedStructure,
    towerType,
    towerId,
    id: projectId,
  } = route?.params || {};

  const {getFloorList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {floorList, loading} = useSelector(s => s.projectStructure);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    getFloorList({
      project_id: selectedProject.id,
      id: projectId,
      tower_id: towerId,
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <SelectFloor
        selectedStructure={selectedStructure}
        towerType={towerType}
        towerId={towerId}
        floorList={floorList}
        navigation={navigation}
        id={projectId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FloorPreview;
