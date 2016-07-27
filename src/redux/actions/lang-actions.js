import {
  GLOBAL_SET_LANGUAGECODE,
  GLOBAL_SET_LANGUAGENAME
} from '../constants/lang-constants';


// Global.
export function setLanguageCode(value) {
  return {
    type: GLOBAL_SET_LANGUAGECODE,
    value
  };
}

export function setLanguageName(value) {
  return {
    type: GLOBAL_SET_LANGUAGENAME,
    value
  };
}
