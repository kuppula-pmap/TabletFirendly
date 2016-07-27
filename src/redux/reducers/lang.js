import {
  GLOBAL_SET_LANGUAGECODE,
  GLOBAL_SET_LANGUAGENAME
} from '../constants/lang-constants';

function globalLangReducer(state = {}, action) {
  switch (action.type) {

  case GLOBAL_SET_LANGUAGECODE:
    return {
      ...state,
      languageCode: action.value
    };

  case GLOBAL_SET_LANGUAGENAME:
    return {
      ...state,
      languageName: action.value
    };

  default:
    return state;
  }
}

export default globalLangReducer;
