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
    width: Layout.window.width * 0.22,
    height: Layout.window.width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  towerImage: {
    height: Layout.window.width * 0.133,
    width: Layout.window.width * 0.17,
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
