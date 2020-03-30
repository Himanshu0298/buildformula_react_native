/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import TouchID from 'react-native-touch-id';
// import DrawerContent from './Components/DrawerContent';
// import Signup from '../screens/Auth/Signup';
import Login from '../screens/Auth/Login';
// import { Platform, Image } from 'react-native';
// import backIcon from './../assets/images/back_arrow.png';
import OtpScreen from '../screens/Auth/OtpScreen';
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

const optionalConfigObject = {
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};

const authObject = {
  title: 'Authentication Required', // Android
  imageColor: theme.colors.primary, // Android
  imageErrorColor: theme.colors.error, // Android
  sensorDescription: 'Input your fingerprint to verify your identity and continue', // Android
  sensorErrorDescription: 'Input your fingerprint to verify your identity and continue', // Android
  cancelText: 'Exit', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

function NavContainer() {

  const { authenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (authenticated) {
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          TouchID.authenticate('', authObject)
            .then(success => { })
            .catch(async error => {
              await BackHandler.exitApp();
            });
        })
        .catch(error => {
          // Failure code
          console.log('----->error ', error);
        });
    }
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={authenticated ? 'App' : 'LanguageSelect'}
      >
        {authenticated ?
          //App Nav Screens
          <Fragment>
            <Stack.Screen name="App" component={AppDrawer} options={{ headerShown: false }} />
          </Fragment>
          :
          //Auth Nav Screens
          <Fragment>
            <Stack.Screen name="LanguageSelect" component={LanguageSelect} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            {/* <Stack.Screen name="SignUp" component={Signup} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
          </Fragment>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
