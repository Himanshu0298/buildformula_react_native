import React from 'react';
import {StatusBar} from 'react-native';
import {withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import StructureSelector from 'components/Molecules/StructureSelector';

function SelectStructure(props) {
  const {navigation} = props;

  const {selectedProject} = useSelector(state => state.project);
  const {loading} = useSelector(state => state.sales);

  const {projectData = {}} = selectedProject;
  const projectTypes = Object.keys(projectData)?.map(v => Number(v)) || [];

  const handlePress = (selectedStructure, towerType) => {
    if ([4, 5].includes(selectedStructure)) {
      navigation.navigate('BC_Step_Three', {selectedStructure});
    } else {
      navigation.navigate('BC_Step_Two', {selectedStructure, towerType});
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Spinner visible={loading} textContent="" />
      <StructureSelector
        onSelectStructure={handlePress}
        projectTypes={projectTypes}
      />
    </>
  );
}

export default withTheme(SelectStructure);
