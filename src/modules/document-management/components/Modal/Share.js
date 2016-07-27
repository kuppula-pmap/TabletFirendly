// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Alert, Row, Col, Well } from 'react-bootstrap';
import Icon from 'react-fa';
import Select from 'react-select';
import ClipboardButton from 'react-clipboard.js';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';


// Define class.
class Share extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false
    };
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  confirmClipboardCopy() {
    this.setState({ showAlert: true });
  }

  handleAlertDismiss() {
    this.setState({ showAlert: false });
  }

  // Render method.
  render() {
    const { globalUi } = this.props;

    const textToCopy = 'https://bit.ly/abc123';

    const employeePicklistOptions = [
      { value: 'John Smith', label: 'John Smith', clearableValue: false },
      { value: 'Bob Roberts', label: 'Bob Roberts', clearableValue: false },
      { value: 'Janette Walls', label: 'Janette Walls', clearableValue: false },
    ];
    const selectNoResultsText = 'Sorry, the name you type cannot be found.';

    let styles = {
      alert: {
        height: this.state.showAlert ? 60 : 15,
        marginTop: this.state.showAlert ? 0 : -15,
        opacity: this.state.showAlert ? 1 : 0,
        transition: 'all .5s ease',
      },

      well: {
        marginBottom: 0,
      },

    };

    return (
      <Modal show={globalUi.isModalOpen}onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Share (Document Name)</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <small>
            <p>Downloaded copies of this document are <strong>Uncontrolled</strong>. Uncontrolled documents are for informational purposes only and will not be updated.</p>
          </small>

          <div style={styles.alert}>
            <Alert bsStyle="success" className="text-center" onDismiss={this.handleAlertDismiss.bind(this)}>
              <p>Copied to clipboard</p>
            </Alert>
          </div>

          <div className="form-group">
            <label className="control-label">Document Link:</label>
            <Row>
              <Col xs={9}>
                <Well bsSize="small" className="bg-info" style={styles.well}>
                  {textToCopy}
                </Well>
              </Col>
              <Col xs={3} className="text-center">
                <ClipboardButton
                  className="btn btn-info btn-block text-center"
                  data-clipboard-text={textToCopy}
                  onSuccess={this.confirmClipboardCopy.bind(this)}>
                  <Icon name="clipboard-o" /> Copy
                </ClipboardButton>
              </Col>
            </Row>
          </div>

          <div className="form-group">
            <label className="control-label required">Send to:</label>
            <Select
              name="form-control"
              placeholder="Find User"
              noResultsText={selectNoResultsText}
              value=""
              options={employeePicklistOptions}
            />
          </div>

          {/*
            // Hidden per Tina's email sent on 5/6/2016.
            <Input type="textarea" label="Comment:" maxLength="1000"/>
          */}

        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Close</Button>
          <Button bsStyle="success">Send</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
Share.propTypes = {
  globalUi: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi
});

// Export.
export default connect(mapStateToProps)(Share);
