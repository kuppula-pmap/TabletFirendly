import {
  DM_POST_APPROVALWORKFLOW_REQUEST,
  DM_POST_APPROVALWORKFLOW_SUCCESS,
  DM_POST_APPROVALWORKFLOW_FAILURE
} from '../constants/approvalWorkflow-constants';

import { fetchDocumentSuccess } from './document-actions';

import utils from '../../../../utils';

// DATA - Async Action creators
// ApprovalWorkflow
export function postApprovalWorkflowRequest(postedObject, body, moduleId, url) {
  return {
    type: DM_POST_APPROVALWORKFLOW_REQUEST,
    postedObject,
    body,
    moduleId,
    url
  };
}

export function postApprovalWorkflowSuccess(json) {
  return {
    type: DM_POST_APPROVALWORKFLOW_SUCCESS,
    response: json,
    receivedAt: Date.now()
  };
}

export function postApprovalWorkflowFailure(error) {
  return {
    type: DM_POST_APPROVALWORKFLOW_FAILURE,
    error
  };
}

export function postApprovalWorkflow(state) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/document/executecommand`;
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

    dispatch(postApprovalWorkflowRequest(state, sInit, dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postApprovalWorkflowFailure(json));
        } else {
          dispatch(fetchDocumentSuccess(json));
          dispatch(postApprovalWorkflowSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postApprovalWorkflowFailure(error))
      );
  };
}
