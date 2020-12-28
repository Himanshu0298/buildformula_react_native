import React, {useMemo} from 'react';
import FloorBar from 'components/Atoms/FloorBar';
import FormTitle from 'components/Atoms/FormTitle';
import TowerIcon from 'components/Atoms/TowerIcon';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import {Subheading} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import PropTypes from 'prop-types';

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

function FloorSelector({
  title,
  subtitle,
  selectButtonLabel,
  towers,
  towerCount,
  onSelectFloor,
}) {
  const {t} = useTranslation();

  const [selectedTower, setSelectedTower] = React.useState();

  const floors = useMemo(() => {
    if (selectedTower) {
      return towers[selectedTower].floors;
    }
    return {};
  }, [selectedTower, towers]);

  return (
    <>
      <FormTitle title={t(title)} subTitle={t(subtitle)} />
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
                  buttonLabel={selectButtonLabel}
                  buttonProps={{
                    color: '#5B6F7C',
                    onPress: () => onSelectFloor(selectedTower, floorId),
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

FloorSelector.defaultProps = {
  title: 'label_select_tower',
  subtitle: 'label_select_appropriate_option',
  selectButtonLabel: 'Show All Units',
  onSelectFloor: () => {},
};

FloorSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  selectButtonLabel: PropTypes.string,
  onSelectFloor: PropTypes.func.isRequired,
};

export default FloorSelector;
