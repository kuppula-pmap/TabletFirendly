import {
  SH_SET_MODULE_ID,
  SH_SET_SELECTED_MENU_ITEM_FOR_DIRTY,
} from '../constants/settings-constants';


// SH.
export function shSetModuleId(value) {
  return {
    type: SH_SET_MODULE_ID,
    value
  };
}

export function shSetSelectedMenuItemForDirty(value) {
  return {
    type: SH_SET_SELECTED_MENU_ITEM_FOR_DIRTY,
    value
  };
}
