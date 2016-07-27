import {
  POST_ASPSETTINGS_REQUEST,
  POST_ASPSETTINGS_SUCCESS,
  POST_ASPSETTINGS_FAILURE
} from '../constants/aspSettings-constants';

// import utils from '../../../../utils';

// DATA - Async Action creators
// AspSettingss
export function postAspSettingsRequest(object, url) {
  return {
    type: POST_ASPSETTINGS_REQUEST,
    object,
    url
  };
}

export function postAspSettingsSuccess(json) {
  return {
    type: POST_ASPSETTINGS_SUCCESS,
    aspSettings: json,
    receivedAt: Date.now()
  };
}

export function postAspSettingsFailure(error) {
  return {
    type: POST_ASPSETTINGS_FAILURE,
    error
  };
}

export function postAspSettings() {
  return (dispatch, getState) => {
    const globalSettings = getState().globalSettings;
    const {topLevelId, locationId, levelId, moduleId, selectedMenuItem, locationLevelName} = globalSettings;

    const url = `/WebServices/Common/UtilityService.asmx/SetApplicationSettings`;
    let sHeaders = new Headers();
    sHeaders.append('Content-Type', 'application/json;charset=UTF-8');

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      credentials: 'same-origin',
      body: JSON.stringify({
        ApplicationSettings: {
          TopLevelId: topLevelId,
          LocationId: locationId,
          LevelId: levelId,
          ModuleId: moduleId,
          MenuItemId: selectedMenuItem.Id,
          LocationLevelName: locationLevelName
        }
      })
    };

    dispatch(postAspSettingsRequest(sInit, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(postAspSettingsFailure(json));
        } else {
          dispatch(postAspSettingsSuccess(json));
        }
      })
      .catch(error =>
        dispatch(postAspSettingsFailure(error))
      );
  };
}

export function clearAspGridSession() {
  return () => {
    console.log('clearAspGridSession sessionStorage removeGrid');
    sessionStorage.removeItem('GridViewID');
    sessionStorage.removeItem('GridSettings');
  };
}
