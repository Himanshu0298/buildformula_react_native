import React, {useState} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import FloorBar from 'components/Atoms/FloorBar';
import {Subheading, withTheme} from 'react-native-paper';

import NoResult from 'components/Atoms/NoResult';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import Spinner from 'react-native-loading-spinner-overlay';

function FDFloorSelector(props) {
  const {
    navigation,
    floors,
    towerId,

    loadingUnitStatus,
  } = props || {};

  const [selectedFloor, setSelectedFloor] = useState([]);

  const onSelectFloor = floorId => {
    // eslint-disable-next-line no-unused-expressions
    !selectedFloor.includes(floorId)
      ? setSelectedFloor(v => [...v, floorId])
      : setSelectedFloor(selectedFloor.filter(e => e !== floorId));
  };
  const renderNoFloor = () => <NoResult title="No Floors available" />;

  const navToAddRow = () => {
    navigation.navigate('AddRows');
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loadingUnitStatus} textContent="" />
      <View style={styles.headerContainer}>
        <Subheading>Floors</Subheading>
        <OpacityButton opacity={0.1} color="#4872f4" onPress={navToAddRow}>
          <Text style={{color: '#4872f4', padding: 5}}>Add Rows</Text>
        </OpacityButton>
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
                index={index}
              />
              {/* {selectedFloor?.includes(floorId)
                ? renderUnits({
                    structureType,
                    floorId,
                    floor_id,
                    index,
                  })
                : null} */}
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
    marginTop: 15,
  },

  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 5,
  },
});

export default withTheme(FDFloorSelector);
