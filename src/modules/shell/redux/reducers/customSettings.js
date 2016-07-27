import {
  SH_CUSTOM_SETTINGS_REQUEST,
  SH_CUSTOM_SETTINGS_SUCCESS,
  SH_CUSTOM_SETTINGS_FAILURE
} from '../constants/customSettings-constants';

// Data / Async
function shCustomSettingsReducer(state = {
  isFetching: true,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case SH_CUSTOM_SETTINGS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case SH_CUSTOM_SETTINGS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.customSettings,
      lastUpdated: action.receivedAt
    };
  case SH_CUSTOM_SETTINGS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default shCustomSettingsReducer;
