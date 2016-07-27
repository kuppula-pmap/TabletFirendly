import {
  SH_FETCH_MODULE_LABELS_REQUEST,
  SH_FETCH_MODULE_LABELS_SUCCESS,
  SH_FETCH_MODULE_LABELS_FAILURE
} from '../constants/moduleLabels-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// moduleLabels
export function shFetchModuleLabelsRequest(moduleId, url) {
  return {
    type: SH_FETCH_MODULE_LABELS_REQUEST,
    moduleId,
    url
  };
}

export function shFetchModuleLabelsSuccess(json) {
  return {
    type: SH_FETCH_MODULE_LABELS_SUCCESS,
    moduleLabels: utils.reformatModuleLabels(json[0].Labels),
    moduleLabelsOriginal: json,
    receivedAt: Date.now()
  };
}

export function shFetchModuleLabelsFailure(error) {
  return {
    type: SH_FETCH_MODULE_LABELS_FAILURE,
    error
  };
}

export function shFetchModuleLabels() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, shSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/modulelabels/${shSettings.moduleId}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', shSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(shFetchModuleLabelsRequest(shSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(shFetchModuleLabelsFailure(json));
        } else if (!json.length) {
          dispatch(shFetchModuleLabelsFailure(`The response for this api call ${url} is empty.`));
        } else {
          dispatch(shFetchModuleLabelsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(shFetchModuleLabelsFailure(error))
      );
  };
}
