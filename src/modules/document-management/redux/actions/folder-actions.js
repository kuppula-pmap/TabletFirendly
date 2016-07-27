import {
  DM_FETCH_FOLDER_REQUEST,
  DM_FETCH_FOLDER_SUCCESS,
  DM_FETCH_FOLDER_FAILURE
} from '../constants/folder-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Folders
export function fetchFolderRequest(folderId, moduleId, url) {
  return {
    type: DM_FETCH_FOLDER_REQUEST,
    folderId,
    moduleId,
    url
  };
}

export function fetchFolderSuccess(folderId, json) {
  return {
    type: DM_FETCH_FOLDER_SUCCESS,
    folderId,
    folder: json,
    receivedAt: Date.now()
  };
}

export function fetchFolderFailure(folderId, error) {
  return {
    type: DM_FETCH_FOLDER_FAILURE,
    folderId,
    error
  };
}

export function fetchFolder(folderId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();
    const viewType = dmSettings.folderViewType ? `?viewType=${dmSettings.folderViewType}` : '';

    const url = `${globalSettings.apiUrl}/papi/dm/folder/${folderId}${viewType}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchFolderRequest(folderId, dmSettings.moduleId, url));
    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchFolderFailure(folderId, json));
        } else {
          dispatch(fetchFolderSuccess(folderId, json));
        }
      })
      .catch(error =>
        dispatch(fetchFolderFailure(folderId, error))
      );
  };
}
