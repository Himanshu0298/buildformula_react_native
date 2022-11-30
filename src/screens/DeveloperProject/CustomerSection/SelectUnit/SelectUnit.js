import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';
import {getFloorNumber} from 'utils';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import {STRUCTURE_TYPE, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {useSalesLoading} from 'redux/selectors';

export const SelectUnit = props => {
  const {navigation, route} = props;
  const {
    project_id,
    floorId,
    towerId,
    structureType,
    selectedStructure,
    towerType,
  } = props || {};

  const propertyLabel = STRUCTURE_TYPE_LABELS?.[structureType]?.toString();

  const {getUnitsBookingStatus} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {unitBookingStatus} = useSelector(s => s.sales);

  const loading = useSalesLoading();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUnitsBookingStatus();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const units = useMemo(() => {
    const structureData =
      selectedProject.project_structure?.[selectedStructure] || {};

    if ([4, 5].includes(selectedStructure)) {
      return structureData.units;
    }

    const {floors = {}} =
      structureData?.towers.find(i => i.tower_id === towerId) || {};

    return floors?.[floorId]?.units || [];
  }, [floorId, selectedProject, selectedStructure, towerId]);

  const processedUnits = useMemo(() => {
    const updatedUnits = units.map(unit => {
      const bookingData = unitBookingStatus.find(
        i => Number(i.id) === Number(unit.unit_id),
      );

      if (bookingData) {
        unit = {...unit, ...bookingData};
      }

      return unit;
    });

    return updatedUnits;
  }, [unitBookingStatus, units]);

  const fetchUnitsBookingStatus = () => {
    getUnitsBookingStatus({
      project_id,
      project_type: structureType || selectedStructure,
      project_tower: towerId || 0,
      project_floor: Number(floorId || 0),
    });
  };

  const checkUnitDisability = ({status}) => {
    return ![3, 4].includes(status);
  };

  const handleSelectUnit = unit => {
    navigation.navigate('CS_Step_Five', {...route?.params, unit});
  };

  const floor = floorId
    ? getFloorNumber(floorId)
    : STRUCTURE_TYPE_LABELS?.[selectedStructure];

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      {towerType ? (
        <Subheading>
          {towerType}
          {structureType ? ` - ${STRUCTURE_TYPE_LABELS[structureType]}` : ''}
        </Subheading>
      ) : null}

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <Subheading>{floor}</Subheading>
        </TouchableOpacity>
      </View>

      <UnitSelector
        {...props}
        refreshing={unitBookingStatus.length > 0 && loading}
        floorNumber={floor}
        units={processedUnits}
        showBhkFilters={
          selectedStructure !== STRUCTURE_TYPE.PLOT &&
          propertyLabel !== 'Shops' &&
          propertyLabel !== 'Offices'
        }
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
  } = route?.params || {};

  return (
    <SelectUnit
      project_id={project_id}
      floorId={floorId}
      towerId={towerId}
      structureType={structureType}
      selectedStructure={selectedStructure}
      towerType={towerType}
      navigation={navigation}
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
