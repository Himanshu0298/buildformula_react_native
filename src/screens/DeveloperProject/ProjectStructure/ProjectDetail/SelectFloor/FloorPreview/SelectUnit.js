import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';
import {getFloorNumber} from 'utils';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {useSalesLoading} from 'redux/selectors';

export const SelectUnit = props => {
  const {navigation, route} = props;
  const {
    project_id,
    floor_id,
    towerId,
    structureType,
    selectedStructure,
    towerType,
    displayHeader,
    showBhkFilters,
    tower,
  } = props || {};

  const projectId = route.params.id || {};

  const {getUnitStatusListing} = useSalesActions();
  const {unitStatusListing} = useSelector(s => s.sales);

  const loading = useSalesLoading();

  const unitListing = useMemo(() => {
    return unitStatusListing[floor_id] || [];
  }, [floor_id, unitStatusListing]);

  useEffect(() => {
    fetchUnitsBookingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [towerId, floor_id]);

  const fetchUnitsBookingStatus = () => {
    getUnitStatusListing({
      project_id,
      project_type: structureType || selectedStructure,
      project_tower: tower || 0,
      project_floor: floor_id || 0,
      id: projectId,
    });
  };

  const checkUnitDisability = ({status}) => {
    return ![3, 4].includes(status);
  };

  const handleSelectUnit = unit => {
    navigation.navigate('CS_Step_Five', {
      project_id,
      floor_id,
      towerId,
      structureType,
      selectedStructure,
      towerType,
      unit,
    });
  };

  const floor = floor_id
    ? getFloorNumber(floor_id)
    : STRUCTURE_TYPE_LABELS?.[selectedStructure];

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      {towerType && displayHeader ? (
        <Subheading>
          {towerType}
          {structureType ? ` - ${STRUCTURE_TYPE_LABELS[structureType]}` : ''}
        </Subheading>
      ) : null}

      {displayHeader ? (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={navigation.goBack}>
            <IconButton icon="keyboard-backspace" />
            <Subheading>{floor}</Subheading>
          </TouchableOpacity>
        </View>
      ) : null}

      <UnitSelector
        {...props}
        refreshing={unitListing.length > 0 && loading}
        floorNumber={floor}
        units={unitListing}
        showBhkFilters={showBhkFilters}
        displayHeader={displayHeader}
        floorType={structureType || selectedStructure}
        isUnitDisabled={checkUnitDisability}
        onRefresh={fetchUnitsBookingStatus}
        onSelectUnit={handleSelectUnit}
      />
    </View>
  );
};

function SelectUnitContainer(props) {
  const {navigation, route} = props;

  const {
    project_id,
    floor_id,
    towerId,
    structureType,
    selectedStructure,
    towerType,
  } = route?.params || {};

  return (
    <SelectUnit
      project_id={project_id}
      floor_id={floor_id}
      towerId={towerId}
      structureType={structureType}
      selectedStructure={selectedStructure}
      towerType={towerType}
      navigation={navigation}
      displayHeader
      showBhkFilters={selectedStructure === 4}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: -15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectUnitContainer;
