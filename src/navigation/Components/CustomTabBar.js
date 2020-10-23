import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Button, Appbar} from 'react-native-paper';

function CustomTabBar({navigation, state, descriptors, handleSwitch}) {
  const onPressSwitch = () => {
    if (handleSwitch) {
      navigation.reset({
        index: 0,
        routes: [{name: 'GeneralDashboard'}],
      });
    }
  };

  const onPressSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <Appbar style={styles.contentContainer}>
        <Button
          icon="format-list-bulleted"
          mode="text"
          uppercase={false}
          color={'rgba(4, 29, 54, 0.4)'}
          style={styles.buttonStyles}
          contentStyle={{paddingVertical: 5}}
          onPress={() => navigation.toggleDrawer()}>
          Menu
        </Button>
        <Button
          icon="magnify"
          mode="text"
          accessibilityRole="button"
          color={'rgba(4, 29, 54, 0.4)'}
          style={styles.buttonStyles}
          uppercase={false}
          contentStyle={{paddingVertical: 5}}
          onPress={onPressSearch}>
          Search
        </Button>
        <Button
          icon="apps"
          mode="text"
          uppercase={false}
          accessibilityRole="button"
          color={'rgba(4, 29, 54, 0.4)'}
          style={styles.buttonStyles}
          onPress={onPressSwitch}
          contentStyle={{paddingVertical: 5}}>
          Switch
        </Button>
      </Appbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    display: 'flex',
    paddingHorizontal: 20,
  },
});

export default withTheme(CustomTabBar);
