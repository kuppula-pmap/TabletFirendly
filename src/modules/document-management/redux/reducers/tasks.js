import {
  DM_FETCH_TASKS_REQUEST,
  DM_FETCH_TASKS_SUCCESS,
  DM_FETCH_TASKS_FAILURE
} from '../constants/tasks-constants';

// Data / Async
function dmTasksReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case DM_FETCH_TASKS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_TASKS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.tasks,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_TASKS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default dmTasksReducer;
