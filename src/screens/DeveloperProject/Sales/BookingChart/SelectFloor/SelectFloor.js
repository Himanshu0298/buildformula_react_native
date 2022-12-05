import React, {useState, useMemo} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FloorBar from 'components/Atoms/FloorBar';
import {IconButton, Subheading, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RenderTowerBox} from 'components/Molecules/TowerSelector';
import NoResult from 'components/Atoms/NoResult';
import {BHK_OPTIONS} from 'utils/constant';
import BhkButton from 'components/Atoms/Buttons/BhkButton';
import {pickBy} from 'lodash';
import {SelectUnit} from '../SelectUnit/SelectUnit';

function BhkList({onPress, selectedBhk}) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.towerList}>
          {BHK_OPTIONS.map(bhk => {
            return (
              <BhkButton
                bhk={bhk}
                key={String(bhk.type)}
                selected={bhk.type === selectedBhk}
                onPress={onPress}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function SelectFloor(props) {
  const {route, navigation} = props;
  const {selectedStructure, towerType, towerId, project_id} =
    route?.params || {};

  const [selectedFloor, setSelectedFloor] = useState();

  const [selectedBhk, setSelectedBhk] = React.useState();

  const onSelectFloor = floorId => {
    setSelectedFloor(v => (v === floorId ? undefined : floorId));
  };

  const {selectedProject} = useSelector(s => s.project);

  const structureData =
    selectedProject.project_structure?.[selectedStructure] || {};

  const {floors = {}} =
    structureData?.towers.find(i => i.tower_id === towerId) || {};

  const showBhkIndicator = useMemo(() => {
    return Boolean(
      Object.values(floors).filter(i => i.structureType === 1)?.length,
    );
  }, [floors]);

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
      <Subheading>{towerType}</Subheading>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <RenderTowerBox {...props} towerId={towerId} active />
        </TouchableOpacity>
      </View>

      {showBhkIndicator ? (
        <View>
          <Subheading style={styles.bhkHeading}>BHK indication</Subheading>

          <BhkList selectedBhk={selectedBhk} onPress={setSelectedBhk} />
        </View>
      ) : null}

      <Subheading style={styles.floorsTitle}>Floors</Subheading>

      <FlatList
        data={Object.keys(filteredFloors)}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={{...filteredFloors}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.toString()}
        ListEmptyComponent={renderNoFloor}
        renderItem={({item: floorId, index}) => {
          const {structureType} = filteredFloors[floorId];

          return (
            <>
              <FloorBar
                {...props}
                {...{
                  floorId,
                  index,
                  towerId,
                  floorData: filteredFloors,
                  toggle: true,
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
                  project_id={project_id}
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
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: -15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 5,
  },
  floorsTitle: {
    marginVertical: 10,
  },
  towerList: {
    flexDirection: 'row',
  },
});

export default withTheme(SelectFloor);
