import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {
  ADD_CUSTOMER,
  CUSTOMER_CREATE_FOLDER,
  GET_CUSTOMER_DATA,
  GET_BOOKING_DATA,
  GET_BANK_DETAILS,
  GET_FILE,
  GET_FOLDER,
  UPDATE_BANK_DETAILS,
  UPDATE_BANK_FILES,
  GET_MODIFY_REQUESTS,
  ADD_MODIFY_REQUEST,
  GET_SELECTED_PROJECT,
  GET_ACCOUNT_DETAILS,
  UPDATE_BOOKING_STATUS,
  ADD_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
  GET_MODIFY_REQUEST,
  UPDATE_MODIFY_REQUEST,
  ADD_MODIFY_REQUEST_COMMENT,
} from '../actions/actionTypes';

const persistConfig = {
  key: 'customer',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  loading: false,
  loadingCustomerData: false,
  loadingBankDetails: false,
  loadingBookingData: false,
  loadingModifyRequests: false,
  loadingModifyRequest: false,
  LoadingAccountDetails: false,
  loadingFile: false,
  loadingFolder: false,
  errorMessage: undefined,
  customerData: [],
  bookingDetails: {},
  bookingAreaUnitType: {},
  bookingBanks: {},
  bookingPaymentTypes: {},
  bankDetails: {},
  modifyRequests: [],
  modifyRequest: {},
  accountDetails: {},
  file: {},
  folder: {},
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    // RESET data on project change
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };

    case `${GET_CUSTOMER_DATA}_PENDING`:
      return {
        ...state,
        loadingCustomerData: true,
      };
    case `${GET_CUSTOMER_DATA}_FULFILLED`: {
      return {
        ...state,
        loadingCustomerData: false,
        customerData: payload,
      };
    }
    case `${GET_CUSTOMER_DATA}_REJECTED`:
      return {
        ...state,
        loadingCustomerData: false,
        errorMessage: action.payload,
      };

    case `${GET_BOOKING_DATA}_PENDING`:
      return {
        ...state,
        loadingBookingData: true,
      };
    case `${GET_BOOKING_DATA}_FULFILLED`: {
      return {
        ...state,
        loadingBookingData: false,
        bookingDetails: payload.formData,
        bookingAreaUnitType: payload.unit_type,
        bookingBanks: payload.banks,
        bookingPaymentTypes: payload.payment_type,
      };
    }
    case `${GET_BOOKING_DATA}_REJECTED`:
      return {
        ...state,
        loadingBookingData: false,
        errorMessage: action.payload,
      };

    case `${GET_BANK_DETAILS}_PENDING`:
      return {
        ...state,
        loadingBankDetails: true,
      };
    case `${GET_BANK_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loadingBankDetails: false,
        bankDetails: payload,
      };
    }
    case `${GET_BANK_DETAILS}_REJECTED`:
      return {
        ...state,
        loadingBankDetails: false,
        errorMessage: action.payload,
      };

    case `${GET_MODIFY_REQUESTS}_PENDING`:
      return {
        ...state,
        loadingModifyRequests: true,
      };
    case `${GET_MODIFY_REQUESTS}_FULFILLED`: {
      return {
        ...state,
        loadingModifyRequests: false,
        modifyRequests: payload.lists,
      };
    }
    case `${GET_MODIFY_REQUESTS}_REJECTED`:
      return {
        ...state,
        loadingModifyRequests: false,
        errorMessage: action.payload,
      };

    case `${GET_MODIFY_REQUEST}_PENDING`:
      return {
        ...state,
        loadingModifyRequest: true,
      };
    case `${GET_MODIFY_REQUEST}_FULFILLED`: {
      return {
        ...state,
        loadingModifyRequest: false,
        modifyRequest: payload,
      };
    }
    case `${GET_MODIFY_REQUEST}_REJECTED`:
      return {
        ...state,
        loadingModifyRequest: false,
        errorMessage: action.payload,
      };

    case `${GET_ACCOUNT_DETAILS}_PENDING`:
      return {
        ...state,
        LoadingAccountDetails: true,
      };
    case `${GET_ACCOUNT_DETAILS}_FULFILLED`: {
      return {
        ...state,
        LoadingAccountDetails: false,
        accountDetails: payload,
      };
    }
    case `${GET_ACCOUNT_DETAILS}_REJECTED`:
      return {
        ...state,
        LoadingAccountDetails: false,
        errorMessage: action.payload,
      };
    case `${GET_FILE}_PENDING`:
      return {
        ...state,
        loadingFile: true,
      };
    case `${GET_FILE}_FULFILLED`: {
      return {
        ...state,
        loadingFile: false,
        accountDetails: payload,
      };
    }
    case `${GET_FILE}_REJECTED`:
      return {
        ...state,
        loadingFile: false,
        errorMessage: action.payload,
      };
    case `${GET_FOLDER}_PENDING`:
      return {
        ...state,
        loadingFolder: true,
      };
    case `${GET_FOLDER}_FULFILLED`: {
      return {
        ...state,
        loadingFolder: false,
        accountDetails: payload,
      };
    }
    case `${GET_FOLDER}_REJECTED`:
      return {
        ...state,
        loadingFolder: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_BANK_DETAILS}_PENDING`:
      return {
        ...state,
        loadingBankDetails: true,
      };
    case `${UPDATE_BANK_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loadingBankDetails: false,
        bankDetails: {
          ...state.bankDetails,
          details: payload,
        },
      };
    }
    case `${UPDATE_BANK_DETAILS}_REJECTED`:
      return {
        ...state,
        loadingBankDetails: false,
        errorMessage: action.payload,
      };

    case `${ADD_CUSTOMER}_PENDING`:
    case `${UPDATE_BANK_FILES}_PENDING`:
    case `${ADD_MODIFY_REQUEST}_PENDING`:
    case `${ADD_MODIFY_REQUEST_COMMENT}_PENDING`:
    case `${UPDATE_BOOKING_STATUS}_PENDING`:
    case `${ADD_COLLECTION}_PENDING`:
    case `${UPDATE_COLLECTION}_PENDING`:
    case `${DELETE_COLLECTION}_PENDING`:
    case `${UPDATE_MODIFY_REQUEST}_PENDING`:
    case `${CUSTOMER_CREATE_FOLDER}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${ADD_CUSTOMER}_FULFILLED`:
    case `${UPDATE_BANK_FILES}_FULFILLED`:
    case `${ADD_MODIFY_REQUEST}_FULFILLED`:
    case `${ADD_MODIFY_REQUEST_COMMENT}_FULFILLED`:
    case `${UPDATE_BOOKING_STATUS}_FULFILLED`:
    case `${ADD_COLLECTION}_FULFILLED`:
    case `${UPDATE_COLLECTION}_FULFILLED`:
    case `${DELETE_COLLECTION}_FULFILLED`:
    case `${UPDATE_MODIFY_REQUEST}_FULFILLED`:
    case `${CUSTOMER_CREATE_FOLDER}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    case `${ADD_CUSTOMER}_REJECTED`:
    case `${UPDATE_BANK_FILES}_REJECTED`:
    case `${ADD_MODIFY_REQUEST}_REJECTED`:
    case `${ADD_MODIFY_REQUEST_COMMENT}_REJECTED`:
    case `${UPDATE_BOOKING_STATUS}_REJECTED`:
    case `${ADD_COLLECTION}_REJECTED`:
    case `${UPDATE_COLLECTION}_REJECTED`:
    case `${DELETE_COLLECTION}_REJECTED`:
    case `${UPDATE_MODIFY_REQUEST}_REJECTED`:
    case `${CUSTOMER_CREATE_FOLDER}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
