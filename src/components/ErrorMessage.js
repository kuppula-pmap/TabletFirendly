import React from 'react';
import { Alert } from 'react-bootstrap';


// Define class.
class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: true,
    };
  }

  handleAlertDismiss() {
    this.setState({ showAlert: false });
  }

  // Render method.
  render() {
    const { data, align, codeException } = this.props;
    const { showAlert } = this.state;

    const errorCode = data ? data.HttpStatusCode : null;
    const errorStatus = data ? data.HttpStatus : null;
    const errorMessage = data ? data.ErrorMessage : null;

    // Remove Alert if showAlert = false.
    if (!showAlert) return <span/>;

    return (
      <div>
        {errorCode !== codeException ?
          <Alert bsStyle="danger" className={`text-${align}`} onDismiss={this.handleAlertDismiss.bind(this)}>
            <p><strong>{errorStatus} {errorCode}</strong></p>
            <p title={errorMessage} className="ellipsis-overflow"><small>{errorMessage}</small></p>
          </Alert>
        : null}
      </div>
    );
  }
}

// Validation.
ErrorMessage.propTypes = {
  data: React.PropTypes.object,
  align: React.PropTypes.string,
  codeException: React.PropTypes.number,
};

ErrorMessage.defaulProps = {
  align: 'left',
};

// Export.
export default ErrorMessage;
