import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {withTheme, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAppActions from 'redux/actions/appActions';
import {getShadow} from 'utils';
import {APP_BOTTOM_TAB_HEIGHT} from 'utils/constant';

function BottomAppBar(props) {
  const {navigation} = props;

  const {setDrawerType} = useAppActions();

  const onPressSwitch = () => {
    setDrawerType('general');
    const {index: routeIndex} = navigation.getState();
    if (routeIndex) {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    }
  };

  const onPressSearch = () => navigation.navigate('Search');

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View style={styles.contentContainer}>
          <Button
            icon="format-list-bulleted"
            mode="text"
            uppercase={false}
            color="rgb(4, 29, 54)"
            contentStyle={{paddingVertical: 5}}
            onPress={navigation.toggleDrawer}>
            <Text style={{color: '#041d36'}}>Menu</Text>
          </Button>
          {/* <Button
            icon="magnify"
            mode="text"
            accessibilityRole="button"
            color={'rgba(4, 29, 54, 0.4)'}
            uppercase={false}
            contentStyle={{paddingVertical: 5}}
            onPress={onPressSearch}>
            Search
          </Button> */}
          <Button
            icon="apps"
            mode="text"
            uppercase={false}
            accessibilityRole="button"
            color="rgb(4, 29, 54)"
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
    backgroundColor: '#f9f9f9',
    ...getShadow(5),
  },
  contentContainer: {
    height: APP_BOTTOM_TAB_HEIGHT,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});

export default withTheme(React.memo(BottomAppBar));
