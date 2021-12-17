import React from 'react';
import {useSelector} from 'react-redux';
import TowerSelector from 'components/Molecules/TowerSelector';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

function SelectTower(props) {
  const {navigation, route} = props;
  const {selectedStructure, towerType} = route?.params || {};

  const {selectedProject} = useSelector(state => state.project);

  const structureData = selectedProject.projectData?.[selectedStructure] || {};

  const {towerCount, towers} = structureData;

  const onSelectTower = towerId => {
    navigation.navigate('BC_Step_Three', {...route?.params, towerId});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={navigation.goBack}>
        <IconButton icon="keyboard-backspace" />
        <Text>{towerType}</Text>
      </TouchableOpacity>
      <TowerSelector
        {...props}
        {...{towers, towerCount, towerType, onSelectTower}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
});

export default SelectTower;
