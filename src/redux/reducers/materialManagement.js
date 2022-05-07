import {
  GET_MATERIAL_ORDER_LIST,
  GET_MATERIAL_CHALLAN_LIST,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  refreshing: false,
  errorMessage: undefined,
  materialOrderList: [],
  materialChallanList: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    // RESET data on project change
    // case `${GET_SELECTED_PROJECT}_PENDING`:
    //   return {
    //     ...initialState,
    //   };
    case `${GET_MATERIAL_ORDER_LIST}_PENDING`:
      return {
        ...state,
        refreshing: true,
      };
    case `${GET_MATERIAL_ORDER_LIST}_FULFILLED`:
      return {
        ...state,
        refreshing: false,
        materialOrderList: payload,
      };
    case `${GET_MATERIAL_ORDER_LIST}_REJECTED`:
      return {
        ...state,
        refreshing: false,
      };

    case `${GET_MATERIAL_CHALLAN_LIST}_PENDING`:
      return {
        ...state,
        refreshing: true,
      };
    case `${GET_MATERIAL_CHALLAN_LIST}_FULFILLED`:
      return {
        ...state,
        refreshing: false,
        materialChallanList: payload,
      };
    case `${GET_MATERIAL_CHALLAN_LIST}_REJECTED`:
      return {
        ...state,
        refreshing: false,
      };

    default:
      return state;
  }
};

export default reducer;
