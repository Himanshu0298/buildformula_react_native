import React, {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import FloorSelector from 'components/Molecules/TowerSelector';
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FloorBar from 'components/Atoms/FloorBar';
import {Button, IconButton} from 'react-native-paper';
import plot from 'assets/images/plot.png';

export default function SelectFloor(props) {
  const {
    title,
    subtitle,
    selectButtonLabel,
    towers,
    towerCount,
    onSelectFloor,
    navigation,
  } = props;
  const floors = props.route.params.floors;
  const towerType = props.route.params.towerType;
  const towerId = props.route.params.towerId;

  console.log('----->towerId in select floor', towerId);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon="keyboard-backspace"
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 8,
              borderWidth: 1,
            }}>
            <View
              style={{
                backgroundColor: 'lightgrey',
                padding: 10,
              }}>
              <Image
                source={plot}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <View
              // onPress={() => selectTower(towers[towerId])}
              style={{
                backgroundColor: 'white',
                height: '100%',
              }}>
              <View
                style={{margin: 10}}
                // onPress={() => selectTower(towers[towerId])}
              >
                <Text style={{color: 'black'}}>1</Text>
              </View>
            </View>
          </View>
        </View>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => navigation.goBack()}>
          Change {towerType}
        </Button>
      </View>

      <FlatList
        data={Object.keys(floors.floors)}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
        extraData={{...floors}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.toString()}
        renderItem={({item: floorId, index}) => (
          <FloorBar
            floorId={floorId}
            floorData={floors.floors}
            index={index}
            towerId={towerId}
            navigation={navigation}
            inputProps={{
              value: floors?.[floorId]?.unitCount?.toString() || '',
              disabled: true,
            }}
            buttonLabel={selectButtonLabel}
            buttonProps={{
              color: '#5B6F7C',
              // onPress: () => onSelectFloor(selectedTower, floorId),
            }}
          />
        )}
      />
    </View>
  );
}
