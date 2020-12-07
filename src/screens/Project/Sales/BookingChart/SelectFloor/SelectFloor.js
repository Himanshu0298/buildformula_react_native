import React, {useMemo} from 'react';
import FloorBar from 'components/FloorBar';
import FormTitle from 'components/FormTitle';
import TowerIcon from 'components/TowerIcon';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import {Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';

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

export default function SelectFloor(props) {
  const {navigation, route} = props;
  const {t} = useTranslation();

  const {selectedProject = {}} = useSelector((state) => state.project);

  const {selectedStructure} = route?.params || {};
  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  const {towerCount, towers} = structureData;

  const [selectedTower, setSelectedTower] = React.useState();

  const floors = useMemo(() => {
    if (selectedTower) {
      return towers[selectedTower].floors;
    }
    return {};
  }, [selectedTower, towers]);

  const showAllUnits = (floorId) => {
    navigation.navigate('BC_Step_Three', {
      selectedStructure,
      towerId: selectedTower,
      floorId,
    });
  };

  return (
    <>
      <FormTitle
        title={t('label_select_tower')}
        subTitle={t('label_select_appropriate_option')}
      />
      <View style={styles.container}>
        <Subheading theme={secondaryTheme}>{t('label_towers')}</Subheading>
        <TowersList
          towers={towerCount}
          selectedTower={selectedTower}
          onPress={setSelectedTower}
        />
        {selectedTower ? (
          <>
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
        ) : null}
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
  },
  floorTitle: {
    marginVertical: 5,
  },
});
