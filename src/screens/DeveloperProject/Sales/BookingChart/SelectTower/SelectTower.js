import React from 'react';
import {useSelector} from 'react-redux';
import TowerSelector from 'components/Molecules/TowerSelector';

export default function SelectTower(props) {
  const {navigation, route} = props;
  const {selectedStructure, towerType} = route?.params || {};

  const {selectedProject} = useSelector(state => state.project);

  const structureData = selectedProject.projectData?.[selectedStructure] || {};

  const {towerCount, towers} = structureData;

  const onSelectTower = towerId => {
    navigation.navigate('BC_Step_Three', {selectedStructure, towerId});
  };

  return (
    <TowerSelector
      {...props}
      {...{towers, towerCount, towerType, onSelectTower}}
    />
  );
}
