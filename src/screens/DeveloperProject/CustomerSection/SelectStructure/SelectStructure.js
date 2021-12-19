import React from 'react';
import {StatusBar} from 'react-native';
import {withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import StructureSelector from 'components/Molecules/StructureSelector';

function SelectStructure({navigation}) {
  const {selectedProject} = useSelector(s => s.project);
  const {loading} = useSelector(s => s.customer);

  const {project_structure} = selectedProject;
  const projectTypes =
    Object.keys(project_structure)?.map(v => Number(v)) || [];

  const handlePress = value => {
    navigation.navigate('CS_Step_Two', {selectedStructure: value});
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Spinner visible={loading} textContent="" />
      <StructureSelector
        title="title_customer_section"
        subtitle="subtitle_customer_section"
        onSelectStructure={handlePress}
        projectTypes={projectTypes}
      />
    </>
  );
}

export default withTheme(SelectStructure);
