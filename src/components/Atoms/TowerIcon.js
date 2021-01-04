import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Subheading} from 'react-native-paper';
import {getTowerLabel} from 'utils';
import towerActive from 'assets/images/tower.png';
import towerInactive from 'assets/images/tower_inactive.png';
import Layout from 'utils/Layout';
import PropTypes from 'prop-types';

const ICON_WIDTH = Layout.window.width * 0.22;
const ICON_HEIGHT = Layout.window.width * 0.15;

function TowerIcon({onPress, index, active}) {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress(index)}
      style={styles.towerContainer}>
      <ImageBackground
        source={active ? towerActive : towerInactive}
        style={styles.towerImage}>
        <View style={styles.towerLabelContainer}>
          <Subheading style={!active && styles.inactiveLabel}>
            {getTowerLabel(index)}
          </Subheading>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

TowerIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

TowerIcon.defaultProps = {
  active: PropTypes.true,
};

const styles = StyleSheet.create({
  towerContainer: {
    width: ICON_WIDTH,
    height: ICON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  towerImage: {
    width: ICON_WIDTH * 0.75,
    height: ICON_WIDTH * 0.75 * 0.81,
    alignItems: 'center',
  },
  towerLabelContainer: {
    marginTop: 3,
  },
  inactiveLabel: {
    color: 'gray',
  },
});

export default TowerIcon;
