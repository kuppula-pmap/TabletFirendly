import {
  DM_FETCH_MODULE_LABELS_REQUEST,
  DM_FETCH_MODULE_LABELS_SUCCESS,
  DM_FETCH_MODULE_LABELS_FAILURE
} from '../constants/moduleLabels-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// moduleLabels
export function dmFetchModuleLabelsRequest(moduleId, url) {
  return {
    type: DM_FETCH_MODULE_LABELS_REQUEST,
    moduleId,
    url
  };
}

export function dmFetchModuleLabelsSuccess(json) {
  return {
    type: DM_FETCH_MODULE_LABELS_SUCCESS,
    moduleLabels: utils.reformatModuleLabels(json[0].Labels),
    moduleLabelsOriginal: json,
    receivedAt: Date.now()
  };
}

export function dmFetchModuleLabelsFailure(error) {
  return {
    type: DM_FETCH_MODULE_LABELS_FAILURE,
    error
  };
}

export function dmFetchModuleLabels() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/modulelabels/${dmSettings.moduleId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(dmFetchModuleLabelsRequest(dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(dmFetchModuleLabelsFailure(json));
        } else if (!json.length) {
          dispatch(dmFetchModuleLabelsFailure(`The response for this api call ${url} is empty.`));
        } else {
          dispatch(dmFetchModuleLabelsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(dmFetchModuleLabelsFailure(error))
      );
  };
}
