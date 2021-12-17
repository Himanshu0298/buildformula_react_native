import React from 'react';
import {useSelector} from 'react-redux';
import TowerSelector from 'components/Molecules/TowerSelector';

export default function SelectFloor(props) {
  const {navigation, route} = props;

  const {selectedProject = {}} = useSelector(s => s.project);

  const {selectedStructure} = route?.params || {};
  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  const {towerCount, towers} = structureData;

  const showAllUnits = (towerId, floorId) => {
    navigation.navigate('CS_Step_Three', {selectedStructure, towerId, floorId});
  };

  return (
    <TowerSelector
      {...{towers, towerCount}}
      title="title_customer_section"
      subtitle="subtitle_customer_section"
      onSelectFloor={showAllUnits}
    />
  );
}
