import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {
  Badge,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Caption,
  Subheading,
} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import {BHK_OPTIONS} from 'utils/constant';
import {addOpacity, getUnitLabel} from 'utils';
import Layout from 'utils/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import plot from 'assets/images/bungalow_hut.png';
import SelectHoldOrBook from '../selectHoldOrBook';

// import House from 'assets/images/house.svg';

// const UNIT_MARGIN = Layout.window.width * 0.015;
// const BODY_WIDTH = Layout.window.width - 40;
// const UNIT_WIDTH = BODY_WIDTH / 5 - 2 * UNIT_MARGIN;

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

function RenderUnits({
  onSelectUnit,
  navigation,
  units,
  selectedFloor,
  isUnitDisabled,
}) {
  const [visible, setVisible] = useState(false);

  console.log('----->visible in render unit', visible);
  console.log('----->units', units);

  const toggleDialog = () => setVisible(v => !v);

  return (
    <View style={styles.unitsList}>
      <SelectHoldOrBook
        visible={visible}
        setVisible={setVisible}
        toggleDialog={toggleDialog}
        navigation={navigation}
      />
      {Object.keys(units).map((unitId, i) => {
        const unit = units[unitId];
        const unitBhk = BHK_OPTIONS.find(item => item.type === unit.bhk);

        let bookingStyle = BOOKING_STATUS_STYLES[unit.status] || {};
        const disabled = checkDisabled(isUnitDisabled, unit);

        if (
          unit.status === 2 &&
          dayjs(unit.tmp_booking_time_end).isBefore(dayjs())
        ) {
          bookingStyle = {};
        }

        let backgroundColor = DEFAULT_UNIT_COLOR;
        if (unitBhk) {
          backgroundColor = addOpacity(unitBhk.color, 1);
        }

        return (
          <View key={i} style={styles.unitContainer}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => {
                // onSelectUnit(i, unit);
                toggleDialog(); // () => <SelectHoldOrBook />;
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 5,
                  padding: 3,
                  backgroundColor: '#D3DAEF',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 3,
                  }}>
                  {/* <House /> */}
                  <Image
                    source={plot}
                    style={{
                      width: 30,
                      height: 40,
                    }}
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                  }}>
                  <View style={{margin: 5}}>
                    <Text style={{fontSize: 12}}>{unitId}</Text>
                    <Caption style={{fontSize: 10}}>
                      50000<Caption style={{fontSize: 10}}>sq</Caption>
                    </Caption>
                  </View>
                </View>
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export default React.memo(RenderUnits);
