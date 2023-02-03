import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import TowerSelector from 'components/Molecules/TowerSelector';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import {getTowerLabel} from 'utils';

function SelectTower(props) {
  const {navigation, route} = props;
  const {selectedStructure, towerType} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);

  const structureData =
    selectedProject.project_structure?.[selectedStructure] || {};

  const {towerCount, towers} = structureData;

  const parsedTowers = useMemo(() => {
    return towers?.map((i, index) => ({
      id: i.tower_id,
      label: getTowerLabel(index + 1),
    }));
  }, [towers]);

  const onSelectTower = towerId => {
    navigation.navigate('BC_Step_Three', {...route?.params, towerId});
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={navigation.goBack}>
        <IconButton icon="keyboard-backspace" />
        <Subheading>{towerType}</Subheading>
      </TouchableOpacity>
      <TowerSelector
        {...props}
        towers={parsedTowers}
        towerCount={towerCount}
        towerType={towerType}
        onSelectTower={onSelectTower}
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
