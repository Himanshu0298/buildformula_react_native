import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {BHK_OPTIONS} from 'utils/constant';
import {addOpacity, getUnitLabel} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import UnitIcon from 'assets/images/unit.svg';

const DEFAULT_UNIT_COLOR = '#5B6F7C';
export const BOOKING_STATUS_STYLES = {
  2: {
    borderWidth: 3,
    borderColor: '#07CA03',
    badge: <MaterialCommunityIcons name="check" color="#fff" />,
    label: 'Filling',
  },
  3: {
    borderWidth: 3,
    borderColor: '#041D36',
    badge: <MaterialCommunityIcons name="minus" color="#fff" />,
    label: 'Stand by',
  },
  4: {
    borderWidth: 3,
    borderColor: '#FF5D5D',
    badge: <MaterialIcons name="check" color="#fff" />,
    label: 'Booked',
  },
};

function checkDisabled(isUnitDisabled, unit) {
  if (typeof isUnitDisabled === 'function') {
    return isUnitDisabled(unit);
  }
  return false;
}

function RenderUnit(props) {
  const {
    unit = {},
    unitId,
    onSelectUnit,
    selectedFloor,
    isUnitDisabled,
  } = props;

  const unitBhk = BHK_OPTIONS.find(item => item.type === unit.bhk);

  let bookingStyle = BOOKING_STATUS_STYLES[unit.status] || {};
  const disabled = checkDisabled(isUnitDisabled, unit);

  if (unit.status === 2 && dayjs(unit.tmp_booking_time_end).isBefore(dayjs())) {
    bookingStyle = {};
  }

  let backgroundColor = DEFAULT_UNIT_COLOR;
  if (unitBhk) {
    backgroundColor = addOpacity(unitBhk.color, 1);
  }

  return (
    <TouchableOpacity
      key={unitId}
      disabled={disabled}
      style={styles.container}
      onPress={() => onSelectUnit({...unit, unitIndex: unitId})}>
      <View style={styles.unitContainer}>
        <View style={styles.iconContainer}>
          <UnitIcon height={30} width={30} />
        </View>
        <View style={styles.labelContainer}>
          <Text>{getUnitLabel(selectedFloor, unitId)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

RenderUnit.defaultProps = {
  isUnitDisabled: () => {},
  selectedFloor: '',
};

RenderUnit.propTypes = {
  onSelectUnit: PropTypes.func.isRequired,
  isUnitDisabled: PropTypes.func,
  selectedFloor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: '33%',
  },
  unitContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D3DAEF',
    margin: 5,
    padding: 5,
    borderRadius: 7,
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 7,
  },
  labelContainer: {
    padding: 5,
  },
});

export default React.memo(RenderUnit);
