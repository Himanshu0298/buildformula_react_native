import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import TowerSelector from 'components/Molecules/TowerSelector';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {IconButton, Subheading} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';

function TowerPreview(props) {
  const {navigation, route} = props;
  const {towerType, id} = route?.params || {};

  const {getTowerList} = useProjectStructureActions();
  const {towerList, loading} = useSelector(s => s.projectStructure);
  const {selectedProject} = useSelector(s => s.project);
  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getTowerList({project_id: selectedProject.id, id});
  };

  const onSelectTower = (values, tower) => {
    const towerLabel = towerList?.find(i => i.id === values);
    navigation.navigate('FloorPreview', {
      ...route?.params,
      towerId: values,
      label: towerLabel?.label,
      id,
      tower,
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.subContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={navigation.goBack}>
            <IconButton icon="keyboard-backspace" />
          </TouchableOpacity>
          <Subheading>{towerType}</Subheading>
        </View>
        <View>
          <OpacityButton
            opacity={0.1}
            color="#4872f4"
            style={styles.editIcon}
            onPress={() => navigation.navigate('TowerList', {id})}>
            <MaterialIcon name="edit" color="#4872f4" size={15} />
          </OpacityButton>
        </View>
      </View>
      <TowerSelector
        {...props}
        towers={towerList}
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
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  editIcon: {
    borderRadius: 50,
  },
});

export default TowerPreview;
