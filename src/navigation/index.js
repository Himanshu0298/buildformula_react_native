/* eslint-disable import/order */
import React, {useEffect, useMemo, useState} from 'react';
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
import ProjectNotification from 'screens/Notification/ProjectNotification';
import GlobalNotification from 'screens/Notification/GlobalNotification';

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
import AddBrokerPaymentDetails from 'screens/DeveloperProject/Sales/BrokerDetails/Components/AddBrokerPaymentDetails';
import Approval from 'screens/DeveloperProject/Sales/Approval';
import CreateApproval from 'screens/DeveloperProject/Sales/Approval/Components/CreateApproval';
import ApprovalListing from 'screens/DeveloperProject/Sales/Approval/Components/ApprovalListing';
import FollowUpTask from 'screens/DeveloperProject/Sales/Follow-upTask';
import FollowUpDetails from 'screens/DeveloperProject/Sales/Follow-upTask/FollowUpDetails';
import Remark from 'screens/DeveloperProject/Sales/BrokerDetails/Components/Remark';
import CompleteTask from 'screens/DeveloperProject/Sales/Follow-upTask/FollowUpDetails/CompleteTask';

// Project : Todo List
import TaskList from 'screens/DeveloperProject/TodoTask/TaskList';
import SubTaskList from 'screens/DeveloperProject/TodoTask/SubTaskList';
import AddTask from 'screens/DeveloperProject/TodoTask/AddTask';
import TaskDetails from 'screens/DeveloperProject/TodoTask/TaskDetails';

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
import CustomerList from 'screens/DeveloperProject/CustomerSection/CustomerList';
import CustomerInnerDetails from 'screens/DeveloperProject/CustomerSection/CustomerInnerDetails';
import EditCustomerDetails from 'screens/DeveloperProject/CustomerSection/CustomerInnerDetails/EditDetails/';

// Project : Design Modules
import RoughDrawingFiles from 'screens/DeveloperProject/DesignModule/RoughDrawing/RoughDrawingFiles';
import RoughDrawingFolders from 'screens/DeveloperProject/DesignModule/RoughDrawing/RoughDrawingFolders';
import FinalDrawingFolders from 'screens/DeveloperProject/DesignModule/FinalDrawing/FinalDrawingFolders';
import FinalDrawingFiles from 'screens/DeveloperProject/DesignModule/FinalDrawing/FinalDrawingFiles';
import WorkingDrawingFolders from 'screens/DeveloperProject/DesignModule/WorkingDrawing/WorkingDrawingFolders/';
import WorkingDrawingFiles from 'screens/DeveloperProject/DesignModule/WorkingDrawing/WorkingDrawingFiles/';

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
import DealsClosedDetails from 'screens/DeveloperProject/Sales/BrokerDetails/Components/DealsClosedDetails';

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
import PRListing from 'screens/DeveloperProject/Material/MaterialPR/PRListing';
import PIListing from 'screens/DeveloperProject/Material/MaterialPI/PIListing';
import CreatePR from 'screens/DeveloperProject/Material/MaterialPR/CreatePR';
import PRPreview from 'screens/DeveloperProject/Material/MaterialPR/PRPreview';
import AddMaterialList from 'screens/DeveloperProject/Material/MaterialPR/MaterialPRList';

import MaterialIndentListing from 'screens/DeveloperProject/Material/MaterialIndent/MaterialIndentList';
import CreatePI from 'screens/DeveloperProject/Material/MaterialPI/CreatePI/CreatePI';
import CreatePIMaterial from 'screens/DeveloperProject/Material/MaterialPI/CreatePI/AddPIMaterial';
import PIPreview from 'screens/DeveloperProject/Material/MaterialPI/PIPreview/PIPreview';
import PIRequest from 'screens/DeveloperProject/Material/MaterialPI/PIRequest/PIRequest';
import TermsAndConditions from 'screens/DeveloperProject/Material/MaterialPI/CreatePI/Terms&Conditions';
import AddPIMaterialList from 'screens/DeveloperProject/Material/MaterialPI/CreatePI/AddPIMaterialList';
import AddChallan from 'screens/DeveloperProject/Material/DeliveryDetails/AddChallan';

import AddMaterialIndent from 'screens/DeveloperProject/Material/MaterialIndent/IssueIndent/IssueMaterialIndent/AddMaterialIndent';
import CreateIssueIndent from 'screens/DeveloperProject/Material/MaterialIndent/IssueIndent/AddIssueIndent';
import CreateReturnIndent from 'screens/DeveloperProject/Material/MaterialIndent/ReturnIndent/AddReturnIndent/CreateReturnIndent';

import IssueIndentPreview from 'screens/DeveloperProject/Material/MaterialIndent/MaterialPreview/IssueIndentPreview';
import ReturnIndentPreview from 'screens/DeveloperProject/Material/MaterialIndent/MaterialPreview/ReturnIndentPreview';

import SelectMaterials from 'screens/DeveloperProject/Material/DeliveryDetails/SelectMaterial';
import AddMaterialInfo from 'screens/DeveloperProject/Material/DeliveryDetails/AddMaterialChallan';
import AddVehicleInfo from 'screens/DeveloperProject/Material/DeliveryDetails/AddVehicleChallan';

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
import DocumentGenerater from 'screens/DeveloperProject/DocumentGenerater';
import DocumentDownload from 'screens/DeveloperProject/DocumentGenerater/Documents/DocumentDownload';
import AddReturnMaterialIndent from 'screens/DeveloperProject/Material/MaterialIndent/ReturnIndent/ReturnMaterialIndent/AddReturnMaterial';
import AddMaterialIndentList from 'screens/DeveloperProject/Material/MaterialIndent/IssueIndent/IssueMaterialIndent';
import AddReturnMaterialList from 'screens/DeveloperProject/Material/MaterialIndent/ReturnIndent/ReturnMaterialIndent/AddReturnMaterialList';
import AddAttachments from 'screens/DeveloperProject/Material/MaterialIndent/ReturnIndent/AddAttachments/AddAttachments';

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

function AppStackNavigator() {
  const {authenticated, user} = useSelector(s => s.user);
  const {language} = useSelector(s => s.app);

  const initialScreen = useMemo(() => {
    if (language) {
      return getInitialScreen(authenticated, user);
    }
    // return 'LanguageSelect';
    return 'Login';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{headerShown: false}}>
      {authenticated ? (
        // App Nav Screens
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="PurchasedProjects"
            component={PurchasedProjects}
          />
          <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
          <Stack.Screen
            name="UpdateBillingInfo"
            component={UpdateBillingInfo}
          />
          <Stack.Screen name="ChangePasswordStepOne" component={StepOne} />
          <Stack.Screen name="ChangePasswordStepTwo" component={StepTwo} />
          <Stack.Screen name="ChangePasswordStepThree" component={StepThree} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen
            name="GlobalNotification"
            component={GlobalNotification}
          />
          <Stack.Screen
            name="ProjectNotification"
            component={ProjectNotification}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Profile" component={Profile} />
          {/* DEVELOPER STACK START */}
          <Stack.Group>
            <Stack.Screen name="DeveloperHome" component={DeveloperDashboard} />
            <Stack.Group>
              <Stack.Screen name="VisitorsHome" component={Visitors} />
              <Stack.Screen name="VisitorDetails" component={VisitorDetails} />
              <Stack.Screen name="AddVisitor" component={AddVisitor} />
              <Stack.Screen name="AddFollowUp" component={AddFollowUp} />
              <Stack.Screen name="AddDetails" component={AddDetails} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="SalesPipeline" component={SalesPipeline} />
              <Stack.Screen
                name="PipelineRearrange"
                component={SalesPipelineRearrange}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="Approval" component={Approval} />
              <Stack.Screen name="CreateApproval" component={CreateApproval} />
              <Stack.Screen
                name="ApprovalListing"
                component={ApprovalListing}
              />
            </Stack.Group>

            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="TaskList" component={TaskList} />
              <Stack.Screen name="SubTaskList" component={SubTaskList} />
              <Stack.Screen name="AddTask" component={AddTask} />
              <Stack.Screen name="TaskDetails" component={TaskDetails} />
            </Stack.Group>

            <Stack.Group>
              <Stack.Screen name="FollowUpTask" component={FollowUpTask} />
              <Stack.Screen
                name="FollowUpDetails"
                component={FollowUpDetails}
              />
              <Stack.Screen name="CompleteTask" component={CompleteTask} />
            </Stack.Group>
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
              <Stack.Screen
                name="BookingFormOnHold"
                component={BookingFormOnHold}
              />
              <Stack.Screen
                name="HoldBookingHistory"
                component={HoldBookingHistory}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="CS_Step_One" component={CS_SelectStructure} />
              <Stack.Screen name="CS_Step_Two" component={CS_SelectTower} />
              <Stack.Screen name="CS_Step_Three" component={CS_SelectFloor} />
              <Stack.Screen name="CS_Step_Four" component={CS_SelectUnit} />
              <Stack.Screen name="CS_Step_Five" component={CustomerSection} />
              <Stack.Screen name="CustomerList" component={CustomerList} />
              <Stack.Screen
                name="CustomerInnerDetails"
                component={CustomerInnerDetails}
              />
              <Stack.Screen
                name="EditCustomerDetails"
                component={EditCustomerDetails}
              />
              <Stack.Screen
                name="CustomerDetails"
                component={CustomerDetails}
              />
              <Stack.Screen name="AddCustomer" component={AddCustomer} />
              <Stack.Screen
                name="AddModifyRequest"
                component={AddModifyRequest}
              />
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
              <Stack.Screen
                name="PaymentSchedule"
                component={PaymentSchedule}
              />
              <Stack.Screen name="CustomerFiles" component={CustomerFiles} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="MaterialGRN" component={MaterialGRN} />
              <Stack.Screen
                name="DeliveryDetails"
                component={DeliveryDetails}
              />
              <Stack.Screen name="OrderDetail" component={OrderDetail} />
              <Stack.Screen name="MaterialList" component={MaterialList} />
              <Stack.Screen name="AddChallan" component={AddChallan} />
              <Stack.Screen name="PRList" component={PRListing} />
              <Stack.Screen
                name="MaterialIndent"
                component={MaterialIndentListing}
              />
              <Stack.Screen name="PIList" component={PIListing} />
              <Stack.Screen name="CreatePR" component={CreatePR} />
              <Stack.Screen name="CreatePI" component={CreatePI} />
              <Stack.Screen
                name="CreateIssueIndent"
                component={CreateIssueIndent}
              />
              <Stack.Screen
                name="CreateReturnIndent"
                component={CreateReturnIndent}
              />
              <Stack.Screen name="AddPIMaterial" component={CreatePIMaterial} />
              <Stack.Screen
                name="AddMaterialIndentList"
                component={AddMaterialIndentList}
              />
              <Stack.Screen
                name="AddReturnMaterialList"
                component={AddReturnMaterialList}
              />
              <Stack.Screen
                name="AddMaterialIndent"
                component={AddMaterialIndent}
              />
              <Stack.Screen
                name="AddReturnMaterial"
                component={AddReturnMaterialIndent}
              />
              <Stack.Screen name="PIRequest" component={PIRequest} />
              <Stack.Screen
                name="AddPIMaterialList"
                component={AddPIMaterialList}
              />
              <Stack.Screen
                name="Terms&Conditions"
                component={TermsAndConditions}
              />
              <Stack.Screen name="PRPreview" component={PRPreview} />
              <Stack.Screen
                name="IssueIndentPreview"
                component={IssueIndentPreview}
              />
              <Stack.Screen
                name="ReturnIndentPreview"
                component={ReturnIndentPreview}
              />
              <Stack.Screen name="PIPreview" component={PIPreview} />
              <Stack.Screen
                name="AddMaterialList"
                component={AddMaterialList}
              />
              <Stack.Screen name="AddAttachments" component={AddAttachments} />
              <Stack.Screen
                name="SelectMaterials"
                component={SelectMaterials}
              />
              {/* <Stack.Screen
                name="SelectMaterials"
                component={SelectMaterials}
              /> */}
              <Stack.Screen
                name="AddMaterialInfo"
                component={AddMaterialInfo}
              />
              <Stack.Screen name="AddVehicleInfo" component={AddVehicleInfo} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="Phases" component={Phases} />
              <Stack.Screen name="SubPhases" component={SubPhases} />
              <Stack.Screen
                name="SubPhaseActivity"
                component={SubPhaseActivity}
              />
              <Stack.Screen
                name="PlanningDetails"
                component={PlanningDetails}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="Worklist" component={Worklist} />
              <Stack.Screen name="WorkDetails" component={WorkDetails} />
              <Stack.Screen name="RecordsDetail" component={ProgressRecords} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="WorkMaster" component={WorkMaster} />
              <Stack.Screen
                name="SubWorkCategory"
                component={SubWorkCategory}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="BrokerList" component={BrokerList} />
              <Stack.Screen name="BrokerDetails" component={BrokerDetails} />
              <Stack.Screen name="AddBroker" component={AddBroker} />
              <Stack.Screen
                name="DealsClosedDetails"
                component={DealsClosedDetails}
              />
              <Stack.Screen
                name="AddBrokerPaymentDetails"
                component={AddBrokerPaymentDetails}
              />
              <Stack.Screen name="Remark" component={Remark} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="Files" component={Files} />
              <Stack.Screen name="FolderDetails" component={Files} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="Roles" component={Roles} />
              <Stack.Screen name="AddUser" component={AddUser} />
              <Stack.Screen name="AddRole" component={AddRole} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="RoughDrawingFolders"
                component={RoughDrawingFolders}
              />
              <Stack.Screen
                name="RoughDrawingFiles"
                component={RoughDrawingFiles}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="FinalDrawingFolders"
                component={FinalDrawingFolders}
              />
              <Stack.Screen
                name="FinalDrawingFiles"
                component={FinalDrawingFiles}
              />
            </Stack.Group>

            <Stack.Group>
              <Stack.Screen
                name="WorkingDrawingFolders"
                component={WorkingDrawingFolders}
              />
              <Stack.Screen
                name="WorkingDrawingFiles"
                component={WorkingDrawingFiles}
              />
              <Stack.Screen name="Parking" component={Parking} />
            </Stack.Group>

            <Stack.Group>
              <Stack.Screen name="AreaSheet" component={AreaSheet} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen
                name="DocumentGenerater"
                component={DocumentGenerater}
              />
              <Stack.Screen
                name="DocumentDownload"
                component={DocumentDownload}
              />
              {/* <Stack.Screen
name="CustomerSectionSettings"
component={CustomerSectionSettings}
/> */}
              <Stack.Screen
                name="ProjectSchedule"
                component={ProjectSchedule}
              />
              <Stack.Screen name="ProcessChart" component={ProcessChart} />
              <Stack.Screen name="Estimation" component={Estimation} />
              <Stack.Screen
                name="RequestForPrice"
                component={RequestForPrice}
              />
              <Stack.Screen name="PurchaseOrders" component={PurchaseOrders} />
            </Stack.Group>
          </Stack.Group>
          {/* DEVELOPER STACK END */}
          {/* CUSTOMER STACK START */}
          <Stack.Group>
            <Stack.Group>
              <Stack.Screen name="Ownership" component={CustomerHome} />
              <Stack.Screen name="BookingDetails" component={CustomerBooking} />
              <Stack.Screen name="LoanDetails" component={CustomerBankLoan} />
              <Stack.Screen
                name="CustomerAccount"
                component={CustomerAccount}
              />

              <Stack.Screen
                name="ModifyRequest"
                component={CustomerModifyRequest}
              />
            </Stack.Group>
          </Stack.Group>
          {/* CUSTOMER STACK START */}
        </Stack.Group>
      ) : (
        // Auth Nav Screens
        <Stack.Group>
          <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          {/* <Stack.Screen name="RoleSelect" component={RoleSelect} /> */}
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen
            name="ForgotPasswordOtp"
            component={ForgotPasswordOtp}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Group>
      )}
      {/* Project Creation screens */}
      <Stack.Screen name="ProjectCreationStepOne" component={PC_StepOne} />
      <Stack.Screen name="ProjectCreationStepTwo" component={PC_StepTwo} />
      <Stack.Screen name="ProjectStructureStepOne" component={PS_StepOne} />
      <Stack.Screen name="ProjectStructureStepTwo" component={PS_StepTwo} />
      <Stack.Screen name="PlanSelect" component={PlanSelect} />
      <Stack.Screen name="AdminCreation" component={SignUp} />
    </Stack.Navigator>
  );
}

const CustomDrawerContent = props => (
  <RouteContext.Consumer>
    {routeData => <DrawerContent {...props} routeData={routeData} />}
  </RouteContext.Consumer>
);

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
  const {authenticated} = useSelector(s => s.user);

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
        <Drawer.Navigator
          drawerContent={CustomDrawerContent}
          screenOptions={{headerShown: false}}>
          <Drawer.Screen name="root" component={AppStackNavigator} />
        </Drawer.Navigator>
      </RouteContext.Provider>
    </NavigationContainer>
  );
}

export default NavContainer;
