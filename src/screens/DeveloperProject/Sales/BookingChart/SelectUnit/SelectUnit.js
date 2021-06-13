import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';
import dayjs from 'dayjs';

export default function SelectUnit(props) {
  const {navigation, route} = props;

  const {getUnitsBookingStatus, lockUnit, toggleTimer} = useSalesActions();

  const {selectedProject = {}} = useSelector(state => state.project);
  const {loadingUnitStatus, unitBookingStatus} = useSelector(
    state => state.sales,
  );
  const {user} = useSelector(state => state.user);

  const {selectedStructure, floorId, towerId} = route?.params || {};
  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  const {towers} = structureData;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUnitsBookingStatus();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const units = useMemo(() => {
    const data = towers?.[towerId]?.floors?.[floorId]?.units || {};

    Object.keys(data).map(key => {
      const bookingData = unitBookingStatus.find(
        unit => unit.id === data[key].unitId,
      );

      if (bookingData) {
        data[key] = {...data[key], ...bookingData};
      }
    });

    return data;
  }, [floorId, towerId, towers, unitBookingStatus]);

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

  const onSelectUnit = (index, unit) => {
    lockUnit({unit_id: unit.unitId, project_id: selectedProject.id}).then(() =>
      toggleTimer({showTimer: true, startTime: new Date(), time: 1800}),
    );

    navigation.navigate('BC_Step_Four', {
      project_id: selectedProject.id,
      unit_id: unit.unitId,
    });
  };

  return (
    <>
      <Spinner visible={loadingUnitStatus} textContent={''} />
      <UnitSelector
        refreshing={unitBookingStatus.length > 0 && loadingUnitStatus}
        onRefresh={fetchUnitsBookingStatus}
        onSelectUnit={onSelectUnit}
        floorId={floorId}
        units={units}
        showBhkFilters={[1, 4].includes(selectedStructure)}
        isUnitDisabled={checkUnitDisability}
      />
    </>
  );
}
