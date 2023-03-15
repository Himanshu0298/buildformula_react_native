import React, {useMemo} from 'react';
import {withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {isNumber} from 'lodash';
import FloorSelector from 'components/Molecules/FloorSelector';
import {getTowerLabel} from 'utils';
import {SelectUnit} from 'screens/DeveloperProject/CustomerSection/SelectUnit/SelectUnit';
import useProjectStructureActions from 'redux/actions/projectStructureActions';

function SelectFloor(props) {
  const {route} = props;
  const {
    selectedStructure,
    towerType,
    towerId,
    project_id,
    projectId,
    projectData,
    tower_id,
    tower_label,
  } = route?.params || {};

  const {getFloorList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {floorList, loading} = useSelector(s => s.projectStructure);

  const floor_id = floorList.find(i => i.id)?.floor;

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

  // const structureData =
  //   selectedProject.project_structure?.[selectedStructure] || {};

  // const {floors = {}} =
  //   structureData?.towers?.find(i => i.tower_id === towerId) || {};

  // const parsedFloors = useMemo(() => {
  //   return Object.entries(floors).map(([key, value]) => ({id: key, ...value}));
  // }, [floors]);

  // const filteredFloors = useMemo(() => {
  //   return parsedFloors.filter(floor => {
  //     const units =
  //       ([4, 5].includes(selectedStructure)
  //         ? structureData.units
  //         : floor.units) || [];

  //     if (isNumber(selectedBhk) && floor.structureType === 1) {
  //       return Boolean(units.filter(i => i.bhk === selectedBhk)?.length);
  //     }

  //     return true;
  //   });
  // }, [parsedFloors, selectedBhk, selectedStructure, structureData.units]);

  const renderUnits = params => {
    return (
      <SelectUnit
        {...props}
        {...params}
        project_id={project_id}
        towerId={towerId}
        selectedStructure={selectedStructure}
        towerType={towerType}
        showBhkFilters={false}
        displayHeader={false}
        projectId={projectId}
        floor_id={floor_id}
        tower_id={tower_id}
        projectData={projectData}
      />
    );
  };

  return (
    <FloorSelector
      {...props}
      floors={floorList}
      towerId={towerId}
      towerType={towerType}
      towerLabel={tower_label}
      selectedBhk={selectedBhk}
      renderUnits={renderUnits}
      handleBhkChange={setSelectedBhk}
    />
  );
}

export default withTheme(SelectFloor);
