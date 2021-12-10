import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Subheading} from 'react-native-paper';
import PropTypes from 'prop-types';
import TowerIcon from 'assets/images/tower.svg';

function TowersList(props) {
  const {towerCount, onSelectTower} = props;

  return (
    <View>
      <View>
        <View style={styles.towerList}>
          {new Array(towerCount).fill(0).map((_, i) => {
            const towerId = i + 1;
            return (
              <TouchableOpacity
                key={towerId}
                style={styles.towerContainer}
                onPress={() => onSelectTower(towerId)}>
                <View style={styles.iconContainer}>
                  <TowerIcon height={20} width={20} />
                </View>
                <View style={{margin: 10}}>
                  <Text>{towerId}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function TowerSelector(props) {
  const {towerType} = props;

  return (
    <View style={styles.container}>
      <Subheading>{towerType}</Subheading>
      <TowersList {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  towerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  towerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#5E6D7C',
    borderRadius: 5,
    alignItems: 'center',
    margin: 8,
  },
  iconContainer: {
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

TowerSelector.defaultProps = {
  title: 'label_select_tower',
  subtitle: 'label_select_appropriate_option',
  selectButtonLabel: 'Show All Units',
};

TowerSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  selectButtonLabel: PropTypes.string,
  onSelectFloor: PropTypes.func.isRequired,
};

export default TowerSelector;
