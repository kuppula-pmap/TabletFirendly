import {
  GLOBAL_TOGGLE_MODAL,
  GLOBAL_SET_MODAL_VIEW
} from '../constants/ui-constants';


// UI - Sync Action creators
export function toggleModal(value) {
  return { type: GLOBAL_TOGGLE_MODAL, value };
}

export function setModalView(value) {
  return { type: GLOBAL_SET_MODAL_VIEW, value };
}

function getInnerFrame(win) {
  win = win || window;
  if (win.frames.length > 0) {
    return getInnerFrame(win.frames[0]);
  }
  return win;
}

function getDirtyObject() {
  // let _isCurrentPageDirty = false;
  let dirtyObj = null;
  let iframe = document.getElementsByTagName('iFrame');
  iframe = iframe ? iframe[0] : null;
  if (iframe != null) {
    let innerDoc = iframe.contentWindow;

    // If any fancy boxes are opened then it will go in to the below while loop
    while (innerDoc !== undefined && innerDoc.document.getElementById('fancybox-frame') !== null && innerDoc.document.getElementById('fancybox-frame') !== undefined) {
      // This loop checks the current fancy box.
      innerDoc = innerDoc.document.getElementById('fancybox-frame').contentWindow;
    }

    if (innerDoc !== undefined && innerDoc.isDirty === true) {
      // _isCurrentPageDirty = true;
      dirtyObj = innerDoc;
    } else if (innerDoc === undefined || innerDoc.isDirty === undefined) {
      // This condition is for checking the dirty for inner documents(inner iframes / inner fancy boxes) which were opened in pages like having left side tree structured data
      let innerFrame = getInnerFrame(window);
      // _isCurrentPageDirty = innerFrame !== undefined && innerFrame.isDirty === true;
      dirtyObj = (innerFrame !== undefined && innerFrame.isDirty === true) ? innerFrame : null;
    }
  }

  return dirtyObj;
}

export function isDirty() {
  let _isDirty = false;
  let dirtyObj = getDirtyObject();
  _isDirty = dirtyObj !== null && dirtyObj.isDirty;
  return _isDirty;
}

export function eraseDirty() {
  let dirtyObj = getDirtyObject();
  if (dirtyObj !== null) {
    dirtyObj.isDirty = false;
  }
}
