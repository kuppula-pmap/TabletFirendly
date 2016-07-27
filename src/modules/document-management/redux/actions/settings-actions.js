import {
  DM_SET_MODULE_ID,
  DM_SET_FOLDER_VIEWTYPE,
} from '../constants/settings-constants';


// DM.
export function dmSetModuleId(value) {
  return {
    type: DM_SET_MODULE_ID,
    value
  };
}

export function dmSetFolderViewType(value) {
  return {
    type: DM_SET_FOLDER_VIEWTYPE,
    value
  };
}
