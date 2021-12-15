import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';
import dayjs from 'dayjs';
import {getFloorNumber, getPermissions} from 'utils';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, IconButton, Subheading, Text} from 'react-native-paper';
import SelectHoldOrBook from 'screens/DeveloperProject/Sales/BookingChart/SelectUnit/Components/UnitBookingDialog';

function SelectUnit(props) {
  const {navigation, route} = props;
  const {floorId, towerId, selectedStructure, towerType} = route?.params || {};

  const modulePermission = getPermissions('Booking Chart');
  const snackbar = useSnackbar();

  const {getUnitsBookingStatus, lockUnit, toggleTimer} = useSalesActions();

  const {selectedProject} = useSelector(state => state.project);
  const {loadingUnitStatus, unitBookingStatus} = useSelector(s => s.sales);
  const {user} = useSelector(state => state.user);

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
      selectedProject.projectData?.[selectedStructure] || {};

    if (selectedStructure === 4 || selectedStructure === 5) {
      return structureData.units;
    }

    return structureData.towers?.[towerId]?.floors?.[floorId]?.units || {};
  }, [floorId, selectedProject, selectedStructure, towerId]);

  const processedUnits = useMemo(() => {
    Object.keys(units).map(key => {
      const bookingData = unitBookingStatus.find(
        unit => unit.id === units[key].unitId,
      );

      if (bookingData) {
        units[key] = {...units[key], ...bookingData};
      }

      return key;
    });

    return units;
  }, [unitBookingStatus, units]);

  const toggleDialog = value => setSelectedUnit(v => (!v ? value : undefined));

  const fetchUnitsBookingStatus = () => {
    getUnitsBookingStatus({
      project_id: selectedProject.id,
      project_type: selectedStructure,
      project_tower: towerId,
      project_floor: floorId,
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
      lockUnit({unit_id: selectedUnit.unitId, project_id: selectedProject.id});
      toggleTimer({showTimer: true, startTime: new Date(), time: 1800});
      toggleDialog();

      navigation.navigate('BC_Step_Five', {
        ...route?.params,
        ...selectedUnit,
      });
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

  return (
    <View style={styles.container}>
      <SelectHoldOrBook
        visible={Boolean(selectedUnit)}
        setVisible={setSelectedUnit}
        toggleDialog={toggleDialog}
        handleBook={handleBook}
        handleHold={handleHold}
      />
      <Spinner visible={loadingUnitStatus} textContent="" />

      <Subheading>{towerType}</Subheading>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <Text> {getFloorNumber(floorId)}</Text>
        </TouchableOpacity>
        <Button mode="contained" uppercase={false} onPress={navigation.goBack}>
          Change Floor
        </Button>
      </View>

      <UnitSelector
        {...props}
        refreshing={unitBookingStatus.length > 0 && loadingUnitStatus}
        floorId={floorId}
        floorNumber={getFloorNumber(floorId)}
        units={processedUnits}
        showBhkFilters
        isUnitDisabled={checkUnitDisability}
        onRefresh={fetchUnitsBookingStatus}
        onSelectUnit={toggleDialog}
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
