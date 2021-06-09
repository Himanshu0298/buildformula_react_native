import React from 'react';
import {useSelector} from 'react-redux';
import FloorSelector from 'components/Molecules/FloorSelector';

export default function SelectFloor(props) {
  const {navigation, route} = props;

  const {selectedProject = {}} = useSelector(state => state.project);

  const {selectedStructure} = route?.params || {};
  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  const {towerCount, towers} = structureData;

  const showAllUnits = (towerId, floorId) => {
    navigation.navigate('BC_Step_Three', {
      selectedStructure,
      towerId: towerId,
      floorId,
    });
  };

  return (
    <FloorSelector {...{towers, towerCount}} onSelectFloor={showAllUnits} />
  );
}
