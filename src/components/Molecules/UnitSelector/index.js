import React from 'react';
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
import RenderUnit from './RenderUnit';

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
    isUnitDisabled,
  } = props;

  const [selectedBhk, setSelectedBhk] = React.useState();

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
        data={Object.keys(units)}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        extraData={Object.keys(units)}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }
        renderItem={({item, index}) => (
          <RenderUnit
            key={index.toString()}
            unit_id={item}
            unit={units[item]}
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
};

export default React.memo(UnitSelector);
