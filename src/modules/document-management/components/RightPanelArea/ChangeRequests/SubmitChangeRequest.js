// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Button, FormControls } from 'react-bootstrap';
import DataSelect from '../../../../../components/DataForms/DataSelect';
import DataInput from '../../../../../components/DataForms/DataInput';

// ReactToastr
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);


// DM Actions.
import {
  DM_RIGHT_PANEL_DETAIL,
  DM_RIGHT_PANEL_CHANGE_REQUEST_LIST,
} from '../../../redux/constants/ui-constants';
import { setRightPanelAreaView } from '../../../redux/actions/ui-actions';
import { dmValidateFormField } from '../../../redux/actions/formValidation-actions';
import { postChangeRequest } from '../../../redux/actions/changeRequest-post-actions';


// Define class.
class ChangeRequestSubmit extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Document data.
    const documentData = this.props.dmDocument ? this.props.dmDocument.items : [];
    const uid = documentData.Uid;
    const documentVersionUid = documentData.CurrentVersion.Uid;

    // User data.
    const userData = this.props.globalAuth ? this.props.globalAuth.items : [];
    const userId = userData.UserDetails.UserId;

    // Check for default changeRequest data in redux.
    // const changeRequestData = this.props.dmChangeRequests ? this.props.dmChangeRequests.items : [];

    // Set blank initial object.
    const initialObject = {
      DocumentUid: uid,
      DocumentVersionUid: documentVersionUid,
      ReasonForChangeRequest: null,
      SourceOfChange: null,
      RequestedChanges: null,
      ChangeRequestPriority: null,
      ChangeRequestedBy: userId,
      RequestedDate: moment().utc().toISOString(),
      ChangeRequestStatus: 'pending',
    };

    this.state = {
      todaysDate: moment().format('l'),
      changeRequestObject: props.view === 'owner' ? props.dmUi.selectedChangeRequest : initialObject,
      userSubmittedForm: false,
      formErrors: 0,
      toastrFormAlertCount: 0,
    };

    // console.log('props.view:', props.view);
    // console.log('props.dmUi.selectedChangeRequest:', props.dmUi.selectedChangeRequest);
    // console.log('initialObject:', this.state.initialObject);
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { userSubmittedForm, formErrors, changeRequestObject } = this.state;

    // console.log('=================================================');
    // console.log('userSubmittedForm:', userSubmittedForm);

    // Check if user click on the Save button.
    if (userSubmittedForm) {
      // console.log('formErrors:', formErrors);

      // Check if the form is valid.
      // if ( isFormValid ) {
      if ( !formErrors ) {
        // console.log('-------> SUBMIT FORM <-------');

        // Persist document details data object.
        dispatch( postChangeRequest(changeRequestObject) );
        // console.log('changeRequestObject:', changeRequestObject);

        // Set Right Panel Area View.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));

        // Reset form field validation.
        dispatch(dmValidateFormField(false));
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
    let newSelected = _.extend({}, this.state.changeRequestObject);
    newSelected[key] = e.target.value;

    // Update the state.
    this.setState({ changeRequestObject: newSelected });

    // Reset userSubmittedForm.
    this.setState({ userSubmittedForm: false });
  }

  // Method to handle DataSelect and state.
  handleDataSelectChange(key, type, value, obj) {
    const arr = [];
    let newSelected = _.extend({}, this.state.changeRequestObject);

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
    this.setState({ changeRequestObject: newSelected });

    // console.log('newSelected', newSelected);

    // Reset userSubmittedForm.
    this.setState({ userSubmittedForm: false });
  }

  // Listen for 'enter' keyboard key press.
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSaveButtonClick();
    }
  }

  // Save button.
  handleSaveButtonClick() {
    const { dispatch } = this.props;

    // Reset form errors counter.
    this.setState({ formErrors: 0 });

    // Dispatch to tell form fields to check themselves.
    dispatch( dmValidateFormField(true) );

    // Set that the user has submitted the form.
    this.setState({ userSubmittedForm: true });

    // Reset toastr form alert.
    this.setState({ toastrFormAlertCount: 0 });
  }

  // Cancel button.
  handleCancelButtonClick() {
    const { dispatch, view } = this.props;

    if (view === 'owner') {
      // Back to Change Request List View.
      dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_CHANGE_REQUEST_LIST));
    } else {
      // Back to Doc Detail View.
      dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
    }
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

  // React-Toastr: Alert form form validation errors.
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
    const { dmDocument, dmUi, dmLookups, dmFormValidation, globalAuth, view } = this.props;
    const { todaysDate, changeRequestObject } = this.state;

    const documentData = dmDocument ? dmDocument.items : [];
    const lookupsData = dmLookups ? dmLookups.items : [];

    const selectedChangeRequestStatus = dmUi.selectedChangeRequest ? dmUi.selectedChangeRequest.ChangeRequestStatus : null;

    // User data.
    const UserDetails = globalAuth.items.UserDetails;
    const changeRequestedByOptions = lookupsData.Owners;

    // Document data.
    const title = documentData.Title;

    // Get data from Lookups.
    const priorityOptions = lookupsData.PriorityTypes;
    const sourceOfChangeOptions = lookupsData.ChangeRequestTypes;
    const changeRequestStatusOptions = lookupsData.ChangeRequestStatuses;

    // Form field validation.
    const { validateField } = dmFormValidation;

    // Form field values.
    console.log('changeRequestObject:', changeRequestObject);
    const reasonForChangeRequest = changeRequestObject.ReasonForChangeRequest;
    const sourceOfChange = changeRequestObject.SourceOfChange;
    const changeRequestStatus = changeRequestObject.ChangeRequestStatus;
    const requestedChanges = changeRequestObject.RequestedChanges;
    const changeRequestPriority = changeRequestObject.ChangeRequestPriority;
    const changeRequestedByValue = changeRequestObject.ChangeRequestedBy;

    const styles = {
      title: {
        width: 'calc(100% - 120px)',
      },
    };

    return (
      <div onClick={this.closeToastrAlert.bind(this)}>
        <ToastContainer
          ref="container"
          className="toast-top-right fixed close-btn"
          toastMessageFactory={ToastMessageFactory}
          onClick={this.closeToastrAlert.bind(this)}
        />

        <div className="fixed-title clearfix">
          <h3 className="pull-left ellipsis-overflow" style={styles.title}>
            {title}
          </h3>
          <div className="pull-right sidebar-header-actions">
            <Button bsStyle="default" bsSize="xs" onClick={this.handleCancelButtonClick.bind(this)}>
              Cancel
            </Button>
            {' '}
            <Button bsStyle="success" bsSize="xs" onClick={this.handleSaveButtonClick.bind(this)}>
              Submit
            </Button>
          </div>
        </div>

        <div className="sidebar-details">

          {view === 'owner' ?
            <div className="document-details">
              <div className="well">
                <FormControls.Static label="Requested By" value={changeRequestObject.RequestedBy}/>
                <FormControls.Static label="Requested Date" value={moment(changeRequestObject.RequestedDate).format('l')}/>
                <FormControls.Static label="Reason for Change Request" value={changeRequestObject.ReasonForChangeRequest}/>
                <FormControls.Static label="Requested Changes" value={changeRequestObject.RequestedChanges}/>

                {changeRequestObject.SourceOfChange ?
                  <FormControls.Static label="Source of Change" value={changeRequestObject.SourceOfChange}/>
                : null}

                {changeRequestObject.ChangeRequestPriority ?
                  <FormControls.Static label="Priority" value={changeRequestObject.ChangeRequestPriority}/>
                : null}

                <FormControls.Static label="Status" value={selectedChangeRequestStatus}/>
              </div>

              <DataSelect
                label="Change Request Status"
                options={changeRequestStatusOptions}
                value={changeRequestStatus}
                onChange={this.handleDataSelectChange.bind(this, 'ChangeRequestStatus', 'object')}

                // Form validation.
                isRequired
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />

              <DataInput
                type="textarea"
                label="Change Request Review Comments"
                maxLength="2000"
                onChange={this.handleInputChange.bind(this, 'ChangeRequestReviewComments')}

                // Form validation.
                labelClassName="required"
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />

              <FormControls.Static label="Reviewed By" value={UserDetails.FullName}/>

              <FormControls.Static label="Reviewed Date" value={todaysDate}/>
            </div>
          :
            <div className="document-details">

              <DataInput
                type="text"
                label="Reason for Change Request"
                value={reasonForChangeRequest}
                onChange={this.handleInputChange.bind(this, 'ReasonForChangeRequest')}

                // Form validation.
                labelClassName="required"
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />

              <DataSelect
                label="Source of Change"
                options={sourceOfChangeOptions}
                value={sourceOfChange}
                onChange={this.handleDataSelectChange.bind(this, 'SourceOfChange', 'object')}
              />

              <DataInput
                type="textarea"
                label="Requested Changes"
                value={requestedChanges}
                onChange={this.handleInputChange.bind(this, 'RequestedChanges')}

                // Form validation.
                labelClassName="required"
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />

              <DataSelect
                label="Priority"
                options={priorityOptions}
                value={changeRequestPriority}
                onChange={this.handleDataSelectChange.bind(this, 'ChangeRequestPriority', 'object')}
              />

              {/* <DataInput type="file" label="Add Attachment"/> */}

              <DataSelect
                label="Requested By"
                options={changeRequestedByOptions}
                value={changeRequestedByValue}
                onChange={this.handleDataSelectChange.bind(this, 'ChangeRequestedBy', 'object')}

                // Form validation.
                isRequired
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />

              <FormControls.Static label="Requested Date" value={todaysDate} />

            </div>
          }

        </div>
      </div>
    );
  }
}

// propTypes.
ChangeRequestSubmit.propTypes = {
  view: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  dmUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  dmLookups: React.PropTypes.object,
  dmFormValidation: React.PropTypes.object,
  dmChangeRequests: React.PropTypes.object,
  globalAuth: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmUi: state.dmUi,
  dmDocument: state.dmDocument,
  dmLookups: state.dmLookups,
  dmFormValidation: state.dmFormValidation,
  dmChangeRequests: state.dmChangeRequests,
  globalAuth: state.globalAuth,
});

// Export.
export default connect(mapStateToProps)(ChangeRequestSubmit);
