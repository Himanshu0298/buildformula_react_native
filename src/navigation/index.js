import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from '../styles/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import TouchID from 'react-native-touch-id';
import DrawerContent from './Components/DrawerContent';
import Login from '../screens/Auth/Login';
import OtpScreen from '../screens/Auth/OtpScreen';
import {useSelector} from 'react-redux';
import LanguageSelect from '../screens/Auth/LanguageSelect';
import SettingsScreen from '../screens/Settings';
import SearchScreen from '../screens/Search';
import SignUp from '../screens/Auth/SignUp';
import RoleSelect from '../screens/Auth/RoleSelect';
import ProjectDashboard from '../screens/ProjectDashboard';
import Inquiry from '../screens/Inquiry';
import AddVisitor from '../screens/AddVisitor';
import AddFollowUp from '../screens/AddFollowUp';
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
import PC_StepOne from '../screens/CreateProject/ProjectCreation/StepOne';
import PC_StepTwo from '../screens/CreateProject/ProjectCreation/StepTwo';
import PS_StepOne from '../screens/CreateProject/ProjectStructure/StepOne';
import PS_StepTwo from '../screens/CreateProject/ProjectStructure/StepTwo';
import PlanSelect from '../screens/CreateProject/PlanSelect';
import {getInitialAuthScreen} from '../utils';
import useAppActions from '../redux/actions/appActions';

const optionalConfigObject = {
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};

const authObject = {
  title: 'Authentication Required', // Android
  imageColor: theme.colors.primary, // Android
  imageErrorColor: theme.colors.error, // Android
  sensorDescription:
    'Input your fingerprint to verify your identity and continue', // Android
  sensorErrorDescription:
    'Input your fingerprint to verify your identity and continue', // Android
  cancelText: 'Exit', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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

function GeneralDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <RouteContext.Consumer>
          {(currentScreen) => (
            <DrawerContent
              {...props}
              currentScreen={currentScreen}
              type="general"
            />
          )}
        </RouteContext.Consumer>
      )}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

function ProjectDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <RouteContext.Consumer>
          {(currentScreen) => (
            <DrawerContent
              {...props}
              currentScreen={currentScreen}
              type="project"
            />
          )}
        </RouteContext.Consumer>
      )}>
      <Drawer.Screen name="ProjectDashboard" component={ProjectDashboard} />
      <Drawer.Screen name="Inquiry" component={Inquiry} />
      <Drawer.Screen name="ProjectStructure" component={ProjectStructure} />
      <Drawer.Screen name="BookingChart" component={BookingChart} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="ProjectSchedule" component={ProjectSchedule} />
      <Drawer.Screen name="MainPhase" component={MainPhase} />
      <Drawer.Screen name="AssignTask" component={AssignTask} />
      <Drawer.Screen name="ProcessChart" component={ProcessChart} />
      <Drawer.Screen name="Estimation" component={Estimation} />
      <Drawer.Screen name="RequestForPrice" component={RequestForPrice} />
      <Drawer.Screen name="PurchaseOrders" component={PurchaseOrders} />
      <Drawer.Screen name="Files" component={Files} />
    </Drawer.Navigator>
  );
}

// Gets the current screen from navigation state
const getActiveRouteName = (state) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

function NavContainer() {
  const {authenticated} = useSelector((state) => state.user);
  const {language} = useSelector((state) => state.app);
  const state = useSelector((root) => root);
  const [currentScreen, setCurrentScreen] = useState(
    authenticated ? 'Home' : 'LanguageSelect',
  );
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const {setInitialState} = useAppActions();

  useEffect(() => {
    const navState = navigationRef.current.getRootState();
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(navState);
    setInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (false) {
      TouchID.isSupported(optionalConfigObject)
        .then((biometryType) => {
          // Success code
          TouchID.authenticate('', authObject)
            .then((success) => {})
            .catch(async (error) => {
              await BackHandler.exitApp();
            });
        })
        .catch((error) => {
          // Failure code
          console.log('----->error ', error);
        });
    }
  }, []);

  const initialScreen = useMemo(() => {
    return getInitialAuthScreen(authenticated, state);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onStateChange={(navState) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(navState);
        if (previousRouteName !== currentRouteName) {
          console.log('----->currentRouteName ', currentRouteName);
          setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <RouteContext.Provider value={currentScreen}>
        <Stack.Navigator initialRouteName={initialScreen}>
          {authenticated ? (
            //App Nav Screens
            <Fragment>
              <Stack.Screen
                name="GeneralDashboard"
                component={GeneralDrawer}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProjectDashboard"
                component={ProjectDrawer}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProjectCreationStepOne"
                component={PC_StepOne}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProjectCreationStepTwo"
                component={PC_StepTwo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProjectStructureStepOne"
                component={PS_StepOne}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProjectStructureStepTwo"
                component={PS_StepTwo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PlanSelect"
                component={PlanSelect}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AdminCreation"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddVisitor"
                component={AddVisitor}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddFollowUp"
                component={AddFollowUp}
                options={{headerShown: false}}
              />
            </Fragment>
          ) : (
            //Auth Nav Screens
            <Fragment>
              <Stack.Screen
                name="LanguageSelect"
                component={LanguageSelect}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Otp"
                component={OtpScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RoleSelect"
                component={RoleSelect}
                options={{headerShown: false}}
              />
            </Fragment>
          )}
        </Stack.Navigator>
      </RouteContext.Provider>
    </NavigationContainer>
  );
}

export default NavContainer;
