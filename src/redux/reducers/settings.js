import {
  GLOBAL_SET_API_URL,
  GLOBAL_SET_AUTHORIZATION_TOKEN,
  GLOBAL_SET_CONSUMER_ID,
  GLOBAL_SET_MODULE_ID,
  GLOBAL_SET_SCREEN_ID,
  GLOBAL_SET_LOCATION_ID,
  GLOBAL_SET_TOPLEVEL_ID,
  GLOBAL_SET_LEVEL_ID,
  GLOBAL_SET_LOCATION_LEVEL_NAME,
  GLOBAL_SET_USER_ID,
  GLOBAL_SET_SELECTED_MENU_ITEM,
  GLOBAL_SET_URL_PREFIX,
  GLOBAL_SET_NOTIFICATION_URL,
  GLOBAL_SET_ENCRYPTEDAPP_ID,
  GLOBAL_SET_SESSION_TIMEOUT,
  GLOBAL_SET_SESSION_RESET_TIME,
  GLOBAL_SET_SESSION_IS_ACTIVE,
  GLOBAL_SET_SSO_TYPE,
} from '../constants/settings-constants';

function globalGlobalReducer(state = {}, action) {
  switch (action.type) {
  case GLOBAL_SET_API_URL:
    return {
      ...state,
      apiUrl: action.value
    };
  case GLOBAL_SET_AUTHORIZATION_TOKEN:
    return {
      ...state,
      authorizationToken: action.value
    };
  case GLOBAL_SET_CONSUMER_ID:
    return {
      ...state,
      consumerId: action.value
    };
  case GLOBAL_SET_MODULE_ID:
    return {
      ...state,
      moduleId: action.value
    };
  case GLOBAL_SET_SCREEN_ID:
    return {
      ...state,
      screenId: action.value
    };
  case GLOBAL_SET_LOCATION_ID:
    return {
      ...state,
      locationId: action.value
    };
  case GLOBAL_SET_TOPLEVEL_ID:
    return {
      ...state,
      topLevelId: action.value
    };
  case GLOBAL_SET_LEVEL_ID:
    return {
      ...state,
      levelId: action.value
    };
  case GLOBAL_SET_LOCATION_LEVEL_NAME:
    return {
      ...state,
      locationLevelName: action.value
    };
  case GLOBAL_SET_USER_ID:
    return {
      ...state,
      userId: action.value
    };
  case GLOBAL_SET_SELECTED_MENU_ITEM:
    return {
      ...state,
      selectedMenuItem: action.value
    };
  case GLOBAL_SET_URL_PREFIX:
    return {
      ...state,
      urlPrefix: action.value
    };
  case GLOBAL_SET_ENCRYPTEDAPP_ID:
    return {
      ...state,
      encryptedAppId: action.value
    };
  case GLOBAL_SET_NOTIFICATION_URL:
    return {
      ...state,
      notificationUrl: action.value
    };
  case GLOBAL_SET_SESSION_TIMEOUT:
    return {
      ...state,
      sessionTimeout: action.value
    };
  case GLOBAL_SET_SESSION_RESET_TIME:
    return {
      ...state,
      sessionResetTime: action.value
    };
  case GLOBAL_SET_SESSION_IS_ACTIVE:
    return {
      ...state,
      sessionIsActive: action.value
    };
  case GLOBAL_SET_SSO_TYPE:
    return {
      ...state,
      SSOType: action.value
    };
  default:
    return state;
  }
}

export default globalGlobalReducer;
