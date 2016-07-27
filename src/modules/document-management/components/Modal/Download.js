// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import DataInput from '../../../../components/DataForms/DataInput';
import ErrorMessage from '../../../../components/ErrorMessage';
import Loader from '../../../../components/Loader';

import utils from '../../../../utils';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import {
  fetchPreviewDocument,
  resetPreviewDocument,
} from '../../redux/actions/previewDocument-actions';
import { postDocumentCheckout } from '../../redux/actions/docCheckout-actions';


// Define class.
class Download extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDownload: false,
      showCheckbox: false,
      checkOutDocument: false,
    };
  }

  componentWillMount() {
    // Reset dmPreviewDocument (items) reducer.
    this.props.dispatch(resetPreviewDocument());
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      dmDocument,
      // dmDownloadDocument,
      dmPreviewDocument
    } = nextProps;
    const { startDownload } = this.state;

    // Document data.
    const documentData = dmDocument.items ? dmDocument.items : null;
    const documentActions = documentData.Actions ? documentData.Actions.Ellipsis : [];
    const isPublishOnlyPDFs = documentData.IsPublishOnlyPDFs ? documentData.IsPublishOnlyPDFs : null;
    // const downloadLink = documentData ? documentData.DownloadLink : null;
    const isLocked = documentData.IsLocked;

    // console.log('documentActions:', documentActions);

    // Show/hide Check Out checkbox field.
    if (documentActions) {
      let showCheckbox = false;
      documentActions.forEach(action => {
        // console.log('action.Id:', action.Id, typeof action.Id);
        if (action.Id === 'CheckOut' && !isLocked) {
          // console.log('showCheckbox: true');
          showCheckbox = true;
        }
      });
      this.setState({ showCheckbox });
    }

    // FILE DOWNLOAD:

    // Preview data.
    const previewData = dmPreviewDocument.items ? dmPreviewDocument.items : null;
    const downloadAsPDFLink = previewData ? previewData.downloadAsPDFLink : null;
    const downloadAsOriginalLink = previewData ? previewData.downloadAsOriginalLink : null;

    // console.log(downloadDocument);
    console.log(previewData);

    if (startDownload && previewData && !dmPreviewDocument.isFetching) {
      const saveUrl = isPublishOnlyPDFs ? downloadAsPDFLink : downloadAsOriginalLink;

      console.log('DOWNLOAD FILE:', saveUrl);

      // Save file.
      utils.downloadDocument( saveUrl );

      // Reset this.state.startDownload.
      this.setState({ startDownload: false });

      // Close modal.
      dispatch(toggleModal(false));
    }
  }

  downloadDocument() {
    const { dispatch, dmDocument } = this.props;
    const { checkOutDocument } = this.state;

    // Reset dmDownloadDocument reducer.
    // dispatch(resetDownloadDocument());

    // Document data.
    const documentData = dmDocument.items ? dmDocument.items : null;
    // const downloadApiLink = documentData.DownloadLink;
    const targetVersionUid = documentData.TargetVersionUid;
    const uid = documentData ? documentData.Uid : null;

    // Checkout the document if the checkbox is selected.
    if (checkOutDocument && uid) dispatch(postDocumentCheckout(uid));

    // Make api call for server to initiate the browser to download the physical file.
    // dispatch(fetchDownloadDocument(downloadApiLink));

    // Request to record download action in database.
    dispatch(fetchPreviewDocument(targetVersionUid, 'download'));

    // Set startDownload when user clicks the Download button.
    this.setState({ startDownload: true });
  }

  handleCheckboxClick(e) {
    const value = e.target.checked;
    // console.log('value:', value);
    this.setState({ checkOutDocument: value });
  }

  closeModal() {
    const { dispatch } = this.props;

    // Reset this.state.
    this.setState({
      startDownload: false,
      showCheckbox: false,
      checkOutDocument: false,
    });

    // Close modal.
    dispatch(toggleModal(false));
  }


  // Render method.
  render() {
    const { globalUi, dmPreviewDocument } = this.props;
    const { startDownload, showCheckbox } = this.state;

    // console.log('showCheckbox:', showCheckbox);

    // Preview data.
    const didInvalidate = dmPreviewDocument.didInvalidate ? dmPreviewDocument.didInvalidate : null;
    const previewDataError = dmPreviewDocument.error ? dmPreviewDocument.error : null;

    return (
      <Modal show={globalUi.isModalOpen} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Download</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {didInvalidate ?
            <div className="sidebar-details">
              <ErrorMessage data={previewDataError} />
            </div>
          : null}

          {showCheckbox ?
            <DataInput type="checkbox" label="Check Out File" onChange={this.handleCheckboxClick.bind(this)} />
          : null}

          <small>
            <p>Downloaded copies of this document are <strong>Uncontrolled</strong>. Uncontrolled documents are for informational purposes only and will not be updated.</p>
          </small>

        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Close</Button>

          {startDownload ?
            <Button bsStyle="success" disabled>
              <Loader dots />
            </Button>
          :
            <Button bsStyle="success" onClick={this.downloadDocument.bind(this)}>Download</Button>
          }

        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
Download.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  dmPreviewDocument: React.PropTypes.object,
  dmDownloadDocument: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  dmDocument: state.dmDocument,
  dmPreviewDocument: state.dmPreviewDocument,
  dmDownloadDocument: state.dmDownloadDocument,
});

// Export.
export default connect(mapStateToProps)(Download);
