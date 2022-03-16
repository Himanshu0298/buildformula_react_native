import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {BHK_OPTIONS} from 'utils/constant';
import {addOpacity} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import ShopIcon from 'assets/images/shop.svg';
import ApartmentIcon from 'assets/images/apartment.svg';
import OfficeIcon from 'assets/images/office.svg';
import BungalowIcon from 'assets/images/bungalow.svg';
import PlatIcon from 'assets/images/plot.svg';

export const BOOKING_STATUS_STYLES = {
  2: {
    title: 'Filling',
    color: '#07CA03',
    badge: <MaterialCommunityIcons name="pencil" color="#fff" />,
  },
  3: {
    title: 'Reserved',
    color: '#041D36',
    badge: <MaterialCommunityIcons name="minus" color="#fff" />,
  },
  4: {
    title: 'Booked',
    color: '#FF5D5D',
    badge: <MaterialCommunityIcons name="check" color="#fff" />,
  },
  5: {
    title: 'On hold',
    color: '#FF7700',
    badge: <MaterialIcons name="hourglass-full" color="#fff" />,
  },
  6: {
    title: 'Resale',
    color: '#8400FF',
    badge: <Text style={{color: '#fff'}}>R</Text>,
  },
  7: {
    title: 'Cancelled',
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
  const {unitLabel, unit_id} = unit;
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
      <View style={[styles.unitContainer, bookingStyle]}>
        <View style={styles.iconContainer}>
          <UnitIcon
            height={30}
            width={30}
            fill={addOpacity(unitBhk?.color, 1) || '#868686'}
            fillSecondary={addOpacity(unitBhk?.color, 1) || '#868686'}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text>{unit.unitLabel}</Text>
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
      {statusStyle?.badge ? (
        <View style={[styles.badge, {backgroundColor: statusStyle?.color}]}>
          {statusStyle?.badge}
        </View>
      ) : null}
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
  },
  badge: {
    position: 'absolute',
    top: 7,
    left: 0,
    borderRadius: 50,
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
