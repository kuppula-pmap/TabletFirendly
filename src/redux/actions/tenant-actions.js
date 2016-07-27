import {
  GLOBAL_FETCH_TENANT_REQUEST,
  GLOBAL_FETCH_TENANT_SUCCESS,
  GLOBAL_FETCH_TENANT_FAILURE
} from '../constants/tenant-constants';

import utils from '../../utils';


// Async Action creators
// Tenant
export function fetchTenantRequest(paramUrl) {
  return {
    type: GLOBAL_FETCH_TENANT_REQUEST,
    paramUrl
  };
}

export function fetchTenantSuccess(paramUrl, json) {
  return {
    type: GLOBAL_FETCH_TENANT_SUCCESS,
    paramUrl,
    tenant: json,
    receivedAt: Date.now()
  };
}

export function fetchTenantFailure(paramUrl, error) {
  return {
    type: GLOBAL_FETCH_TENANT_FAILURE,
    paramUrl,
    error
  };
}

export function fetchTenant(paramUrl) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang} = getState();

    const url = `${globalSettings.apiUrl}/papi/tenant/url/${paramUrl}`;
    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    const sInit = {
      method: 'GET',
      headers: sHeaders
    };

    dispatch(fetchTenantRequest(paramUrl));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          return dispatch(fetchTenantFailure(paramUrl, json));
        }
        return dispatch(fetchTenantSuccess(paramUrl, json));
      })
      .catch(error => {
        return dispatch(fetchTenantFailure(paramUrl, error));
      });
  };
}
