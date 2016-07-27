import {
  SH_BREADCRUMBS_REQUEST,
  SH_BREADCRUMBS_SUCCESS,
  SH_BREADCRUMBS_FAILURE
} from '../constants/breadcrumbs-constants';

import utils from '../../../../utils';

// DATA - Async Action creators
// ModuleMenus
export function fetchBreadcrumbsRequest(menuItemId, moduleId, url) {
  return {
    type: SH_BREADCRUMBS_REQUEST,
    menuItemId,
    moduleId,
    url
  };
}

export function fetchBreadcrumbsSuccess(json) {
  return {
    type: SH_BREADCRUMBS_SUCCESS,
    breadcrumbs: json,
    receivedAt: Date.now()
  };
}

export function fetchBreadcrumbsFailure(error) {
  return {
    type: SH_BREADCRUMBS_FAILURE,
    error
  };
}

export function fetchBreadcrumbs(menuItemId, menuName) {
  // console.log(isNaN(menuItemId), menuItemId);
  return (dispatch, getState) => {
    if (isNaN(menuItemId)) {
      dispatch(fetchBreadcrumbsSuccess( [{ Id: menuItemId, preferneceBreadcrumbName: menuName }] ));
    } else {
      const {globalSettings, globalLang, shSettings} = getState();

      const url = `${globalSettings.apiUrl}/papi/modulemenus/breadcrumbitems?selectedMenuItemId=${menuItemId}`;
      const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
      // Custom settings.
      sHeaders.set('ModuleId', shSettings.moduleId);

      const sInit = {
        method: 'GET',
        headers: sHeaders
      };

      dispatch(fetchBreadcrumbsRequest(menuItemId, shSettings.moduleId, url));

      return fetch(url, sInit)
        .then(response => response.json())
        .then(json => {
          if (json.ErrorMessage) {
            dispatch(fetchBreadcrumbsFailure(json));
          } else {
            dispatch(fetchBreadcrumbsSuccess(json));
          }
        })
        .catch(error =>
          dispatch(fetchBreadcrumbsFailure(error))
        );
    }
  };
}
