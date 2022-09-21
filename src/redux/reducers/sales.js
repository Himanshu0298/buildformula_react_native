import dayjs from 'dayjs';
import _ from 'lodash';
import {
  GET_VISITORS,
  GET_FOLLOWUP_LIST,
  GET_SALES_DATA,
  ADD_VISITOR,
  ADD_VISITOR_COMMENT,
  GET_SELECTED_PROJECT,
  GET_PIPELINES,
  DELETE_PIPELINE,
  ADD_PIPELINE,
  MOVE_VISITOR,
  GET_BOOKINGS_STATUS,
  CREATE_BOOKING,
  GET_BANK_LIST,
  SET_TIMER,
  GET_VISITOR,
  GET_PROJECT_COMMON_DATA,
  UPDATE_FOLLOW_UP,
  UPDATE_BROKER,
  GET_VISITOR_ACTIVITIES,
  ADD_VISITOR_CALL_LOGS,
  ADD_VISITOR_FOLLOW_UP,
  GET_PIPELINES_ORDER_LIST,
  UPDATE_PIPELINE_ORDER_LIST,
  GET_BROKERS_LIST,
  ADD_BROKER,
  DELETE_BROKER,
  GET_BROKER_DETAILS,
  HOLD_UNIT_BOOKING,
  GET_HOLD_BOOKING_DETAILS,
  UN_HOLD_UNIT_BOOKING,
  GET_INTERESTED_PROPERTY,
  CONFIRM_BOOKING_OTP,
  SET_BOOKING_OTP_STATUS,
  GET_BOOKING_FORM_OTP_STATUS,
  RESEND_BOOKING_OTP,
  GET_APPROVALS,
  GET_APPROVERS,
  CREATE_APPROVAL,
  APPROVAL_DETAILS,
  UPDATE_BROKER_REMARK,
  GET_FOLLOWUP_DETAILS_LIST,
  UPDATE_COMPLETE_TASK,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  loadingCommonData: false,
  loadingSalesData: false,
  loadingUnitStatus: false,
  loadingVisitors: false,
  loadingVisitor: false,
  loadingFollowups: false,
  loadingPipeline: false,
  loadingBankList: false,
  loadingBrokers: false,
  loadingVisitorActivities: false,
  loadingPipelineOrderList: false,
  loadingBrokerDetails: false,
  deletingPipeline: false,
  loadingHoldBookingDetails: false,
  errorMessage: undefined,
  timerData: {showTimer: false},
  visitors: [],
  followups: [],
  followUpsData: {},
  bhkOptions: {},
  occupationOptions: [],
  sourceTypeOptions: [],
  inquiryOptions: [],
  interestedOptions: [],
  assignOptions: [],
  visitorAnalytics: {},
  visitorSuggestions: [],
  pipelines: [],
  unitBookingStatus: [],
  bankList: [],
  visitor: {},
  visitorFollowUp: {},
  visitorActivities: [],
  pipelinesOrderList: [],
  brokersList: [],
  brokerDetails: {},
  bookingOTPStatus: {},
  approvalList: [],
  approversList: [],
  approvalsDetails: {},
  approvalDetailsList: [],
};

const reducer = (state = initialState, action = {}) => {
  const {type, payload} = action;

  switch (type) {
    // RESET data on project change
    case `${GET_SELECTED_PROJECT}_PENDING`:
      return {...initialState};

    case `${SET_TIMER}`:
      return {
        ...state,
        timerData: {
          showTimer: !state?.timerData?.showTimer,
          ...payload,
        },
      };

    case `${GET_PROJECT_COMMON_DATA}_PENDING`:
      return {
        ...state,
        loadingCommonData: true,
      };
    case `${GET_PROJECT_COMMON_DATA}_FULFILLED`: {
      const sourceTypeOptions = payload.source_types
        .filter(i => i.status)
        .map(i => ({label: i.source_title, value: i.id}));
      return {
        ...state,
        loadingCommonData: false,
        sourceTypeOptions,
      };
    }
    case `${GET_PROJECT_COMMON_DATA}_REJECTED`:
      return {
        ...state,
        loadingCommonData: false,
        errorMessage: payload,
      };

    case `${GET_SALES_DATA}_PENDING`:
      return {
        ...state,
        loadingSalesData: true,
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
      } = payload;

      return {
        ...state,
        loadingSalesData: false,
        occupationOptions: occupations,
        inquiryOptions: Object.keys(inquiry_for).map(value => {
          return {value: Number(value), label: inquiry_for[value]};
        }),
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
        loadingSalesData: false,
        errorMessage: payload,
      };

    //

    case `${GET_INTERESTED_PROPERTY}_PENDING`:
      return {
        ...state,
        loadingSalesData: true,
      };
    case `${GET_INTERESTED_PROPERTY}_FULFILLED`: {
      return {
        ...state,
        loadingSalesData: false,
        interestedOptions: payload?.map(i => ({value: i, label: i})),
      };
    }
    case `${GET_INTERESTED_PROPERTY}_REJECTED`:
      return {
        ...state,
        loadingSalesData: false,
        errorMessage: payload,
      };

    //

    case `${GET_VISITORS}_PENDING`:
      return {
        ...state,
        loadingVisitors: true,
      };
    case `${GET_VISITORS}_FULFILLED`:
      return {
        ...state,
        loadingVisitors: false,
        visitors: payload.sort(
          (a, b) =>
            dayjs(b.follow_up_date).unix() - dayjs(a.follow_up_date).unix(),
        ),
      };
    case `${GET_VISITORS}_REJECTED`:
      return {
        ...state,
        loadingVisitors: false,
        errorMessage: payload,
      };

    case `${GET_VISITOR}_PENDING`:
    case `${UPDATE_FOLLOW_UP}_PENDING`:
      return {
        ...state,
        loadingVisitor: true,
        visitor: {},
      };
    case `${GET_VISITOR}_FULFILLED`:
    case `${UPDATE_FOLLOW_UP}_FULFILLED`: {
      const data = payload.followup_lists || payload.followup;
      const visitorFollowUp = data.sort(
        (a, b) => dayjs(b.created).toDate() - dayjs(a.created).toDate(),
      );

      return {
        ...state,

        loadingVisitor: false,
        visitor: {
          ...payload.visitors,
          intrestedIn: payload.selected_interested_list,
        },
        visitorFollowUp,
      };
    }
    case `${GET_VISITOR}_REJECTED`:
    case `${UPDATE_FOLLOW_UP}_REJECTED`:
      return {
        ...state,
        loadingVisitor: false,
        errorMessage: payload,
      };

    case `${GET_FOLLOWUP_LIST}_PENDING`:
      return {
        ...state,
        loadingFollowups: true,
      };
    case `${GET_FOLLOWUP_LIST}_FULFILLED`: {
      return {
        ...state,
        loadingFollowups: false,
        // followups: sortedFollowups,
        followUpsData: {...state.followUpsData, ...payload},
      };
    }

    case `${GET_FOLLOWUP_LIST}_REJECTED`:
      return {
        ...state,
        loadingFollowups: false,
        errorMessage: payload,
      };

    case `${GET_FOLLOWUP_DETAILS_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_FOLLOWUP_DETAILS_LIST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        approvalDetailsList: payload,
      };
    }
    case `${GET_FOLLOWUP_DETAILS_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    // Approvals

    case `${GET_APPROVALS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_APPROVALS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        approvalList: payload.sort((a, b) => (a.created < b.created ? 1 : -1)),
      };
    }
    case `${GET_APPROVALS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case `${GET_APPROVERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_APPROVERS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        approversList: payload,
      };
    }
    case `${GET_APPROVERS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case `${APPROVAL_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${APPROVAL_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        approvalsDetails: payload,
      };
    }
    case `${APPROVAL_DETAILS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    // Followup List

    case `${GET_PIPELINES}_PENDING`:
      return {
        ...state,
        loadingPipeline: true,
      };
    case `${GET_PIPELINES}_FULFILLED`: {
      const {pipelines, visitorSuggestions} = payload;
      return {
        ...state,
        loadingPipeline: false,
        pipelines,
        visitorSuggestions,
      };
    }
    case `${GET_PIPELINES}_REJECTED`:
      return {
        ...state,
        loadingPipeline: false,
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
        loadingBankList: true,
      };
    case `${GET_BANK_LIST}_FULFILLED`: {
      return {
        ...state,
        loadingBankList: false,
        bankList: payload?.map(({id, title}) => ({
          label: title,
          value: id,
        })),
      };
    }
    case `${GET_BANK_LIST}_REJECTED`:
      return {
        ...state,
        loadingBankList: false,
        errorMessage: payload,
      };

    case `${GET_BROKERS_LIST}_PENDING`:
      return {
        ...state,
        loadingBrokers: true,
      };
    case `${GET_BROKERS_LIST}_FULFILLED`: {
      return {
        ...state,
        loadingBrokers: false,
        brokersList: payload.sort((a, b) => (a.id > b.id ? 1 : -1)),
      };
    }
    case `${GET_BROKERS_LIST}_REJECTED`:
      return {
        ...state,
        loadingBrokers: false,
        errorMessage: payload,
      };

    case `${GET_BROKER_DETAILS}_PENDING`:
      return {
        ...state,
        loadingBrokerDetails: true,
      };
    case `${GET_BROKER_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loadingBrokerDetails: false,
        brokerDetails: payload,
      };
    }
    case `${GET_BROKER_DETAILS}_REJECTED`:
      return {
        ...state,
        loadingBrokerDetails: false,
        errorMessage: payload,
      };

    case `${GET_BOOKING_FORM_OTP_STATUS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_BOOKING_FORM_OTP_STATUS}_FULFILLED`: {
      console.log('-------->payloadBookingotp', payload);
      return {
        ...state,
        loading: false,
        bookingOTPStatus: payload,
      };
    }
    case `${GET_BOOKING_FORM_OTP_STATUS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    case `${GET_VISITOR_ACTIVITIES}_PENDING`:
      return {
        ...state,
        loadingVisitorActivities: true,
      };
    case `${GET_VISITOR_ACTIVITIES}_FULFILLED`: {
      return {
        ...state,
        loadingVisitorActivities: false,
        visitorActivities: payload.listRecords
          ? Object.values(payload.listRecords)
          : [],
      };
    }
    case `${GET_VISITOR_ACTIVITIES}_REJECTED`:
      return {
        ...state,
        loadingVisitorActivities: false,
        errorMessage: payload,
      };

    case `${GET_PIPELINES_ORDER_LIST}_PENDING`:
      return {
        ...state,
        loadingPipelineOrderList: true,
      };
    case `${GET_PIPELINES_ORDER_LIST}_FULFILLED`: {
      return {
        ...state,
        loadingPipelineOrderList: false,
        pipelinesOrderList: payload,
      };
    }
    case `${GET_PIPELINES_ORDER_LIST}_REJECTED`:
      return {
        ...state,
        loadingPipelineOrderList: false,
        errorMessage: payload,
      };

    case `${DELETE_PIPELINE}_PENDING`:
      return {
        ...state,
        deletingPipeline: true,
      };
    case `${DELETE_PIPELINE}_FULFILLED`: {
      const pipelines = _.cloneDeep(state.pipelines);
      const index = pipelines.findIndex(pipeline => pipeline.id === payload);

      if (index > -1) {
        pipelines.splice(index, 1);
      }

      return {
        ...state,
        deletingPipeline: false,
        pipelines,
      };
    }
    case `${DELETE_PIPELINE}_REJECTED`:
      return {
        ...state,
        deletingPipeline: false,
        errorMessage: payload,
      };

    case `${GET_HOLD_BOOKING_DETAILS}_PENDING`:
      return {
        ...state,
        loadingHoldBookingDetails: true,
      };
    case `${GET_HOLD_BOOKING_DETAILS}_FULFILLED`: {
      return {
        ...state,
        loadingHoldBookingDetails: false,
        bookingHoldDetails: payload,
      };
    }
    case `${GET_HOLD_BOOKING_DETAILS}_REJECTED`:
      return {
        ...state,
        loadingHoldBookingDetails: false,
        errorMessage: payload,
      };

    case `${MOVE_VISITOR}_FULFILLED`: {
      const {visitorId, pipelineId} = payload;
      let pipelines = _.cloneDeep(state.pipelines);

      let movedVisitor = {};
      let newPipelineIndex = -1;

      // Find old pipeline and remove visitor from the list
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

      // Add visitor to the new list

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

    case 'SET_UPDATED_PIPELINE_DATA': {
      return {
        ...state,
        pipelinesOrderList: payload,
      };
    }

    case `${ADD_VISITOR}_PENDING`:
    case `${ADD_BROKER}_PENDING`:
    case `${ADD_VISITOR_COMMENT}_PENDING`:
    case `${ADD_VISITOR_CALL_LOGS}_PENDING`:
    case `${ADD_VISITOR_FOLLOW_UP}_PENDING`:
    case `${CREATE_BOOKING}_PENDING`:
    case `${UPDATE_BROKER}_PENDING`:
    case `${UPDATE_PIPELINE_ORDER_LIST}_PENDING`:
    case `${HOLD_UNIT_BOOKING}_PENDING`:
    case `${UN_HOLD_UNIT_BOOKING}_PENDING`:
    case `${CONFIRM_BOOKING_OTP}_PENDING`:
    case `${SET_BOOKING_OTP_STATUS}_PENDING`:
    case `${DELETE_BROKER}_PENDING`:
    case `${UPDATE_BROKER_REMARK}_PENDING`:
    case `${RESEND_BOOKING_OTP}_PENDING`:
    case `${CREATE_APPROVAL}_PENDING`:
    case `${UPDATE_COMPLETE_TASK}_PENDING`:
    case `${ADD_PIPELINE}_PENDING`: {
      return {
        ...state,
        loading: true,
      };
    }
    case `${ADD_VISITOR}_FULFILLED`:
    case `${ADD_BROKER}_FULFILLED`:
    case `${ADD_VISITOR_COMMENT}_FULFILLED`:
    case `${ADD_VISITOR_CALL_LOGS}_FULFILLED`:
    case `${ADD_VISITOR_FOLLOW_UP}_FULFILLED`:
    case `${UPDATE_PIPELINE_ORDER_LIST}_FULFILLED`:
    case `${UPDATE_BROKER}_FULFILLED`:
    case `${CREATE_BOOKING}_FULFILLED`:
    case `${HOLD_UNIT_BOOKING}_FULFILLED`:
    case `${UN_HOLD_UNIT_BOOKING}_FULFILLED`:
    case `${CONFIRM_BOOKING_OTP}_FULFILLED`:
    case `${SET_BOOKING_OTP_STATUS}_FULFILLED`:
    case `${DELETE_BROKER}_FULFILLED`:
    case `${UPDATE_BROKER_REMARK}_FULFILLED`:
    case `${RESEND_BOOKING_OTP}_FULFILLED`:
    case `${CREATE_APPROVAL}_FULFILLED`:
    case `${UPDATE_COMPLETE_TASK}_FULFILLED`:
    case `${ADD_PIPELINE}_FULFILLED`: {
      return {
        ...state,
        loading: false,
      };
    }

    case `${ADD_VISITOR}_REJECTED`:
    case `${ADD_BROKER}_REJECTED`:
    case `${ADD_VISITOR_COMMENT}_REJECTED`:
    case `${ADD_VISITOR_CALL_LOGS}_REJECTED`:
    case `${ADD_VISITOR_FOLLOW_UP}_REJECTED`:
    case `${UPDATE_BROKER}_REJECTED`:
    case `${UPDATE_PIPELINE_ORDER_LIST}_REJECTED`:
    case `${CREATE_BOOKING}_REJECTED`:
    case `${HOLD_UNIT_BOOKING}_REJECTED`:
    case `${CONFIRM_BOOKING_OTP}_REJECTED`:
    case `${SET_BOOKING_OTP_STATUS}_REJECTED`:
    case `${UN_HOLD_UNIT_BOOKING}_REJECTED`:
    case `${DELETE_BROKER}_REJECTED`:
    case `${UPDATE_BROKER_REMARK}_REJECTED`:
    case `${RESEND_BOOKING_OTP}_REJECTED`:
    case `${CREATE_APPROVAL}_REJECTED`:
    case `${UPDATE_COMPLETE_TASK}_REJECTED`:
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
