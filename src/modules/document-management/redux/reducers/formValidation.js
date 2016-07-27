import {
  DM_IS_FORM_VALID,
  DM_VALIDATE_FORM_FIELD,
} from '../constants/formValidation-constants';

function dmFormValidation(state = {}, action) {
  switch (action.type) {
  case DM_IS_FORM_VALID:
    return {
      ...state,
      isFormValid: action.value
    };
  case DM_VALIDATE_FORM_FIELD:
    return {
      ...state,
      validateField: action.value
    };

  default:
    return state;
  }
}

export default dmFormValidation;
