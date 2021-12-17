import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {theme} from 'styles/theme';
import Layout from 'utils/Layout';
import {Badge, TextInput} from 'react-native-paper';
import {getFloorNumber, getShadow} from 'utils';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import floorSlab from 'assets/images/slab.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseText from './BaseText';
import OpacityButton from './Buttons/OpacityButton';

function FloorBar(props) {
  const {
    floorId,
    floorData,
    index,
    badgeActive,
    showBadge,
    inputProps,
    onPressLabel,
    onPressNext,
  } = props;

  const {structureType} = floorData?.[index] || {};

  const LabelContainer = onPressLabel ? TouchableOpacity : View;

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
          <LabelContainer
            style={styles.floorLabelContainer}
            onPress={() => onPressLabel?.(floorId)}>
            <BaseText style={styles.floorLabel}>
              {getFloorNumber(floorId)}
            </BaseText>
          </LabelContainer>
          <View style={styles.rightSection}>
            <TextInput
              dense
              blurOnSubmit
              disabled
              value={STRUCTURE_TYPE_LABELS?.[structureType]?.toString()}
              placeholder=""
              style={styles.structureInput}
              keyboardType="decimal-pad"
              theme={{
                colors: {
                  underlineColor: 'transparent',
                  text: '#000',
                  accent: theme.colors.primary,
                },
              }}
            />
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
            </View>
            <OpacityButton onPress={onPressNext} style={styles.button}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color="#fff"
              />
            </OpacityButton>
          </View>
        </View>
        <Image source={floorSlab} style={styles.slabImage} />
      </View>
    </View>
  );
}

FloorBar.propTypes = {
  onPressLabel: PropTypes.func,
  floorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  badgeActive: PropTypes.bool,
  showBadge: PropTypes.bool,
};

FloorBar.defaultProps = {
  badgeActive: false,
  showBadge: false,
  onPressLabel: () => {},
  floorId: '',
};

const styles = StyleSheet.create({
  unitsInput: {
    marginHorizontal: 10,
    fontSize: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
    ...getShadow(3),
  },
  structureInput: {
    marginHorizontal: 10,
    fontSize: 16,
    justifyContent: 'center',
    color: '#ccc',
    backgroundColor: '#fff',
    ...getShadow(3),
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  floorLabelContainer: {
    width: 120,
    height: '100%',
    justifyContent: 'center',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexGrow: 1,
  },
  slabImage: {
    height: Layout.window.width * 0.7 * (20 / 320),
    width: '100%',
  },
  button: {
    borderRadius: 50,
    padding: 0,
    height: 30,
    width: 30,
  },
});

export default FloorBar;
