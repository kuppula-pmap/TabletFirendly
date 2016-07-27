import {
  DM_DELETE_DOCUMENT_REQUEST,
  DM_DELETE_DOCUMENT_SUCCESS,
  DM_DELETE_DOCUMENT_FAILURE
} from '../constants/document-constants';

import { DM_RIGHT_PANEL_ACTIVITY } from '../constants/ui-constants';

import { setRightPanelAreaView } from './ui-actions';
import { fetchDocumentSuccess } from './document-actions';
import { fetchFolder } from './folder-actions';
import { fetchFilter } from './filter-actions';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function deleteDocumentRequest(body, moduleId, url) {
  return {
    type: DM_DELETE_DOCUMENT_REQUEST,
    body,
    moduleId,
    url
  };
}

export function deleteDocumentSuccess(json) {
  return {
    type: DM_DELETE_DOCUMENT_SUCCESS,
    document: json,
    receivedAt: Date.now()
  };
}

export function deleteDocumentFailure(error) {
  return {
    type: DM_DELETE_DOCUMENT_FAILURE,
    error
  };
}

export function deleteDocument(docUid) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings, dmUi} = getState();
    const folderId = dmUi.currentFolderId;

    const url = `${globalSettings.apiUrl}/papi/dm/document/${docUid}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);
    // sHeaders.set('Debug', true);

    // const sBody = JSON.stringify(state);
    // utils.save(sBody);

    const sInit = {
      method: 'DELETE',
      headers: sHeaders
    };

    dispatch(deleteDocumentRequest(sInit, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(deleteDocumentFailure(json));
        } else {
          dispatch(fetchDocumentSuccess(json));
          dispatch(deleteDocumentSuccess(json));
          dispatch(fetchFolder(folderId));
          dispatch(fetchFilter());
          dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));
        }
      })
      .catch(error =>
        dispatch(deleteDocumentFailure(error))
      );
  };
}
