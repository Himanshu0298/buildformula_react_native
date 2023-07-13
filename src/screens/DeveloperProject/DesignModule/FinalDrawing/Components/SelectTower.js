import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import TowerSelector from 'components/Molecules/TowerSelector';
import React, {useMemo, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {IconButton, Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';

const TOWERS = [
  {label: 'A', value: 1},
  {label: 'B', value: 2},
  {label: 'C', value: 3},
  {label: 'D', value: 4},
  {label: 'E', value: 5},
];

const PLOTS = [
  {label: '01', value: 1},
  {label: '02', value: 2},
  {label: '03', value: 3},
  {label: '04', value: 4},
  {label: '05', value: 5},
];

const BUNGALOW = [
  {label: '01', value: 1},
  {label: '02', value: 2},
  {label: '03', value: 3},
  {label: '04', value: 4},
  {label: '05', value: 5},
];

function Towers(props) {
  const {
    onSelectStructure,
    topThreeTowers,
    topThreePlots,
    topThreeBungalow,
    item,
  } = props;

  const isSelectedTower = TOWERS?.includes();

  const towerType = 'Towers';
  return (
    <View style={styles.headerWrapper}>
      <View style={{width: '90%'}}>
        <TowerSelector
          {...props}
          towers={topThreeTowers}
          towerType={towerType}
          onSelectTower={onSelectStructure}
        />
      </View>
      <OpacityButton
        opacity={1}
        onPress={console.log('===========> ')}
        style={styles.button}>
        <MaterialCommunityIcons
          name={isSelectedTower ? 'chevron-up' : 'chevron-down'}
          size={23}
          color="#fff"
        />
      </OpacityButton>
    </View>
  );
}

function SelectTower(props) {
  const {navigation, structureLabel, onSelectStructure} = props;

  console.log('===========> onSelectStructure', onSelectStructure);

  const [towers, setTowers] = useState(TOWERS || []);

  const topThreeTowers = useMemo(() => {
    return towers?.slice(0, 3);
  }, [towers]);

  const topThreePlots = useMemo(() => {
    return PLOTS?.slice(0, 3);
  }, []);

  const topThreeBungalow = useMemo(() => {
    return BUNGALOW?.slice(0, 3);
  }, []);

  return (
    <View style={styles.container}>
      <Towers
        onSelectStructure={onSelectStructure}
        topThreeTowers={topThreeTowers}
        topThreePlots={topThreePlots}
        topThreeBungalow={topThreeBungalow}
      />

      <View style={{margin: 10}}>
        <Text style={{color: theme.colors.primary}}>
          All {structureLabel} Common Files
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexGrow: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 50,
    padding: 0,
    height: 30,
    width: 30,
  },
});

export default SelectTower;
