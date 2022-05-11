import {
  GET_MATERIAL_ORDER_LIST,
  GET_MATERIAL_CHALLAN_LIST,
  GET_MATERIAL_CHALLAN_DETAILS,
  ADD_MATERIAL_CHALLAN,
  GET_SELECT_MATERIAL_CHALLAN,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  materialOrderList: [],
  materialChallanList: [],
  materialChallanDetails: {},
  selectedMaterialChallan: {},
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
        loading: true,
      };
    case `${GET_MATERIAL_ORDER_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialOrderList: payload,
      };
    case `${GET_MATERIAL_ORDER_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_MATERIAL_CHALLAN_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_MATERIAL_CHALLAN_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialChallanList: payload,
      };
    case `${GET_MATERIAL_CHALLAN_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_MATERIAL_CHALLAN_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_MATERIAL_CHALLAN_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialChallanDetails: payload,
      };
    case `${GET_MATERIAL_CHALLAN_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${GET_SELECT_MATERIAL_CHALLAN}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_SELECT_MATERIAL_CHALLAN}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selectedMaterialChallan: payload,
      };
    case `${GET_SELECT_MATERIAL_CHALLAN}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${ADD_MATERIAL_CHALLAN}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${ADD_MATERIAL_CHALLAN}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${ADD_MATERIAL_CHALLAN}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
