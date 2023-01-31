import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {withTheme, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import TowerIcon from 'assets/images/tower.svg';
import {secondaryTheme} from 'styles/theme';

export function RenderTowerBox(props) {
  const {towerId, onPress, active, theme, label} = props;

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.towerContainer} onPress={() => onPress?.(towerId)}>
      <View style={styles.iconContainer}>
        <TowerIcon
          height={20}
          width={20}
          fill={theme.colors.accent}
          fillSecondary={theme.colors.primary}
        />
      </View>
      <View
        style={[
          styles.labelContainer,
          active ? {backgroundColor: theme.colors.primary} : {},
        ]}>
        <Text theme={active ? secondaryTheme : undefined} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Container>
  );
}

function TowerSelector(props) {
  const {towerCount, onSelectTower, towers} = props;

  return (
    <View style={styles.towerList}>
      <FlatList
        data={towers}
        // data={new Array(towerCount).fill(0)}
        numColumns={3}
        extraData={new Array(towerCount).fill(0)}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({item, index}) => {
          return (
            <RenderTowerBox
              {...props}
              key={index.toString()}
              towerId={item.id}
              label={item.label}
              onPress={onSelectTower}
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
