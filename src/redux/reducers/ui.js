import {
  GLOBAL_TOGGLE_MODAL,
  GLOBAL_SET_MODAL_VIEW
} from '../constants/ui-constants';

function globalUIReducer(state = {}, action) {
  switch (action.type) {

  case GLOBAL_TOGGLE_MODAL:
    return {
      ...state,
      isModalOpen: action.value
    };

  case GLOBAL_SET_MODAL_VIEW:
    return {
      ...state,
      modalView: action.value
    };

  default:
    return state;
  }
}

export default globalUIReducer;
