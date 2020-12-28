import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getShadow} from 'utils';
import {APP_BOTTOM_TAB_HEIGHT} from 'utils/constant';

function BottomAppBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const onPressSwitch = () => {
    if (route.name !== 'Home') {
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
      <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View style={styles.contentContainer}>
          <Button
            icon="format-list-bulleted"
            mode="text"
            uppercase={false}
            color={'rgba(4, 29, 54, 0.4)'}
            contentStyle={{paddingVertical: 5}}
            onPress={() => navigation.toggleDrawer()}>
            Menu
          </Button>
          <Button
            icon="magnify"
            mode="text"
            accessibilityRole="button"
            color={'rgba(4, 29, 54, 0.4)'}
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
            onPress={onPressSwitch}
            contentStyle={{paddingVertical: 5}}>
            Switch
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    ...getShadow(5),
  },
  contentContainer: {
    height: APP_BOTTOM_TAB_HEIGHT,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});

export default withTheme(BottomAppBar);
