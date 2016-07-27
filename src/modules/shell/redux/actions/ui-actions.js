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


// UI - Sync Action creators
export function toggleLeftSidebar(value) {
  return { type: SH_TOGGLE_LEFT_SIDEBAR, value };
}

export function changeFrameSource(value) {
  return { type: SH_IFRAME_SOURCE, value };
}

export function setReloadIframe(value) {
  return { type: SH_RELOAD_IFRAME, value };
}

export function setBrowserInfo(value) {
  return { type: SH_BROWSER_INFO, value };
}

export function toggleNavigatorPin(value) {
  return { type: SH_TOGGLE_NAVIGATOR_PIN, value };
}

export function toggleNavigator(value) {
  return { type: SH_TOGGLE_NAVIGATOR, value };
}

export function setLeftSidebarDepth(value) {
  return { type: SH_LEFT_SIDEBAR_DEPTH, value };
}

export function setMenuRefreshCounter(value) {
  return { type: SH_MENU_REFRESH_COUNTER, value };
}

export function setMenuClickCount(value) {
  return { type: SH_MENU_CLICK_COUNT, value };
}
