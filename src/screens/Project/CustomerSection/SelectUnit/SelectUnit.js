import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import UnitSelector from 'components/Molecules/UnitSelector';

export default function SelectUnit(props) {
  const {navigation, route} = props;

  const {getUnitsBookingStatus} = useSalesActions();

  const {selectedProject = {}} = useSelector(state => state.project);
  const {loading, unitBookingStatus} = useSelector(state => state.sales);

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

  const checkUnitDisability = ({booking_status: status}) => {
    const disabled = status !== 'Stand by' || status !== 'Booked';
    return false;
  };

  const fetchUnitsBookingStatus = () => {
    getUnitsBookingStatus({
      project_id: selectedProject.id,
      project_type: selectedStructure,
      project_tower: towerId,
      project_floor: floorId,
    });
  };

  const handlePress = (index, unit) => {
    navigation.navigate('CS_Step_Four', {
      project_id: selectedProject.id,
      unit: {index, ...unit},
      ...route.params,
    });
  };

  return (
    <>
      <Spinner visible={loading} textContent={''} />
      <UnitSelector
        title="title_customer_section"
        subtitle="subtitle_customer_section"
        refreshing={unitBookingStatus.length > 0 && loading}
        onRefresh={fetchUnitsBookingStatus}
        onSelectUnit={handlePress}
        floorId={floorId}
        units={units}
        isUnitDisabled={checkUnitDisability}
      />
    </>
  );
}
