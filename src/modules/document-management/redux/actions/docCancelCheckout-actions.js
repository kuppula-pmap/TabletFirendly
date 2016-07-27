import {
  DM_POST_DOCUMENT_CANCEL_CHECKOUT_REQUEST,
  DM_POST_DOCUMENT_CANCEL_CHECKOUT_SUCCESS,
  DM_POST_DOCUMENT_CANCEL_CHECKOUT_FAILURE
} from '../constants/document-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// CancelCheckout
export function postDocumentCancelCheckoutRequest(documentId, moduleId, url) {
  return {
    type: DM_POST_DOCUMENT_CANCEL_CHECKOUT_REQUEST,
    documentId,
    moduleId,
    url
  };
}

export function postDocumentCancelCheckoutSuccess(json) {
  return {
    type: DM_POST_DOCUMENT_CANCEL_CHECKOUT_SUCCESS,
    document: json,
    receivedAt: Date.now()
  };
}

export function postDocumentCancelCheckoutFailure(error) {
  return {
    type: DM_POST_DOCUMENT_CANCEL_CHECKOUT_FAILURE,
    error
  };
}

export function postDocumentCancelCheckout(documentId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/${documentId}/cancelcheckout`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify({})
    };

    dispatch(postDocumentCancelCheckoutRequest(documentId, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postDocumentCancelCheckoutFailure(json));
        } else {
          dispatch(postDocumentCancelCheckoutSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postDocumentCancelCheckoutFailure(error))
      );
  };
}
