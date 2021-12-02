import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';
import dayjs from 'dayjs';
import {getPermissions} from 'utils';
import {useSnackbar} from 'components/Atoms/Snackbar';

export default function SelectUnit(props) {
  const {navigation, route} = props;

  const floorNumber = props.route.params.floorNumber;
  // const _units = props.route.params.units;

  const modulePermission = getPermissions('Booking Chart');

  const snackbar = useSnackbar();

  const {getUnitsBookingStatus, lockUnit, toggleTimer} = useSalesActions();

  const {selectedProject} = useSelector(state => state.project);
  const {loadingUnitStatus, unitBookingStatus} = useSelector(s => s.sales);
  const {user} = useSelector(state => state.user);

  const {selectedStructure} = route?.params || {};
  const floorId = route?.params?.floorId || {};
  const towerId = route?.params?.towerId || {};
  console.log('----->selectedStructure', selectedStructure);
  console.log('----->floorId', floorId);
  console.log('----->towerId', towerId);

  const structureData = selectedProject.projectData?.[selectedStructure] || {};

  let units;

  if (selectedStructure === 4 || selectedStructure === 5) {
    units = structureData.units;
  }

  if (selectedStructure === 6) {
    units = structureData.towers?.[towerId]?.floors?.[floorId]?.units || {};
  }

  console.log('----->units in select unitsssssss', units);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUnitsBookingStatus();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const units = useMemo(() => {
  //   const data = towers?.[towerId]?.floors?.[floorId]?.units || {};

  //   Object.keys(data).map(key => {
  //     const bookingData = unitBookingStatus.find(
  //       unit => unit.id === data[key].unitId,
  //     );

  //     if (bookingData) {
  //       data[key] = {...data[key], ...bookingData};
  //     }
  //   });

  //   return data;
  // }, [floorId, towerId, towers, unitBookingStatus]);

  // console.log('----->units', units);

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

  const onSelectUnit = async (index, unit) => {
    if (modulePermission?.editor || modulePermission?.admin) {
      await lockUnit({unit_id: unit.unitId, project_id: selectedProject.id});
      toggleTimer({showTimer: true, startTime: new Date(), time: 1800});

      navigation.navigate('BC_Step_Four', {
        project_id: selectedProject.id,
        unit_id: unit.unitId,
      });
    } else {
      snackbar.showMessage({
        message:
          'You do not have permissions to perform this action. Contact project Admin for support',
        variant: 'warning',
      });
    }
  };

  return (
    <>
      <Spinner visible={loadingUnitStatus} textContent={''} />
      {console.log('----->units in select unit', units)}
      <UnitSelector
        refreshing={unitBookingStatus.length > 0 && loadingUnitStatus}
        onRefresh={fetchUnitsBookingStatus}
        onSelectUnit={onSelectUnit}
        floorId={floorId}
        floorNumber={floorNumber}
        units={units}
        showBhkFilters={[1, 4].includes(selectedStructure)}
        isUnitDisabled={checkUnitDisability}
        navigation={navigation}
      />
    </>
  );
}
