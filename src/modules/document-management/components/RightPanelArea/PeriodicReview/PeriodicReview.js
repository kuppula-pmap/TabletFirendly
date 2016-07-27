// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Row, Col, Well, Button } from 'react-bootstrap';
import Loader from '../../../../../components/Loader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import DataSelect from '../../../../../components/DataForms/DataSelect';
import DataInput from '../../../../../components/DataForms/DataInput';
import DetailViewDropdown from '../DetailViewDropdown';
import PeriodicReviewList from './PeriodicReviewList';
import Icon from 'react-fa';
import Dropzone from 'react-dropzone';

import utils from '../../../../../utils';

// ReactToastr
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);


// Doc Mgt actions.
import {
  DM_RIGHT_PANEL_DETAIL
} from '../../../redux/constants/ui-constants';
import { dmValidateFormField } from '../../../redux/actions/formValidation-actions';
import { setRightPanelAreaView } from '../../../redux/actions/ui-actions';
import { postPeriodicReview, postPeriodicReviewReset } from '../../../redux/actions/periodicReview-post-actions';
import { postApprovalWorkflow } from '../../../redux/actions/approvalWorkflow-post-actions';
import { uploadDocument, resetUploadDocument } from '../../../redux/actions/upload-actions';
import { fetchDocument } from '../../../redux/actions/document-actions';


// Define class.
class PeriodicReview extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Document data.
    const documentData = this.props.dmDocument ? this.props.dmDocument.items : [];
    const uid = documentData.Uid;
    const folderId = documentData.ParentFolderUid;

    // User data.
    const userData = this.props.globalAuth ? this.props.globalAuth.items : [];
    const userId = userData.UserDetails.UserId;

    // Set blank initial object.
    const initialObject = {
      DocumentUid: uid,
      Uid: null,
      ReviewType: 'periodic',
      ReviewStatus: null,
      UploadRevisedVersion: true,
      VersionType: 'Minor',
      Comments: null,
      CreatedBy: userId,
      ReviewedBy: userId,
      ReviewedDate: moment().utc().toISOString(),
    };

    this.state = {
      periodicReviewObject: initialObject,
      folderId,
      userSubmittedForm: false,
      formErrors: 0,
      toastrFormAlertCount: 0,
      file: null,
      isFileUploaded: false,
      uploadFormValidationError: false,
    };

    this.userSubmittedForm = false;
    this.uploadStarted = false;

    // console.log('periodicReviewObject:', this.state.periodicReviewObject);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(postPeriodicReviewReset());
    dispatch(resetUploadDocument());
  }

  componentDidUpdate() {
    const {
      dispatch,
      dmDocument,
      globalSettings,
      dmApprovalWorkflowPost,
      dmPeriodicReviewPost,
    } = this.props;

    const {
      file,
      folderId,
      formErrors,
      periodicReviewObject,
      isFileUploaded,
    } = this.state;

    const uid = periodicReviewObject.DocumentUid;
    const versionComment = periodicReviewObject.Comments;
    const versionType = periodicReviewObject.VersionType;

    // Periodic Review POST data.
    const periodicReviewPostData = dmPeriodicReviewPost.items ? dmPeriodicReviewPost.items : null;
    const { isFetching } = dmPeriodicReviewPost;

    // Check for periodicReviewPostData response.
    if (periodicReviewPostData && !isFetching) {
      if (!periodicReviewPostData.UploadRevisedVersion && !dmApprovalWorkflowPost.isFetching) {
        // Set Right Panel Area View.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
      }
      return;
    }

    // console.log('=================================================');
    // console.log('userSubmittedForm:', this.userSubmittedForm);

    // console.log('formErrors:', formErrors);

    // Check if user click on the Save button AND file hasn't already been upload.
    if (this.userSubmittedForm && !isFileUploaded) {
      // Check if the form is valid.
      if ( !formErrors ) {
        // console.log('-------> SUBMIT FORM <-------');
        // console.log('periodicReviewObject:', periodicReviewObject);

        if (periodicReviewObject.ReviewStatus === 'archived') {
          // console.log('ReviewStatus: ARCHIVED');

          // Archive document.
          const cmd = utils.getWorkflowCommand(globalSettings, dmDocument, 'Archive');
          if (cmd) dispatch(postApprovalWorkflow(cmd));
        } else if (periodicReviewObject.ReviewStatus === 'revised') {
          // console.log('ReviewStatus: REVISED');

          if (periodicReviewObject.UploadRevisedVersion && !this.uploadStarted) {
            // console.log(file, uid, folderId, versionComment, versionType);

            // Upload New Version file.
            dispatch(uploadDocument(file, uid, folderId, versionComment, versionType ));

            this.uploadStarted = true;

            return;
          }
        }
        // Save it. Post document details data.
        dispatch( postPeriodicReview(periodicReviewObject) );

        // Reset form field validation.
        dispatch(dmValidateFormField(false));
      } else {
        // console.log('-------> SHOW ERROR <-------');
        this.showFormErrorToastr();
        return;
      }

      // Reset userSubmittedForm.
      this.userSubmittedForm = false;
    }
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, dmUpload } = nextProps;

    // Upload data.
    const uploadedDocumentData = dmUpload.items ? dmUpload.items[0] : null;

    // Handle Upload fetch response.
    if (uploadedDocumentData && !this.state.isFileUploaded) {
      // Reset form field validation.
      dispatch(dmValidateFormField(false));

      // Grab the last version from the returned upload success object.
      const uid = uploadedDocumentData.Uid;
      const targetVersionUid = uploadedDocumentData.TargetVersionUid;

      Promise.all([
        // Fecth lastest Document data.
        dispatch(fetchDocument(uid, targetVersionUid)),

        // Set Right Panel to the Detail view.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL)),
      ]);

      // Set file has been uploaded.
      this.setState({ isFileUploaded: true });

      return;
    }
  }

  // Method to handle Input field and state.
  handleInputChange(key, e) {
    let newSelected = _.extend({}, this.state.periodicReviewObject);
    newSelected[key] = e.target.value;

    // console.log(key, newSelected[key], newSelected);

    // Update the state.
    this.setState({ periodicReviewObject: newSelected });

    // Reset userSubmittedForm.
    this.userSubmittedForm = false;
    this.setState({ userSubmittedForm: false });
  }

  // Method to handle DataSelect and state.
  handleDataSelectChange(key, type, value, obj) {
    const arr = [];
    let newSelected = _.extend({}, this.state.periodicReviewObject);

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) {
        arr.push(item.Id);
      }
    });

    // Update the selected object.
    if (arr.length > 1 || type === 'array') {
      // Array of objects.
      newSelected[key] = arr;
    } else {
      // Single object.
      newSelected[key] = arr[0];
    }

    // Update the state.
    this.setState({ periodicReviewObject: newSelected });

    // console.log('newSelected:', newSelected);

    // Reset userSubmittedForm.
    this.userSubmittedForm = false;
    this.setState({ userSubmittedForm: false });
  }

  // Method to handle Input checkbox and state.
  handleInputCheckboxChange(key, e) {
    let newSelected = _.extend({}, this.state.periodicReviewObject);
    newSelected[key] = e.target.checked;

    // Update the state.
    this.setState({ periodicReviewObject: newSelected });

    // Clear/reset uploaded file.
    this.setState({ file: null });
  }

  handleRadioButtonsClick(key, value) {
    let newSelected = _.extend({}, this.state.periodicReviewObject);
    newSelected[key] = value;

    // Update the state.
    this.setState({ periodicReviewObject: newSelected });
  }

  // Dropzone.
  onDrop(uploadedFiles) {
    this.setState({ file: uploadedFiles[0] });

    // Reset upload file error.
    this.setState({ uploadFormValidationError: false });
  }

  // Clear/reset uploaded file.
  clearUploadFile() {
    this.setState({ file: null });
  }

  // Callback to handle errors in DataForms components.
  handleErrorCallback() {
    const { dispatch, dmFormValidation } = this.props;
    const { formErrors } = this.state;

    // Only turn false if it's not already.
    if (dmFormValidation.validateField) dispatch(dmValidateFormField(false));
    this.setState({ formErrors: formErrors + 1 });
  }

  clearUserSubmittedForm() {
    // Reset userSubmittedForm.
    this.userSubmittedForm = false;
    this.setState({ userSubmittedForm: false });
    this.setState({ formErrors: 0 });
  }

  // Cancel button.
  handleCancelButtonClick() {
    const { dispatch } = this.props;
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
  }

  // Save button.
  handleSaveButtonClick() {
    const { dispatch } = this.props;

    // Reset form errors counter.
    this.setState({ formErrors: 0 });

    // Dispatch to tell form fields to check themselves.
    dispatch( dmValidateFormField(true) );

    this.userSubmittedForm = true;
    this.setState({ userSubmittedForm: true });

    // Reset toastr form alert.
    this.setState({ toastrFormAlertCount: 0 });

    // Validate upload file.
    this.validateUploadFile();
  }

  validateUploadFile() {
    const { periodicReviewObject, file } = this.state;

    // Validate upload if user selected to upload now.
    if (periodicReviewObject.ReviewStatus === 'revised' && periodicReviewObject.UploadRevisedVersion && !file) {
      this.handleErrorCallback();
      this.setState({ uploadFormValidationError: true });
    }
  }

  // React-Toastr: Alert form form validation errors..
  showFormErrorToastr() {
    this.refs.container.error(
      // 1. Message:
      'Please review the fields in red.',
      // 2. Title:
      'The form is missing one or more required fields.',
      // 3. Options:
      {
        timeOut: 30000000,
        extendedTimeOut: 10000000,
        // closeButton: true,
      }
    );
  }
  closeToastrAlert() {
    this.refs.container.clear();
  }


  // Render method.
  render() {
    const { dmFormValidation, dmLookups, dmPeriodicReviewPost, dmUpload } = this.props;
    const {
      periodicReviewObject,
      file,
      uploadFormValidationError,
    } = this.state;

    const { validateField } = dmFormValidation;

    // Periodic Review POST data.
    // const periodicReviewPostData = dmPeriodicReviewPost.items ? dmPeriodicReviewPost.items : null;
    const didInvalidate = dmPeriodicReviewPost.didInvalidate ? dmPeriodicReviewPost.didInvalidate : null;
    const previewDataError = dmPeriodicReviewPost.error ? dmPeriodicReviewPost.error : null;
    const { isFetching } = dmPeriodicReviewPost;

    // Doc Upload data.
    const uploadDidInvalidate = dmUpload.didInvalidate ? dmUpload.didInvalidate : null;
    const uploadPreviewDataError = dmUpload.error ? dmUpload.error : null;
    const isUploading = dmUpload.isFetching;

    // Get data from Lookups.
    const lookupsData = dmLookups ? dmLookups.items : [];
    const reviewStatusesOptions = lookupsData.ReviewStatuses;

    const revisedStatus = periodicReviewObject.ReviewStatus === 'revised';
    const uploadRevisedVersion = periodicReviewObject.UploadRevisedVersion;

    let uploadDropZone;
    if (uploadRevisedVersion) {
      uploadDropZone = (
        <Dropzone id="Upload_Dropzone" ref="dropzone"
          className={`dropzone ${uploadFormValidationError ? 'error' : ''}`}
          onDrop={this.onDrop.bind(this)}
          multiple={false}
        >
          <p>
            <Icon name="upload" className="fa-2x text-success" />
          </p>
          Drag and drop files here
          <br className="hidden-xs"/>
          {' '}
          or click to <a>select files</a> from your computer.
        </Dropzone>
      );
    }
    if (file && Object.keys(file).length) {
      uploadDropZone = (
        <div>
          <label>File to upload</label>
          <Well bsSize="sm">
            <Row>
              <Col xs={8} title={file.name}>
                <div className="ellipsis-overflow" style={{ marginTop: 2 }}>
                  {file.name}
                </div>
              </Col>
              <Col xs={4}>
                <Button bsStyle="default" bsSize="xs" onClick={this.clearUploadFile.bind(this)}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Well>
        </div>
      );
    }

    return (
      <div>
        <ToastContainer
          ref="container"
          className="toast-top-right fixed close-btn"
          toastMessageFactory={ToastMessageFactory}
          onClick={this.closeToastrAlert.bind(this)}
        />

        <div className="fixed-title clearfix">
          <div className="pull-left">
            <DetailViewDropdown />
          </div>
          <div className="pull-right sidebar-header-actions">
            <Button bsStyle="default" bsSize="xs" onClick={this.handleCancelButtonClick.bind(this)}>
              Cancel
            </Button>
            {' '}
            {isFetching && !didInvalidate || isUploading && !uploadDidInvalidate ?
              <Button bsStyle="success" bsSize="xs" disabled>
                <Loader dots />
              </Button>
            :
              <Button bsStyle="success" bsSize="xs" onClick={this.handleSaveButtonClick.bind(this)}>
                Save
              </Button>
            }
          </div>
        </div>


        <div className="sidebar-details" onClick={this.clearUserSubmittedForm.bind(this)}>
          <div className="document-details" onClick={this.closeToastrAlert.bind(this)}>

            {didInvalidate ? <ErrorMessage data={previewDataError} /> : null}
            {uploadDidInvalidate ? <ErrorMessage data={uploadPreviewDataError} /> : null}

            <DataSelect
              label="Document Review Status"
              options={reviewStatusesOptions}
              value={periodicReviewObject.ReviewStatus}
              onChange={this.handleDataSelectChange.bind(this, 'ReviewStatus', 'object')}

              // Form validation.
              isRequired
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

            {revisedStatus ?
              <div>
                <DataInput
                  type="checkbox"
                  label="Upload a revised version of the document now"
                  checked={periodicReviewObject.UploadRevisedVersion}
                  onChange={this.handleInputCheckboxChange.bind(this, 'UploadRevisedVersion')}
                />

                {uploadDropZone}

                <div className="form-group">
                  <label className="control-label required">Version</label>
                  <br/>

                  <input type="radio" name="version" id="versionMajor" style={{ margin: '0 6px' }}
                    onChange={this.handleRadioButtonsClick.bind(this, 'VersionType', 'Major')}/>
                  <label htmlFor="versionMajor" className="control-label">Major</label>

                  <input type="radio" name="version" id="versionMinor" defaultChecked style={{ margin: '0 6px 0 14px' }}
                    onChange={this.handleRadioButtonsClick.bind(this, 'VersionType', 'Minor')}/>
                  <label htmlFor="versionMinor" className="control-label">Minor</label>
                </div>
              </div>
            : null}

            <DataInput
              type="textarea"
              label="Document Review Comments"
              // maxLength="2000"
              onChange={this.handleInputChange.bind(this, 'Comments')}

              // Form validation.
              labelClassName="required"
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

          </div>
        </div>

        <PeriodicReviewList />

      </div>
    );
  }
}

// propTypes.
PeriodicReview.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmFormValidation: React.PropTypes.object,
  dmLookups: React.PropTypes.object,
  globalAuth: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  dmApprovalWorkflowPost: React.PropTypes.object,
  dmPeriodicReviewPost: React.PropTypes.object,
  dmUpload: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmFormValidation: state.dmFormValidation,
  dmLookups: state.dmLookups,
  globalAuth: state.globalAuth,
  globalSettings: state.globalSettings,
  dmApprovalWorkflowPost: state.dmApprovalWorkflowPost,
  dmPeriodicReviewPost: state.dmPeriodicReviewPost,
  dmUpload: state.dmUpload,
});


// Export.
export default connect(mapStateToProps)(PeriodicReview);
