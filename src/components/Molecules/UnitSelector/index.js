import React, {useMemo} from 'react';
import BhkButton from 'components/Atoms/Buttons/BhkButton';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Subheading} from 'react-native-paper';
import {BHK_OPTIONS} from 'utils/constant';
import PropTypes from 'prop-types';
import NoResult from 'components/Atoms/NoResult';
import RenderUnit from './RenderUnit';

const getUnitNumber = string => {
  const split = string.split('-R');
  return Number(`${split[0]}.${split[1] || 0}`);
};

function BhkList({onPress, selectedBhk}) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.towerList}>
          {BHK_OPTIONS.map((bhk, i) => {
            return (
              <BhkButton
                bhk={bhk}
                key={i.toString()}
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

function UnitSelector(props) {
  const {
    showBhkFilters,
    refreshing,
    onRefresh,
    units,
    floorNumber,
    onSelectUnit,
    floorType,
    isUnitDisabled,
  } = props;

  const [selectedBhk, setSelectedBhk] = React.useState();

  const processedUnits = units.sort(
    (a, b) => getUnitNumber(a.unitLabel) - getUnitNumber(b.unitLabel),
  );

  const filteredUnits = useMemo(() => {
    if (selectedBhk) {
      return processedUnits.filter(i => i.bhk === selectedBhk);
    }
    return processedUnits;
  }, [selectedBhk, processedUnits]);

  const renderNoUnits = () => <NoResult title="No Units available" />;

  return (
    <View style={styles.container}>
      {showBhkFilters ? (
        <>
          <Subheading style={styles.bhkHeading}>BHK indication</Subheading>

          <BhkList selectedBhk={selectedBhk} onPress={setSelectedBhk} />
        </>
      ) : null}
      <Subheading style={styles.floorTitle}>{floorNumber}</Subheading>
      <FlatList
        data={filteredUnits}
        extraData={filteredUnits}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        ListEmptyComponent={renderNoUnits}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }
        renderItem={({item: unit}) => (
          <RenderUnit
            key={unit?.unit_id}
            unit={unit}
            floorType={floorType}
            onSelectUnit={onSelectUnit}
            isUnitDisabled={isUnitDisabled}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bhkHeading: {
    marginTop: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  towerList: {
    flexDirection: 'row',
  },
  floorTitle: {
    marginVertical: 5,
  },
});

UnitSelector.defaultProps = {
  title: 'title_select_unit',
  subtitle: 'label_select_appropriate_option',
  showBhkFilters: true,
  refreshing: false,
};

UnitSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showBhkFilters: PropTypes.bool,
  onSelectUnit: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired,
};

export default React.memo(UnitSelector);
