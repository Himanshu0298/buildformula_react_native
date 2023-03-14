import React from 'react';
import {StatusBar} from 'react-native';
import {withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSalesLoading} from 'redux/selectors';
import StructureSelector from 'components/Molecules/StructureSelector';
import {getProjectTypes} from 'utils';

function SelectStructure(props) {
  const {navigation, route} = props;

  const {selectedProject} = useSelector(s => s.project);
  const loading = useSalesLoading();

  const {projectData} = route?.params || {};

  const projectCategories = projectData.project_category;

  const projectTypes = getProjectTypes(projectCategories);

  const handlePress = (selectedStructure, towerType) => {
    const project_id = selectedProject.id;
    const params = {selectedStructure, project_id, projectData};

    let nextStep = 'BC_Step_Four';

    if (selectedStructure === 6) {
      nextStep = 'BC_Step_Two';
      params.towerType = towerType;
    }

    navigation.navigate(nextStep, params);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <Spinner visible={loading} textContent="" />
      <StructureSelector
        onSelectStructure={handlePress}
        projectTypes={projectTypes}
        projectCategories={projectData.project_category}
      />
    </>
  );
}

export default withTheme(SelectStructure);
