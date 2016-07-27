// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
// import { Alert, Row, Col, Button, Modal, Input, ProgressBar } from 'react-bootstrap';
import { Alert, Button, Modal, ProgressBar } from 'react-bootstrap';
import Icon from 'react-fa';
import Dropzone from 'react-dropzone';

// Global actions.
import { toggleModal } from '../../../../redux/actions/ui-actions';
import { dmValidateFormField } from '../../redux/actions/formValidation-actions';
import { fetchDocument } from '../../redux/actions/document-actions';
// import { fetchPreviewDocument } from '../../redux/actions/previewDocument-actions';
import { uploadDocument, resetUploadDocument } from '../../redux/actions/upload-actions';

// Utils.
import utils from '../../../../utils';

// Document Management constants.
import {
  DM_RIGHT_PANEL_DETAIL,
  // DM_CONTENT_AREA_PREVIEW
} from '../../redux/constants/ui-constants';

// Document Management actions.
import {
  setRightPanelAreaView,
  // setContentAreaView
} from '../../redux/actions/ui-actions';

import DataInput from '../../../../components/DataForms/DataInput';

// Define class.
class UploadNewVersion extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
    this.state = {
      randomNum: Math.floor((Math.random() * 5) + 1),
      progress: 20,
      versionType: 'Minor',
      versionComment: '',
      file: {},
      dropzone: false,
      uploadedNewVersion: false,
      isFileUploaded: false,
      userSubmittedForm: false,
      formErrors: 99,
    };

    this.resetState = this.resetState.bind(this);
  }

  componentDidUpdate() {
    const { dispatch, dmDocument, dmUpload } = this.props;
    const { userSubmittedForm, formErrors, file, versionComment, versionType } = this.state;
    const documentData = dmDocument.items ? dmDocument.items : [];
    const { isFetching, didInvalidate, uploadedItems, requestedItems } = dmUpload;
    const docId = documentData.Uid;
    const folderId = documentData.ParentFolderUid;

    // NOTE: If the uploadedItems and requestedItems are equal, then you can upload.
    // The reducer resets on every close and mounting of this component.
    const canUpload = uploadedItems.length === requestedItems.length;

    // Check if user click on the Save button.
    if (userSubmittedForm) {
      // console.log('formErrors:', formErrors);

      // Check if the form is valid, and the uploader is not currently fetching.
      if ( !formErrors && versionComment.length && !isFetching && !didInvalidate && canUpload ) {
        // Persist New Version data
        dispatch(uploadDocument(file, docId, folderId, versionComment, versionType ));
      } else {
        return false;
      }
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(resetUploadDocument());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, dmUpload } = nextProps;
    const uploadedDocumentData = dmUpload.items ? dmUpload.items[0] : null;

    if (uploadedDocumentData && !this.state.isFileUploaded) {
      // Reset form field validation.
      dispatch(dmValidateFormField(false));

      // Grab the last version from the returned upload success object.
      const uid = uploadedDocumentData.Uid;
      const targetVersionUid = uploadedDocumentData.TargetVersionUid;

      Promise.all([
        dispatch(fetchDocument(uid, targetVersionUid)),
        // Set Right Panel to the Detail view.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL)),

        // Set the Content Area to Preview.
        // dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW)),

        // Fetch the Preview.
        // dispatch(fetchPreviewDocument(targetVersionUid, 'view')),

        this.setState({isFileUploaded: true}),
        this.closeModal()
      ]);
    }
  }

  // Callback to handle errors in DataForms components.
  handleErrorCallback() {
    const { dispatch, dmFormValidation } = this.props;
    const { formErrors } = this.state;

    // Only turn false if it's not already.
    if (dmFormValidation.validateField) dispatch(dmValidateFormField(false));
    this.setState({ formErrors: formErrors + 1 });
  }

  // Close modal.
  closeModal() {
    const { dispatch } = this.props;
    // Reset state on close.
    this.resetState();
    dispatch(resetUploadDocument());
    dispatch(toggleModal(false));
  }

  // Dropzone.
  onDrop(uploadedFiles) {
    this.setState({
      dropzone: true,
      file: uploadedFiles[0]
    });
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  handleVersionChange(radio) {
    this.setState({
      versionType: radio
    });
  }

  handleReasonEntry(e) {
    this.setState({
      versionComment: e.target.value
    });
  }

  handleChangeFileClick() {
    this.setState({
      dropzone: false
    });
  }

  resetState() {
    this.setState({
      progress: 20,
      versionType: 'Minor',
      versionComment: '',
      file: {},
      dropzone: false,
      uploadedNewVersion: false,
      currentlyUploading: false,
      targetVersion: {},
      userSubmittedForm: false,
      isFileUploaded: false,
    });
  }

  // Save button.
  handleSaveButtonClick() {
    const { dispatch } = this.props;

    // Dispatch to tell form fields to check themselves.
    dispatch( dmValidateFormField(true) );

    // Reset form errors counter.
    this.setState({ formErrors: 0 });

    // Set that the user has submitted the form.
    this.setState({ userSubmittedForm: true });
  }


  // Render method.
  render() {
    const { globalUi, dmUpload, dmFormValidation, view } = this.props;
    const { validateField } = dmFormValidation;
    const { isFetching, didInvalidate, error } = dmUpload;

    const { dropzone, versionComment, file, formErrors } = this.state;
    const fileName = file.name;
    const filenameIcon = utils.filenameIcon(fileName);

    let title;
    switch (view) {
    case 'PERIODIC_REVIEW':
      title = 'PERIODIC_REVIEW';
      break;
    default:
      title = 'Submit A New Version';
    }

    const formArea = isFetching ?
      <ProgressBar bsStyle="primary" label="Uploading" active now={100} />
    :
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

        <label className="control-label required">Version</label>

        <div className="form-group">

          <input type="radio" name="version" onChange={this.handleVersionChange.bind(this, 'Major')} style={{ margin: '0 6px' }}/>
          <label className="control-label">Major</label>

          <input type="radio" name="version" defaultChecked onChange={this.handleVersionChange.bind(this, 'Minor')} style={{ margin: '0 6px' }}/>
          <label className="control-label">Minor</label>

        </div>
      </div>
    ;

    return (
      <Modal show={globalUi.isModalOpen} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton={view !== 'PERIODIC_REVIEW'}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        { formErrors === 1 ? <Alert bsStyle="danger"><strong>'Reason for Change' should not be empty</strong></Alert> : null }

        { didInvalidate ? <Alert bsStyle="danger"><strong>{'Error: ' + error.ErrorMessage}</strong></Alert> : null }

        { !dropzone ?
          <Dropzone id="Upload_Dropzone" ref="dropzone" onDrop={this.onDrop.bind(this)} className="dropzone" multiple={false}>
            <p>
              <Icon name="upload" className="fa-2x text-success" />
            </p>
            Drag and drop files here
            <br className="hidden-xs"/>&nbsp;
            or click to <a>select files</a> from your computer.
          </Dropzone>
        :
          formArea
        }

        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Close</Button>
          { dropzone ? <Button bsStyle="success" disabled={isFetching} onClick={this.handleSaveButtonClick.bind(this)} >Continue</Button> : null }
        </Modal.Footer>
      </Modal>
    );
  }
}

// propTypes.
UploadNewVersion.propTypes = {
  view: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  dmUpload: React.PropTypes.object,
  dmFormValidation: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  dmUpload: state.dmUpload,
  dmDocument: state.dmDocument,
  dmFormValidation: state.dmFormValidation,
});
// Export.
export default connect(mapStateToProps)(UploadNewVersion);
export { UploadNewVersion as UploadNewVersionPure };
