import {
  DM_POST_PERIODIC_REVIEW_REQUEST,
  DM_POST_PERIODIC_REVIEW_SUCCESS,
  DM_POST_PERIODIC_REVIEW_FAILURE,
  DM_POST_PERIODIC_REVIEW_RESET,
} from '../constants/periodicReview-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// PeriodicReviews
export function postPeriodicReviewRequest(postedObject, body, moduleId, url) {
  return {
    type: DM_POST_PERIODIC_REVIEW_REQUEST,
    postedObject,
    body,
    moduleId,
    url
  };
}

export function postPeriodicReviewSuccess(json) {
  return {
    type: DM_POST_PERIODIC_REVIEW_SUCCESS,
    periodicReview: json,
    receivedAt: Date.now()
  };
}

export function postPeriodicReviewFailure(error) {
  return {
    type: DM_POST_PERIODIC_REVIEW_FAILURE,
    error
  };
}

export function postPeriodicReviewReset() {
  return {
    type: DM_POST_PERIODIC_REVIEW_RESET
  };
}

export function postPeriodicReview(state) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/periodicreview`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);
    // sHeaders.set('Debug', true);

    // const sBody = JSON.stringify(state);
    // utils.save(sBody);

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      body: JSON.stringify(state)
    };

    dispatch(postPeriodicReviewRequest(state, sInit, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postPeriodicReviewFailure(json));
        } else {
          dispatch(postPeriodicReviewSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postPeriodicReviewFailure(error))
      );
  };
}
