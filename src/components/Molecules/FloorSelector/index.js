import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FloorBar from 'components/Atoms/FloorBar';
import {IconButton, Subheading, withTheme} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {RenderTowerBox} from 'components/Molecules/TowerSelector';
import NoResult from 'components/Atoms/NoResult';
import {BHK_OPTIONS} from 'utils/constant';
import BhkButton from 'components/Atoms/Buttons/BhkButton';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

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

function FloorSelector(props) {
  const {
    navigation,
    floors,
    towerId,
    towerLabel,
    towerType,
    projectId,
    renderUnits,
    edit,
  } = props || {};

  const [selectedFloor, setSelectedFloor] = useState();

  const onSelectFloor = floorId => {
    setSelectedFloor(v => (v === floorId ? undefined : floorId));
  };
  const renderNoFloor = () => <NoResult title="No Floors available" />;

  return (
    <View style={styles.container}>
      <Subheading>{towerType}</Subheading>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <RenderTowerBox towerId={towerId} label={towerLabel} active />
        </TouchableOpacity>
      </View>

      {/* {handleBhkChange ? (
        <View>
          <Subheading style={styles.bhkHeading}>BHK indication</Subheading>
          <BhkList selectedBhk={selectedBhk} onPress={handleBhkChange} />
        </View>
      ) : null} */}

      <View style={styles.editIconContainer}>
        <Subheading>Floors</Subheading>
        {edit ? (
          <OpacityButton
            opacity={0.1}
            color="#4872f4"
            style={styles.editIcon}
            onPress={() =>
              navigation.navigate('FloorList', {towerId, projectId})
            }>
            <MaterialIcon name="edit" color="#4872f4" size={15} />
          </OpacityButton>
        ) : null}
      </View>

      <FlatList
        data={floors}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={floors}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.id}
        ListEmptyComponent={renderNoFloor}
        renderItem={({item: floorData, index}) => {
          const {
            structureType,
            id: floorId,
            unitCount,
            floor: floor_id,
          } = floorData;

          return (
            <>
              <FloorBar
                floorId={floorId}
                towerId={towerId}
                floorData={floorData}
                toggle
                structureType={structureType}
                inputProps={{
                  value: unitCount?.toString() || '',
                  disabled: true,
                }}
                buttonProps={{color: '#5B6F7C'}}
                onSelectFloor={onSelectFloor}
                selectedFloor={selectedFloor}
                index={index}
              />
              {selectedFloor === floorId
                ? renderUnits({structureType, floorId, floor_id, index})
                : null}
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
  towerList: {
    flexDirection: 'row',
  },
  editIcon: {
    borderRadius: 50,
  },
  editIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default withTheme(FloorSelector);
