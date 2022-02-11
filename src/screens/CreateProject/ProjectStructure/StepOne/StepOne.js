import React, {useMemo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {withTheme, Button} from 'react-native-paper';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {DEFAULT_STRUCTURE} from 'utils/constant';
import _ from 'lodash';
import useAddProjectActions from 'redux/actions/addProjectActions';
import StructureSelector from 'components/Molecules/StructureSelector';
import {SafeAreaView} from 'react-native-safe-area-context';

function StepOne(props) {
  const {navigation} = props;

  const snackbar = useSnackbar();

  const {updateStructureTypes, updateStructure} = useAddProjectActions();

  const {structureTypes, structure, project, loading} = useSelector(
    s => s.addProject,
  );

  const activeTypes = useMemo(() => {
    return Object.keys(structureTypes)
      .filter(i => structureTypes[i])
      .map(i => Number(i));
  }, [structureTypes]);

  const updateTypes = type => {
    const types = _.cloneDeep(structureTypes);
    types[type] = !types[type];
    let selectedStructureType = 1;
    if (types[2]) {
      selectedStructureType = 2;
    } else if (types[3]) {
      selectedStructureType = 3;
    }

    updateStructure({structureTypes: types, selectedStructureType});
  };

  const handleSubmit = () => {
    const selectedTypes = Object.keys(structureTypes).filter(
      key => structureTypes[key],
    );
    if (selectedTypes.length === 0) {
      snackbar.showMessage({
        message: 'Please select a type',
        variant: 'error',
      });
    } else {
      const types = Object.keys(structureTypes)
        .filter(key => structureTypes[key])
        .join();

      const data = {
        project_id: project.id || project.project_id,
        project_types: types,
      };

      const updatedStructure = {};
      selectedTypes.map(type => {
        if (structure[type]) {
          updatedStructure[type] = structure[type];
        } else {
          updatedStructure[type] = DEFAULT_STRUCTURE[type];
        }
        return type;
      });

      updateStructure({structure: updatedStructure});

      updateStructureTypes(data).then(() => {
        navigation.navigate('ProjectStructureStepTwo');
      });
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flexGrow: 1}}>
      <Spinner visible={loading} textContent="" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <StructureSelector
          title="label_project_structure"
          subtitle="label_select_appropriate_option"
          onSelectStructure={updateTypes}
          projectTypes={[1, 2, 3, 4, 5]}
          activeTypes={activeTypes}
        />
        <View style={styles.button}>
          <Button
            mode="contained"
            style={{width: '40%'}}
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            Next
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '95%',
    alignItems: 'flex-end',
  },
});

export default withTheme(StepOne);
