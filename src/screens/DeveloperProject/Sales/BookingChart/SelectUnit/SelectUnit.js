import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';
import dayjs from 'dayjs';
import {getFloorNumber, getPermissions} from 'utils';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import SelectHoldOrBook from 'screens/DeveloperProject/Sales/BookingChart/SelectUnit/Components/UnitBookingDialog';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {useSalesLoading} from 'redux/selectors';

function SelectUnit(props) {
  const {navigation, route} = props;
  const {
    project_id,
    floorId,
    towerId,
    structureType,
    selectedStructure,
    towerType,
  } = route?.params || {};

  const modulePermission = getPermissions('Booking Chart');
  const snackbar = useSnackbar();

  const {getUnitsBookingStatus, lockUnit, toggleTimer} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {unitBookingStatus} = useSelector(s => s.sales);
  const {user} = useSelector(s => s.user);

  const loading = useSalesLoading();

  const [selectedUnit, setSelectedUnit] = useState();

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

    return structureData.towers?.[towerId]?.floors?.[floorId]?.units || {};
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

  const toggleDialog = value => setSelectedUnit(v => (!v ? value : undefined));

  const fetchUnitsBookingStatus = () => {
    getUnitsBookingStatus({
      project_id,
      project_type: structureType || selectedStructure,
      project_tower: towerId || 0,
      project_floor: Number(floorId || 0),
    });
  };

  const checkUnitDisability = unit => {
    const {status, booked_unit_user_id, tmp_booking_time_end} = unit;
    let disabled =
      [3, 4].includes(status) ||
      (status === 2 && booked_unit_user_id && booked_unit_user_id !== user.id);

    if (status === 2 && dayjs(tmp_booking_time_end).isBefore(dayjs())) {
      disabled = false;
    }
    return disabled;
  };

  const handleBook = () => {
    if (modulePermission?.editor || modulePermission?.admin) {
      lockUnit({unit_id: selectedUnit.unit_id, project_id: selectedProject.id});
      toggleTimer({showTimer: true, startTime: new Date(), time: 1800});
      toggleDialog();

      navigation.navigate('BC_Step_Five', {...route?.params, ...selectedUnit});
    } else {
      toggleDialog();
      snackbar.showMessage({
        message:
          'You do not have permissions to perform this action. Contact project Admin for support',
        variant: 'warning',
      });
    }
  };

  const handleHold = () => {
    toggleDialog();
    navigation.navigate('BookingFormOnHold', {
      ...route?.params,
      ...selectedUnit,
    });
  };

  const handleSelectUnit = unit => {
    if (unit.status === 5) {
      handleHold();
    } else {
      toggleDialog(unit);
    }
  };

  const floor = floorId
    ? getFloorNumber(floorId)
    : STRUCTURE_TYPE_LABELS?.[selectedStructure];

  return (
    <View style={styles.container}>
      <SelectHoldOrBook
        visible={Boolean(selectedUnit)}
        setVisible={setSelectedUnit}
        toggleDialog={toggleDialog}
        handleBook={handleBook}
        handleHold={handleHold}
      />
      <Spinner visible={loading} textContent="" />

      {towerType ? <Subheading>{towerType}</Subheading> : null}

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
        showBhkFilters
        isUnitDisabled={checkUnitDisability}
        onRefresh={fetchUnitsBookingStatus}
        onSelectUnit={handleSelectUnit}
      />
    </View>
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

export default SelectUnit;
