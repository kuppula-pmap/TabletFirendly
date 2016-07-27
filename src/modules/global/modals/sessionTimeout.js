// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

// Global actions.
import { toggleModal } from '../../../redux/actions/ui-actions';
import { setSessionIsActive } from '../../../redux/actions/settings-actions';
import { postAspSettings } from '../../../redux/actions/aspSettings-actions';
import { postAspLegacySession } from '../../../redux/actions/aspLegacySession-actions';


// Define class.
class Logout extends React.Component {

  handleBlankHideClick(e) {
    e.preventDefault();
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  handleOkClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    // Update asp sessions.
    dispatch( postAspSettings() );
    dispatch( postAspLegacySession() );

    // Reset session activity.
    dispatch(setSessionIsActive(true));

    // Close modal.
    this.closeModal();
  }

  // Render method.
  render() {
    const { globalUi, shModuleLabels } = this.props;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblSessionTimeoutWanring = shModuleLabelsItems ? shModuleLabelsItems.lblSessionTimeoutWanring : null;
    const lblAreYouStillHere = shModuleLabelsItems ? shModuleLabelsItems.lblAreYouStillHere : null;
    const lblStillHere = shModuleLabelsItems ? shModuleLabelsItems.lblStillHere : null;

    return (
      <Modal bsSize="sm" show={globalUi.isModalOpen} onHide={this.handleBlankHideClick.bind(this)} backdrop="static">

        <Modal.Header>
          <Modal.Title>{lblSessionTimeoutWanring}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{lblAreYouStillHere}</p>
        </Modal.Body>

        <Modal.Footer>
          {/*
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Cancel</Button>
          */}
          <Button bsStyle="success" onClick={this.handleOkClick.bind(this)}>{lblStillHere}</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

// propTypes.
Logout.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(Logout);
