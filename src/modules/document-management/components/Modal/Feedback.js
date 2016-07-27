// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';


// Define class.
class Feedback extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  // Render method.
  render() {
    const { globalUi } = this.props;

    return (
      <Modal show={globalUi.isModalOpen} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the Feedback Modal</p>

        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Close</Button>
          {/*
            <Button bsStyle="success">Feedback</Button>
          */}
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
Feedback.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi
});

// Export.
export default connect(mapStateToProps)(Feedback);
