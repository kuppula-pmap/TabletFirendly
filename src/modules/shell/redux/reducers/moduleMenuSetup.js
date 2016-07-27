import {
  SH_FETCH_MODULEMENU_SETUP_REQUEST,
  SH_FETCH_MODULEMENU_SETUP_SUCCESS,
  SH_FETCH_MODULEMENU_SETUP_FAILURE
} from '../constants/moduleMenuSetup-constants';

// Data / Async
function shModuleMenuSetupReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_FETCH_MODULEMENU_SETUP_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_FETCH_MODULEMENU_SETUP_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.moduleMenuSetup,
      lastUpdated: action.receivedAt
    };
  case SH_FETCH_MODULEMENU_SETUP_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shModuleMenuSetupReducer;
