import {
  DM_TOGGLE_RIGHT_SIDEBAR,
  DM_CHANGE_FOLDER,
  DM_SELECT_FILE,
  DM_SET_FILE_MANAGER_DATA,
  DM_SET_CONTENT_AREA_VIEW,
  DM_SET_RIGHT_PANEL_AREA_VIEW,
  DM_CONTENT_AREA_SEARCHING_FOR,
  DM_SET_SELECTED_CHANGE_REQUEST,
  DM_SET_FULLSCREEN,
  DM_SET_PRINT_DOCUMENT,
  GLOBAL_SET_DEV_MODE,
} from '../constants/ui-constants';

function dmUIReducer(state = {}, action) {
  switch (action.type) {

  case DM_TOGGLE_RIGHT_SIDEBAR:
    return {
      ...state,
      rightSidebarOpened: !action.value
    };

  case DM_CHANGE_FOLDER:
    return {
      ...state,
      currentFolderId: action.id
    };

  case DM_SELECT_FILE:
    return {
      ...state,
      currentFileId: action.value,
    };

  case DM_SET_FILE_MANAGER_DATA:
    return {
      ...state,
      docMaster: action.dataMaster,
      docFolders: action.dataFolders,
      docFiles: action.dataFiles,
    };

  case DM_SET_CONTENT_AREA_VIEW:
    return {
      ...state,
      contentAreaView: action.value
    };

  case DM_SET_RIGHT_PANEL_AREA_VIEW:
    return {
      ...state,
      rightPanelAreaView: action.value
    };

  case DM_CONTENT_AREA_SEARCHING_FOR:
    return {
      ...state,
      searchingFor: action.value
    };

  case DM_SET_SELECTED_CHANGE_REQUEST:
    return {
      ...state,
      selectedChangeRequest: action.value
    };

  case DM_SET_FULLSCREEN:
    return {
      ...state,
      isFullscreen: action.value
    };

  case DM_SET_PRINT_DOCUMENT:
    return {
      ...state,
      printDocument: action.value
    };

  case GLOBAL_SET_DEV_MODE:
    return {
      ...state,
      devMode: action.value
    };

  default:
    return state;
  }
}


export default dmUIReducer;
