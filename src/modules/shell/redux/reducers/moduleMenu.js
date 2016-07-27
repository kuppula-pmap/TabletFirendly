import {
  SH_FETCH_MODULEMENU_REQUEST,
  SH_FETCH_MODULEMENU_SUCCESS,
  SH_FETCH_MODULEMENU_FAILURE
} from '../constants/moduleMenu-constants';

// Data / Async
function shModuleMenuReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_FETCH_MODULEMENU_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_FETCH_MODULEMENU_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.moduleMenu,
      lastUpdated: action.receivedAt
    };
  case SH_FETCH_MODULEMENU_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shModuleMenuReducer;
