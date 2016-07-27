// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';


// Define class.
class Logout extends React.Component {

  handleOkClick(e) {
    e.preventDefault();
    window.self.close();
    // window.location.replace('/');
    return false;
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  // Render method.
  render() {
    const { globalUi } = this.props;

    return (
      <Modal bsSize="sm" show={globalUi.isModalOpen} onHide={this.closeModal.bind(this)}>

        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Need logout text from Adi...</p>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Cancel</Button>
          <Button bsStyle="danger" onClick={this.handleOkClick.bind(this)}>Logout</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

// propTypes.
Logout.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi
});

// Export.
export default connect(mapStateToProps)(Logout);
