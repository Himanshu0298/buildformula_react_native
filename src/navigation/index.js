import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
// import DrawerContent from './Components/DrawerContent';
// import Signup from '../screens/Auth/Signup';
import Login from '../screens/Auth/Login';
// import { Platform, Image } from 'react-native';
// import backIcon from './../assets/images/back_arrow.png';
// import OtpScreen from '../screens/Auth/OtpScreen';
import { useSelector } from 'react-redux';
import LanguageSelect from '../screens/Auth/LanguageSelect';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

/**
 * The Whole App navigation is divided into 3 layers
 * 1. The top stack navigator for App and Auth screens
 * 2. The Drawer for App screens
 * 3. The App stack to achieve stack navigation like animation when transitioning between screens
 * <Main Stack>
 *    <App Drawer>
 *      <App Stack Screens/>
 *    </App Drawer>
 *    <>
 *      <Auth Screens/>
 *    </>
 * </Main Stack>
 */

// const renderBackImage = () => <Image style={{ height: 15, width: 22 }} source={backIcon} />;

function AppScreensStacks() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        // headerBackImage: Platform.OS === 'android' ? renderBackImage : undefined,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="LinkAccounts"
        component={Login}
        options={{ title: 'Link Accounts' }} />
      <Stack.Screen
        name="RideHistory"
        component={Login}
        options={{ title: 'Ride History' }} /> */}
    </Stack.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      // drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{}}>
      <Drawer.Screen name="AppScreensStacks" component={AppScreensStacks} />
    </Drawer.Navigator>
  );
}

function NavContainer() {

  const { authenticated } = useSelector(state => state.user);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
      initialRouteName={authenticated ? 'HomeDrawer' : 'LanguageSelect'}
      >
        {authenticated ?
          //App Nav Screens
          <Fragment>
            <Stack.Screen name="HomeDrawer" component={AppDrawer} options={{ headerShown: false }} />
          </Fragment>
          :
          //Auth Nav Screens
          <Fragment>
            <Stack.Screen name="LanguageSelect" component={LanguageSelect} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            {/* <Stack.Screen name="SignUp" component={Signup} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} /> */}
          </Fragment>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
