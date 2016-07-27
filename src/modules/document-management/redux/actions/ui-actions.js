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


// UI - Sync Action creators

export function toggleRightSidebar(value) {
  return { type: DM_TOGGLE_RIGHT_SIDEBAR, value };
}

export function changeFolder(id) {
  return { type: DM_CHANGE_FOLDER, id};
}

export function selectFile(value) {
  return { type: DM_SELECT_FILE, value };
}

export function setFileManagerData(dataMaster, dataFolders, dataFiles) {
  return { type: DM_SET_FILE_MANAGER_DATA, dataMaster, dataFolders, dataFiles};
}

export function setContentAreaView(value) {
  return { type: DM_SET_CONTENT_AREA_VIEW, value };
}

export function setRightPanelAreaView(value) {
  return { type: DM_SET_RIGHT_PANEL_AREA_VIEW, value };
}

export function changeSearchingFor(value) {
  return { type: DM_CONTENT_AREA_SEARCHING_FOR, value };
}

export function setSelectedChangeRequest(value) {
  return { type: DM_SET_SELECTED_CHANGE_REQUEST, value };
}

export function setFullScreen(value) {
  return { type: DM_SET_FULLSCREEN, value };
}

export function setPrintDocument(value) {
  return { type: DM_SET_PRINT_DOCUMENT, value };
}

export function setDevMode(value) {
  return { type: GLOBAL_SET_DEV_MODE, value };
}
