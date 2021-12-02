import React from 'react';
import {useSelector} from 'react-redux';
import TowerSelector from 'components/Molecules/TowerSelector';

export default function SelectTower(props) {
  const {navigation, route} = props;

  const {selectedProject = {}} = useSelector(state => state.project);

  const {selectedStructure, towerType, activeSrc} = route?.params || {};

  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  console.log('----->structureData', structureData);
  const {towerCount, towers} = structureData;

  const showAllUnits = (towerId, floorId) => {
    navigation.navigate('BC_Step_Three', {
      selectedStructure,
      towerId: towerId,
      floorId,
    });
  };

  return (
    <TowerSelector
      {...{towers, towerCount}}
      towerType={towerType}
      activeSrc={activeSrc}
      onSelectFloor={showAllUnits}
      navigation={navigation}
    />
  );
}
