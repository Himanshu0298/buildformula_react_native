import React from 'react';
import {StatusBar} from 'react-native';
import {withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import StructureSelector from 'components/Molecules/StructureSelector';

function SelectStructure(props) {
  const {navigation} = props;

  const {selectedProject} = useSelector((state) => state.project);
  const {loading} = useSelector((state) => state.structure);

  const {projectData} = selectedProject;
  const projectTypes = Object.keys(projectData).map((v) => Number(v));

  const handlePress = (value) => {
    navigation.navigate('BC_Step_Two', {selectedStructure: value});
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Spinner visible={loading} textContent={''} />
      <StructureSelector
        onSelectStructure={handlePress}
        projectTypes={projectTypes}
      />
    </>
  );
}

export default withTheme(SelectStructure);