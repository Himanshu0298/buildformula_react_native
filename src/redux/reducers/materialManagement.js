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
      const {material_category_data, material_subCategory_data} =
        payload?.[0] || {};
      return {
        ...state,
        loading: false,
        materialCategory: material_category_data,
        materialSubCategory: material_subCategory_data,
      };
    }
    case `${GET_MATERIAL_LIST}_REJECTED`:
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
    // PR Details
    case `${GET_MATERIAL_CHALLAN_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_MATERIAL_PR_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
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

    case `${GET_MATERIAL_PR_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    // PR List
    case `${GET_PR_MATERIAL_ORDER_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PR_MATERIAL_ORDER_LIST}_FULFILLED`: {
      const PRList = payload;
      const sortedPR = PRList.sort().reverse();
      return {
        ...state,
        loading: false,
        PRList: sortedPR,
      };
    }

    case `${GET_PR_MATERIAL_ORDER_LIST}_REJECTED`:
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
    case `${EDIT_PR}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${EDIT_PR}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${EDIT_PR}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${EDIT_MATERIAL_PR}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${EDIT_MATERIAL_PR}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${EDIT_MATERIAL_PR}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${DELETE_MATERIAL_PR_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${DELETE_MATERIAL_PR_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${DELETE_MATERIAL_PR_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${DELETE_MATERIAL_PR_ITEM}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${DELETE_MATERIAL_PR_ITEM}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${DELETE_MATERIAL_PR_ITEM}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${DELETE_MATERIAL_PR_CATEGORY}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${DELETE_MATERIAL_PR_CATEGORY}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${DELETE_MATERIAL_PR_CATEGORY}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${UPDATE_PR_STATUS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${UPDATE_PR_STATUS}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };
    case `${UPDATE_PR_STATUS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
