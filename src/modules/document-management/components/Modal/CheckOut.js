// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import utils from '../../../../utils';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import { postDocumentCheckout } from '../../redux/actions/docCheckout-actions';
import {
  fetchPreviewDocument,
  resetPreviewDocument,
} from '../../redux/actions/previewDocument-actions';


// Define class.
class CheckOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDownload: false,
    };
  }

  componentWillMount() {
    // Reset dmPreviewDocument (items) reducer.
    this.props.dispatch(resetPreviewDocument());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, dmDocument, dmPreviewDocument } = nextProps;
    const { startDownload } = this.state;

    // Document data.
    const documentData = dmDocument.items ? dmDocument.items : null;
    const isPublishOnlyPDFs = documentData.IsPublishOnlyPDFs ? documentData.IsPublishOnlyPDFs : null;

    // Preview data.
    const previewData = dmPreviewDocument.items ? dmPreviewDocument.items : null;
    const downloadAsPDFLink = previewData ? previewData.downloadAsPDFLink : null;
    const downloadAsOriginalLink = previewData ? previewData.downloadAsOriginalLink : null;

    // console.log(downloadDocument);
    // console.log(previewData);

    if (startDownload && previewData && !dmPreviewDocument.isFetching) {
      const saveUrl = isPublishOnlyPDFs ? downloadAsPDFLink : downloadAsOriginalLink;

      // console.log('DOWNLOAD FILE:', saveUrl);

      // Save file.
      utils.downloadDocument( saveUrl );

      // Reset this.state.startDownload.
      this.setState({ startDownload: false });

      // Close modal.
      dispatch(toggleModal(false));
    }
  }

  closeModalClose() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  handleCheckOutClick() {
    const { dispatch, dmDocument } = this.props;

    // Document data.
    const documentData = dmDocument.items ? dmDocument.items : null;
    const uid = documentData ? documentData.Uid : null;
    const targetVersionUid = documentData.TargetVersionUid;

    if (uid) {
      // Check out document.
      dispatch(postDocumentCheckout(uid));

      // Request to record download action in database.
      dispatch(fetchPreviewDocument(targetVersionUid, 'download'));

      // Set startDownload when user clicks the Continue button.
      this.setState({ startDownload: true });
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
          <Modal.Title>Check Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to check out <span className="text-primary">{title}</span>.
          Others will not be able to edit until you check the file back in.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModalClose.bind(this)}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleCheckOutClick.bind(this)}>Continue</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
CheckOut.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  dmPreviewDocument: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  dmDocument: state.dmDocument,
  dmPreviewDocument: state.dmPreviewDocument,
});

// Export.
export default connect(mapStateToProps)(CheckOut);
