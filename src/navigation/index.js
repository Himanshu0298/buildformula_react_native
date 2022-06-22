/* eslint-disable import/order */
import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from 'styles/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TouchID from 'react-native-touch-id';
import {useSelector} from 'react-redux';
import {getInitialScreen} from 'utils';
import RNBootSplash from 'react-native-bootsplash';

// Auth Screens
import ForgotPassword from 'screens/Auth/ForgotPassword';
import ForgotPasswordOtp from 'screens/Auth/ForgotPasswordOtp';
import ResetPassword from 'screens/Auth/ResetPassword';

// Project Creation Screens

// Home Screen
// User Purchased PRoject Screens
// Notification Screen
import Notification from 'screens/Notification';
// Profile Screen
import Profile from 'screens/UserAccount/Profile';
import EditProfile from 'screens/UserAccount/EditProfile';
// Change Password Screen
import StepOne from 'screens/UserAccount/ChangePassword/StepOne';
import StepTwo from 'screens/UserAccount/ChangePassword/StepTwo';
import StepThree from 'screens/UserAccount/ChangePassword/StepThree';
// Project Search Screen

/** *********** Customer Project Sub Screens    ************ */
import CustomerHome from 'screens/CustomerProject/Ownership';
import CustomerBooking from 'screens/CustomerProject/CustomerBookingDetails';
import CustomerBankLoan from 'screens/CustomerProject/CustomerBankLoan';
import CustomerAccount from 'screens/CustomerProject/CustomerAccount';
import CustomerModifyRequest from 'screens/CustomerProject/CustomerModifyRequest';
import CustomerFiles from 'screens/CustomerProject/CustomerFiles';

/** *********** Customer Project Sub Screens End   ************ */

/** *********** Developer Project Sub Screens    ************ */
// Project : Sales Screens
import BC_SelectStructure from 'screens/DeveloperProject/Sales/BookingChart/SelectStructure';
import BC_SelectFloor from 'screens/DeveloperProject/Sales/BookingChart/SelectFloor';
import BC_SelectTower from 'screens/DeveloperProject/Sales/BookingChart/SelectTower';
import BC_SelectUnit from 'screens/DeveloperProject/Sales/BookingChart/SelectUnit';
import BookingMode from 'screens/DeveloperProject/Sales/BookingChart/BookingMode';
import BookingDetails from 'screens/DeveloperProject/Sales/BookingChart/BookingDetails';
import BookingFormOnHold from 'screens/DeveloperProject/Sales/BookingChart/BookingFormOnHold';
import HoldBookingHistory from 'screens/DeveloperProject/Sales/BookingChart/HoldBookingHistory';
import BookingRates from 'screens/DeveloperProject/Sales/BookingChart/BookingRates';
import BookingPayment from 'screens/DeveloperProject/Sales/BookingChart/BookingPayment';
import BrokerList from 'screens/DeveloperProject/Sales/BrokerList';
// Project : Customer Section
import CS_SelectStructure from 'screens/DeveloperProject/CustomerSection/SelectStructure';
import CS_SelectTower from 'screens/DeveloperProject/CustomerSection/SelectTower';
import CS_SelectFloor from 'screens/DeveloperProject/CustomerSection/SelectFloor';
import CS_SelectUnit from 'screens/DeveloperProject/CustomerSection/SelectUnit';
import CustomerSection from 'screens/DeveloperProject/CustomerSection/CustomerSection';
import CustomerDetails from 'screens/DeveloperProject/CustomerSection/CustomerDetails';
import AddCustomer from 'screens/DeveloperProject/CustomerSection/AddCustomer';
import AddModifyRequest from 'screens/DeveloperProject/CustomerSection/AddModifyRequest';
import ModifyRequestDetails from 'screens/DeveloperProject/CustomerSection/ModifyRequestDetails';
import AddBankDetails from 'screens/DeveloperProject/CustomerSection/AddBankDetails';
import PaymentCollections from 'screens/DeveloperProject/CustomerSection/PaymentColections';
import AddCollection from 'screens/DeveloperProject/CustomerSection/AddCollection';
import PaymentSchedule from 'screens/DeveloperProject/CustomerSection/PaymentSchedule';
// Project : Design Modules
import RoughDrawing from 'screens/DeveloperProject/DesignModule/RoughDrawing';
import FinalDrawing from 'screens/DeveloperProject/DesignModule/FinalDrawing';
import WorkingDrawing from 'screens/DeveloperProject/DesignModule/WorkingDrawing';
import AreaSheet from 'screens/DeveloperProject/DesignModule/AreaSheet';
import Parking from 'screens/DeveloperProject/DesignModule/Parking';
// Project : Project management screens
import Phases from 'screens/DeveloperProject/ProjectManagement/Planning/Phases';
import SubPhases from 'screens/DeveloperProject/ProjectManagement/Planning/SubPhases';
import SubPhaseActivity from 'screens/DeveloperProject/ProjectManagement/Planning/SubPhaseActivity';
import PlanningDetails from 'screens/DeveloperProject/ProjectManagement/Planning/PlanningDetails';
import Roles from 'screens/DeveloperProject/UserRoles/Roles';
import AddUser from 'screens/DeveloperProject/UserRoles/AddUser';
import AddRole from 'screens/DeveloperProject/UserRoles/AddRole';
import SalesPipelineRearrange from 'screens/DeveloperProject/Sales/SalesPipelineRearrange';
import BrokerDetails from 'screens/DeveloperProject/Sales/BrokerDetails';
import AddBroker from 'screens/DeveloperProject/Sales/AddBroker';
import Remark from 'screens/DeveloperProject/Sales/BrokerDetails/Components/Remark';
import WorkMaster from 'screens/DeveloperProject/ProjectManagement/WorkMaster';
import WorkDetails from 'screens/DeveloperProject/ProjectManagement/WBS/WorkDetails';
import ProgressRecords from 'screens/DeveloperProject/ProjectManagement/WBS/ProgressRecords';
import Worklist from 'screens/DeveloperProject/ProjectManagement/WBS/Worklist';
import SubWorkCategory from 'screens/DeveloperProject/ProjectManagement/SubWorkCategory';
import ProjectSchedule from '../screens/DeveloperProject/ProjectManagement/ProjectSchedule';
import ProcessChart from '../screens/DeveloperProject/ProjectManagement/ProcessChart/ProcessChart';

// Project : Material management screens
import Estimation from '../screens/DeveloperProject/MaterialManagement/Estimation';
import RequestForPrice from '../screens/DeveloperProject/MaterialManagement/RequestForPrice';
import PurchaseOrders from '../screens/DeveloperProject/MaterialManagement/PurchaseOrders';
import MaterialGRN from '../screens/DeveloperProject/Material/MaterialGRN';
import OrderDetail from '../screens/DeveloperProject/Material/OrderDetail';
import MaterialList from '../screens/DeveloperProject/Material/MaterialList';
import DeliveryDetails from 'screens/DeveloperProject/Material/DeliveryDetails';

// Project : Files screens
import Files from '../screens/DeveloperProject/Files';
// Project : Role screens
import AddDetails from '../screens/DeveloperProject/Sales/AddDetails/index';
import AddFollowUp from '../screens/DeveloperProject/Sales/AddDetails/Components/AddFollowUp';
import AddVisitor from '../screens/DeveloperProject/Sales/AddVisitor';
import Payment from '../screens/DeveloperProject/Sales/Payment';
import SalesPipeline from '../screens/DeveloperProject/Sales/SalesPipeline';
import VisitorDetails from '../screens/DeveloperProject/Sales/VisitorDetails';
import Visitors from '../screens/DeveloperProject/Sales/VisitorsList';
import DeveloperDashboard from '../screens/DeveloperProject/Dashboard';
import SearchScreen from '../screens/Search';
import UpdateBillingInfo from '../screens/PurchaseDetails/UpdateBillingInfo/index';
import ProjectDetails from '../screens/PurchaseDetails/ProjectDetails';
import PurchasedProjects from '../screens/PurchaseDetails/PurchasedProjects';
import Home from '../screens/Home';
import PlanSelect from '../screens/CreateProject/PlanSelect';
import PS_StepTwo from '../screens/CreateProject/ProjectStructure/StepTwo';
import PS_StepOne from '../screens/CreateProject/ProjectStructure/StepOne';
import PC_StepTwo from '../screens/CreateProject/ProjectCreation/StepTwo';
import PC_StepOne from '../screens/CreateProject/ProjectCreation/StepOne';
import OtpScreen from '../screens/Auth/OtpScreen';
import SignUp from '../screens/Auth/SignUp';
import Login from '../screens/Auth/Login';
import LanguageSelect from '../screens/Auth/LanguageSelect';
import DrawerContent from './Components/DrawerContent';
import AddChallan from 'screens/DeveloperProject/Material/DeliveryDetails/AddChallan';
import SelectMaterials from 'screens/DeveloperProject/Material/DeliveryDetails/SelectMaterial';
import AddMaterialInfo from 'screens/DeveloperProject/Material/DeliveryDetails/AddMaterialChallan';
import AddVehicleInfo from 'screens/DeveloperProject/Material/DeliveryDetails/AddVehicleChallan';
import DocumentGenerater from 'screens/DeveloperProject/DocumentGenerater';
import CustomerSectionSettings from 'screens/DeveloperProject/CustomerSectionSettings';
import Approval from 'screens/DeveloperProject/Sales/Approval';
import CreateApproval from 'screens/DeveloperProject/Sales/Approval/Components/CreateApproval';
import ApprovalListing from 'screens/DeveloperProject/Sales/Approval/Components/ApprovalListing';
import FollowUpTask from 'screens/DeveloperProject/Sales/Follow-upTask';
import FollowUpDetails from 'screens/DeveloperProject/Sales/Follow-upTask/FollowUpDetails';
import DocumentDownload from 'screens/DeveloperProject/DocumentGenerater/Documents/DocumentDownload';
import ProjectNotification from 'screens/Notification/ProjectNotification';
import RDFileSection from 'screens/DeveloperProject/DesignModule/RoughDrawing/Components/FilesSection';
/** *********** Developer Project Sub Screens End   ************ */

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
    <Stack.Navigator initialRouteName="VisitorsHome">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="VisitorsHome" component={Visitors} />
        <Stack.Screen name="VisitorDetails" component={VisitorDetails} />
        <Stack.Screen name="AddVisitor" component={AddVisitor} />
        <Stack.Screen name="AddFollowUp" component={AddFollowUp} />
        <Stack.Screen name="AddDetails" component={AddDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function PipelineStack() {
  return (
    <Stack.Navigator initialRouteName="PipelineHome">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="PipelineHome" component={SalesPipeline} />
        <Stack.Screen
          name="PipelineRearrange"
          component={SalesPipelineRearrange}
        />
        <Stack.Screen name="VisitorDetails" component={VisitorDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function ApprovalStack() {
  return (
    <Stack.Navigator initialRouteName="Approval">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Approval" component={Approval} />
        <Stack.Screen name="CreateApproval" component={CreateApproval} />
        <Stack.Screen name="ApprovalListing" component={ApprovalListing} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function FollowUpStack() {
  return (
    <Stack.Navigator initialRouteName="FollowUpTask">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="FollowUpTask" component={FollowUpTask} />
        <Stack.Screen name="FollowUpDetails" component={FollowUpDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function BookingChartStack() {
  return (
    <Stack.Navigator initialRouteName="BC_Step_One">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="BC_Step_One" component={BC_SelectStructure} />
        <Stack.Screen name="BC_Step_Two" component={BC_SelectTower} />
        <Stack.Screen name="BC_Step_Three" component={BC_SelectFloor} />
        <Stack.Screen name="BC_Step_Four" component={BC_SelectUnit} />
        <Stack.Screen name="BC_Step_Five" component={BookingMode} />
        <Stack.Screen name="BC_Step_Six" component={BookingDetails} />
        <Stack.Screen name="BC_Step_Seven" component={BookingRates} />
        <Stack.Screen name="BC_Step_Eight" component={BookingPayment} />
        <Stack.Screen name="BookingOtp" component={OtpScreen} />
        <Stack.Screen name="BookingFormOnHold" component={BookingFormOnHold} />
        <Stack.Screen
          name="HoldBookingHistory"
          component={HoldBookingHistory}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function CustomerSectionStack() {
  return (
    <Stack.Navigator initialRouteName="BC_Step_One">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="CS_Step_One" component={CS_SelectStructure} />
        <Stack.Screen name="CS_Step_Two" component={CS_SelectTower} />
        <Stack.Screen name="CS_Step_Three" component={CS_SelectFloor} />
        <Stack.Screen name="CS_Step_Four" component={CS_SelectUnit} />
        <Stack.Screen name="CS_Step_Five" component={CustomerSection} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="AddModifyRequest" component={AddModifyRequest} />
        <Stack.Screen
          name="ModifyRequestDetails"
          component={ModifyRequestDetails}
        />
        <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
        <Stack.Screen
          name="PaymentCollections"
          component={PaymentCollections}
        />
        <Stack.Screen name="AddCollection" component={AddCollection} />
        <Stack.Screen name="PaymentSchedule" component={PaymentSchedule} />
        <Stack.Screen name="CustomerFiles" component={CustomerFiles} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function MaterialModuleStack() {
  return (
    <Stack.Navigator initialRouteName="MaterialGRN">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="MaterialGRN" component={MaterialGRN} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="MaterialList" component={MaterialList} />
        <Stack.Screen name="AddChallan" component={AddChallan} />
        <Stack.Screen name="SelectMaterials" component={SelectMaterials} />
        <Stack.Screen name="AddMaterialInfo" component={AddMaterialInfo} />
        <Stack.Screen name="AddVehicleInfo" component={AddVehicleInfo} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function PlanningStack() {
  return (
    <Stack.Navigator initialRouteName="Phases">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Phases" component={Phases} />
        <Stack.Screen name="SubPhases" component={SubPhases} />
        <Stack.Screen name="SubPhaseActivity" component={SubPhaseActivity} />
        <Stack.Screen name="PlanningDetails" component={PlanningDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function WBSStack() {
  return (
    <Stack.Navigator initialRouteName="Worklist">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Worklist" component={Worklist} />
        <Stack.Screen name="WorkDetails" component={WorkDetails} />
        <Stack.Screen name="RecordsDetail" component={ProgressRecords} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function WorkMasterStack() {
  return (
    <Stack.Navigator initialRouteName="WorkMasterMain">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="WorkMasterMain" component={WorkMaster} />
        <Stack.Screen name="SubWorkCategory" component={SubWorkCategory} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function FilesStack() {
  return (
    <Stack.Navigator initialRouteName="Files">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Files" component={Files} />
        <Stack.Screen name="FolderDetails" component={Files} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function BrokerStack() {
  return (
    <Stack.Navigator initialRouteName="BrokerList">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="BrokerList" component={BrokerList} />
        <Stack.Screen name="BrokerDetails" component={BrokerDetails} />
        <Stack.Screen name="AddBroker" component={AddBroker} />
        <Stack.Screen name="Remark" component={Remark} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function RolesStack() {
  return (
    <Stack.Navigator initialRouteName="RolesListing">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="RolesListing" component={Roles} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="AddRole" component={AddRole} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function PurchasedProjectsStack() {
  return (
    <Stack.Navigator initialRouteName="PurchasedProjects">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="PurchasedProjects" component={PurchasedProjects} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
        <Stack.Screen name="UpdateBillingInfo" component={UpdateBillingInfo} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function RoughDrawingStack() {
  return (
    <Stack.Navigator initialRouteName="RoughDrawing">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="RoughDrawing" component={RoughDrawing} />
        <Stack.Screen name="RDFileSection" component={RDFileSection} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const generalDrawerContent = props => (
  <RouteContext.Consumer>
    {routeData => (
      <DrawerContent {...props} routeData={routeData} type="general" />
    )}
  </RouteContext.Consumer>
);

function GeneralDrawer() {
  return (
    <Drawer.Navigator drawerContent={generalDrawerContent}>
      <Drawer.Group screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen
          name="PurchasedProjects"
          component={PurchasedProjectsStack}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

const developerDrawerContent = props => (
  <RouteContext.Consumer>
    {routeData => (
      <DrawerContent {...props} routeData={routeData} type="developer" />
    )}
  </RouteContext.Consumer>
);

function ProjectDrawer() {
  return (
    <Drawer.Navigator drawerContent={developerDrawerContent}>
      <Drawer.Group screenOptions={{headerShown: false}}>
        <Drawer.Screen name="DeveloperHome" component={DeveloperDashboard} />
        <Drawer.Screen name="Visitors" component={VisitorsStack} />
        <Drawer.Screen name="SalesPipeline" component={PipelineStack} />
        <Drawer.Screen name="Approval" component={ApprovalStack} />
        <Drawer.Screen name="FollowUpTask" component={FollowUpStack} />
        <Drawer.Screen name="BookingChartStack" component={BookingChartStack} />
        <Drawer.Screen name="BrokerStack" component={BrokerStack} />
        <Drawer.Screen name="RoughDrawing" component={RoughDrawingStack} />
        <Drawer.Screen name="FinalDrawing" component={FinalDrawing} />
        <Drawer.Screen name="WorkingDrawing" component={WorkingDrawing} />
        <Drawer.Screen name="AreaSheet" component={AreaSheet} />
        <Drawer.Screen name="Parking" component={Parking} />
        <Drawer.Screen name="Payment" component={Payment} />
        <Drawer.Screen
          name="CustomerSection"
          component={CustomerSectionStack}
        />
        <Drawer.Screen name="WorkMaster" component={WorkMasterStack} />
        <Drawer.Screen name="DocumentGenerater" component={DocumentGenerater} />
        <Drawer.Screen name="DocumentDownload" component={DocumentDownload} />
        {/* <Drawer.Screen
          name="CustomerSectionSettings"
          component={CustomerSectionSettings}
        /> */}
        <Drawer.Screen name="WBS" component={WBSStack} />
        <Drawer.Screen name="MaterialUtility" component={MaterialModuleStack} />
        <Drawer.Screen name="ProjectSchedule" component={ProjectSchedule} />
        <Drawer.Screen name="Planning" component={PlanningStack} />
        <Drawer.Screen name="ProcessChart" component={ProcessChart} />
        <Drawer.Screen name="Estimation" component={Estimation} />
        <Drawer.Screen name="RequestForPrice" component={RequestForPrice} />
        <Drawer.Screen name="PurchaseOrders" component={PurchaseOrders} />
        <Drawer.Screen name="Files" component={FilesStack} />
        <Drawer.Screen name="Roles" component={RolesStack} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

const customerDrawerContent = props => (
  <RouteContext.Consumer>
    {routeData => (
      <DrawerContent {...props} routeData={routeData} type="customer" />
    )}
  </RouteContext.Consumer>
);

function CustomerDashboard() {
  return (
    <Drawer.Navigator
      initialRouteName="Ownership"
      drawerContent={customerDrawerContent}>
      <Drawer.Group screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Ownership" component={CustomerHome} />
        <Drawer.Screen name="BookingDetails" component={CustomerBooking} />
        <Drawer.Screen name="LoanDetails" component={CustomerBankLoan} />
        <Drawer.Screen name="CustomerAccount" component={CustomerAccount} />
        <Drawer.Screen
          name="ModifyRequestDetails"
          component={ModifyRequestDetails}
        />
        <Drawer.Screen name="ModifyRequest" component={CustomerModifyRequest} />
        <Drawer.Screen name="CustomerFiles" component={CustomerFiles} />
        <Drawer.Screen name="AddCustomer" component={AddCustomer} />
        <Drawer.Screen name="CustomerDetails" component={CustomerDetails} />
        <Drawer.Screen name="AddModifyRequest" component={AddModifyRequest} />
        <Drawer.Screen name="AddBankDetails" component={AddBankDetails} />
        <Drawer.Screen
          name="PaymentCollections"
          component={PaymentCollections}
        />
        <Drawer.Screen name="AddCollection" component={AddCollection} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

function ChangePasswordStack() {
  return (
    <Stack.Navigator initialRouteName="ChangePasswordStepTwo">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="ChangePasswordStepOne" component={StepOne} />
        <Stack.Screen name="ChangePasswordStepTwo" component={StepTwo} />
        <Stack.Screen name="ChangePasswordStepThree" component={StepThree} />
      </Stack.Group>
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
  const {authenticated, user} = useSelector(s => s.user);
  const {language} = useSelector(s => s.app);

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
            .then(success => {
              console.log('----->success ', success);
            })
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
      onReady={() => {
        RNBootSplash.hide({fade: true});
      }}
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
          <Stack.Group screenOptions={{headerShown: false}}>
            {authenticated ? (
              // App Nav Screens
              <>
                <Stack.Screen
                  name="GeneralDashboard"
                  component={GeneralDrawer}
                />
                <Stack.Screen
                  name="DeveloperDashboard"
                  component={ProjectDrawer}
                />
                <Stack.Screen
                  name="CustomerDashboard"
                  component={CustomerDashboard}
                />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen
                  name="ProjectNotification"
                  component={ProjectNotification}
                />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePasswordStack}
                />
              </>
            ) : (
              // Auth Nav Screens
              <>
                <Stack.Screen
                  name="LanguageSelect"
                  component={LanguageSelect}
                />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Otp" component={OtpScreen} />
                {/* <Stack.Screen name="RoleSelect" component={RoleSelect} /> */}
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen
                  name="ForgotPasswordOtp"
                  component={ForgotPasswordOtp}
                />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
              </>
            )}
            {/* Project Creation screens */}
            <Stack.Screen
              name="ProjectCreationStepOne"
              component={PC_StepOne}
            />
            <Stack.Screen
              name="ProjectCreationStepTwo"
              component={PC_StepTwo}
            />
            <Stack.Screen
              name="ProjectStructureStepOne"
              component={PS_StepOne}
            />
            <Stack.Screen
              name="ProjectStructureStepTwo"
              component={PS_StepTwo}
            />
            <Stack.Screen name="PlanSelect" component={PlanSelect} />
            <Stack.Screen name="AdminCreation" component={SignUp} />
          </Stack.Group>
        </Stack.Navigator>
      </RouteContext.Provider>
    </NavigationContainer>
  );
}

export default NavContainer;
