import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseText from './BaseText';
import PropTypes from 'prop-types';
import {theme} from 'styles/theme';
import Layout from 'utils/Layout';
import {Badge, Button, TextInput} from 'react-native-paper';
import {getFloorNumber} from 'utils';
import floorSlab from 'assets/images/slab.png';

function FloorBar(props) {
  const {
    floorId,
    badgeActive,
    showBadge,
    onPress,
    inputProps,
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
            onPress={onPress}>
            <BaseText style={styles.floorLabel}>
              {getFloorNumber(floorId)}
            </BaseText>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              dense
              blurOnSubmit
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
            <Button
              compact
              contentStyle={{padding: 1}}
              mode="contained"
              uppercase={false}
              {...buttonProps}>
              <BaseText style={styles.allUnitsLabel}>{buttonLabel}</BaseText>
            </Button>
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
    width: 45,
    display: 'flex',
    marginHorizontal: 10,
    fontSize: 16,
    justifyContent: 'center',
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
    flex: 0.8,
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  floorLabelContainer: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  floorLabel: {
    color: 'grey',
    fontSize: 12,
  },
  allUnitsLabel: {
    fontSize: 14,
  },
  slabImage: {
    height: Layout.window.width * 0.7 * (20 / 320),
    width: '100%',
  },
});

export default FloorBar;
