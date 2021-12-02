import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Subheading} from 'react-native-paper';
import PropTypes from 'prop-types';
import plot from 'assets/images/plot.png';
import {theme} from 'styles/theme';

function TowersList({
  onPress,
  navigation,
  towers,
  towerCount,
  heme,
  activeSrc,
  selectedTower,
  towerType,
}) {
  const [value, setValue] = useState();
  console.log('----->towerType in index screen', towerType);

  const selectTower = (floors, i) => {
    navigation.navigate('BC_Step_Floor', {
      floors: floors,
      towerType,
      towerId: i + 1,
    });
  };

  return (
    <View>
      <View>
        <View style={styles.towerList}>
          {new Array(towerCount).fill(0).map((_, i) => {
            const towerId = i + 1;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  alignItems: 'center',
                  margin: 8,
                }}>
                <View
                  style={{
                    backgroundColor: 'lightgrey',
                    padding: 10,
                  }}>
                  {/* {activeSrc} */}
                  <Image
                    source={plot}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => selectTower(towers[towerId])}
                  style={{
                    backgroundColor: i === value ? theme.colors.primary : null,
                    height: '100%',
                  }}>
                  <TouchableOpacity
                    style={{margin: 10}}
                    onPress={() => selectTower(towers[towerId], i)}>
                    <Text style={{color: i === value ? 'white' : 'black'}}>
                      {towerId}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function TowerSelector(props) {
  const {
    title,
    subtitle,
    selectButtonLabel,
    towers,
    towerCount,
    onSelectFloor,
    towerType,
    activeSrc,
    navigation,
  } = props;

  const {t} = useTranslation();

  const [selectedTower, setSelectedTower] = React.useState();

  const floors = useMemo(() => {
    return towers?.[selectedTower]?.floors || {};
  }, [selectedTower, towers]);

  return (
    <>
      <View style={styles.container}>
        <Subheading>{towerType}</Subheading>
        <TowersList
          towers={towers}
          towerCount={towerCount}
          towerType={towerType}
          activeSrc={activeSrc}
          theme={theme}
          navigation={navigation}
          selectedTower={selectedTower}
          onPress={setSelectedTower}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  towerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

TowerSelector.defaultProps = {
  title: 'label_select_tower',
  subtitle: 'label_select_appropriate_option',
  selectButtonLabel: 'Show All Units',
  onSelectFloor: () => {},
};

TowerSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  selectButtonLabel: PropTypes.string,
  onSelectFloor: PropTypes.func.isRequired,
};

export default TowerSelector;
