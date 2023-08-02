import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text} from 'react-native-paper';
import TowerSelector from 'components/Molecules/TowerSelector';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';

function Towers(props) {
  const {
    onSelectStructure,
    topThreeTowers,
    toggleMinimize,
    minimized,
    structureLabel,
  } = props;

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.towerSelectorContainer}>
        <TowerSelector
          {...props}
          towers={topThreeTowers}
          towerType={structureLabel}
          onSelectTower={onSelectStructure}
        />
      </View>

      <OpacityButton opacity={1} onPress={toggleMinimize} style={styles.button}>
        <MaterialCommunityIcons
          name={minimized ? 'chevron-down' : 'chevron-up'}
          size={23}
          color="#fff"
        />
      </OpacityButton>
    </View>
  );
}

function SelectStructure(props) {
  const {structureLabel, onSelectStructure, data} = props;

  const [minimized, setMinimized] = useState(true);

  const topThree = useMemo(() => {
    if (minimized) {
      return data?.slice(0, 3);
    }
    return data;
  }, [data, minimized]);

  const toggleMinimize = () => setMinimized(v => !v);

  return (
    <View style={styles.container}>
      <Towers
        onSelectStructure={onSelectStructure}
        topThreeTowers={topThree}
        topThreePlots={topThree}
        topThreeBungalow={topThree}
        towerList={data}
        toggleMinimize={toggleMinimize}
        minimized={minimized}
        structureLabel={structureLabel}
      />

      <View style={styles.filesHeadingContainer}>
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
  },
  headerWrapper: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 50,
    padding: 0,
    height: 30,
    width: 30,
    marginTop: 15,
  },

  towerSelectorContainer: {
    width: '90%',
    height: '100%',
  },
  filesHeadingContainer: {
    marginTop: 10,
  },
});

export default SelectStructure;
