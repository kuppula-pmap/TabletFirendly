import {
  DM_FETCH_AUDIT_TRAIL_REQUEST,
  DM_FETCH_AUDIT_TRAIL_SUCCESS,
  DM_FETCH_AUDIT_TRAIL_FAILURE
} from '../constants/auditTrail-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Documents
export function fetchAuditTrailRequest() {
  return {
    type: DM_FETCH_AUDIT_TRAIL_REQUEST
  };
}

export function fetchAuditTrailSuccess(json) {
  return {
    type: DM_FETCH_AUDIT_TRAIL_SUCCESS,
    auditTrail: json,
    receivedAt: Date.now()
  };
}

export function fetchAuditTrailFailure(error) {
  return {
    type: DM_FETCH_AUDIT_TRAIL_FAILURE,
    error
  };
}

export function fetchAuditTrail(docId) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang} = getState();
    // papi/dm/document/auditTrail/{docId}
    const url = `${globalSettings.apiUrl}/papi/dm/document/auditTrail/${docId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchAuditTrailRequest(sInit));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchAuditTrailFailure(json));
        } else {
          dispatch(fetchAuditTrailSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchAuditTrailFailure(error))
      );
  };
}
