import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';
import {getFloorNumber} from 'utils';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Subheading, Text} from 'react-native-paper';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {useSalesLoading} from 'redux/selectors';

export const SelectUnit = props => {
  const {navigation} = props;
  const {
    project_id,
    floorId,
    towerId,
    structureType,
    selectedStructure,
    towerType,
    displayHeader,
    showBhkFilters,
    projectData,
    floor_id,
    tower_id,
  } = props || {};

  const {getUnitStatusListing} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {unitStatusListing} = useSelector(s => s.sales);

  const loading = useSalesLoading();

  useEffect(() => {
    fetchUnitsBookingStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [towerId, floorId]);

  const units = useMemo(() => {
    const structureData =
      selectedProject?.project_structure?.[selectedStructure] || {};

    if ([4, 5].includes(selectedStructure)) {
      return structureData.units;
    }

    const {floors = {}} =
      structureData?.towers?.find(i => i.tower_id === towerId) || {};

    return floors?.[floorId]?.units || [];
  }, [floorId, selectedProject, selectedStructure, towerId]);

  const processedUnits = useMemo(() => {
    const updatedUnits = units.map(unit => {
      const bookingData = unitStatusListing.find(
        i => Number(i.id) === Number(unit.unit_id),
      );

      if (bookingData) {
        unit = {...unit, ...bookingData};
      }

      return unit;
    });

    return updatedUnits;
  }, [unitStatusListing, units]);

  const fetchUnitsBookingStatus = () => {
    getUnitStatusListing({
      project_id,
      project_type: structureType || selectedStructure,
      project_tower: tower_id || 0,
      project_floor: floor_id || 0,
      id: projectData?.id,
    });
  };

  const checkUnitDisability = ({status}) => {
    return ![3, 4].includes(status);
  };

  const handleSelectUnit = unit => {
    navigation.navigate('CS_Step_Five', {
      project_id,
      floorId,
      towerId,
      structureType,
      selectedStructure,
      towerType,
      unit,
    });
  };

  const floor = floorId
    ? getFloorNumber(floorId)
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
        refreshing={unitStatusListing.length > 0 && loading}
        floorNumber={floor}
        units={unitStatusListing}
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
    floorId,
    towerId,
    structureType,
    selectedStructure,
    towerType,
    projectData,
  } = route?.params || {};

  return (
    <SelectUnit
      project_id={project_id}
      floorId={floorId}
      towerId={towerId}
      projectData={projectData}
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
