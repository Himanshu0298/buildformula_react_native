import _ from 'lodash';
import {
  GET_VISITORS,
  GET_FOLLOWUP_LIST,
  GET_SALES_DATA,
  ADD_VISITOR,
  GET_SELECTED_PROJECT,
  ADD_FOLLOW_UP,
  GET_PIPELINES,
  DELETE_PIPELINE,
  ADD_PIPELINE,
  MOVE_VISITOR,
  GET_BOOKINGS_STATUS,
  CREATE_BOOKING,
  GET_BANK_LIST,
  SET_TIMER,
  GET_VISITOR,
} from './../actions/actionTypes';

const initialState = {
  loading: false,
  loadingUnitStatus: false,
  errorMessage: undefined,
  timerData: {
    showTimer: false,
  },
  visitors: [],
  followups: [],
  todayFollowups: [],
  bhkOptions: {},
  occupationOptions: [],
  sourceTypeOptions: [],
  inquiryOptions: [],
  assignOptions: [],
  visitorAnalytics: {},
  visitorSuggestions: [],
  pipelines: [],
  unitBookingStatus: [],
  bankList: [],
  visitor: {},
  visitorFollowUp: {},
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    //RESET sales data on project change
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {
        ...initialState,
      };

    case `${SET_TIMER}`:
      return {
        ...state,
        timerData: {
          showTimer: !state?.timerData?.showTimer,
          ...payload,
        },
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
        source_types,
      } = payload;

      return {
        ...state,
        loading: false,
        occupationOptions: occupations,
        sourceTypeOptions: source_types,
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
        errorMessage: payload,
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
        visitors: payload,
      };
    case `${GET_VISITORS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_VISITOR}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_VISITOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        visitor: payload.visitors,
        visitorFollowUp: payload.followup_lists,
      };
    case `${GET_VISITOR}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_FOLLOWUP_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_FOLLOWUP_LIST}_FULFILLED`: {
      const {followups, todayFollowups} = payload;
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
        errorMessage: payload,
      };

    case `${GET_PIPELINES}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_PIPELINES}_FULFILLED`: {
      const {pipelines, visitorSuggestions} = payload;
      return {
        ...state,
        loading: false,
        pipelines,
        visitorSuggestions,
      };
    }
    case `${GET_PIPELINES}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_BOOKINGS_STATUS}_PENDING`:
      return {
        ...state,
        loadingUnitStatus: true,
      };
    case `${GET_BOOKINGS_STATUS}_FULFILLED`: {
      return {
        ...state,
        loadingUnitStatus: false,
        unitBookingStatus: payload,
      };
    }
    case `${GET_BOOKINGS_STATUS}_REJECTED`:
      return {
        ...state,
        loadingUnitStatus: false,
        errorMessage: payload,
      };

    case `${GET_BANK_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_BANK_LIST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        bankList: payload.map(({id, title}) => ({
          label: title,
          value: id,
        })),
      };
    }
    case `${GET_BANK_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${DELETE_PIPELINE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${DELETE_PIPELINE}_FULFILLED`: {
      const pipelines = _.cloneDeep(state.pipelines);
      const index = pipelines.findIndex(pipeline => pipeline.id === payload);

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
        errorMessage: payload,
      };

    case `${MOVE_VISITOR}_FULFILLED`: {
      const {visitorId, pipelineId} = payload;
      let pipelines = _.cloneDeep(state.pipelines);

      let movedVisitor = {};
      let newPipelineIndex = -1;

      //Find old pipeline and remove visitor from the list
      pipelines = pipelines.map((pipeline, i) => {
        const {get_visitors} = _.cloneDeep(pipeline);

        if (pipeline.id === pipelineId) {
          newPipelineIndex = i;
        }

        const visitorIndex = get_visitors.findIndex(
          visitor => visitor.id === visitorId,
        );
        if (visitorIndex > -1) {
          movedVisitor = get_visitors[visitorIndex];
          get_visitors.splice(visitorIndex, 1);
          pipeline.get_visitors = get_visitors;
        }
        return pipeline;
      });

      //Add visitor to the new list
      if (newPipelineIndex > -1 && movedVisitor.id) {
        pipelines[newPipelineIndex].get_visitors.push(movedVisitor);
      }

      return {
        ...state,
        pipelines,
      };
    }

    case `${MOVE_VISITOR}_REJECTED`: {
      return {
        ...state,
        errorMessage: payload,
        pipelines: _.cloneDeep(state.pipelines),
      };
    }

    case `${ADD_VISITOR}_PENDING`:
    case `${ADD_FOLLOW_UP}_PENDING`:
    case `${CREATE_BOOKING}_PENDING`:
    case `${ADD_PIPELINE}_PENDING`: {
      return {
        ...state,
        loading: true,
      };
    }
    case `${ADD_VISITOR}_FULFILLED`:
    case `${ADD_FOLLOW_UP}_FULFILLED`:
    case `${CREATE_BOOKING}_FULFILLED`:
    case `${ADD_PIPELINE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
      };
    }

    case `${ADD_VISITOR}_REJECTED`:
    case `${ADD_FOLLOW_UP}_REJECTED`:
    case `${CREATE_BOOKING}_REJECTED`:
    case `${ADD_PIPELINE}_REJECTED`: {
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
