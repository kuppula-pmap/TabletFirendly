import {
  DM_FETCH_PERIODIC_REVIEW_REQUEST,
  DM_FETCH_PERIODIC_REVIEW_SUCCESS,
  DM_FETCH_PERIODIC_REVIEW_FAILURE
} from '../constants/periodicReview-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchPeriodicReviewsRequest(documentId, moduleId, url) {
  return {
    type: DM_FETCH_PERIODIC_REVIEW_REQUEST,
    documentId,
    moduleId,
    url
  };
}

export function fetchPeriodicReviewsSuccess(json) {
  return {
    type: DM_FETCH_PERIODIC_REVIEW_SUCCESS,
    periodicReviews: json,
    receivedAt: Date.now()
  };
}

export function fetchPeriodicReviewsFailure(error) {
  return {
    type: DM_FETCH_PERIODIC_REVIEW_FAILURE,
    error
  };
}

export function fetchPeriodicReviews(documentId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/periodicreviews/${documentId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchPeriodicReviewsRequest(documentId, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchPeriodicReviewsFailure(json));
        } else {
          console.log(json);
          dispatch(fetchPeriodicReviewsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchPeriodicReviewsFailure(error))
      );
  };
}
