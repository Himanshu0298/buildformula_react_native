import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {withTheme, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import TowerIcon from 'assets/images/tower.svg';
import {getTowerLabel} from 'utils';
import {secondaryTheme} from 'styles/theme';
import Layout from 'utils/Layout';

export function RenderTowerBox(props) {
  const {towerId, onPress, active, theme} = props;

  const towerLabel = getTowerLabel(towerId);

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.towerContainer} onPress={() => onPress?.(towerId)}>
      <View style={styles.iconContainer}>
        <TowerIcon height={20} width={20} />
      </View>
      <View
        style={[
          styles.labelContainer,
          active ? {backgroundColor: theme.colors.primary} : {},
        ]}>
        <Text theme={active ? secondaryTheme : undefined}>{towerLabel}</Text>
      </View>
    </Container>
  );
}

function TowerSelector(props) {
  const {towerCount, onSelectTower} = props;

  return (
    <ScrollView>
      <View style={styles.towerList}>
        {new Array(towerCount).fill(0).map((_, index) => {
          return (
            <RenderTowerBox
              {...props}
              key={index.toString()}
              towerId={index + 1}
              onPress={onSelectTower}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  towerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  labelContainer: {
    padding: 10,
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  towerContainer: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'rgba(94, 109, 124, 0.5)',
    borderRadius: 5,
    alignItems: 'center',
    margin: 8,
    width: Layout.window.width * 0.26,
  },
  iconContainer: {
    backgroundColor: '#E6E6E6',
    width: 35,
    height: 35,
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
  onSelectTower: PropTypes.func.isRequired,
};

export default withTheme(TowerSelector);
