import _ from 'lodash';
import {
  SET_INITIAL_STATE,
  GET_VISITORS,
  GET_FOLLOWUP_LIST,
  GET_SALES_DATA,
  ADD_VISITOR,
  GET_SELECTED_PROJECT,
  ADD_FOLLOW_UP,
  GET_PIPELINES,
  DELETE_PIPELINE,
  ADD_PIPELINE,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  errorMessage: undefined,
  visitors: [],
  followups: [],
  todayFollowups: [],
  bhkOptions: {},
  occupationOptions: [],
  inquiryOptions: [],
  assignOptions: [],
  visitorAnalytics: {},
  visitorSuggestions: [],
  pipelines: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      //TODO:update loading only if true
      return {
        ...state,
        loading: false,
      };

    //RESET sales data on project change
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };

    case `${GET_SALES_DATA}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_SALES_DATA}_FULFILLED`: {
      const {
        occupations,
        project_bhk,
        inquiry_for,
        visitors_autosuggestions,
        assign_to,
        total_visitors,
        yearly_visitor,
        month_visitor,
        weekly_visitor,
      } = action.payload;

      return {
        ...state,
        loading: false,
        occupationOptions: occupations,
        inquiryOptions: inquiry_for,
        bhkOptions: project_bhk,
        visitorSuggestions: visitors_autosuggestions,
        assignOptions: assign_to,
        visitorAnalytics: {
          totalVisitors: total_visitors,
          weeklyVisitors: weekly_visitor,
          monthlyVisitors: month_visitor,
          yearlyVisitors: yearly_visitor,
        },
      };
    }
    case `${GET_SALES_DATA}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_VISITORS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_VISITORS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        visitors: action.payload,
      };
    case `${GET_VISITORS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_FOLLOWUP_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_FOLLOWUP_LIST}_FULFILLED`: {
      const {followups, todayFollowups} = action.payload;
      return {
        ...state,
        loading: false,
        followups: followups,
        todayFollowups: todayFollowups,
      };
    }
    case `${GET_FOLLOWUP_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_PIPELINES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PIPELINES}_FULFILLED`: {
      const {pipelines} = action.payload;
      return {
        ...state,
        loading: false,
        pipelines,
      };
    }
    case `${GET_PIPELINES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${DELETE_PIPELINE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${DELETE_PIPELINE}_FULFILLED`: {
      const pipelines = _.cloneDeep(state.pipelines);
      const index = pipelines.findIndex(
        (pipeline) => pipeline.id === action.payload,
      );

      if (index > -1) {
        pipelines.splice(index, 1);
      }

      return {
        ...state,
        loading: false,
        pipelines,
      };
    }
    case `${DELETE_PIPELINE}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${ADD_VISITOR}_PENDING`:
    case `${ADD_FOLLOW_UP}_PENDING`:
    case `${ADD_PIPELINE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${ADD_VISITOR}_FULFILLED`:
    case `${ADD_FOLLOW_UP}_FULFILLED`:
    case `${ADD_PIPELINE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
      };
    }
    case `${ADD_VISITOR}_REJECTED`:
    case `${ADD_FOLLOW_UP}_REJECTED`:
    case `${ADD_PIPELINE}_REJECTED`: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
};
