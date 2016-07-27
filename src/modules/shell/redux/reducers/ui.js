import {
  SH_TOGGLE_LEFT_SIDEBAR,
  SH_IFRAME_SOURCE,
  SH_RELOAD_IFRAME,
  SH_BROWSER_INFO,
  SH_TOGGLE_NAVIGATOR_PIN,
  SH_TOGGLE_NAVIGATOR,
  SH_LEFT_SIDEBAR_DEPTH,
  SH_MENU_REFRESH_COUNTER,
  SH_MENU_CLICK_COUNT,
} from '../constants/ui-constants';

function shUIReducer(state = {}, action) {
  switch (action.type) {

  case SH_TOGGLE_LEFT_SIDEBAR:
    return {
      ...state,
      leftSidebarOpened: !action.value
    };

  case SH_IFRAME_SOURCE:
    return {
      ...state,
      frameUrl: action.value
    };

  case SH_RELOAD_IFRAME:
    return {
      ...state,
      reloadIframe: action.value
    };

  case SH_BROWSER_INFO:
    return {
      ...state,
      browserInfo: action.value
    };

  case SH_TOGGLE_NAVIGATOR_PIN:
    return {
      ...state,
      isNavigatorPinned: action.value
    };

  case SH_TOGGLE_NAVIGATOR:
    return {
      ...state,
      isNavigatorOpen: action.value
    };

  case SH_LEFT_SIDEBAR_DEPTH:
    return {
      ...state,
      leftSidebarDepth: action.value
    };

  case SH_MENU_REFRESH_COUNTER:
    return {
      ...state,
      refreshCounter: action.value
    };

  case SH_MENU_CLICK_COUNT:
    return {
      ...state,
      menuClickCount: action.value
    };

  default:
    return state;
  }
}


export default shUIReducer;
