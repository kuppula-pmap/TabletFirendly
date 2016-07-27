import {
  POST_APPROVALWORKFLOW_REQUEST,
  POST_APPROVALWORKFLOW_SUCCESS,
  POST_APPROVALWORKFLOW_FAILURE
} from '../constants/approvalWorkflow-constants';

// Data / Async
function dmApprovalWorkflowPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case POST_APPROVALWORKFLOW_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case POST_APPROVALWORKFLOW_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.response,
      lastUpdated: action.receivedAt
    };
  case POST_APPROVALWORKFLOW_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmApprovalWorkflowPostReducer;
