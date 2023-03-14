import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import TowerSelector from 'components/Molecules/TowerSelector';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import {getTowerLabel} from 'utils';
import useProjectStructureActions from 'redux/actions/projectStructureActions';

function SelectTower(props) {
  const {navigation, route} = props;
  const {towerType, projectData} = route?.params || {};

  const id = projectData?.id;

  const {getTowerList} = useProjectStructureActions();
  const {towerList} = useSelector(s => s.projectStructure);
  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getTowerList({project_id: selectedProject.id, id});
  };

  const parsedTowers = useMemo(() => {
    return towerList?.map((i, index) => ({
      id: i.tower_id,
      label: getTowerLabel(index + 1),
    }));
  }, [towerList]);

  const onSelectTower = (values, towerId) => {
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
