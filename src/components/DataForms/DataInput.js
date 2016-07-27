// Dependencies.
import React from 'react';
import { Input } from 'react-bootstrap';


// Define class.
class DataInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      errorMessage: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { validateField, log, textEqualTo, textNotEqualTo } = nextProps;
    const refInput = this.refs.formField;
    // const fieldValue = refInput.refs.input.value;

    if (validateField) {
      const { type, min } = refInput.props;
      let { value } = refInput.props;

      if (type === 'textarea') {
        value = refInput.refs.input.value;
      }

      if (log) {
        console.log('======================================');
        console.log('DataInput:', type);
        console.log('refInput:', refInput);
        console.log('validateField:', validateField);
        console.log('value:', value);
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
      }

      // Chack if field is empty.
      if (!value) return this.fieldError();
      // if (!fieldValue) return this.fieldError();

      if (refInput && type === 'number') {
        // console.log(refInput);
        // console.log(type);

        // Make sure value is less than min.
        if (value < min) {
          // this.setState({ errorMessage: `You must enter a value higher than ${min}.` });
          return this.fieldError();
        }
      }

      // textNotEqualTo.
      if (textNotEqualTo) {
        if (value === textNotEqualTo) return this.fieldError();
      }

      // textEqualTo.
      if (textEqualTo) {
        if (value !== textEqualTo) return this.fieldError();
      }
    }
  }

  fieldError() {
    const { handleErrorCallback } = this.props;

    // Turn isValid to false.
    this.setState({ isValid: false });

    // Call parent error handling callback.
    handleErrorCallback();
  }

  // Reset error styling from a form field.
  resetFieldError() {
    this.setState({ isValid: true });
  }

  // Render method.
  render() {
    const { isValid, errorMessage } = this.state;

    return (
      <div className={`${!isValid ? 'has-error' : ''}`} onClick={this.resetFieldError.bind(this)}>
        <Input {...this.props} ref="formField" onFocus={this.resetFieldError.bind(this)} />
        {errorMessage ?
           <div><small className="text-danger">{errorMessage}</small></div>
         : null}
      </div>
    );
  }
}

// Validation.
DataInput.propTypes = {
  validateField: React.PropTypes.bool,
  log: React.PropTypes.bool,
  textEqualTo: React.PropTypes.string,
  textNotEqualTo: React.PropTypes.string,
  handleErrorCallback: React.PropTypes.func,
};

// Export.
export default DataInput;
