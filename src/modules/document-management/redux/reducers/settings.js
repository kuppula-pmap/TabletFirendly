import {
  DM_SET_MODULE_ID,
  DM_SET_FOLDER_VIEWTYPE,
} from '../constants/settings-constants';

function dmSettingsReducer(state = {}, action) {
  switch (action.type) {
  case DM_SET_MODULE_ID:
    return {
      ...state,
      moduleId: action.value
    };
  case DM_SET_FOLDER_VIEWTYPE:
    return {
      ...state,
      folderViewType: action.value
    };

  default:
    return state;
  }
}

export default dmSettingsReducer;
