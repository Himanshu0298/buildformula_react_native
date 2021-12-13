import React from 'react';
import BhkButton from 'components/Atoms/Buttons/BhkButton';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {Subheading} from 'react-native-paper';
import {BHK_OPTIONS} from 'utils/constant';
import PropTypes from 'prop-types';
import RenderUnits from './RenderUnits';

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

function UnitSelector(props) {
  const {
    showBhkFilters,
    refreshing,
    onRefresh,
    units,
    floorId,
    floorNumber,
    onSelectUnit,
    isUnitDisabled,
  } = props;

  const [selectedBhk, setSelectedBhk] = React.useState();

  return (
    <View style={styles.container}>
      {showBhkFilters ? (
        <>
          <Subheading style={{marginTop: 5}}>BHK indication</Subheading>
          <BhkList selectedBhk={selectedBhk} onPress={setSelectedBhk} />
        </>
      ) : null}
      <Subheading style={styles.floorTitle}>{floorNumber}</Subheading>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }>
        <RenderUnits
          units={units}
          selectedFloor={floorId}
          onSelectUnit={onSelectUnit}
          isUnitDisabled={isUnitDisabled}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  onSelectUnit: () => {},
  onRefresh: () => {},
};

UnitSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showBhkFilters: PropTypes.bool,
  onSelectUnit: PropTypes.func,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  floorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default React.memo(UnitSelector);
