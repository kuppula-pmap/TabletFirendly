// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Row, Col, Button, Modal, ProgressBar } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Icon from 'react-fa';

// Global actions.
import {
  toggleModal
 } from '../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import { postDocumentCheckin } from '../../redux/actions/docCheckin-actions';
import { uploadDocument, resetUploadDocument } from '../../redux/actions/upload-actions';
import { dmValidateFormField } from '../../redux/actions/formValidation-actions';

import utils from '../../../../utils';

import DataInput from '../../../../components/DataForms/DataInput';

// Define class.
class CheckIn extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
    this.state = {
      confirmed: true,
      dropzone: false,
      file: {},
      formErrors: 99,
      fileDroped: false,
      versionComment: '',
      isFileUploaded: false
    };

    this.resetState = this.resetState.bind(this);
  }

  componentDidUpdate() {
    const { dispatch, dmDocument, dmUpload } = this.props;
    const { userSubmittedForm, formErrors, file, versionComment } = this.state;
    const documentData = dmDocument.items ? dmDocument.items : [];
    const { isFetching, didInvalidate, uploadedItems, requestedItems } = dmUpload;
    const docId = documentData.Uid;
    const folderId = documentData.ParentFolderUid;
    // Pass checkin for Version Type
    const versionType = 'checkin';

    // NOTE: If the uploadedItems and requestedItems are equal, then you can upload.
    //            The reducer resets on every close and mounting of this component.
    const canUpload = uploadedItems.length === requestedItems.length;

    // Check if user click on the Save button.
    if (userSubmittedForm) {
      // Check if the form is valid, and the uploader is not currently fetching.
      if ( !formErrors && versionComment.length && !isFetching && !didInvalidate && canUpload ) {
        // Persist checkin
        dispatch(uploadDocument(file, docId, folderId, versionComment, versionType));
      } else {
        return false;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, dmUpload, dmDocument } = nextProps;
    const { isFileUploaded } = this.state;
    const uploadedDocumentData = dmUpload.items ? dmUpload.items[0] : null;
    // Checkin reducer is the same as the document reducer.
    const { isFetching } = dmDocument;

    if (uploadedDocumentData && !isFileUploaded && !isFetching) {
      this.setState({
        isFileUploaded: true
      });
      // Reset form field validation.
      dispatch(dmValidateFormField(false));

      // Grab the last version from the returned upload success object.
      const uid = uploadedDocumentData.Uid;
      const checkIn = new Promise((resolve, reject) => {
        if (uid) {
          resolve(uid);
        } else {
          reject('No Uid available');
        }
      });

      checkIn.then((id) => {
        dispatch(postDocumentCheckin(id));
      }).
      then(() => {this.closeModal();}).
      catch((error) => console.error('error :', error));
    }
  }

  closeModal() {
    const { dispatch } = this.props;
    this.resetState();
    dispatch(resetUploadDocument());
    dispatch(toggleModal(false));
  }

  // Dropzone.
  onDrop(uploadedFiles) {
    this.setState({
      fileDroped: true,
      file: uploadedFiles[0]
    });
  }

  handleContinueClick() {
    this.setState({
      dropzone: true,
      confirmed: false
    });
  }

  handleErrorCallback() {
    const { dispatch, dmFormValidation } = this.props;
    const { formErrors } = this.state;

    // Only turn false if it's not already.
    if (dmFormValidation.validateField) dispatch(dmValidateFormField(false));
    this.setState({ formErrors: formErrors + 1 });
  }

  handleUploadClick() {
    const { dispatch } = this.props;

    // Dispatch to tell form fields to check themselves.
    dispatch( dmValidateFormField(true) );

    // Reset form errors counter.
    this.setState({ formErrors: 0 });

    // Set that the user has submitted the form.
    this.setState({ userSubmittedForm: true });
  }

  handleChangeFileClick() {
    this.setState({
      fileDroped: false,
    });
  }

  handleReasonEntry(e) {
    this.setState({
      versionComment: e.target.value
    });
  }

  resetState() {
    this.setState({
      confirmed: true,
      dropzone: false,
      file: {},
      formErrors: 99,
      fileDroped: false,
      versionComment: '',
      isFileUploaded: false,
    });
  }

  // Render method.
  render() {
    const { globalUi, dmDocument, dmUpload, dmFormValidation } = this.props;
    const { validateField } = dmFormValidation;
    const { confirmed, dropzone, versionComment, file, formErrors, fileDroped } = this.state;
    const { isFetching, didInvalidate, error } = dmUpload;
    const documentData = dmDocument ? dmDocument.items : [];
    const fileName = file.name;
    const filenameIcon = utils.filenameIcon(fileName);

    const title = documentData.Title;

    const progressBar = isFetching ? <Row><Col sm={12}><ProgressBar bsStyle="primary" label="Uploading" active now={100} /></Col></Row> : '';

    return (
      <Modal show={globalUi.isModalOpen} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Check In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { formErrors === 1 ? <Alert bsStyle="danger"><strong>'Reason for Change' should not be empty</strong></Alert> : null }
          { didInvalidate ? <Alert bsStyle="danger"><strong>{'Error: ' + error.ErrorMessage}</strong></Alert> : null }
          { confirmed ?
          <p>You are about to check in <span className="text-primary">{title}</span>.
          Others will now be able to edit.</p>
          :
          ''
          }
          { dropzone && !fileDroped ?
          <Dropzone id="Upload_Dropzone" ref="dropzone" onDrop={this.onDrop.bind(this)} className="dropzone" multiple={false}>
            <p>
              <Icon name="upload" className="fa-2x text-success" />
            </p>
            Drag and drop files here
            <br className="hidden-xs"/>&nbsp;
            or click to <a>select files</a> from your computer.
          </Dropzone>
            :
            ''
          }
          { fileDroped ?
          <div >
            <Button componentClass="div" bsStyle="info" style={{float: 'right'}} onClick={this.handleChangeFileClick.bind(this)} >Change File</Button>
            <Button componentClass="div" bsStyle="link" style={{padding: '10px'}}>
             <Icon name={filenameIcon} className="fa-lg" />
             {' '}
             {fileName}
            </Button>
            <DataInput
              type="textarea"
              label="Reason for Change:"
              maxLength="1000"
              value={versionComment}
              onChange={this.handleReasonEntry.bind(this)}

              // Form validation.
              labelClassName="required"
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
              />
          </div >
          :
          ''
          }
          { progressBar }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Close</Button>
          { confirmed ?
          <Button bsStyle="primary" onClick={this.handleContinueClick.bind(this)}>Continue</Button> :
          <Button bsStyle="primary" onClick={this.handleUploadClick.bind(this)}>Upload</Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
CheckIn.propTypes = {
  dispatch: React.PropTypes.func,
  dmUpload: React.PropTypes.object,
  globalUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  dmFormValidation: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  dmDocument: state.dmDocument,
  dmUpload: state.dmUpload,
  dmFormValidation: state.dmFormValidation,
});

// Export.
export default connect(mapStateToProps)(CheckIn);
