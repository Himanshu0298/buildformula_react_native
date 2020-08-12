import React, { Fragment, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import TouchID from 'react-native-touch-id';
import DrawerContent from './Components/DrawerContent';
import Login from '../screens/Auth/Login';
import OtpScreen from '../screens/Auth/OtpScreen';
import { useSelector } from 'react-redux';
import LanguageSelect from '../screens/Auth/LanguageSelect';
import SettingsScreen from '../screens/Settings';
import CustomTabBar from './Components/CustomTabBar';
import SignUp from '../screens/Auth/SignUp';
import PackageSelect from '../screens/Auth/PackageSelect';
import Inquiry from '../screens/Inquiry';
import ProjectSchedule from '../screens/ProjectSchedule';
import BookingChart from '../screens/BookingChart';
import Payment from '../screens/Payment';
import ProjectStructure from '../screens/ProjectStructure';
import MainPhase from '../screens/MainPhase';
import AssignTask from '../screens/AssignTask';
import ProcessChart from '../screens/ProcessChart/Home';
import Estimation from '../screens/Estimation';
import RequestForPrice from '../screens/RequestForPrice';
import PurchaseOrders from '../screens/PurchaseOrders';
import Files from '../screens/Files';

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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RouteContext = React.createContext('Dashboard');

/**
 * The Whole App navigation is divided into 4 layers
 * 1. The top stack navigator for App and Auth screens
 * 2. The Drawer for App screens
 * 3. The App Tab to achieve bottom tab for all screens
 * 4. All screens
 * <Main Stack>
 *    <App Drawer>
 *      <App Tab Screens>
 *        {...allScreens}
 *      </App Tab Screens>
 *    </App Drawer>
 *    <>
 *      <Auth Screens/>
 *    </>
 * </Main Stack>
 */

// const renderBackImage = () => <Image style={{ height: 15, width: 22 }} source={backIcon} />;

// function AppScreensStacks() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Dashboard"
//       screenOptions={{
//         // headerBackImage: Platform.OS === 'android' ? renderBackImage : undefined,
//         headerTitleAlign: 'center',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//       <Stack.Screen name="Dashboard" component={Home} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// }

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Dashboard" component={Home} />
      <Tab.Screen name="Inquiry" component={Inquiry} />
      <Tab.Screen name="ProjectStructure" component={ProjectStructure} />
      <Tab.Screen name="BookingChart" component={BookingChart} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="ProjectSchedule" component={ProjectSchedule} />
      <Tab.Screen name="MainPhase" component={MainPhase} />
      <Tab.Screen name="AssignTask" component={AssignTask} />
      <Tab.Screen name="ProcessChart" component={ProcessChart} />
      <Tab.Screen name="Estimation" component={Estimation} />
      <Tab.Screen name="RequestForPrice" component={RequestForPrice} />
      <Tab.Screen name="PurchaseOrders" component={PurchaseOrders} />
      <Tab.Screen name="Files" component={Files} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) =>
        <RouteContext.Consumer>
          {currentScreen => <DrawerContent {...props} currentScreen={currentScreen} />}
        </RouteContext.Consumer>
      }>
      <Drawer.Screen name="tabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

function NavContainer() {
  const { authenticated } = useSelector(state => state.user);
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  useEffect(() => {
    const state = navigationRef.current.getRootState();
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  useEffect(() => {
    if (false) {
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
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <RouteContext.Provider value={currentScreen}>
        <Stack.Navigator
          initialRouteName={authenticated ? 'AppDrawer' : 'LanguageSelect'}
        >
          {authenticated ?
            //App Nav Screens
            <Fragment>
              <Stack.Screen
                name="AppDrawer"
                component={AppDrawer}
                options={{ headerShown: false }} />
            </Fragment>
            :
            //Auth Nav Screens
            <Fragment>
              <Stack.Screen name="LanguageSelect" component={LanguageSelect} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PackageSelect" component={PackageSelect} options={{ headerShown: false }} />
            </Fragment>
          }
        </Stack.Navigator>
      </RouteContext.Provider>
    </NavigationContainer>
  );
}

export default NavContainer;
