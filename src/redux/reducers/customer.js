import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {
  ADD_CUSTOMER,
  GET_CUSTOMER_DATA,
  GET_BOOKING_DATA,
  GET_BANK_DETAILS,
  UPDATE_BANK_DETAILS,
  UPDATE_BANK_FILES,
} from './../actions/actionTypes';

const persistConfig = {
  key: 'customer',
  storage: AsyncStorage,
  blacklist: ['loading', 'errorMessage'],
};

const initialState = {
  loading: false,
  errorMessage: undefined,
  customerData: [],
  bookingDetails: {},
  bookingAreaUnitType: {},
  bookingBanks: {},
  bookingPaymentTypes: {},
  bankDetails: {},
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case `${GET_CUSTOMER_DATA}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CUSTOMER_DATA}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        customerData: payload,
      };
    }
    case `${GET_CUSTOMER_DATA}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_BOOKING_DATA}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_BOOKING_DATA}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        bookingDetails: payload.formData,
        bookingAreaUnitType: payload.unit_type,
        bookingBanks: payload.banks,
        bookingPaymentTypes: payload.payment_type,
      };
    }
    case `${GET_BOOKING_DATA}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_BANK_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_BANK_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        bankDetails: payload,
      };
    }
    case `${GET_BANK_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${UPDATE_BANK_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_BANK_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        bankDetails: {
          ...state.bankDetails,
          details: payload,
        },
      };
    }
    case `${UPDATE_BANK_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${ADD_CUSTOMER}_PENDING`:
    case `${UPDATE_BANK_FILES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${ADD_CUSTOMER}_FULFILLED`:
    case `${UPDATE_BANK_FILES}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    case `${ADD_CUSTOMER}_REJECTED`:
    case `${UPDATE_BANK_FILES}_REJECTED`:
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
