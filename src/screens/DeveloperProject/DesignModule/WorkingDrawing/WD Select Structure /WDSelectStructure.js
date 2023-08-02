import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import StructureSelector from 'components/Molecules/StructureSelector';

function WDSelectStructure(props) {
  const {navigation, route} = props;

  const {folderId, designModuleTitle} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);

  const {project_structure = {}} = selectedProject;

  const projectCategories = '2,3,1,4,5';

  const projectTypes =
    Object.keys(project_structure)?.map(v => Number(v)) || [];

  const handlePress = selectedStructure => {
    let nextStep = 'WDPlotList';

    if (selectedStructure === 6) {
      nextStep = 'WDTowerList';
    }
    if (selectedStructure === 4) {
      nextStep = 'WDBungalowList';
    }

    navigation.navigate(nextStep, {folderId});
  };
  return (
    <View>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>{designModuleTitle}</Title>
      </View>
      <StructureSelector
        hideTitle
        onSelectStructure={handlePress}
        projectTypes={projectTypes}
        navigation={navigation}
        projectCategories={projectCategories}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default WDSelectStructure;
