import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {BHK_OPTIONS} from 'utils/constant';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import ShopIcon from 'assets/images/shop.svg';
import ApartmentIcon from 'assets/images/apartment.svg';
import OfficeIcon from 'assets/images/office.svg';
import BungalowIcon from 'assets/images/bungalow.svg';
import PlatIcon from 'assets/images/plot.svg';
import {Caption} from 'react-native-paper';

export const BOOKING_STATUS_STYLES = {
  1: {
    title: 'Available',
    background: 'rgba(0, 185, 64, 0.4)',
    color: '#07CA03',
  },
  2: {
    title: 'Filling',
    background: 'rgba(0, 185, 64, 0.4)',
    color: '#07CA03',
  },
  3: {
    title: 'Reserved',
    background: 'rgba(4, 29, 54, 0.4);#041D36',
    color: '#041D36',
  },
  4: {
    title: 'Booked',
    background: 'background: rgba(255, 94, 94, 0.4)',
    color: '#FF5E5E',
  },
  5: {
    title: 'On hold',
    background: 'rgba(239, 91, 12, 0.4)',
    color: '#EF5B0C',
  },
  6: {
    title: 'Available',
    background: 'rgba(0, 185, 64, 0.4)',
    color: '#07CA03',
  },
  7: {
    title: 'Cancelled',
    background: 'rgba(115, 80, 37, 0.4)',
    color: '#735025',
  },
};

const UNIT_ICONS = {
  1: ApartmentIcon,
  2: ShopIcon,
  3: OfficeIcon,
  4: BungalowIcon,
  5: PlatIcon,
};

function checkDisabled(isUnitDisabled, unit) {
  if (typeof isUnitDisabled === 'function') {
    return isUnitDisabled(unit);
  }
  return false;
}

function RenderUnit(props) {
  const {unit = {}, onSelectUnit, isUnitDisabled, floorType} = props;
  const {unitLabel, unit_id, bhk} = unit;
  const unitBhk = BHK_OPTIONS.find(item => item.type === unit.bhk);

  let statusStyle = BOOKING_STATUS_STYLES[unit?.status] || {};
  const disabled = checkDisabled(isUnitDisabled, unit);

  if (unit.status === 2 && dayjs(unit.tmp_booking_time_end).isBefore(dayjs())) {
    statusStyle = {};
  }

  const bookingStyle = statusStyle?.color
    ? {borderColor: statusStyle?.color}
    : {};

  const UnitIcon = UNIT_ICONS[floorType];

  return (
    <TouchableOpacity
      key={unitLabel}
      disabled={disabled}
      style={styles.container}
      onPress={() => onSelectUnit({...unit, unit_id})}>
      <Text
        style={[styles.captionStyle, {color: `${bookingStyle.borderColor}`}]}>
        {statusStyle.title}
      </Text>
      <View
        style={[
          styles.unitContainer,
          bookingStyle,
          {backgroundColor: statusStyle?.background},
        ]}>
        <View style={styles.iconContainer}>
          <UnitIcon
            height={30}
            width={30}
            fill="#041D36"
            fillSecondary="#4872F4"
            // fill={addOpacity(unitBhk?.color, 1) || '#868686'}
            // fillSecondary={addOpacity(unitBhk?.color, 1) || '#868686'}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text>{unit.unitLabel}</Text>
          {bhk ? <Caption>{`${bhk} BHK`}</Caption> : undefined}
        </View>
        {unit?.status === 7 ? (
          <View
            style={[
              styles.diagonalLine,
              {borderBottomColor: statusStyle?.color},
            ]}
          />
        ) : null}
      </View>
      {/* {statusStyle?.badge ? (
        <View style={[styles.badge, {backgroundColor: statusStyle?.color}]}>
          {statusStyle?.badge}
        </View>
      ) : null} */}
    </TouchableOpacity>
  );
}

RenderUnit.defaultProps = {
  floorType: 1,
  selectedFloor: '',
};

RenderUnit.propTypes = {
  onSelectUnit: PropTypes.func.isRequired,
  isUnitDisabled: PropTypes.func.isRequired,
  selectedFloor: PropTypes.string,
  floorType: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    width: '33%',
    position: 'relative',
    marginVertical: 8,
  },
  captionStyle: {
    marginLeft: 19,
    fontSize: 10,
  },
  unitContainer: {
    position: 'relative',
    backgroundColor: '#D3DAEF',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 7,
  },
  labelContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // badge: {
  //   position: 'absolute',
  //   top: 7,
  //   left: 0,
  //   borderRadius: 50,
  //   height: 18,
  //   width: 18,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  diagonalLine: {
    position: 'absolute',
    transform: [{rotate: '25deg'}],
    top: 21,
    left: -5,
    right: -5,
    bottom: 0,
    height: 1,
    borderBottomWidth: 1,
  },
});

export default React.memo(RenderUnit);
