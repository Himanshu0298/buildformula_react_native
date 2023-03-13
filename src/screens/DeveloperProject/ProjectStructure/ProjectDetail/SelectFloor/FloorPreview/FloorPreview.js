import FloorSelector from 'components/Molecules/FloorSelector';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {SelectUnit} from './SelectUnit';

function FloorPreview(props) {
  const {route} = props;
  const {
    selectedStructure,
    towerType,
    towerId,
    id: projectId,
    label,
    tower,
  } = route?.params || {};

  const {getFloorList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {floorList, loading} = useSelector(s => s.projectStructure);

  const [selectedBhk, setSelectedBhk] = React.useState();

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

  const renderUnits = params => {
    return (
      <SelectUnit
        {...props}
        {...params}
        project_id={selectedProject.id}
        towerId={towerId}
        tower={tower}
        selectedStructure={selectedStructure}
        towerType={towerType}
        showBhkFilters={false}
        displayHeader={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <FloorSelector
        {...props}
        floors={floorList}
        towerId={towerId}
        towerType={towerType}
        towerLabel={label}
        projectId={projectId}
        selectedBhk={selectedBhk}
        renderUnits={renderUnits}
        handleBhkChange={setSelectedBhk}
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
