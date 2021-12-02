import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseText from './BaseText';
import PropTypes from 'prop-types';
import {theme} from 'styles/theme';
import Layout from 'utils/Layout';
import {Badge, Button, TextInput, IconButton} from 'react-native-paper';
import {getFloorNumber} from 'utils';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import floorSlab from 'assets/images/slab.png';
import FloorsScreen from 'screens/CreateProject/ProjectStructure/StepTwo/Components/FloorsScreen';

function FloorBar(props) {
  const {
    floorId,
    floorData,
    towerId,
    index,
    navigation,
    badgeActive,
    showBadge,
    onPress,
    inputProps,
    unitCount,
    buttonLabel,
    buttonProps,
  } = props;

  return (
    <View style={styles.floorContainer}>
      {showBadge ? (
        <View style={styles.badgeContainer}>
          <View>
            <Badge style={styles.badge} visible={badgeActive} />
          </View>
        </View>
      ) : null}
      <View style={styles.floorContent}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.floorLabelContainer}
            onPress={() => onPress(floorId)}>
            <BaseText style={styles.floorLabel}>
              {getFloorNumber(floorId)}
            </BaseText>
          </TouchableOpacity>
          <Text style={styles.unitsInput2}>
            {STRUCTURE_TYPE_LABELS[floorData[index].structureType]}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              dense
              blurOnSubmit
              placeholder=""
              style={styles.unitsInput}
              keyboardType="decimal-pad"
              theme={{
                colors: {
                  underlineColor: 'transparent',
                  text: '#000',
                  accent: theme.colors.primary,
                },
              }}
              {...inputProps}
            />
            <IconButton
              icon="arrow-right"
              color="white"
              size={20}
              style={{backgroundColor: 'blue'}}
              // onPress={() => console.log('Pressed')}
              onPress={() =>
                navigation.navigate('BC_Step_Three', {
                  floorNumber: getFloorNumber(floorId),
                  floorId: floorId,
                  towerId: towerId,
                  selectedStructure: 6,
                })
              }
            />
          </View>
        </View>
        <Image source={floorSlab} style={styles.slabImage} />
      </View>
    </View>
  );
}

FloorBar.propTypes = {
  onPress: PropTypes.func,
  floorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  badgeActive: PropTypes.bool,
  showBadge: PropTypes.bool,
  inputProps: PropTypes.object,
  buttonProps: PropTypes.object,
  buttonLabel: PropTypes.string,
};

FloorBar.defaultProps = {
  badgeActive: false,
  showBadge: false,
};

const styles = StyleSheet.create({
  unitsInput: {
    width: 55,
    marginHorizontal: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
  unitsInput2: {
    width: 110,
    marginHorizontal: 10,
    fontSize: 16,
    justifyContent: 'center',
    color: 'grey',
  },
  floorContainer: {
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  badgeContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: theme.colors.primary,
  },
  floorContent: {
    flex: 1,
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  floorLabelContainer: {
    flexGrow: 1,
    height: '100%',

    justifyContent: 'center',
  },
  floorLabel: {
    color: 'grey',
    fontSize: 12,
  },
  slabImage: {
    height: Layout.window.width * 0.7 * (20 / 320),
    width: '100%',
  },
});

export default FloorBar;
