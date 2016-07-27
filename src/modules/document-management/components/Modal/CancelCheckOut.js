// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import { postDocumentCancelCheckout } from '../../redux/actions/docCancelCheckout-actions';

// Define class.
class CancelCheckOut extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  closeModalClose() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  closeModalContinue() {
    const { dispatch, dmDocument } = this.props;
    const {Uid} = dmDocument.items;
    dispatch(postDocumentCancelCheckout(Uid));
    dispatch(toggleModal(false));
  }

  // Render method.
  render() {
    const { globalUi, dmDocument } = this.props;
    const documentData = dmDocument ? dmDocument.items : [];

    const title = documentData.Title;

    return (
      <Modal show={globalUi.isModalOpen} onHide={this.closeModalClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Check Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to cancel the check out for <span className="text-primary">{title}</span>.
          Others will now be able to edit.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModalClose.bind(this)}>Close</Button>
          <Button bsStyle="primary" onClick={this.closeModalContinue.bind(this)}>Continue</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
CancelCheckOut.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  dmDocument: state.dmDocument,
});

// Export.
export default connect(mapStateToProps)(CancelCheckOut);
