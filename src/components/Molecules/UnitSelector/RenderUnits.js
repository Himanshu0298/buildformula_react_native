import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Badge, Subheading} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import {BHK_OPTIONS} from 'utils/constant';
import {addOpacity, getUnitLabel} from 'utils';
import Layout from 'utils/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const UNIT_MARGIN = Layout.window.width * 0.015;
const BODY_WIDTH = Layout.window.width - 40;
const UNIT_WIDTH = BODY_WIDTH / 5 - 2 * UNIT_MARGIN;

const DEFAULT_UNIT_COLOR = '#5B6F7C';
export const BOOKING_STATUS_STYLES = {
  filling: {
    borderWidth: 3,
    borderColor: '#07CA03',
    badge: <MaterialCommunityIcons name="check" color="#fff" />,
    label: 'Filling',
  },
  standby: {
    borderWidth: 3,
    borderColor: '#041D36',
    badge: <MaterialCommunityIcons name="minus" color="#fff" />,
    label: 'Stand by',
  },
  booked: {
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

function RenderUnits({onSelectUnit, units, selectedFloor, isUnitDisabled}) {
  return (
    <View style={styles.unitsList}>
      {Object.keys(units).map((unitId, i) => {
        const unit = units[unitId];
        const unitBhk = BHK_OPTIONS.find(item => item.type === unit.bhk);

        const bookingStyle = BOOKING_STATUS_STYLES[unit.booking_status] || {};
        const disabled = checkDisabled(isUnitDisabled, unit);

        if (unit?.booking_status === 'filling' && !disabled) {
          // bookingStyle = {};
        }

        let backgroundColor = DEFAULT_UNIT_COLOR;
        if (unitBhk) {
          backgroundColor = addOpacity(unitBhk.color, 1);
        }

        return (
          <View key={i} style={styles.unitContainer}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => onSelectUnit(i, unit)}
              style={[
                styles.unitButton,
                {
                  borderRadius: 10,
                  position: 'relative',
                  ...bookingStyle,
                  backgroundColor,
                },
              ]}>
              {bookingStyle.badge ? (
                <Badge
                  style={[
                    styles.statusBadge,
                    {backgroundColor: bookingStyle.borderColor},
                  ]}>
                  {bookingStyle.badge}
                </Badge>
              ) : null}
              <Subheading theme={secondaryTheme}>
                {getUnitLabel(selectedFloor, unitId)}
              </Subheading>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

RenderUnits.propTypes = {
  onSelectUnit: PropTypes.func.isRequired,
  isUnitDisabled: PropTypes.func,
  units: PropTypes.object,
  selectedFloor: PropTypes.string,
};

const styles = StyleSheet.create({
  unitsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  unitContainer: {
    width: UNIT_WIDTH,
    margin: UNIT_MARGIN,
    height: UNIT_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitButton: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
});

export default React.memo(RenderUnits);
