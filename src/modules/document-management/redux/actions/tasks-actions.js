import {
  DM_FETCH_TASKS_REQUEST,
  DM_FETCH_TASKS_SUCCESS,
  DM_FETCH_TASKS_FAILURE
} from '../constants/tasks-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// Tasks
export function fetchTasksRequest(moduleId, url) {
  return {
    type: DM_FETCH_TASKS_REQUEST,
    moduleId,
    url
  };
}

export function fetchTasksSuccess(json) {
  return {
    type: DM_FETCH_TASKS_SUCCESS,
    tasks: json,
    receivedAt: Date.now()
  };
}

export function fetchTasksFailure(error) {
  return {
    type: DM_FETCH_TASKS_FAILURE,
    error
  };
}

export function fetchTasks() {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    const url = `${globalSettings.apiUrl}/papi/dm/tasks`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);

    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchTasksRequest(dmSettings.moduleId, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(fetchTasksFailure(json));
        } else {
          dispatch(fetchTasksSuccess(json));
        }
      })
      .catch(error =>
        dispatch(fetchTasksFailure(error))
      );
  };
}
