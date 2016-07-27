import {
  DM_FILE_UPLOAD_DOCUMENT_REQUEST,
  DM_FILE_UPLOAD_DOCUMENT_SUCCESS,
  DM_FILE_UPLOAD_DOCUMENT_FAILURE,
  DM_FILE_UPLOAD_DOCUMENT_RESET
} from '../constants/upload-constants';

import utils from '../../../../utils';

// Upload Async Action Creators.
export function uploadDocumentRequest(file, moduleId, url) {
  return {
    type: DM_FILE_UPLOAD_DOCUMENT_REQUEST,
    file,
    moduleId,
    url
  };
}

export function uploadDocumentSuccess(json) {
  return {
    type: DM_FILE_UPLOAD_DOCUMENT_SUCCESS,
    upload: json,
    receivedAt: Date.now()
  };
}

export function uploadDocumentFailure(error) {
  return {
    type: DM_FILE_UPLOAD_DOCUMENT_FAILURE,
    error
  };
}

export function resetUploadDocument() {
  return {
    type: DM_FILE_UPLOAD_DOCUMENT_RESET,
  };
}

export function uploadDocument(file, docId, folderId, versionComment, versionType) {
  return (dispatch, getState) => {
    const {globalSettings, globalLang, dmSettings} = getState();

    let url = `${globalSettings.apiUrl}/papi/dm/document/upload`;

    if (typeof docId !== 'undefined' && docId.length ) {
      url = url.concat(`?documentId=${docId}`);
    }
    if (typeof folderId !== 'undefined' && folderId.length) {
      url = url.concat(`&folderId=${folderId}`);
    }
    if (typeof versionComment !== 'undefined' && versionComment.length) {
      url = url.concat(`&versionComment=${versionComment}`);
    }
    if (typeof versionType !== 'undefined' && versionType.length) {
      url = url.concat(`&versionType=${versionType}`);
    }

    const sHeaders = utils.getRestHeaders(globalSettings, globalLang);
    // Custom settings.
    sHeaders.set('ModuleId', dmSettings.moduleId);
    sHeaders.set('Accept', '*/*');
    // Content-Type needs to be removed in order for the multipart/form-data to work.
    // Reference here: http://stackoverflow.com/questions/19178813/sending-multipart-mixed-content-with-postman-chrome-extension?answertab=active#tab-top
    sHeaders.delete('Content-Type');

    const sBody = new FormData();
    // For each file, append the filename and file in the Form body
    // files.forEach((file) => {
    //   sBody.append(file.name, file);
    // });
    sBody.append(file.name, file);

    const uploadInit = {
      method: 'POST',
      headers: sHeaders,
      body: sBody
    };

    dispatch(uploadDocumentRequest(file, dmSettings.moduleId, url));

    return fetch(url, uploadInit)
      .then(response => response.json())
      .then(json => {
        if (json.ErrorMessage) {
          dispatch(uploadDocumentFailure(json));
        } else {
          dispatch(uploadDocumentSuccess(json));
        }
      })
      .catch(error =>
        dispatch(uploadDocumentFailure(error))
      );
  };
}
