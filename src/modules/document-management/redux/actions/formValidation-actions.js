import {
  DM_IS_FORM_VALID,
  DM_VALIDATE_FORM_FIELD,
} from '../constants/formValidation-constants';


// DM.
export function dmSetIsFormValid(value) {
  return {
    type: DM_IS_FORM_VALID,
    value
  };
}

export function dmValidateFormField(value) {
  return {
    type: DM_VALIDATE_FORM_FIELD,
    value
  };
}
