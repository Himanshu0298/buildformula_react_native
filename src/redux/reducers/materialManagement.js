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
  ADD_DIRECT_GRN_MATERIAL_INFO,
  GET_MATERIAL_INDENT_LIST,
  GET_STORE_KEEPER_LIST,
  GET_STORE_KEEPER_DETAILS,
  CREATE_STOREKEEPER_ORDER,
  GET_WORK_SUB_WORK_LIST,
  UPDATE_STORE_KEEPER_STATUS,
  ADD_DIRECT_GRN_VEHICLE_INFO,
  DELETE_CHALLAN,
  ADD_ISSUE_REQUEST,
  ADD_RETURN_REQUEST,
  ADD_MATERIAL_ISSUE_REQUEST,
  ADD_ATTACHMENT,
  DELETE_ISSUE,
  GET_SUPPLIERS_LIST,
  ADD_SUPPLIER,
  UPDATE_PR,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  materialOrderList: [],
  materialChallanList: [],
  vendorOptions: [],
  suppliersList: [],
  workOptions: [],
  materialChallanDetails: {},
  materialPRDetails: {},
  selectedMaterialChallan: [],
  data: [],
  materialCategories: [],
  materialSubCategories: [],
  makeOfLists: [],
  materialRequestItems: [],
  recordData: [],
  PRList: [],
  PRDetails: {},
  directGRNList: [],
  directGRNDetails: {},
  directGRNMaterialDetails: [],
  materialIndentList: [],
  storeKeeperList: {},
  storeKeeperDetails: {},
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    // RESET data on project change

    case `${GET_MATERIAL_ORDER_LIST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        materialOrderList: payload.sort(
          (a, b) => b.material_order_no - a.material_order_no,
        ),
      };
    }

    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        vendorOptions: payload,
      };
    case `${GET_SUPPLIERS_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        suppliersList: payload,
      };

    case `${GET_WORK_SUB_WORK_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        workOptions: payload,
      };

    case `${GET_MATERIAL_LIST}_FULFILLED`: {
      const {material_category_data, material_subCategory_data, list_of_make} =
        payload?.[0] || {};
      return {
        ...state,
        loading: false,
        materialCategories: material_category_data,
        materialSubCategories: material_subCategory_data,
        makeOfLists: list_of_make,
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
      return {
        ...state,
        loading: false,
        PRList: payload.sort((a, b) => b.id - a.id),
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
    case `${GET_STORE_KEEPER_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        storeKeeperList: payload.storekeeperlist?.sort((a, b) => b.id - a.id),
      };

    case `${GET_STORE_KEEPER_DETAILS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        storeKeeperDetails: payload,
      };

    case `${DELETE_MATERIAL_PR_CATEGORY}_PENDING`:
    case `${GET_DIRECT_GRN_LIST}_PENDING`:
    case `${GET_SUPPLIERS_LIST}_PENDING`:
    case `${DELETE_MATERIAL_DIRECT_GRN}_PENDING`:
    case `${DELETE_MATERIAL_PR_ITEM}_PENDING`:
    case `${DELETE_MATERIAL_PR_DETAILS}_PENDING`:
    case `${EDIT_MATERIAL_PR}_PENDING`:
    case `${EDIT_PR}_PENDING`:
    case `${UPDATE_PR}_PENDING`:
    case `${ADD_SUPPLIER}_PENDING`:
    case `${ADD_RETURN_REQUEST}_PENDING`:
    case `${DELETE_CHALLAN}_PENDING`:
    case `${ADD_ISSUE_REQUEST}_PENDING`:
    case `${ADD_ATTACHMENT}_PENDING`:
    case `${DELETE_ISSUE}_PENDING`:
    case `${CREATE_MATERIAL_PR}_PENDING`:
    case `${ADD_MATERIAL_PR}_PENDING`:
    case `${ADD_MATERIAL_CHALLAN}_PENDING`:
    case `${ADD_DIRECT_GRN}_PENDING`:
    case `${ADD_DIRECT_GRN_MATERIAL_INFO}_PENDING`:
    case `${ADD_DIRECT_GRN_VEHICLE_INFO}_PENDING`:
    case `${GET_SELECT_MATERIAL_CHALLAN}_PENDING`:
    case `${GET_PR_MATERIAL_ORDER_LIST}_PENDING`:
    case `${ADD_MATERIAL_ISSUE_REQUEST}_PENDING`:
    case `${GET_MATERIAL_PR_DETAILS}_PENDING`:
    case `${GET_MATERIAL_CHALLAN_DETAILS}_PENDING`:
    case `${GET_MATERIAL_CHALLAN_LIST}_PENDING`:
    case `${GET_MATERIAL_LIST}_PENDING`:
    case `${GET_WORK_SUB_WORK_LIST}_PENDING`:
    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_PENDING`:
    case `${GET_MATERIAL_ORDER_LIST}_PENDING`:
    case `${GET_DIRECT_GRN_DETAILS}_PENDING`:
    case `${UPDATE_DIRECT_GRN_STATUS}_PENDING`:
    case `${GET_MATERIAL_GRN_DETAILS}_PENDING`:
    case `${GET_MATERIAL_INDENT_LIST}_PENDING`:
    case `${GET_STORE_KEEPER_LIST}_PENDING`:
    case `${GET_STORE_KEEPER_DETAILS}_PENDING`:
    case `${CREATE_STOREKEEPER_ORDER}_PENDING`:
    case `${UPDATE_STORE_KEEPER_STATUS}_PENDING`:
    case `${UPDATE_PR_STATUS}_PENDING`: {
      return {
        ...state,
        loading: true,
      };
    }

    case `${ADD_MATERIAL_CHALLAN}_FULFILLED`:
    case `${ADD_MATERIAL_PR}_FULFILLED`:
    case `${ADD_DIRECT_GRN}_FULFILLED`:
    case `${ADD_DIRECT_GRN_MATERIAL_INFO}_FULFILLED`:
    case `${ADD_DIRECT_GRN_VEHICLE_INFO}_FULFILLED`:
    case `${ADD_MATERIAL_ISSUE_REQUEST}_FULFILLED`:
    case `${CREATE_MATERIAL_PR}_FULFILLED`:
    case `${EDIT_PR}_FULFILLED`:
    case `${UPDATE_PR}_FULFILLED`:
    case `${ADD_SUPPLIER}_FULFILLED`:
    case `${ADD_RETURN_REQUEST}_FULFILLED`:
    case `${ADD_ISSUE_REQUEST}_FULFILLED`:
    case `${DELETE_ISSUE}_FULFILLED`:
    case `${DELETE_CHALLAN}_FULFILLED`:
    case `${ADD_ATTACHMENT}_FULFILLED`:
    case `${EDIT_MATERIAL_PR}_FULFILLED`:
    case `${DELETE_MATERIAL_PR_CATEGORY}_FULFILLED`:
    case `${DELETE_MATERIAL_DIRECT_GRN}_FULFILLED`:
    case `${DELETE_MATERIAL_PR_ITEM}_FULFILLED`:
    case `${DELETE_MATERIAL_PR_DETAILS}_FULFILLED`:
    case `${UPDATE_DIRECT_GRN_STATUS}_FULFILLED`:
    case `${CREATE_STOREKEEPER_ORDER}_FULFILLED`:
    case `${UPDATE_STORE_KEEPER_STATUS}_FULFILLED`:
    case `${UPDATE_PR_STATUS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
      };
    }
    case `${GET_MATERIAL_ORDER_LIST}_REJECTED`:
    case `${GET_SUPPLIERS_LIST}_REJECTED`:
    case `${GET_VENDOR_OR_CONTRACTORS_DETAILS}_REJECTED`:
    case `${DELETE_CHALLAN}_REJECTED`:
    case `${GET_WORK_SUB_WORK_LIST}_REJECTED`:
    case `${GET_MATERIAL_LIST}_REJECTED`:
    case `${ADD_DIRECT_GRN}_REJECTED`:
    case `${ADD_DIRECT_GRN_MATERIAL_INFO}_REJECTED`:
    case `${ADD_MATERIAL_ISSUE_REQUEST}_REJECTED`:
    case `${ADD_DIRECT_GRN_VEHICLE_INFO}_REJECTED`:
    case `${GET_PR_MATERIAL_ORDER_LIST}_REJECTED`:
    case `${GET_SELECT_MATERIAL_CHALLAN}_REJECTED`:
    case `${GET_MATERIAL_CHALLAN_LIST}_REJECTED`:
    case `${GET_MATERIAL_PR_DETAILS}_REJECTED`:
    case `${GET_MATERIAL_CHALLAN_DETAILS}_REJECTED`:
    case `${ADD_RETURN_REQUEST}_REJECTED`:
    case `${ADD_MATERIAL_CHALLAN}_REJECTED`:
    case `${ADD_MATERIAL_PR}_REJECTED`:
    case `${CREATE_MATERIAL_PR}_REJECTED`:
    case `${EDIT_PR}_REJECTED`:
    case `${UPDATE_PR}_REJECTED`:
    case `${ADD_SUPPLIER}_REJECTED`:
    case `${ADD_ISSUE_REQUEST}_REJECTED`:
    case `${ADD_ATTACHMENT}_REJECTED`:
    case `${DELETE_ISSUE}_REJECTED`:
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
    case `${GET_STORE_KEEPER_LIST}_REJECTED`:
    case `${GET_STORE_KEEPER_DETAILS}_REJECTED`:
    case `${CREATE_STOREKEEPER_ORDER}_REJECTED`:
    case `${UPDATE_STORE_KEEPER_STATUS}_REJECTED`:
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
