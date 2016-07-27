import {
  DM_FETCH_FOLDER_REQUEST,
  DM_FETCH_FOLDER_SUCCESS,
  DM_FETCH_FOLDER_FAILURE
} from '../constants/folder-constants';


const initialState = ({
  isFetching: false,
  didInvalidate: false,
  items: []
});

// Data / Async
function dmFolderReducer(state = initialState, action) {
  switch (action.type) {
  case DM_FETCH_FOLDER_REQUEST:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case DM_FETCH_FOLDER_SUCCESS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.folder,
      lastUpdated: action.receivedAt
    };
  case DM_FETCH_FOLDER_FAILURE:
    return {
      ...state,
      didInvalidate: true,
      error: action.error
    };
    // return state.merge({
    //   didInvalidate: true,
    //   error: action.error
    // });

  default:
    return state;
  }
}


export default dmFolderReducer;
