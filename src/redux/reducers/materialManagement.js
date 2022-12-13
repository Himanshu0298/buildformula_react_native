import {
  GET_MATERIAL_ORDER_LIST,
  GET_PR_MATERIAL_ORDER_LIST,
  GET_MATERIAL_LIST,
  GET_MATERIAL_PR_DETAILS,
  GET_VENDOR_OR_CONTRACTORS_DETAILS,
  GET_MATERIAL_CHALLAN_LIST,
  GET_MATERIAL_CHALLAN_DETAILS,
  ADD_MATERIAL_CHALLAN,
  ADD_MATERIAL_PR,
  CREATE_MATERIAL_PR,
  GET_WORK_SUBWORK_LIST,
  GET_SELECT_MATERIAL_CHALLAN,
  EDIT_PR,
  EDIT_MATERIAL_PR,
  DELETE_MATERIAL_PR_DETAILS,
  DELETE_MATERIAL_PR_ITEM,
  DELETE_MATERIAL_PR_CATEGORY,
  UPDATE_PR_STATUS,
  GET_DIRECT_GRN_LIST,
  GET_DIRECT_GRN_DETAILS,
  DELETE_MATERIAL_DIRECT_GRN,
  UPDATE_DIRECT_GRN_STATUS,
  ADD_DIRECT_GRN,
  GET_MATERIAL_GRN_DETAILS,
  ADD_DIRECT_GRN_SECOND,
  GET_MATERIAL_INDENT_LIST,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  materialOrderList: [],
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
  PRList: [],
  PRDetails: [],
  directGRNList: [],
  directGRNDetails: {},
  directGRNMaterialDetails: [],
  materialIndentList: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    // RESET data on project change

    case `${GET_MATERIAL_ORDER_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialOrderList: payload,
      };

    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        vendorOptions: payload,
      };

    case `${GET_WORK_SUBWORK_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        workOptions: payload,
      };

    case `${GET_MATERIAL_LIST}_FULFILLED`: {
      const {material_category_data, material_subCategory_data} =
        payload?.[0] || {};
      return {
        ...state,
        loading: false,
        materialCategory: material_category_data,
        materialSubCategory: material_subCategory_data,
      };
    }

    case `${GET_MATERIAL_CHALLAN_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialChallanList: payload,
      };

    case `${GET_MATERIAL_CHALLAN_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialChallanDetails: payload,
      };

    case `${GET_MATERIAL_PR_DETAILS}_FULFILLED`: {
      const {
        record_data,
        material_request_items = {},
        required_for_data,
      } = payload[0];

      return {
        ...state,
        loading: false,
        PRDetails: {
          details: record_data,
          materialItems: Object.values(material_request_items).flat(),
          requiredData: required_for_data,
        },
      };
    }

    case `${GET_PR_MATERIAL_ORDER_LIST}_FULFILLED`: {
      const PRList = payload;
      const sortedPR = PRList.sort().reverse();
      return {
        ...state,
        loading: false,
        PRList: sortedPR,
      };
    }

    case `${GET_SELECT_MATERIAL_CHALLAN}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selectedMaterialChallan: payload,
      };

    case `${GET_DIRECT_GRN_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        directGRNList: payload,
      };
    case `${GET_MATERIAL_GRN_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        directGRNMaterialDetails: payload,
      };

    case `${GET_DIRECT_GRN_DETAILS}_FULFILLED`: {
      const directGRNDetails = {
        ...payload,
        challanInfo: payload?.['Challan info']?.[0] || {},
      };

      delete directGRNDetails['Challan info'];

      return {
        ...state,
        loading: false,
        directGRNDetails,
      };
    }

    case `${GET_MATERIAL_INDENT_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        materialIndentList: payload,
      };

    case `${DELETE_MATERIAL_PR_CATEGORY}_PENDING`:
    case `${GET_DIRECT_GRN_LIST}_PENDING`:
    case `${DELETE_MATERIAL_DIRECT_GRN}_PENDING`:
    case `${DELETE_MATERIAL_PR_ITEM}_PENDING`:
    case `${DELETE_MATERIAL_PR_DETAILS}_PENDING`:
    case `${EDIT_MATERIAL_PR}_PENDING`:
    case `${EDIT_PR}_PENDING`:
    case `${CREATE_MATERIAL_PR}_PENDING`:
    case `${ADD_MATERIAL_PR}_PENDING`:
    case `${ADD_MATERIAL_CHALLAN}_PENDING`:
    case `${ADD_DIRECT_GRN}_PENDING`:
    case `${ADD_DIRECT_GRN_SECOND}_PENDING`:
    case `${GET_SELECT_MATERIAL_CHALLAN}_PENDING`:
    case `${GET_PR_MATERIAL_ORDER_LIST}_PENDING`:
    case `${GET_MATERIAL_PR_DETAILS}_PENDING`:
    case `${GET_MATERIAL_CHALLAN_DETAILS}_PENDING`:
    case `${GET_MATERIAL_CHALLAN_LIST}_PENDING`:
    case `${GET_MATERIAL_LIST}_PENDING`:
    case `${GET_WORK_SUBWORK_LIST}_PENDING`:
    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_PENDING`:
    case `${GET_MATERIAL_ORDER_LIST}_PENDING`:
    case `${GET_DIRECT_GRN_DETAILS}_PENDING`:
    case `${UPDATE_DIRECT_GRN_STATUS}_PENDING`:
    case `${GET_MATERIAL_GRN_DETAILS}_PENDING`:
    case `${GET_MATERIAL_INDENT_LIST}_PENDING`:
    case `${UPDATE_PR_STATUS}_PENDING`: {
      return {
        ...state,
        loading: true,
      };
    }

    case `${ADD_MATERIAL_CHALLAN}_FULFILLED`:
    case `${ADD_MATERIAL_PR}_FULFILLED`:
    case `${ADD_DIRECT_GRN}_FULFILLED`:
    case `${ADD_DIRECT_GRN_SECOND}_FULFILLED`:
    case `${CREATE_MATERIAL_PR}_FULFILLED`:
    case `${EDIT_PR}_FULFILLED`:
    case `${EDIT_MATERIAL_PR}_FULFILLED`:
    case `${DELETE_MATERIAL_PR_CATEGORY}_FULFILLED`:
    case `${DELETE_MATERIAL_DIRECT_GRN}_FULFILLED`:
    case `${DELETE_MATERIAL_PR_ITEM}_FULFILLED`:
    case `${DELETE_MATERIAL_PR_DETAILS}_FULFILLED`:
    case `${UPDATE_DIRECT_GRN_STATUS}_FULFILLED`:
    case `${UPDATE_PR_STATUS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
      };
    }
    case `${GET_MATERIAL_ORDER_LIST}_REJECTED`:
    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_REJECTED`:
    case `${GET_WORK_SUBWORK_LIST}_REJECTED`:
    case `${GET_MATERIAL_LIST}_REJECTED`:
    case `${ADD_DIRECT_GRN}_REJECTED`:
    case `${ADD_DIRECT_GRN_SECOND}_REJECTED`:
    case `${GET_PR_MATERIAL_ORDER_LIST}_REJECTED`:
    case `${GET_SELECT_MATERIAL_CHALLAN}_REJECTED`:
    case `${GET_MATERIAL_CHALLAN_LIST}_REJECTED`:
    case `${GET_MATERIAL_PR_DETAILS}_REJECTED`:
    case `${GET_MATERIAL_CHALLAN_DETAILS}_REJECTED`:
    case `${ADD_MATERIAL_CHALLAN}_REJECTED`:
    case `${ADD_MATERIAL_PR}_REJECTED`:
    case `${CREATE_MATERIAL_PR}_REJECTED`:
    case `${EDIT_PR}_REJECTED`:
    case `${EDIT_MATERIAL_PR}_REJECTED`:
    case `${DELETE_MATERIAL_PR_DETAILS}_REJECTED`:
    case `${DELETE_MATERIAL_PR_ITEM}_REJECTED`:
    case `${DELETE_MATERIAL_PR_CATEGORY}_REJECTED`:
    case `${DELETE_MATERIAL_DIRECT_GRN}_REJECTED`:
    case `${GET_DIRECT_GRN_LIST}_REJECTED`:
    case `${GET_DIRECT_GRN_DETAILS}_REJECTED`:
    case `${UPDATE_DIRECT_GRN_STATUS}_REJECTED`:
    case `${GET_MATERIAL_GRN_DETAILS}_REJECTED`:
    case `${GET_MATERIAL_INDENT_LIST}_REJECTED`:
    case `${UPDATE_PR_STATUS}_REJECTED`: {
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
