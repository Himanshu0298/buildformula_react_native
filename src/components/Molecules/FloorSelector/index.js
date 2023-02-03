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
import {RenderTowerBox} from 'components/Molecules/TowerSelector';
import NoResult from 'components/Atoms/NoResult';
import {BHK_OPTIONS} from 'utils/constant';
import BhkButton from 'components/Atoms/Buttons/BhkButton';

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
    selectedBhk,
    floors,
    towerId,
    towerLabel,
    towerType,
    handleBhkChange,
    renderUnits,
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

      {handleBhkChange ? (
        <View>
          <Subheading style={styles.bhkHeading}>BHK indication</Subheading>
          <BhkList selectedBhk={selectedBhk} onPress={handleBhkChange} />
        </View>
      ) : null}

      <Subheading style={styles.floorsTitle}>Floors</Subheading>

      <FlatList
        data={floors}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={floors}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.id}
        ListEmptyComponent={renderNoFloor}
        renderItem={({item: floorData}) => {
          const {structureType, id: floorId, unitCount} = floorData;

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
              />
              {selectedFloor === floorId
                ? renderUnits({structureType, floorId})
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
  floorsTitle: {
    marginVertical: 10,
  },
  towerList: {
    flexDirection: 'row',
  },
});

export default withTheme(FloorSelector);
