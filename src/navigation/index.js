import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from 'styles/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TouchID from 'react-native-touch-id';
import DrawerContent from './Components/DrawerContent';
import {useSelector} from 'react-redux';
import {getInitialScreen} from 'utils';

//Auth Screens
import LanguageSelect from '../screens/Auth/LanguageSelect';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import OtpScreen from '../screens/Auth/OtpScreen';
import RoleSelect from '../screens/Auth/RoleSelect';
import ForgotPassword from 'screens/Auth/ForgotPassword';
import ForgotPasswordOtp from 'screens/Auth/ForgotPasswordOtp';
import ResetPassword from 'screens/Auth/ResetPassword';

//Project Creation Screens
import PC_StepOne from '../screens/CreateProject/ProjectCreation/StepOne';
import PC_StepTwo from '../screens/CreateProject/ProjectCreation/StepTwo';
import PS_StepOne from '../screens/CreateProject/ProjectStructure/StepOne';
import PS_StepTwo from '../screens/CreateProject/ProjectStructure/StepTwo';
import PlanSelect from '../screens/CreateProject/PlanSelect';

//Home Screen
import Home from '../screens/Home';
//Notification Screen
import Notification from 'screens/Notification';
//Profile Screen
import Profile from 'screens/UserAccount/Profile';
import EditProfile from 'screens/UserAccount/EditProfile';
//Change Password Screen
import StepOne from 'screens/UserAccount/ChangePassword/StepOne';
import StepTwo from 'screens/UserAccount/ChangePassword/StepTwo';
import StepThree from 'screens/UserAccount/ChangePassword/StepThree';
//Settings Screen
import SettingsScreen from '../screens/Settings';
//Project Search Screen
import SearchScreen from '../screens/Search';

/************* Customer Project Sub Screens    *************/
import CustomerHome from 'screens/CustomerProject/Ownership';
import CustomerBooking from 'screens/CustomerProject/CustomerBookingDetails';
import CustomerBankLoan from 'screens/CustomerProject/CustomerBankLoan';
import CustomerAccount from 'screens/CustomerProject/CustomerAccount';
import CustomerModifyRequest from 'screens/CustomerProject/CustomerModifyRequest';
import CustomerFiles from 'screens/CustomerProject/CustomerFiles';

/************* Customer Project Sub Screens End   *************/

/************* Developer Project Sub Screens    *************/
import DeveloperDashboard from '../screens/DeveloperProject/Dashboard';
//Project : Sales Screens
import Visitors from '../screens/DeveloperProject/Sales/Visitors';
import VisitorDetails from '../screens/DeveloperProject/Sales/VisitorDetails';
import SalesPipeline from '../screens/DeveloperProject/Sales/SalesPipeline';
import Payment from '../screens/DeveloperProject/Sales/Payment';
import AddVisitor from '../screens/DeveloperProject/Sales/AddVisitor';
import AddFollowUp from '../screens/DeveloperProject/Sales/AddDetails/Components/AddFollowUp';
import AddDetails from '../screens/DeveloperProject/Sales/AddDetails/index';
import BC_SelectStructure from 'screens/DeveloperProject/Sales/BookingChart/SelectStructure';
import BC_SelectFloor from 'screens/DeveloperProject/Sales/BookingChart/SelectFloor';
import BC_SelectUnit from 'screens/DeveloperProject/Sales/BookingChart/SelectUnit';
import BookingDetails from 'screens/DeveloperProject/Sales/BookingChart/BookingDetails';
import BookingRates from 'screens/DeveloperProject/Sales/BookingChart/BookingRates';
import BookingPayment from 'screens/DeveloperProject/Sales/BookingChart/BookingPayment';
//Project : Customer Section
import CS_SelectStructure from 'screens/DeveloperProject/CustomerSection/SelectStructure';
import CS_SelectFloor from 'screens/DeveloperProject/CustomerSection/SelectFloor';
import CS_SelectUnit from 'screens/DeveloperProject/CustomerSection/SelectUnit';
import CustomerSection from 'screens/DeveloperProject/CustomerSection/CustomerSection';
import CustomerDetails from 'screens/DeveloperProject/CustomerSection/CustomerDetails';
import AddCustomer from 'screens/DeveloperProject/CustomerSection/AddCustomer';
import AddModifyRequest from 'screens/DeveloperProject/CustomerSection/AddModifyRequest';
import AddBankDetails from 'screens/DeveloperProject/CustomerSection/AddBankDetails';
import PaymentCollections from 'screens/DeveloperProject/CustomerSection/PaymentColections';
import AddCollection from 'screens/DeveloperProject/CustomerSection/AddCollection';
import PaymentSchedule from 'screens/DeveloperProject/CustomerSection/PaymentSchedule';
//Project : Project management screens
import Lineup from '../screens/DeveloperProject/ProjectManagement/Lineup';
import Phases from 'screens/DeveloperProject/ProjectManagement/Planning/Phases';
import SubPhases from 'screens/DeveloperProject/ProjectManagement/Planning/SubPhases';
import SubPhaseActivity from 'screens/DeveloperProject/ProjectManagement/Planning/SubPhaseActivity';
import PlanningDetails from 'screens/DeveloperProject/ProjectManagement/Planning/PlanningDetails';
import ProjectSchedule from '../screens/DeveloperProject/ProjectManagement/ProjectSchedule';
import MainPhase from '../screens/DeveloperProject/ProjectManagement/MainPhase';
import ProcessChart from '../screens/DeveloperProject/ProjectManagement/ProcessChart/ProcessChart';
//Project : Material management screens
import Estimation from '../screens/DeveloperProject/MaterialManagement/Estimation';
import RequestForPrice from '../screens/DeveloperProject/MaterialManagement/RequestForPrice';
import PurchaseOrders from '../screens/DeveloperProject/MaterialManagement/PurchaseOrders';
//Project : Files screens
import Files from '../screens/DeveloperProject/Files';
//Project : Role screens
import Roles from 'screens/DeveloperProject/UserRoles/Roles';
import AddUser from 'screens/DeveloperProject/UserRoles/AddUser';
import AddRole from 'screens/DeveloperProject/UserRoles/AddRole';
/************* Developer Project Sub Screens End   *************/

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

// TODO: update this comment
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

function VisitorsStack() {
  return (
    <Stack.Navigator initialRouteName={'VisitorsHome'}>
      <Stack.Screen
        name="VisitorsHome"
        component={Visitors}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VisitorDetails"
        component={VisitorDetails}
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
      <Stack.Screen
        name="AddDetails"
        component={AddDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function PipelineStack() {
  return (
    <Stack.Navigator initialRouteName={'PipelineHome'}>
      <Stack.Screen
        name="PipelineHome"
        component={SalesPipeline}
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
      <Stack.Screen
        name="PaymentCollections"
        component={PaymentCollections}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCollection"
        component={AddCollection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentSchedule"
        component={PaymentSchedule}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function PlanningStack() {
  return (
    <Stack.Navigator initialRouteName={'Phases'}>
      <Stack.Screen
        name="Phases"
        component={Phases}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubPhases"
        component={SubPhases}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubPhaseActivity"
        component={SubPhaseActivity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlanningDetails"
        component={PlanningDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function FilesStack() {
  return (
    <Stack.Navigator initialRouteName={'Files'}>
      <Stack.Screen
        name="Files"
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

function RolesStack() {
  return (
    <Stack.Navigator initialRouteName={'RolesListing'}>
      <Stack.Screen
        name="RolesListing"
        component={Roles}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddRole"
        component={AddRole}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function GeneralDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <RouteContext.Consumer>
          {routeData => (
            <DrawerContent {...props} routeData={routeData} type="general" />
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
      drawerContent={props => (
        <RouteContext.Consumer>
          {routeData => (
            <DrawerContent {...props} routeData={routeData} type="developer" />
          )}
        </RouteContext.Consumer>
      )}>
      <Drawer.Screen name="DeveloperDashboard" component={DeveloperDashboard} />
      <Drawer.Screen name="Visitors" component={VisitorsStack} />
      <Drawer.Screen name="SalesPipeline" component={PipelineStack} />
      <Drawer.Screen name="BookingChartStack" component={BookingChartStack} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="CustomerSection" component={CustomerSectionStack} />
      <Drawer.Screen name="ProjectSchedule" component={ProjectSchedule} />
      <Drawer.Screen name="MainPhase" component={MainPhase} />
      <Drawer.Screen name="Lineup" component={Lineup} />
      <Drawer.Screen name="Planning" component={PlanningStack} />
      <Drawer.Screen name="ProcessChart" component={ProcessChart} />
      <Drawer.Screen name="Estimation" component={Estimation} />
      <Drawer.Screen name="RequestForPrice" component={RequestForPrice} />
      <Drawer.Screen name="PurchaseOrders" component={PurchaseOrders} />
      <Drawer.Screen name="Files" component={FilesStack} />
      <Drawer.Screen name="Roles" component={RolesStack} />
    </Drawer.Navigator>
  );
}

function CustomerDashboard() {
  return (
    <Drawer.Navigator
      initialRouteName={'Ownership'}
      drawerContent={props => (
        <RouteContext.Consumer>
          {routeData => (
            <DrawerContent {...props} routeData={routeData} type="customer" />
          )}
        </RouteContext.Consumer>
      )}>
      <Drawer.Screen name="Ownership" component={CustomerHome} />
      <Drawer.Screen name="BookingDetails" component={CustomerBooking} />
      <Drawer.Screen name="LoanDetails" component={CustomerBankLoan} />
      <Drawer.Screen name="CustomerAccount" component={CustomerAccount} />
      <Drawer.Screen name="ModifyRequest" component={CustomerModifyRequest} />
      <Drawer.Screen name="CustomerFiles" component={CustomerFiles} />
      <Drawer.Screen name="AddCustomer" component={AddCustomer} />
      <Drawer.Screen name="CustomerDetails" component={CustomerDetails} />
      <Drawer.Screen name="AddModifyRequest" component={AddModifyRequest} />
      <Drawer.Screen name="AddBankDetails" component={AddBankDetails} />
      <Drawer.Screen name="PaymentCollections" component={PaymentCollections} />
      <Drawer.Screen name="AddCollection" component={AddCollection} />
    </Drawer.Navigator>
  );
}

function ChangePasswordStack() {
  return (
    <Stack.Navigator initialRouteName={'ChangePasswordStepTwo'}>
      <Stack.Screen
        name="ChangePasswordStepOne"
        component={StepOne}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePasswordStepTwo"
        component={StepTwo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePasswordStepThree"
        component={StepThree}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// Gets the current screen from navigation state
const getActiveRouteName = (state, parentRoute) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state, route.name);
  }

  return {parentRoute: parentRoute || route.name, currentRoute: route.name};
};

function NavContainer() {
  const {authenticated, user} = useSelector(state => state.user);
  const {language} = useSelector(state => state.app);

  const [routeData, setRouteData] = useState({
    currentRoute: authenticated ? 'Home' : 'LanguageSelect',
  });
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  useEffect(() => {
    const navState = navigationRef.current.getRootState();
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(navState);
  }, []);

  useEffect(() => {
    const useTouchId = false;
    if (useTouchId) {
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          TouchID.authenticate('', authObject)
            .then(success => {})
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

  const initialScreen = useMemo(() => {
    if (language) {
      return getInitialScreen(authenticated, user);
    }
    // return 'LanguageSelect';
    return 'Login';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onStateChange={navState => {
        const prevData = routeNameRef.current;
        const currentData = getActiveRouteName(navState);
        if (prevData.currentRoute !== currentData.currentRoute) {
          console.log('----->routeData ', currentData);
          setRouteData(currentData);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentData;
      }}>
      <RouteContext.Provider value={routeData}>
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
                name="DeveloperDashboard"
                component={ProjectDrawer}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CustomerDashboard"
                component={CustomerDashboard}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordStack}
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
              {/* <Stack.Screen
                name="RoleSelect"
                component={RoleSelect}
                options={{headerShown: false}}
              /> */}
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPasswordOtp"
                component={ForgotPasswordOtp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{headerShown: false}}
              />
            </Fragment>
          )}
          {/* Project Creation screens */}
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
        </Stack.Navigator>
      </RouteContext.Provider>
    </NavigationContainer>
  );
}

export default NavContainer;
