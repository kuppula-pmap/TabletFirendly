// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

// Global actions.
import {
  toggleModal,
  // setRefreshFilterList
} from '../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import { deleteDocument } from '../../redux/actions/document-delete-actions';


// Define class.
class Delete extends React.Component {

  closeModal() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  handleDeleteClick() {
    const { dispatch, dmDocument } = this.props;
    const documentData = dmDocument ? dmDocument.items : [];
    const docUid = documentData.Uid;
    // Delete document.
    if (docUid) {
      dispatch(deleteDocument(docUid));
      // dispatch(setRefreshFilterList(true));
      dispatch(toggleModal(false));
    }
  }

  // Render method.
  render() {
    const { globalUi, dmDocument } = this.props;
    const documentData = dmDocument ? dmDocument.items : [];

    const title = documentData.Title;

    return (
      <Modal show={globalUi.isModalOpen} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm : Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to Delete <span className="text-primary">{title}</span>.</p>
          <p>Are you sure you want to continue?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Cancel</Button>
          <Button bsStyle="danger" onClick={this.handleDeleteClick.bind(this)}>Delete Permanently</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
Delete.propTypes = {
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
export default connect(mapStateToProps)(Delete);
