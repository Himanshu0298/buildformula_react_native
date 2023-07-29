import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {withTheme, Text, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import BungalowIcon from 'assets/images/bungalow.svg';
import PlatIcon from 'assets/images/plot.svg';
import TowerIcon from 'assets/images/tower.svg';
import {secondaryTheme} from 'styles/theme';
import {getTowerLabel} from 'utils';

export function RenderTowerBox(props) {
  const {label, onPress, active, towerType} = props;

  const Container = onPress ? TouchableOpacity : View;

  const {colors} = useTheme();

  const renderIcon = () => {
    switch (towerType) {
      case 'Towers':
        return (
          <TowerIcon
            height={20}
            width={20}
            fill={colors.accent}
            fillSecondary={colors.primary}
          />
        );

      case 'Plots':
        return (
          <PlatIcon
            height={20}
            width={20}
            fill={colors.accent}
            fillSecondary={colors.primary}
          />
        );

      case 'Bungalows':
        return (
          <BungalowIcon
            height={20}
            width={20}
            fill={colors.accent}
            fillSecondary={colors.primary}
          />
        );

      default:
        return (
          <TowerIcon
            height={20}
            width={20}
            fill={colors.accent}
            fillSecondary={colors.primary}
          />
        );
    }
  };

  return (
    <Container style={styles.towerContainer} onPress={onPress}>
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <View
        style={[
          styles.labelContainer,
          active ? {backgroundColor: colors.primary} : {},
        ]}>
        <Text theme={active ? secondaryTheme : undefined} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Container>
  );
}

function TowerSelector(props) {
  const {towerCount, onSelectTower, towers, towerType} = props;

  return (
    <View style={styles.towerList}>
      <FlatList
        data={towers}
        numColumns={3}
        // style={{marginBottom: 70}}
        showsVerticalScrollIndicator={false}
        extraData={new Array(towerCount).fill(0)}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({item, index}) => {
          let label = item.label || getTowerLabel(index + 1);

          if (towerType === 'Bungalows') {
            label = item.label || index + 1;
          }

          if (towerType === 'Plots') {
            label = item.label || index + 1;
          }

          return (
            <RenderTowerBox
              {...props}
              key={index.toString()}
              label={label}
              onPress={() => onSelectTower(item.id, index)}
              towerType={towerType}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  towerList: {
    marginTop: 10,
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  towerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(94, 109, 124, 0.5)',
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
    width: '30%',
    backgroundColor: '#E6E6E6',
  },
  iconContainer: {
    width: 35,
    height: 35,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    minWidth: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
