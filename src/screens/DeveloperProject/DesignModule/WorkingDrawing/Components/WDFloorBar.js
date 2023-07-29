import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Layout from 'utils/Layout';
import {Badge, Caption} from 'react-native-paper';
import {getFloorNumber} from 'utils';
import floorSlab from 'assets/images/slab.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

function WDFloorBar(props) {
  const {
    floorId,
    floorData,
    badgeActive,
    showBadge,
    onPressLabel,
    onSelectFloor,
  } = props;

  const {floor_text} = floorData || {};

  const LabelContainer = onPressLabel ? TouchableOpacity : View;

  const floorNumber = getFloorNumber(floorId);

  return (
    <View style={styles.floorContainer}>
      {showBadge ? (
        <View style={styles.badgeContainer}>
          <View>
            <Badge style={styles.badge} visible={badgeActive} />
          </View>
        </View>
      ) : null}
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={onSelectFloor}>
        <View style={styles.floorContent}>
          <View style={styles.rowContainer}>
            <LabelContainer
              style={styles.floorLabelContainer}
              onPress={() => onPressLabel?.(floorId)}>
              <Caption>{floor_text || floorNumber}</Caption>
            </LabelContainer>
            <View style={styles.rightSection}>
              <OpacityButton opacity={1} style={styles.button}>
                <MaterialCommunityIcons name="upload" size={15} color="#fff" />
              </OpacityButton>
              <Caption style={styles.uploadButton}>Upload</Caption>
            </View>
          </View>
          <Image source={floorSlab} style={styles.slabImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

WDFloorBar.propTypes = {
  onPressLabel: PropTypes.func,
  floorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  badgeActive: PropTypes.bool,
  showBadge: PropTypes.bool,
};

WDFloorBar.defaultProps = {
  badgeActive: false,
  showBadge: false,
  onPressLabel: () => null,
  floorId: '',
};

const styles = StyleSheet.create({
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
    width: 90,
    height: '100%',
    justifyContent: 'center',
  },
  rightSection: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    marginLeft: 70,
  },
  slabImage: {
    height: Layout.window.width * 0.7 * (20 / 320),
    width: '100%',
  },
  button: {
    borderRadius: 50,
    padding: 0,
    height: 20,
    width: 20,
  },
  uploadButton: {
    marginLeft: 5,
    color: theme.colors.primary,
    fontSize: 16,
  },
});

export default WDFloorBar;
