// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-fa';
import _ from 'lodash';
import moment from 'moment';
import {
  Row,
  Col,
  Button,
  // Input,
  FormControls,
  Panel
} from 'react-bootstrap';
import DataSelect from '../../../../../components/DataForms/DataSelect';
import DataInput from '../../../../../components/DataForms/DataInput';
import DetailFormTreeView from '../../../../../components/DetailFormTreeView/DetailFormTreeView';
import PrimaryView from '../../../../../components/DetailFormTreeView/PrimaryView';
import WorkflowForm from '../ApprovalWorkflow/WorkflowForm/WorkflowForm';
import { fetchPreviewDocument } from '../../../redux/actions/previewDocument-actions';

// DatePicker.
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ReactToastr
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

// DM Actions.
import {
  setRightPanelAreaView,
    setContentAreaView
} from '../../../redux/actions/ui-actions';
import { postDocument } from '../../../redux/actions/document-post-actions';
import {
  DM_CONTENT_AREA_PREVIEW,
  DM_RIGHT_PANEL_DETAIL,
  // DM_RIGHT_PANEL_ACTIVITY
} from '../../../redux/constants/ui-constants';
import {
  // dmSetIsFormValid,
  dmValidateFormField
} from '../../../redux/actions/formValidation-actions';


import utils from '../../../../../utils';


// Define class.
class DetailForm extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    const { dmDocument, dmLookups } = this.props;
    let documentData = dmDocument ? dmDocument.items : [];

    // Business Process.
    const docBusinessProcessData = dmDocument.items ? dmDocument.items.BusinessProcess : [];
    const businessProcessesData = dmLookups.items ? dmLookups.items.BusinessProcesses : [];
    // Levels.
    const selectedBP = docBusinessProcessData ? businessProcessesData.filter(item => item.Id === docBusinessProcessData.Id) : [];
    const levelOptions = selectedBP[0] ? selectedBP[0].Levels : [];
    // Workflows.
    const docLevelData = dmDocument.items ? dmDocument.items.Level : [];
    const selectedLV = docLevelData ? levelOptions.filter(item => item.Id === docLevelData.Id) : [];
    const workflowOptions = selectedLV[0] ? selectedLV[0].Workflows : [];

    this.state = {
      docState: _.cloneDeep(documentData),
      levelOptions,
      workflowOptions,
      privateViewerList: [],
      primaryFolderFieldError: false,
      userSubmittedForm: false,
      formErrors: 0,
      toastrFormAlertCount: 0,
    };

    this.validateTreeViewFields = this.validateTreeViewFields.bind(this);
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { docState, userSubmittedForm, formErrors } = this.state;

    // console.log('=================================================');
    // console.log('userSubmittedForm:', userSubmittedForm);

    // Check if user click on the Save button.
    if (userSubmittedForm) {
      // console.log('formErrors:', formErrors);

      // Check if the form is valid.
      // if ( isFormValid ) {
      if ( !formErrors ) {
        // console.log('-------> SUBMIT FORM <-------');

        // console.log('docState:', docState);

        // Save it. Post document details data.
        dispatch(postDocument(docState));

        // Set Right Panel Area View.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
      } else {
        // console.log('-------> SHOW ERROR <-------');

        this.showFormErrorToastr();
        return false;
      }
    }

    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  }

  // Method to handle Input field and state.
  handleInputChange(key, e) {
    let newSelected = _.extend({}, this.state.docState);
    newSelected[key] = e.target.value;

    // Update the state.
    this.setState({ docState: newSelected });
    // console.log('newSelected:', newSelected);
  }
  // Handle version input.
  handleVersionChange(key, e) {
    let newSelected = _.cloneDeep(this.state.docState);

    let versions = newSelected.Versions;
    // Note: review mutation here.
    if (versions) {
      versions.forEach(version => {
        if (version.IsCurrent === true) {
          version[key] = Number(e.target.value).toFixed(1);
        }
      });
    }

    // Update the state.
    this.setState({ docState: newSelected });
    // console.log('docState:', newSelected);
  }

  handlePreviewClick(e) {
    e.preventDefault();
    const { dispatch, dmDocument } = this.props;
    const documentData = dmDocument ? dmDocument.items : [];
    const uid = documentData.TargetVersionUid;

    // console.log('uid:', uid);
    dispatch(fetchPreviewDocument(uid, 'view'));
    dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW));
  }

  // Method to handle Input checkbox and state.
  handleInputCheckboxChange(key, e) {
    let newSelected = _.extend({}, this.state.docState);
    newSelected[key] = e.target.checked;

    // Update the state.
    this.setState({ docState: newSelected });
  }

  // Method to handle DataSelect and state.
  handleDataSelectChange(key, type, value, obj) {
    const arr = [];
    let newSelected = _.extend({}, this.state.docState);

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) arr.push(item);
    });

    // Update the selected object.
    if (arr.length > 1 || type === 'array') {
      // Array of objects.
      newSelected[key] = arr;
    } else if (type === 'object') {
      // Single object.
      newSelected[key] = arr[0];
    } else if (type === 'boolean') {
      newSelected[key] = arr[0].Id;
    }

    // Update the state.
    this.setState({ docState: newSelected });
    // console.log('newSelected:', newSelected);

    // Add as Private Viewer from certain fields.
    if (key === 'Owner') {
      this.setState({ privateViewerList: this.state.privateViewerList.push(value) });
    }

    // State specific checks.
    // DocumentView (private:1 \ public:2)
    // if (key === 'VisibilityType' && value === 'Private') {
    //   this.setState({ isDocViewPrivate: true });
    // } else {
    //   this.setState({ isDocViewPrivate: false });
    // }
  }

  // Method to handle DataSelect and state.
  handleDataSelectArrayChange(key, value, obj) {
    const arr = [];
    let newSelected = _.extend({}, this.state.docState);

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) {
        arr.push(item.Description);
      }
    });

    // Update the selected object with new array.
    newSelected[key] = arr;

    // Update the state.
    this.setState({ docState: newSelected });
  }

  // Method to handle BusinessProcessDataSelect and state.
  handleBusinessProcessChange(key, type, value, obj) {
    const { dmLookups } = this.props;
    const businessProcessesData = dmLookups.items ? dmLookups.items.BusinessProcesses : [];
    const LevelKey = 'Level';

    const arr = [];
    let newSelected = _.extend({}, this.state.docState);

    obj.forEach(item => {
      if (item.Id) {
        arr.push(item);
      }
    });

    if (arr[0]) {
      newSelected[key] = arr[0];
      businessProcessesData.forEach(item => {
        if (item.Id === arr[0].Id) {
          this.setState({levelOptions: item.Levels});
          newSelected[LevelKey] = null;
        }
      });
    }

    // Update the state.
    this.setState({ docState: newSelected });
  }

  // Method to handle LevelDataSelect and state.
  handleLevelChange(key, type, value, obj) {
    const levelsData = this.state.levelOptions ? this.state.levelOptions : [];
    const WorkflowKey = 'Workflow';

    const arr = [];
    let newSelected = _.extend({}, this.state.docState);

    obj.forEach(item => {
      if (item.Id) {
        arr.push(item);
      }
    });

    if (arr[0]) {
      newSelected[key] = arr[0];
      levelsData.forEach(item => {
        if (item.Id === arr[0].Id) {
          this.setState({workflowOptions: arr[0].Workflows});
          newSelected[WorkflowKey] = null;
        }
      });
    }

    // Update the state.
    this.setState({ docState: newSelected });
  }

  // Method to handle TreeView and state.
  onTreeViewClick(key, node = {}) {
    let newSelected = _.extend({}, this.state.docState);
    let deletedItem = false;
    if (key === 'DisplayFolders' || key === 'Departments') {
      let items = newSelected[key];

      // Only care if node.selected is true.
      items.forEach(item => {
        if (item.id === node.id) {
          let indexOfItem = items.indexOf(item);
          items.splice(indexOfItem, 1);
          newSelected[key] = items;
          deletedItem = true;
        }
      });
      // If you didn't delete anything, add the node to the list.
      if (!deletedItem && node.selected) {
        items = items.concat(node);
        newSelected[key] = items;
      }
    }
    if (key === 'PrimaryFolder') {
      if (node.selected) {
        newSelected[key] = node;
        // Set the currentSelections state to the updatedSelection
        this.setState({
          docState: newSelected
        });
      } else {
        newSelected[key] = {};
      }
    }
    // Set the currentSelections state to the updatedSelection
    this.setState({ docState: newSelected });
  }


  // Method to handle date picker and state.
  handleDateChange(key, date) {
    const reviewDate = date ? new Date(date) : new Date();
    let newSelected = _.extend({}, this.state.docState);

    // Update the selected object with new array.
    newSelected[key] = reviewDate.toISOString();

    // Update the state.
    this.setState({ docState: newSelected });
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
    this.clearUserSubmittedForm();
  }

  // Listen for 'enter' keyboard key press.
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSaveButtonClick();
    }
  }

  // Reset error styling from a form field.
  resetFieldError(field) {
    this.setState({ [field]: false });
  }

  // Form validation.
  validateTreeViewFields() {
    const { docState, formErrors } = this.state;

    // console.log('DOC SAVED: ', docState);
    // utils.save(docState);

    // Form validation boolean.
    let isFormValid = true;

    // Form field values.
    const primaryFolder = docState.PrimaryFolder ? docState.PrimaryFolder.name : null;
    // console.log('Primary Folder', primaryFolder);
    // Primary Folder.
    if (!primaryFolder || primaryFolder === 'Root') {
      // Show title field error.
      this.setState({ primaryFolderFieldError: true });

      this.setState({ formErrors: formErrors + 1 });

      // Form is not valid.
      isFormValid = false;

      // console.log('primaryFolder field error');
    }

    return isFormValid;
  }

  handleSaveButtonClick() {
    const { dispatch } = this.props;

    // console.log('handleSaveButtonClick() => dmFormValidation:', this.props.dmFormValidation);

    // Validate TreeView form fields.
    if ( !this.validateTreeViewFields() ) {
      this.handleErrorCallback();
    }

    // Reset form errors counter.
    this.setState({ formErrors: 0 });

    // Dispatch to tell form fields to check themselves.
    dispatch( dmValidateFormField(true) );

    // Call the submitForm().
    // this.submitForm();

    this.setState({ userSubmittedForm: true });

    // Reset toastr form alert.
    this.setState({ toastrFormAlertCount: 0 });
  }

  // Callback to handle errors in DataForms components.
  handleErrorCallback() {
    // console.log('handleErrorCallback()');
    const { dispatch, dmFormValidation } = this.props;
    const { formErrors } = this.state;

    // Make form invalid. Not using; using this.state instead.
    // if (dmFormValidation.isFormValid) dispatch(dmSetIsFormValid(false));

    // Only turn false if it's not already.
    if (dmFormValidation.validateField) dispatch(dmValidateFormField(false));
    this.setState({ formErrors: formErrors + 1 });
  }

  handleCancelButtonClick() {
    const { dispatch } = this.props;
    // Set Right Panel Area View.
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
  }

  clearUserSubmittedForm() {
    const { userSubmittedForm, formErrors } = this.state;

    // Reset userSubmittedForm.
    if (userSubmittedForm) this.setState({ userSubmittedForm: false });
    if (formErrors) this.setState({ formErrors: 0 });
  }

  // Render method.
  render() {
    const {
      dmDocument,
      dmLookups,
      dmFormValidation,
      dmUi
    } = this.props;
    const { docState} = this.state;

    const { validateField } = dmFormValidation;

    // console.log('render() => dmFormValidation:', dmFormValidation);

    const documentData = dmDocument ? dmDocument.items : [];
    const lookupsData = dmLookups ? dmLookups.items : [];

    // Get data from Lookups.
    const documentTypesOptions = lookupsData.DocumentTypes;
    const ownersOptions = lookupsData.Owners;
    const visibilityTypesOptions = lookupsData.VisibilityTypes;
    const keywordsOptions = lookupsData.Keywords;
    const referenceDocumentsOptions = lookupsData.ReferenceDocuments;
    const privateViewersOptions = lookupsData.PrivateViewers;
    const businessProcessesOptions = lookupsData.BusinessProcesses;
    const regulatoryReferencesOptions = lookupsData.RegulatoryReferences;
    const intervalTypesOptions = lookupsData.IntervalTypes;
    const publishedFormatOptions = [
      { Id: 'false', Description: 'Original Format' },
      { Id: 'true', Description: 'PDF' }
    ];

    // Get tree data from Lookups.
    const foldersTreeData = lookupsData.Folders || {};
    const departmentsTreeData = lookupsData.Departments || {};

    // Get data from local state.
    const primaryFolder = docState.PrimaryFolder || {};
    const displayFolders = docState.DisplayFolders;
    const departments = docState.Departments;

    // Get data from local state.
    // const isDocViewPrivate = this.state.isDocViewPrivate; // local state.
    const levelOptions = this.state.levelOptions; // local state.
    const workflowOptions = this.state.workflowOptions; // local state.

    // Get data from document copy on local state.
    const titleValue = docState.Title;
    const fileNameValue = docState.FileName;
    const changeComment = docState.ChangeComment || '';
    const internalIdValue = docState.InternalId;
    // const ownerValue = docState.Owner || ownersOptions.filter(owner => owner.Id === globalSettings.userId ) || [];
    const ownerValue = docState.Owner ? docState.Owner.Description : null;
    // console.log('docState.Owner', docState.Owner);
    const coordinatorValue = docState.Coordinator;
    // const privateViewersStaticText = coordinatorValue ? `${ownerValue.Description} and ${coordinatorValue.Description}` : ownerValue.Description;
    // console.log('privateViewersStaticText:', privateViewersStaticText);
    const businessProcessValue = docState.BusinessProcess;
    const levelValue = docState.Level;
    const isAutoReleaseValue = docState.IsAutoRelease;
    const visibilityTypeValue = docState.VisibilityType;
    const visibilityTypeDesc = visibilityTypeValue ? visibilityTypeValue.Description : null;
    const showPrivateViwers = visibilityTypeDesc === 'Public' ? false : true;
    const privateViewersValue = docState.PrivateViewers;
    const publishedFormatValue = docState.IsPublishOnlyPDFs;

    const typeValue = docState.Type;
    const descriptionValue = docState.Description;
    const keywordsValue = utils.dataToOptions(docState.Keywords);
    const referenceDocumentsValue = docState.ReferenceDocuments;
    const regulatoryReferencesValue = utils.dataToOptions(docState.RegulatoryReferences);
    // Periodic review.
    const isFinal = documentData.IsFinal;

    const reviewIntervalValue = docState.PeriodicReviewInterval;
    const reviewIntervalTypesValue = docState.PeriodicReviewIntervalType;
    const periodicReviewStartDate = docState.PeriodicReviewStartDate ? moment(docState.PeriodicReviewStartDate) : null;

    const retentionPeriodTypeValue = docState.RetentionPeriodType;
    const retentionPeriodIntervalValue = docState.RetentionPeriodInterval;

    // Get data from document reducer.
    const documentState = documentData.DocumentState ? documentData.DocumentState.CurrentState : null;
    const documentStateDescription = documentData.DocumentState ? documentData.DocumentState.CurrentStateDescription : null;
    const updatedByName = documentData.UpdatedByName;
    const updatedDate = documentData.UpdatedDate ? moment(documentData.UpdatedDate).format('L') : '';
    const createdByName = documentData.CreatedByName;
    const createdDate = documentData.CreatedDate ? moment(documentData.CreatedDate).format('L') : '';
    // Current version default value.
    const targetVersionNumber = documentData.TargetVersionNumber;

    // Initial version value.
    const versionNumberValue = docState.Versions ? docState.Versions[0].VersionNumber : null;
    const versionNumberCount = docState.Versions ? docState.Versions.length : null;

    const canChangeWorkflow = documentData.CanChangeWorkflow;

    const showPreview = dmUi.contentAreaView !== 'DM_CONTENT_AREA_PREVIEW';

    // Form field valifation errors.
    const { primaryFolderFieldError } = this.state;

    let disableVersionNumber = true;

    if (documentState === 'Draft' || documentState === 'UploadedPendingDetails' || versionNumberCount < 1) {
      disableVersionNumber = false;
    }

    return (
      <div>
        <ToastContainer
          ref="container"
          className="toast-top-right fixed close-btn"
          toastMessageFactory={ToastMessageFactory}
          onClick={this.closeToastrAlert.bind(this)}
        />

        {/* Cancel and Save buttons. */}
        <div className="fixed-title clearfix">
        { showPreview ?
          <Button bsStyle="link" bsSize="md" onClick={this.handlePreviewClick.bind(this)}>
            <Icon name="eye" className="fa-lg" />
            {' '}
            Show Preview
          </Button>
          :
          ' '
        }
          <div className="pull-right sidebar-header-actions">
            <Button bsStyle="default" bsSize="xs" onClick={this.handleCancelButtonClick.bind(this)}>
              Cancel
            </Button>
            {' '}
            <Button bsStyle="success" bsSize="xs" onClick={this.handleSaveButtonClick.bind(this)}>
              Save
            </Button>
          </div>
        </div>

        {/* Document details fields. */}
        <div className="sidebar-details" onClick={this.clearUserSubmittedForm.bind(this)}>
          <div className="document-details" onClick={this.closeToastrAlert.bind(this)}>

            {documentState && documentState !== 'UploadedPendingDetails' ?
              <DataInput
                type="textarea"
                label="Reason for Change"
                value={changeComment}
                onChange={this.handleInputChange.bind(this, 'ChangeComment')}

                // Form validation.
                labelClassName="required"
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
                // Changing workflow to test for Cancel Approval Workflow button.
              />
            : null}

            <DataInput
              label="Title"
              type="text"
              value={titleValue}
              disabled={isFinal}
              textNotEqualTo={fileNameValue}
              onKeyPress={this.handleKeyPress.bind(this)}
              onChange={this.handleInputChange.bind(this, 'Title')}

              // Form validation.
              labelClassName="required"
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

            <DataInput
              label="Internal Document ID"
              type="text"
              value={internalIdValue}
              onChange={this.handleInputChange.bind(this, 'InternalId')}
            />

            <div className={`form-group ${primaryFolderFieldError ? 'error' : ''}`}
                 onClick={this.resetFieldError.bind(this, 'primaryFolderFieldError')}>
              <label className="control-label required">Primary Folder</label>
              <Panel className="panel-form-group">
                <PrimaryView data={foldersTreeData} filter isPrimaryView primaryFolder={primaryFolder} onTreeViewClick={this.onTreeViewClick.bind(this, 'PrimaryFolder')} />
              </Panel>
            </div>

            <div className="form-group">
              <label className="control-label">Additional Display Folders</label>
              <Panel className="panel-form-group">
                <DetailFormTreeView data={foldersTreeData} filter isDisplayFolder displayFolders={displayFolders} primaryFolder={primaryFolder} onTreeViewClick={this.onTreeViewClick.bind(this, 'DisplayFolders')} />
              </Panel>
            </div>

            <div className="form-group">
              <label className="control-label">Department</label>
              <Panel className="panel-form-group">
                <DetailFormTreeView data={departmentsTreeData} filter departments={departments} onTreeViewClick={this.onTreeViewClick.bind(this, 'Departments')} />
              </Panel>
            </div>

            <DataSelect
              label="Document Owner"
              options={ownersOptions}
              placeholder="Find Document Owner"
              value={ownerValue}
              disabled={isFinal}
              onChange={this.handleDataSelectChange.bind(this, 'Owner', 'object')}
              clearable={false}

              // Form validation.
              isRequired
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

            <DataSelect
              label="Document Coordinator"
              options={ownersOptions}
              placeholder="Find Document Coordinator"
              value={coordinatorValue}
              onChange={this.handleDataSelectChange.bind(this, 'Coordinator', 'object')}
              clearable={false}
            />

            <DataSelect
              label="Business Process"
              options={businessProcessesOptions}
              placeholder="Find Business Process"
              value={businessProcessValue}
              onChange={this.handleBusinessProcessChange.bind(this, 'BusinessProcess', 'object')}
              clearable={false}
              disabled={!canChangeWorkflow}

              // Form validation.
              isRequired
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

            {docState.BusinessProcess ?
              <DataSelect
                label="Document Level"
                options={levelOptions}
                placeholder="Find Document Level"
                value={levelValue}
                onChange={this.handleLevelChange.bind(this, 'Level', 'object')}
                clearable={false}
                disabled={!canChangeWorkflow}

                // Form validation.
                isRequired
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />
            : null}

            {docState.Level ?
              <WorkflowForm
                docStateMutableData={docState}
                dataOptions={workflowOptions}
                canChangeWorkflow={canChangeWorkflow}

                // Form validation.
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />
            : null}

            <DataInput
              type="checkbox"
              label="Auto Release Document"
              checked={isAutoReleaseValue}
              onChange={this.handleInputCheckboxChange.bind(this, 'IsAutoRelease')}
            />

            <DataSelect
              label="Published Format"
              options={publishedFormatOptions}
              value={publishedFormatValue ? 'true' : 'false'}
              onChange={this.handleDataSelectChange.bind(this, 'IsPublishOnlyPDFs', 'boolean')}
              clearable={false}

              // Form validation.
              isRequired
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

            <DataSelect
              label="Document View"
              options={visibilityTypesOptions}
              value={visibilityTypeValue ? visibilityTypeValue : visibilityTypesOptions[1]}
              onChange={this.handleDataSelectChange.bind(this, 'VisibilityType', 'object')}
              clearable={false}

              // Form validation.
              isRequired
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

            {showPrivateViwers ?
              <DataSelect
                label="Additional Private Viewers"
                // text={privateViewersStaticText}
                text="Document Owner, Coordinator, and any Approvers are automatically set as private viewers."
                well
                options={privateViewersOptions}
                value={privateViewersValue}
                onChange={this.handleDataSelectChange.bind(this, 'PrivateViewers', 'array')}
                multi
              />
            : null}

            <DataInput
              type="number"
              label="Version"
              min="1.0"
              step="0.1"
              defaultValue={targetVersionNumber || '1.0'}
              value={versionNumberValue}

              disabled={disableVersionNumber}
              onChange={this.handleVersionChange.bind(this, 'VersionNumber')}

              // Form validation.
              labelClassName="required"
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
              />

            <DataSelect
              label="Document Type"
              options={documentTypesOptions}
              placeholder="Find Document Type"
              value={typeValue}
              onChange={this.handleDataSelectChange.bind(this, 'Type', 'object')}
            />

            <DataInput
              type="textarea"
              label="Description"
              value={descriptionValue}
              onChange={this.handleInputChange.bind(this, 'Description')}
            />

            <DataSelect
              label="Keywords/Tags"
              addLabelText={`Add "{label}" keyword/tag?`}
              options={keywordsOptions}
              value={keywordsValue}
              multi
              allowCreate
              simpleValue
              onChange={this.handleDataSelectArrayChange.bind(this, 'Keywords')}
            />

            <DataSelect
              label="Reference Documents"
              options={referenceDocumentsOptions}
              value={referenceDocumentsValue}
              multi
              onChange={this.handleDataSelectChange.bind(this, 'ReferenceDocuments', 'array')}
            />

            <DataSelect
              label="Regulatory References"
              addLabelText={`Add "{label}" Regulatory References?`}
              options={regulatoryReferencesOptions}
              value={regulatoryReferencesValue}
              multi
              allowCreate
              onChange={this.handleDataSelectArrayChange.bind(this, 'RegulatoryReferences')}
            />

            <label className="control-label required">Periodic Review Frequency</label>
            <Row>
              <Col xs={5}>
                <DataInput
                  type="number"
                  min="1"
                  value={reviewIntervalValue}
                  onChange={this.handleInputChange.bind(this, 'PeriodicReviewInterval')}

                  // Form validation.
                  labelClassName="required"
                  validateField={validateField}
                  handleErrorCallback={this.handleErrorCallback.bind(this)}
                />
              </Col>
              <Col xs={7}>
                <DataSelect
                  options={intervalTypesOptions}
                  value={reviewIntervalTypesValue}
                  onChange={this.handleDataSelectChange.bind(this, 'PeriodicReviewIntervalType', 'object')}

                  // Form validation.
                  isRequired
                  validateField={validateField}
                  handleErrorCallback={this.handleErrorCallback.bind(this)}
                />
              </Col>
            </Row>

            {/* Only display periodic review fields if document status is final*/}
            {isFinal ?
              <div className="form-group">
                <label className="control-label">Periodic Review Start Date</label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleDateChange.bind(this, 'PeriodicReviewStartDate')}
                  dateFormat="MMMM DD, YYYY"
                  maxDate={moment()}
                  clearable={false}
                  selected={periodicReviewStartDate}
                  showYearDropdown
                />
              </div>
            : null}

            <label className="control-label">Retention Period</label>
            <Row>
              <Col xs={5}>
                <DataInput
                  type="number"
                  min="1"
                  value={retentionPeriodIntervalValue}
                  onChange={this.handleInputChange.bind(this, 'RetentionPeriodInterval')}
                />
              </Col>
              <Col xs={7}>
                <DataSelect
                  options={intervalTypesOptions}
                  value={retentionPeriodTypeValue}
                  onChange={this.handleDataSelectChange.bind(this, 'RetentionPeriodType', 'object')}
                  clearable={false}
                />
              </Col>
            </Row>

            {documentStateDescription ? <FormControls.Static label="Status" value={documentStateDescription} /> : null}
            {createdByName ? <FormControls.Static label="Uploaded/Referenced By" value={createdByName} /> : null}
            {createdDate ? <FormControls.Static label="Date Uploaded/Referenced" value={createdDate} /> : null}
            {updatedByName ? <FormControls.Static label="Modified By" value={updatedByName} /> : null}
            {updatedDate ? <FormControls.Static label="Modified Date" value={updatedDate} /> : null}

          </div>
        </div>
      </div>
    );
  }
}

// propTypes.
DetailForm.propTypes = {
  dispatch: React.PropTypes.func,
  dmUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  dmLookups: React.PropTypes.object,
  dmFormValidation: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmUi: state.dmUi,
  dmDocument: state.dmDocument,
  dmLookups: state.dmLookups,
  dmFormValidation: state.dmFormValidation,
});

// Export.
export default connect(mapStateToProps)(DetailForm);
