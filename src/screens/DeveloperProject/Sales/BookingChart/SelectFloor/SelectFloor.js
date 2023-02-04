import React, {useMemo} from 'react';
import {withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {isNumber} from 'lodash';
import FloorSelector from 'components/Molecules/FloorSelector';
import {getTowerLabel} from 'utils';
import {SelectUnit} from '../SelectUnit/SelectUnit';

function SelectFloor(props) {
  const {route} = props;
  const {selectedStructure, towerType, towerId, project_id} =
    route?.params || {};

  const [selectedBhk, setSelectedBhk] = React.useState();

  const {selectedProject} = useSelector(s => s.project);

  const structureData =
    selectedProject?.project_structure?.[selectedStructure] || {};

  const {floors = {}} =
    structureData?.towers?.find(i => i.tower_id === towerId) || {};

  const parsedFloors = useMemo(() => {
    return Object.entries(floors).map(([key, value]) => ({id: key, ...value}));
  }, [floors]);

  const filteredFloors = useMemo(() => {
    return parsedFloors.filter(floor => {
      const units =
        ([4, 5].includes(selectedStructure)
          ? structureData.units
          : floor.units) || [];

      if (isNumber(selectedBhk) && floor.structureType === 1) {
        return Boolean(units.filter(i => i.bhk === selectedBhk)?.length);
      }

      return true;
    });
  }, [parsedFloors, selectedBhk, selectedStructure, structureData.units]);

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
      />
    );
  };

  return (
    <FloorSelector
      {...props}
      floors={filteredFloors}
      towerId={towerId}
      towerType={towerType}
      towerLabel={getTowerLabel(towerId)}
      selectedBhk={selectedBhk}
      renderUnits={renderUnits}
      handleBhkChange={setSelectedBhk}
    />
  );
}

export default withTheme(SelectFloor);
