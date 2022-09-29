import {
  GET_MATERIAL_ORDER_LIST,
  GET_PR_MATERIAL_ORDER_LIST,
  GET_MATERIAL_LIST,
  GET_PR_MATERIAL_DETAILS,
  GET_VENDOR_OR_CONTRACTORS_DETAILS,
  GET_MATERIAL_CHALLAN_LIST,
  GET_MATERIAL_CHALLAN_DETAILS,
  ADD_MATERIAL_CHALLAN,
  ADD_MATERIAL_PR,
  CREATE_MATERIAL_PR,
  GET_WORK_SUBWORK_LIST,
  GET_SELECT_MATERIAL_CHALLAN,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  materialOrderList: [],
  materialPROrderList: [],
  materialChallanList: [],
  vendorOptions: [],
  workOptions: [],
  materialChallanDetails: {},
  materialPRDetails: {},
  selectedMaterialChallan: [],
  data: [],
  materialCategory: [],
  materialSubCategory: [],
  materialRequestItems: [],
  recordData: [],
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
    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        vendorOptions: payload,
      };
    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${GET_WORK_SUBWORK_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_WORK_SUBWORK_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        workOptions: payload,
      };
    case `${GET_WORK_SUBWORK_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${GET_MATERIAL_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_MATERIAL_LIST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        materialCategory: payload[0].material_category_data,
        materialSubCategory: payload[0].material_subCategory_data,
      };
    }
    case `${GET_MATERIAL_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_PR_MATERIAL_ORDER_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PR_MATERIAL_ORDER_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialPROrderList: payload,
      };
    case `${GET_PR_MATERIAL_ORDER_LIST}_REJECTED`:
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

    case `${GET_PR_MATERIAL_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PR_MATERIAL_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialRequestItems: payload[0].material_request_items,
        recordData: payload[0].record_data,
      };
    case `${GET_PR_MATERIAL_DETAILS}_REJECTED`:
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
    case `${ADD_MATERIAL_PR}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${ADD_MATERIAL_PR}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${ADD_MATERIAL_PR}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${CREATE_MATERIAL_PR}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${CREATE_MATERIAL_PR}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${CREATE_MATERIAL_PR}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
