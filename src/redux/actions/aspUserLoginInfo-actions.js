import {
  FETCH_ASPUSERLOGININFO_REQUEST,
  FETCH_ASPUSERLOGININFO_SUCCESS,
  FETCH_ASPUSERLOGININFO_FAILURE
} from '../constants/aspUserLoginInfo-constants';

// import utils from '../../../../utils';

// DATA - Async Action creators
// AspUserLoginInfos
export function fetchAspUserLoginInfoRequest(object, url) {
  return {
    type: FETCH_ASPUSERLOGININFO_REQUEST,
    object,
    url
  };
}

export function fetchAspUserLoginInfoSuccess(json) {
  return {
    type: FETCH_ASPUSERLOGININFO_SUCCESS,
    aspUserLoginInfo: json,
    receivedAt: Date.now()
  };
}

export function fetchAspUserLoginInfoFailure(error) {
  return {
    type: FETCH_ASPUSERLOGININFO_FAILURE,
    error
  };
}

export function fetchAspUserLoginInfo() {
  return (dispatch) => {
    const url = `/WebServices/Foundation/UserService.asmx/GetUserLoggedinInformation`;
    let sHeaders = new Headers();
    sHeaders.append('Content-Type', 'application/json');

    const sInit = {
      method: 'POST',
      headers: sHeaders,
      credentials: 'same-origin',
      body: JSON.stringify({})
    };

    dispatch(fetchAspUserLoginInfoRequest(sInit, url));

    return fetch(url, sInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          return dispatch(fetchAspUserLoginInfoFailure(json));
        }
        return dispatch(fetchAspUserLoginInfoSuccess(json));
      })
      .catch(error => {
        window.location = '/';
        return dispatch(fetchAspUserLoginInfoFailure(error));
      });
  };
}
