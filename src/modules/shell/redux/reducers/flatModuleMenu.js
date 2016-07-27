import {
  SH_FETCH_FLATMODULEMENU_REQUEST,
  SH_FETCH_FLATMODULEMENU_SUCCESS,
  SH_FETCH_FLATMODULEMENU_FAILURE
} from '../constants/moduleMenu-constants';

// Data / Async
function shFlatModuleMduleReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_FETCH_FLATMODULEMENU_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_FETCH_FLATMODULEMENU_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.moduleMenu,
      lastUpdated: action.receivedAt
    };
  case SH_FETCH_FLATMODULEMENU_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shFlatModuleMduleReducer;
