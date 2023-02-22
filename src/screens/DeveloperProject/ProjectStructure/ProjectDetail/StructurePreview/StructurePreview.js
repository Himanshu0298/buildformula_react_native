import StructureSelector from 'components/Molecules/StructureSelector';
import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {useSalesLoading} from 'redux/selectors';

function StructurePreview(props) {
  const {navigation, route} = props;

  const {id} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);
  const loading = useSalesLoading();

  const {project_structure = {}} = selectedProject;
  const projectTypes =
    Object.keys(project_structure)?.map(v => Number(v)) || [];

  const handlePress = (selectedStructure, towerType) => {
    const params = {selectedStructure, id, towerType};

    const nextStep = 'TowerPreview';

    navigation.navigate(nextStep, params);
  };

  return (
    <View>
      <Spinner visible={loading} textContent="" />
      <StructureSelector
        hideTitle
        onSelectStructure={handlePress}
        projectTypes={projectTypes}
      />
    </View>
  );
}

export default StructurePreview;
