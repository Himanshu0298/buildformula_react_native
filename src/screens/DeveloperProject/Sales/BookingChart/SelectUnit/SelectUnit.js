import React, {useEffect, useState} from 'react';
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

export const SelectUnit = props => {
  const {
    project_id,
    floorId,
    towerId,
    structureType,
    selectedStructure,
    towerType,
    navigation,
    showBhkFilters,
    route,
    displayHeader,
    projectId,
    floor_id,
  } = props || {};

  const modulePermission = getPermissions('Booking Chart');
  const snackbar = useSnackbar();

  const {getUnitStatusListing, lockUnit, toggleTimer} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {unitStatusListing} = useSelector(s => s.sales);
  const {user} = useSelector(s => s.user);

  const loading = useSalesLoading();

  const [selectedUnit, setSelectedUnit] = useState();

  useEffect(() => {
    fetchUnitsBookingStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [towerId, floorId]);

  const toggleDialog = value => setSelectedUnit(v => (!v ? value : undefined));

  const fetchUnitsBookingStatus = () => {
    getUnitStatusListing({
      project_id,
      project_type: structureType || selectedStructure,
      project_tower: towerId || 0,
      project_floor: floor_id || 0,
      id: projectId,
    });
  };

  const checkUnitDisability = unit => {
    const {status, booked_unit_user_id, tmp_booking_time_end} = unit;
    let disabled =
      [3, 4, 7].includes(status) ||
      (status === 2 && booked_unit_user_id && booked_unit_user_id !== user.id);

    if (status === 2 && dayjs(tmp_booking_time_end).isBefore(dayjs())) {
      disabled = false;
    }
    return disabled;
  };

  const handleBook = () => {
    if (modulePermission?.editor || modulePermission?.admin) {
      lockUnit({unit_id: selectedUnit.id, project_id: selectedProject.id});
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

  const handleHold = holdUnit => {
    toggleDialog();
    navigation.navigate('BookingFormOnHold', {
      ...route?.params,
      ...selectedUnit,
      ...holdUnit,
    });
  };

  const handleSelectUnit = unit => {
    if (unit.status === 5) {
      handleHold(unit);
    } else {
      toggleDialog(unit);
    }
  };

  const floor = floor_id
    ? getFloorNumber(floor_id)
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
    floor_id,
    tower,
  } = route?.params || {};

  const projectId = projectData?.id;

  return (
    <SelectUnit
      project_id={project_id}
      floorId={floorId}
      towerId={towerId}
      floor_id={floor_id}
      structureType={structureType}
      selectedStructure={selectedStructure}
      towerType={towerType}
      navigation={navigation}
      props={props}
      displayHeader
      showBhkFilters={selectedStructure === 4}
      projectId={projectId}
      tower={tower}
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
