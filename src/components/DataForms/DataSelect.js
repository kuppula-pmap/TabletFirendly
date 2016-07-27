// Dependencies.
import React from 'react';
import { Well } from 'react-bootstrap';

// UI components
import Select from 'react-select';


// Define class.
class DataSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { validateField, handleErrorCallback, isRequired, log, label } = nextProps;
    const fieldValue = this.refs.formField.props.value;

    if (log) {
      console.log('======================================');
      console.log('DataSelect:', label);
      console.log('validateField:', validateField);
      console.log('isRequired:', isRequired);
      console.log('fieldValue:', fieldValue);
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    }

    if (validateField && isRequired) {
      if (!fieldValue) {
        // Turn isValid to false.
        this.setState({ isValid: false });

        // Call parent error handling callback.
        handleErrorCallback();
      }
    }
  }

  // Reset error styling from a form field.
  resetFieldError() {
    this.setState({ isValid: true });
  }

  // Render method.
  render() {
    const {
      label,
      text,
      well,
      options,
      placeholder,
      isRequired,
      multi,
      noFormat,
      showAsterisk,
    } = this.props;
    const { isValid } = this.state;

    const styles = {
      asterisk: {
        position: 'absolute',
        top: -2,
        left: 6,
      },
    };

    const selectNoResultsText = 'Sorry, the name you type cannot be found.';
    const additionalText = text ? <p><small className="text-muted">{text}</small></p> : null;

    let select = (
      <div>

        {additionalText}

        {showAsterisk ?
          <span className="text-danger" style={styles.asterisk}>*</span>
        : null}

        <Select {...this.props}
          ref="formField"
          name="form-control"
          options={options}
          placeholder={placeholder}
          isRequired={isRequired}
          multi={multi}
          noResultsText={selectNoResultsText}
          valueKey="Id"
          labelKey="Description"
          onFocus={this.resetFieldError.bind(this)}
        />

      </div>
    );

    const wellSelect = well ? <Well bsSize="sm">{select}</Well> : select;

    return (
      !noFormat ?
        <div className={`form-group ${!isValid ? 'has-error' : ''}`} onClick={this.resetFieldError.bind(this)}>

          {label ? <label className={isRequired ? 'control-label required' : 'control-label'} >{label}</label> : ''}

          {wellSelect}

        </div>
      :
        wellSelect
    );
  }
}

// Validation.
DataSelect.propTypes = {
  label: React.PropTypes.string,
  text: React.PropTypes.string,
  well: React.PropTypes.bool,
  showAsterisk: React.PropTypes.bool,
  options: React.PropTypes.array,
  placeholder: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  multi: React.PropTypes.bool,
  validateField: React.PropTypes.bool,
  handleErrorCallback: React.PropTypes.func,
  noFormat: React.PropTypes.bool,
  log: React.PropTypes.bool,
};

// Export.
export default DataSelect;
