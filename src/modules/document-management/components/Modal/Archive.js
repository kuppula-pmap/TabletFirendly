// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import { postApprovalWorkflow } from '../../redux/actions/approvalWorkflow-post-actions';

import utils from '../../../../utils';

// Define class.
class Archive extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  closeModalClose() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  closeModalContinue() {
    const { dispatch, dmDocument, globalSettings } = this.props;
    const cmd = utils.getWorkflowCommand(globalSettings, dmDocument, 'Archive');
    // Archive document.
    if (cmd) {
      dispatch(postApprovalWorkflow(cmd));
      dispatch(toggleModal(false));
    }
  }

  // Render method.
  render() {
    const { globalUi, dmDocument } = this.props;
    const documentData = dmDocument ? dmDocument.items : [];

    const title = documentData.Title;

    return (
      <Modal show={globalUi.isModalOpen} onHide={this.closeModalClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm : Archive</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You are about to Archive <span className="text-primary">{title}</span>.
            <br />
            Are you sure you want to continue?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModalClose.bind(this)}>Close</Button>
          <Button bsStyle="primary" onClick={this.closeModalContinue.bind(this)}>Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
Archive.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  dmDocument: state.dmDocument,
  globalSettings: state.globalSettings,
});

// Export.
export default connect(mapStateToProps)(Archive);
