import BhkButton from 'components/BhkButton';
import FloorBar from 'components/FloorBar';
import TowerIcon from 'components/TowerIcon';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScrollView, State} from 'react-native-gesture-handler';
import {Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';
import {BHK_OPTIONS} from 'utils/constant';

function TowersList({onPress, towers, selectedTower}) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.towerList}>
          {new Array(towers).fill(0).map((_, i) => {
            const towerId = i + 1;
            return (
              <TowerIcon
                onPress={onPress}
                key={towerId}
                index={towerId}
                active={towerId === selectedTower}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function BhkList({onPress, selectedBhk}) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.towerList}>
          {BHK_OPTIONS.map((bhk, i) => {
            return (
              <BhkButton
                bhk={bhk}
                key={i}
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

export default function BookingChart(props) {
  const {navigation, route} = props;
  const {t} = useTranslation();

  const {selectedProject = {}} = useSelector((state) => state.project);

  const {selectedStructure} = route?.params || {};
  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  const {towerCount, towers} = structureData;

  const [selectedTower, setSelectedTower] = React.useState();
  const [selectedBhk, setSelectedBhk] = React.useState();

  const floors = useMemo(() => {
    if (selectedTower) {
      return towers[selectedTower].floors;
    }
    return {};
  }, [selectedTower, towers]);

  const showAllUnits = (floorId) => {
    console.log('-----> floorId', floorId);
  };

  return (
    <View style={styles.container}>
      <Subheading theme={secondaryTheme}>{t('label_towers')}</Subheading>
      <TowersList
        towers={towerCount}
        selectedTower={selectedTower}
        onPress={setSelectedTower}
      />
      {!selectedTower ? (
        <View style={styles.noTowerContainer}>
          <Subheading theme={secondaryTheme} style={{marginTop: 5}}>
            Select Tower
          </Subheading>
        </View>
      ) : (
        <>
          <Subheading theme={secondaryTheme} style={{marginTop: 5}}>
            BHK indication
          </Subheading>
          <BhkList selectedBhk={selectedBhk} onPress={setSelectedBhk} />
          <Subheading theme={secondaryTheme} style={styles.floorTitle}>
            Floors
          </Subheading>
          <FlatList
            data={Object.keys(floors)}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
            extraData={{...floors}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => item.toString()}
            renderItem={({item: floorId}) => (
              <FloorBar
                floorId={floorId}
                inputProps={{
                  value: floors?.[floorId]?.unitCount?.toString() || '',
                  disabled: true,
                }}
                buttonLabel={'Show All Units'}
                buttonProps={{
                  color: '#5B6F7C',
                  onPress: () => showAllUnits(floorId),
                }}
              />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  towerList: {
    flexDirection: 'row',
  },
  noTowerContainer: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  floorTitle: {
    marginVertical: 5,
  },
});
