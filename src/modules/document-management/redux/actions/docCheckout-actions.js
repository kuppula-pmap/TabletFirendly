import {
  DM_POST_DOCUMENT_CHECKOUT_REQUEST,
  DM_POST_DOCUMENT_CHECKOUT_SUCCESS,
  DM_POST_DOCUMENT_CHECKOUT_FAILURE,
} from '../constants/document-constants';

import { fetchDocumentSuccess } from './document-actions';

import utils from '../../../../utils';

// DATA - Async Action creators
// Checkout
export function postDocumentCheckoutRequest(documentId, moduleId, url) {
  return {
    type: DM_POST_DOCUMENT_CHECKOUT_REQUEST,
    documentId,
    moduleId,
    url
  };
}

export function postDocumentCheckoutSuccess(json) {
  return {
    type: DM_POST_DOCUMENT_CHECKOUT_SUCCESS,
    document: json,
    receivedAt: Date.now()
  };
}

export function postDocumentCheckoutFailure(error) {
  return {
    type: DM_POST_DOCUMENT_CHECKOUT_FAILURE,
    error
  };
}

export function postDocumentCheckout(documentId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/${documentId}/checkout`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify({})
    };

    dispatch(postDocumentCheckoutRequest(documentId, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postDocumentCheckoutFailure(json));
        } else {
          dispatch(fetchDocumentSuccess(json));
          dispatch(postDocumentCheckoutSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postDocumentCheckoutFailure(error))
      );
  };
}
