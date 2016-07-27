import {
  DM_SET_SEARCH_QUERY,
  DM_SET_SEARCH_CRITERIA,
  DM_SET_SEARCH_OBJECT,
} from '../constants/search-constants';

// Search - Sync Action creators

export function setSearchQuery(value) {
  return { type: DM_SET_SEARCH_QUERY, value };
}

export function setSearchCriteria(value) {
  return { type: DM_SET_SEARCH_CRITERIA, value };
}

export function setSearchObject(value) {
  return { type: DM_SET_SEARCH_OBJECT, value };
}
