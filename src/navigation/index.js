import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from 'styles/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TouchID from 'react-native-touch-id';
import DrawerContent from './Components/DrawerContent';
import {useSelector} from 'react-redux';
import {getInitialAuthScreen} from 'utils';

//Auth Screens
import LanguageSelect from '../screens/Auth/LanguageSelect';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import OtpScreen from '../screens/Auth/OtpScreen';
import RoleSelect from '../screens/Auth/RoleSelect';

//Project Creation Screens
import PC_StepOne from '../screens/CreateProject/ProjectCreation/StepOne';
import PC_StepTwo from '../screens/CreateProject/ProjectCreation/StepTwo';
import PS_StepOne from '../screens/CreateProject/ProjectStructure/StepOne';
import PS_StepTwo from '../screens/CreateProject/ProjectStructure/StepTwo';
import PlanSelect from '../screens/CreateProject/PlanSelect';

//Home Screen
import Home from '../screens/Home';
//Settings Screen
import SettingsScreen from '../screens/Settings';
//Project Search Screen
import SearchScreen from '../screens/Search';

/*************   Project Sub Screens    *************/
import ProjectDashboard from '../screens/Project/Dashboard';
//Project : Sales Screens
import Inquiry from '../screens/Project/Sales/Inquiry';
import SalesPipeline from '../screens/Project/Sales/SalesPipeline';
import Payment from '../screens/Project/Sales/Payment';
import AddVisitor from '../screens/Project/Sales/AddVisitor';
import AddFollowUp from '../screens/Project/Sales/AddFollowUp';
import BC_SelectStructure from 'screens/Project/Sales/BookingChart/SelectStructure';
import BC_SelectFloor from 'screens/Project/Sales/BookingChart/SelectFloor';
import BC_SelectUnit from 'screens/Project/Sales/BookingChart/SelectUnit';
import BookingDetails from 'screens/Project/Sales/BookingChart/BookingDetails';
import BookingRates from 'screens/Project/Sales/BookingChart/BookingRates';
import BookingPayment from 'screens/Project/Sales/BookingChart/BookingPayment';
//Project : Customer Section
import CS_SelectStructure from 'screens/Project/CustomerSection/SelectStructure';
import CS_SelectFloor from 'screens/Project/CustomerSection/SelectFloor';
import CS_SelectUnit from 'screens/Project/CustomerSection/SelectUnit';
import CustomerSection from 'screens/Project/CustomerSection/CustomerSection';
import CustomerDetails from 'screens/Project/CustomerSection/CustomerDetails';
import AddCustomer from 'screens/Project/CustomerSection/AddCustomer';
import AddModifyRequest from 'screens/Project/CustomerSection/AddModifyRequest';
import AddBankDetails from 'screens/Project/CustomerSection/AddBankDetails';
//Project : Project management screens
import ProjectSchedule from '../screens/Project/ProjectManagement/ProjectSchedule';
import MainPhase from '../screens/Project/ProjectManagement/MainPhase';
import Lineup from '../screens/Project/ProjectManagement/LineUp';
import ProcessChart from '../screens/Project/ProjectManagement/ProcessChart/ProcessChart';
//Project : Material management screens
import Estimation from '../screens/Project/MaterialManagement/Estimation';
import RequestForPrice from '../screens/Project/MaterialManagement/RequestForPrice';
import PurchaseOrders from '../screens/Project/MaterialManagement/PurchaseOrders';
//Project : Files screens
import Files from '../screens/Project/Files';
/*************   Project Sub Screens    *************/

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
 * The Whole App navigation is divided into 3 layers
 * 1. The top stack navigator for App and Auth screens
 * 2. The General Drawer for Root screens
 * 3. The Project Drawer for all project screens
 * 4. All screens
 * <Main Stack>
 *    <App Drawer>
 *        Home, Settings... all root level screens
 *    </App Drawer>
 *    <Project Drawer>
 *      <Project SubStacks/>
 *      {...allScreens}
 *    </Project Drawer>
 *    <>
 *      <Auth Screens/>
 *    </>
 * </Main Stack>
 */

function InquiryStack() {
  return (
    <Stack.Navigator initialRouteName={'InquiryHome'}>
      <Stack.Screen
        name="InquiryHome"
        component={Inquiry}
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
    </Stack.Navigator>
  );
}

function BookingChartStack() {
  return (
    <Stack.Navigator initialRouteName={'BC_Step_One'}>
      <Stack.Screen
        name="BC_Step_One"
        component={BC_SelectStructure}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BC_Step_Two"
        component={BC_SelectFloor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BC_Step_Three"
        component={BC_SelectUnit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BC_Step_Four"
        component={BookingDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BC_Step_Five"
        component={BookingRates}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BC_Step_Six"
        component={BookingPayment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function CustomerSectionStack() {
  return (
    <Stack.Navigator initialRouteName={'BC_Step_One'}>
      <Stack.Screen
        name="CS_Step_One"
        component={CS_SelectStructure}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CS_Step_Two"
        component={CS_SelectFloor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CS_Step_Three"
        component={CS_SelectUnit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CS_Step_Four"
        component={CustomerSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddModifyRequest"
        component={AddModifyRequest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddBankDetails"
        component={AddBankDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function FilesStack() {
  return (
    <Stack.Navigator initialRouteName={'FilesHome'}>
      <Stack.Screen
        name="FilesHome"
        component={Files}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FolderDetails"
        component={Files}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

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
      <Drawer.Screen name="Inquiry" component={InquiryStack} />
      <Drawer.Screen name="SalesPipeline" component={SalesPipeline} />
      <Drawer.Screen name="BookingChartStack" component={BookingChartStack} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="CustomerSection" component={CustomerSectionStack} />
      <Drawer.Screen name="ProjectSchedule" component={ProjectSchedule} />
      <Drawer.Screen name="MainPhase" component={MainPhase} />
      <Drawer.Screen name="Lineup" component={Lineup} />
      <Drawer.Screen name="ProcessChart" component={ProcessChart} />
      <Drawer.Screen name="Estimation" component={Estimation} />
      <Drawer.Screen name="RequestForPrice" component={RequestForPrice} />
      <Drawer.Screen name="PurchaseOrders" component={PurchaseOrders} />
      <Drawer.Screen name="Files" component={FilesStack} />
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

  useEffect(() => {
    const navState = navigationRef.current.getRootState();
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(navState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const useTouchId = false;
    if (useTouchId) {
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
    if (language) {
      return getInitialAuthScreen(authenticated, state);
    }
    return 'LanguageSelect';
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
