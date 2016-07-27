import {
  DM_SET_SEARCH_QUERY,
  DM_SET_SEARCH_CRITERIA,
  DM_SET_SEARCH_OBJECT,
} from '../constants/search-constants';

function dmSearchReducer(state = {}, action) {
  switch (action.type) {

  case DM_SET_SEARCH_QUERY:
    return {
      ...state,
      query: action.value
    };

  case DM_SET_SEARCH_CRITERIA:
    return {
      ...state,
      criteria: action.value
    };

  case DM_SET_SEARCH_OBJECT:
    return {
      ...state,
      object: action.value
    };

  default:
    return state;
  }
}

export default dmSearchReducer;
