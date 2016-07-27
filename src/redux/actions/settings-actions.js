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


// Global.
export function setApiUrl(value) {
  return {
    type: GLOBAL_SET_API_URL,
    value
  };
}

export function setAuthorizationToken(value) {
  return {
    type: GLOBAL_SET_AUTHORIZATION_TOKEN,
    value
  };
}

export function setConsumerId(value) {
  return {
    type: GLOBAL_SET_CONSUMER_ID,
    value
  };
}

export function setModuleId(value) {
  return {
    type: GLOBAL_SET_MODULE_ID,
    value
  };
}

export function setScreenId(value) {
  return {
    type: GLOBAL_SET_SCREEN_ID,
    value
  };
}

export function setLocationId(value) {
  return {
    type: GLOBAL_SET_LOCATION_ID,
    value
  };
}

export function setTopLevelId(value) {
  return {
    type: GLOBAL_SET_TOPLEVEL_ID,
    value
  };
}

export function setLevelId(value) {
  return {
    type: GLOBAL_SET_LEVEL_ID,
    value
  };
}

export function setLocationLevelName(value) {
  return {
    type: GLOBAL_SET_LOCATION_LEVEL_NAME,
    value
  };
}

export function setUserId(value) {
  return {
    type: GLOBAL_SET_USER_ID,
    value
  };
}

export function setSelectedMenuItem(value) {
  return {
    type: GLOBAL_SET_SELECTED_MENU_ITEM,
    value
  };
}

export function setUrlPrefix(value) {
  return {
    type: GLOBAL_SET_URL_PREFIX,
    value
  };
}

export function setNotificationUrl(value) {
  return {
    type: GLOBAL_SET_NOTIFICATION_URL,
    value
  };
}

export function setEncryptedAppId(value) {
  return {
    type: GLOBAL_SET_ENCRYPTEDAPP_ID,
    value
  };
}

export function setSessionTimeout(value) {
  return {
    type: GLOBAL_SET_SESSION_TIMEOUT,
    value
  };
}

export function setSessionResetTime(value) {
  return {
    type: GLOBAL_SET_SESSION_RESET_TIME,
    value
  };
}

export function setSessionIsActive(value) {
  return {
    type: GLOBAL_SET_SESSION_IS_ACTIVE,
    value
  };
}

export function setSSOType(value) {
  return {
    type: GLOBAL_SET_SSO_TYPE,
    value
  };
}
