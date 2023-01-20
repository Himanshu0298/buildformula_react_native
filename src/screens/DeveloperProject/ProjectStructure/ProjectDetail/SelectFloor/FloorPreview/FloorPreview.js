import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import FloorBar from 'components/Atoms/FloorBar';
import NoResult from 'components/Atoms/NoResult';
import {pickBy} from 'lodash';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {IconButton, Subheading} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {SelectUnit} from 'screens/DeveloperProject/CustomerSection/SelectUnit/SelectUnit';

function FloorPreview(props) {
  const {navigation, route} = props;
  const {selectedStructure, towerType, towerId, id} = route?.params || {};

  const {getFloorList} = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {floorList, loading} = useSelector(s => s.projectStructure);

  const [selectedFloor, setSelectedFloor] = useState();
  const [selectedBhk, setSelectedBhk] = React.useState();

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getFloorList({
      project_id: selectedProject.id,
      id,
      tower_id: towerId,
    });
  };

  const structureData =
    selectedProject.project_structure?.[selectedStructure] || {};

  const {floors = {}} =
    structureData?.towers.find(i => i.tower_id === towerId) || {};

  const onSelectFloor = floorId => {
    setSelectedFloor(v => (v === floorId ? undefined : floorId));
  };

  const filteredFloors = useMemo(() => {
    return pickBy(floors, (floorData, floorId) => {
      const units =
        ([4, 5].includes(selectedStructure)
          ? structureData.units
          : floors?.[floorId]?.units) || [];

      if (selectedBhk && floorData.structureType === 1) {
        return Boolean(units.filter(i => i.bhk === selectedBhk)?.length);
      }

      return true;
    });
  }, [floors, selectedBhk, selectedStructure, structureData.units]);

  const renderNoFloor = () => <NoResult title="No Floors available" />;

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
      </View>
      <View style={styles.subHeader}>
        <Subheading style={styles.floorsTitle}>Floors</Subheading>
        <OpacityButton
          opacity={0.1}
          color="#4872f4"
          style={styles.editIcon}
          onPress={() => navigation.navigate('FloorList', {id, towerId})}>
          <MaterialIcon name="edit" color="#4872f4" size={15} />
        </OpacityButton>
      </View>

      <FlatList
        data={Object.keys(filteredFloors)}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={{...filteredFloors}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.toString()}
        ListEmptyComponent={renderNoFloor}
        renderItem={({item: floorId, index}) => {
          const {structureType} = floors?.[floorId] || {};
          return (
            <>
              <FloorBar
                {...props}
                {...{
                  floorId,
                  index,
                  towerId,
                  floorData: filteredFloors,
                  ...route.params,
                  structureType,
                }}
                inputProps={{
                  value: filteredFloors?.[floorId]?.unitCount?.toString() || '',
                  disabled: true,
                }}
                buttonProps={{color: '#5B6F7C'}}
                onSelectFloor={onSelectFloor}
                selectedFloor={selectedFloor}
              />
              {selectedFloor === floorId ? (
                <SelectUnit
                  floorId={floorId}
                  structureType={structureType}
                  project_id={selectedProject.id}
                  towerId={towerId}
                  selectedStructure={selectedStructure}
                  towerType={towerType}
                  navigation={navigation}
                  route={route}
                  showBhkFilters={false}
                  displayHeader={false}
                />
              ) : null}
            </>
          );
        }}
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
  editIcon: {
    borderRadius: 50,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
export default FloorPreview;
