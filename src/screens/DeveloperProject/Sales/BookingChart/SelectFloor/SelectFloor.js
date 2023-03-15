import React from 'react';
import {withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import FloorSelector from 'components/Molecules/FloorSelector';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import SelectUnit from 'screens/DeveloperProject/Sales/BookingChart/SelectUnit';

function SelectFloor(props) {
  const {route} = props;
  const {
    selectedStructure,
    towerType,
    towerId,
    towerLabel,
    projectData,
    tower_id,
  } = route?.params || {};

  const projectId = projectData?.id;

  const {getFloorList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {floorList} = useSelector(s => s.projectStructure);

  const [selectedBhk, setSelectedBhk] = React.useState();

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    getFloorList({
      project_id: selectedProject.id,
      id: projectId,
      tower_id,
    });
  };

  const renderUnits = params => {
    return (
      <SelectUnit
        {...props}
        {...params}
        project_id={selectedProject.id}
        towerId={towerId}
        tower={tower_id}
        selectedStructure={selectedStructure}
        towerType={towerType}
        showBhkFilters={false}
        displayHeader={false}
        projectId={projectId}
      />
    );
  };

  return (
    <FloorSelector
      {...props}
      floors={floorList}
      towerId={towerId}
      towerType={towerType}
      towerLabel={towerLabel}
      projectId={projectId}
      selectedBhk={selectedBhk}
      renderUnits={renderUnits}
      handleBhkChange={setSelectedBhk}
    />
  );
}

export default withTheme(SelectFloor);
