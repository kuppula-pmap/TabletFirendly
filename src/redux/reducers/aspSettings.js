import {
  POST_ASPSETTINGS_REQUEST,
  POST_ASPSETTINGS_SUCCESS,
  POST_ASPSETTINGS_FAILURE
} from '../constants/aspSettings-constants';

// Data / Async
function globalAspSettingsPostReducer(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case POST_ASPSETTINGS_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case POST_ASPSETTINGS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.aspSettings,
      lastUpdated: action.receivedAt
    };
  case POST_ASPSETTINGS_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
  default:
    return state;
  }
}


export default globalAspSettingsPostReducer;
