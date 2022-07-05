import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  GET_DASHBOARD_DATA,
  GET_PROJECTS,
  GET_PROJECT_COMMON_DATA,
  GET_PROJECT_PERMISSIONS,
  GET_PURCHASED_PROJECTS,
  GET_PURCHASE_PROJECT_DETAILS,
  GET_SELECTED_PROJECT,
  SET_SELECTED_UNIT,
} from '../actions/actionTypes';

const persistConfig = {
  key: 'project',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  loadingProject: false,
  loadingProjects: false,
  loadingPermissions: false,
  loadingDashboardData: false,
  loadingPurchaseData: false,
  loadingPurchaseDetails: false,
  loadingProjectCommonData: false,
  errorMessage: undefined,
  selectedProject: {},
  projects: [],
  commonData: {},
  visitors: [],
  unitOptions: [],
  isProjectAdmin: false,
  permissions: {},
  dashboardData: {},
  purchasedProjects: [],
  purchaseProjectDetails: [],
  selectedUnit: undefined,
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SELECTED_UNIT:
      return {
        ...state,
        selectedUnit: payload,
      };

    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...state,
        loadingProject: true,
      };
    case `${GET_SELECTED_PROJECT}_FULFILLED`: {
      return {
        ...state,
        selectedProject: payload,
        loadingProject: false,
      };
    }
    case `${GET_SELECTED_PROJECT}_REJECTED`:
      return {
        ...state,
        loadingProject: false,
        errorMessage: payload,
      };

    case `${GET_PROJECTS}_PENDING`:
      return {
        ...state,
        loadingProjects: true,
      };
    case `${GET_PROJECTS}_FULFILLED`:
      return {
        ...state,
        projects: payload,
        loadingProjects: false,
      };
    case `${GET_PROJECTS}_REJECTED`:
      return {
        ...state,
        loadingProjects: false,
        errorMessage: payload,
      };

    case `${GET_PROJECT_PERMISSIONS}_PENDING`:
      return {
        ...state,
        loadingPermissions: true,
      };
    case `${GET_PROJECT_PERMISSIONS}_FULFILLED`:
      return {
        ...state,
        isProjectAdmin: payload.isAdmin,
        permissions: payload.permissions,
        loadingPermissions: false,
      };
    case `${GET_PROJECT_PERMISSIONS}_REJECTED`:
      return {
        ...state,
        loadingPermissions: false,
        errorMessage: payload,
      };

    case `${GET_DASHBOARD_DATA}_PENDING`:
      return {
        ...state,
        loadingDashboardData: true,
      };
    case `${GET_DASHBOARD_DATA}_FULFILLED`:
      return {
        ...state,
        dashboardData: payload,
        loadingDashboardData: false,
      };
    case `${GET_DASHBOARD_DATA}_REJECTED`:
      return {
        ...state,
        loadingDashboardData: false,
        errorMessage: payload,
      };

    case `${GET_PURCHASED_PROJECTS}_PENDING`:
      return {
        ...state,
        loadingPurchaseData: true,
      };
    case `${GET_PURCHASED_PROJECTS}_FULFILLED`:
      return {
        ...state,
        purchasedProjects: payload,
        loadingPurchaseData: false,
      };
    case `${GET_PURCHASED_PROJECTS}_REJECTED`:
      return {
        ...state,
        loadingPurchaseData: false,
        errorMessage: payload,
      };

    case `${GET_PURCHASE_PROJECT_DETAILS}_PENDING`:
      return {
        ...state,
        loadingPurchaseDetails: true,
      };
    case `${GET_PURCHASE_PROJECT_DETAILS}_FULFILLED`:
      return {
        ...state,
        purchaseProjectDetails: payload,
        loadingPurchaseDetails: false,
      };
    case `${GET_PURCHASE_PROJECT_DETAILS}_REJECTED`:
      return {
        ...state,
        loadingPurchaseDetails: false,
        errorMessage: payload,
      };

    case `${GET_PROJECT_COMMON_DATA}_PENDING`:
      return {
        ...state,
        loadingProjectCommonData: true,
      };
    case `${GET_PROJECT_COMMON_DATA}_FULFILLED`: {
      const {visitors_lists, units} = payload;
      return {
        ...state,
        loadingProjectCommonData: false,
        commonData: payload,
        visitors: visitors_lists,
        unitOptions: units.map(i => ({label: i.title, value: i.id})),
      };
    }
    case `${GET_PROJECT_COMMON_DATA}_REJECTED`:
      return {
        ...state,
        loadingProjectCommonData: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
