import {
  SH_SET_MODULE_ID,
  SH_SET_SELECTED_MENU_ITEM_FOR_DIRTY,
} from '../constants/settings-constants';

function shSettingsReducer(state = {}, action) {
  switch (action.type) {
  case SH_SET_MODULE_ID:
    return {
      ...state,
      moduleId: action.value
    };

  case SH_SET_SELECTED_MENU_ITEM_FOR_DIRTY:
    return {
      ...state,
      data: action.value
    };
  default:
    return state;
  }
}

export default shSettingsReducer;
