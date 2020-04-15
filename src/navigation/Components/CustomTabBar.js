import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Button, FAB, Appbar } from 'react-native-paper';
import { theme } from '../../styles/theme';

function CustomTabBar({ navigation, state, descriptors }) {

  const settingIndex = state.routes.findIndex(route => route.name === 'Settings');
  const { options } = descriptors[state.routes[settingIndex].key];
  const isFocused = state.index === settingIndex;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[settingIndex].key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(state.routes[settingIndex].name);
    }
  };

  const onLongPressSettings = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: state.routes[settingIndex].key,
    });
  };

  return (
    <View style={styles.container}>
      <FAB
        color="#fff"
        style={styles.searchContainer}
        icon="magnify"
        onPress={() => console.log('Pressed')}
      />
      <Appbar style={styles.contentContainer}>
        <Button
          icon="format-list-bulleted"
          mode="text"
          style={styles.buttonStyles}
          contentStyle={{ paddingVertical: 5 }}
          onPress={() => navigation.toggleDrawer()}>
          Menu
        </Button>
        <Button
          icon="settings"
          mode="text"
          accessibilityRole="button"
          accessibilityStates={isFocused ? ['selected'] : []}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          onLongPress={onLongPressSettings}
          style={styles.buttonStyles}
          onPress={onPress}
          contentStyle={{ paddingVertical: 5 }}>
          Settings
        </Button>
      </Appbar>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
  },
  searchContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
    margin: 16,
    bottom: 5,
    zIndex: 10,
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  buttonStyles: {
    width: '45%',
  },
});

export default withTheme(CustomTabBar);
