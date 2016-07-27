// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import Loader from '../../../../../components/Loader';
import DataInput from '../../../../../components/DataForms/DataInput';
import DetailViewDropdown from '../DetailViewDropdown';
// import WorkflowQuickView from './ApprovalWorkflow/WorkflowQuickView';
import WorkflowList from './WorkflowList';

// ReactToastr
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);


// Doc Mgt actions.
import {
  DM_RIGHT_PANEL_DETAIL,
  DM_CONTENT_AREA_PREVIEW,
  DM_CONTENT_AREA_DEFAULT
} from '../../../redux/constants/ui-constants';
import { setRightPanelAreaView, setContentAreaView } from '../../../redux/actions/ui-actions';
import { dmValidateFormField } from '../../../redux/actions/formValidation-actions';
import { postApprovalWorkflow } from '../../../redux/actions/approvalWorkflow-post-actions';

import utils from '../../../../../utils';


// Define class.
class ApprovalWorkflow extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    const { globalSettings, dmDocument } = this.props;

    // User data.
    const userId = globalSettings.userId;

    // Document data.
    const documentData = dmDocument ? dmDocument.items : [];
    const uid = documentData.Uid;
    const documentVersionUid = documentData.TargetVersionUid;

    // Set blank initial object.
    const initialObject =
      {
        DocumentVersionUid: documentVersionUid,
        DocumentUid: uid,
        WorkflowCommand: null,
        ApprovalUserId: userId,
        Comments: null
      };

    this.state = {
      approvalWorkflowObject: initialObject,
      userSubmittedForm: false,
      formErrors: 0,
      toastrFormAlertCount: 0,
    };

    // console.log('initialObject:', initialObject);

    this.buttonLoader = false;
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { userSubmittedForm, formErrors, approvalWorkflowObject } = this.state;

    // console.log('=================================================');
    // console.log('userSubmittedForm:', userSubmittedForm);

    // Check if user click on the Save button.
    if (userSubmittedForm) {
      // console.log('formErrors:', formErrors);

      // Check if the form is valid.
      // if ( isFormValid ) {
      if ( !formErrors ) {
        // console.log('-------> SUBMIT FORM <-------');

        // Persist state data object.
        dispatch(postApprovalWorkflow(approvalWorkflowObject));

        // Set Right Panel Area View.
        dispatch(setContentAreaView(DM_CONTENT_AREA_DEFAULT));

        // Reset form field validation.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
      } else {
        // console.log('-------> SHOW ERROR <-------');

        this.showFormErrorToastr();
        return false;
      }
    }

    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // Set initial state.
    dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW));
  }

  // Method to handle Input field and state.
  handleInputChange(key, e) {
    let newSelected = _.extend({}, this.state.approvalWorkflowObject);
    newSelected[key] = e.target.value;

    // Update the state.
    this.setState({ approvalWorkflowObject: newSelected });

    // Reset userSubmittedForm.
    this.setState({ userSubmittedForm: false });

    // console.log('newSelected:', newSelected);
  }

  handleSaveButtonClick(cmd) {
    const { dispatch } = this.props;

    // Reset form errors counter.
    this.setState({ formErrors: 0 });

    // Dispatch to tell form fields to check themselves.
    dispatch( dmValidateFormField(true) );

    // Set that the user has submitted the form.
    this.setState({ userSubmittedForm: true });

    const key = 'WorkflowCommand';
    let newSelected = _.extend({}, this.state.approvalWorkflowObject);
    newSelected[key] = cmd;

    // Update the state.
    this.setState({ approvalWorkflowObject: newSelected });

    // Reset toastr form alert.
    this.setState({ toastrFormAlertCount: 0 });

    // Turn on button loader.
    this.buttonLoader = true;
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
    const { dmDocument, dmFormValidation } = this.props;
    const { buttonLoader } = this.state;
    const documentData = dmDocument ? dmDocument.items : [];

    const { validateField } = dmFormValidation;

    const commentsValue = this.state.approvalWorkflowObject.Comments;

    // Document state.
    const documentState = documentData.DocumentState ? documentData.DocumentState : null;
    const availableCommands = documentState ? documentState.AvailableCommands : null;

    const commandButtons = [];
    if (availableCommands) {
      availableCommands.forEach(command => {
        let buttonColor = 'success';
        if (command.Direction === 'Reverse') buttonColor = 'danger';

        // Reject, Review, Evaluate, Approve.
        if (
          command.Name === 'Reject' ||
          command.Name === 'Review' ||
          command.Name === 'Evaluate' ||
          command.Name === 'Approve'
        ) {
          if (buttonLoader) {
            commandButtons.push(
              <Button key={utils.unique()} bsStyle={buttonColor} bsSize="xs" block disabled>
                <Loader dots />
              </Button>
            );
          } else {
            commandButtons.push(
              <Button key={utils.unique()} bsStyle={buttonColor} bsSize="xs" block
                onClick={this.handleSaveButtonClick.bind(this, command.Name)}>
                {command.Description}
              </Button>
            );
          }
        }
      });
    }

    // console.log('commandButtons:', commandButtons);

    // Show WorkflowQuickView
    let workflowQuickView = null;
    let workflowList = null;

    if (documentData.Workflow) {
      // workflowQuickView = <WorkflowQuickView />;
      workflowList = <WorkflowList />;
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
        </div>

        <div className="sidebar-details">

          {commandButtons.length ?
            <div>
              {workflowQuickView}
              <div className="document-details">
                <DataInput
                  type="textarea"
                  label="Comments"
                  value={commentsValue}
                  onChange={this.handleInputChange.bind(this, 'Comments')}
                  // disabled={availableCommands ? false : true}

                  // Form validation.
                  labelClassName="required"
                  validateField={validateField}
                  handleErrorCallback={this.handleErrorCallback.bind(this)}
                />

                {/* Hidden per Tina.
                <Input type="file" label="Add Attachment" className="btn btn-default"/>
                <div className="form-group">
                  <input type="checkbox"/>
                  &nbsp;
                  <label className="control-label">Document Revisions Attached?</label>
                </div>

                <FormControls.Static label="Approval Due Date" value=""/>

                <FormControls.Static label="Approved/Rejected By" value=""/>

                <FormControls.Static label="Approved/Rejected Date" value=""/>
                */}

                <div className="form-group">
                  {commandButtons}
                </div>

              </div>
            </div>
          : null}

        </div>

        {workflowList}

      </div>
    );
  }
}

// propTypes.
ApprovalWorkflow.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmFormValidation: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmFormValidation: state.dmFormValidation,
  globalSettings: state.globalSettings,
});

// Export.
export default connect(mapStateToProps)(ApprovalWorkflow);
