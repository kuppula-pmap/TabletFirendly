// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loader from '../../../../components/Loader';
import { Button } from 'react-bootstrap';
import DetailViewDropdown from './DetailViewDropdown';
import DataSelect from '../../../../components/DataForms/DataSelect';
import DataInput from '../../../../components/DataForms/DataInput';

// DatePicker.
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

// ReactToastr
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

// Doc Mgt actions.
import { DM_RIGHT_PANEL_DETAIL } from '../../redux/constants/ui-constants';
import { setRightPanelAreaView } from '../../redux/actions/ui-actions';
import { dmValidateFormField } from '../../redux/actions/formValidation-actions';
import { postReleaseDocument } from '../../redux/actions/releaseDocument-post-actions';


// Define class.
class DocumentRelease extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Document data.
    const documentData = this.props.dmDocument ? this.props.dmDocument.items : [];
    const documentVersionUid = documentData.TargetVersionUid;

    // User data.
    const userData = this.props.globalAuth ? this.props.globalAuth.items : [];
    const userId = userData.UserDetails.UserId;

    // Set blank initial object.
    const initialObject = {
      DocumentVersionUid: documentVersionUid,
      UserId: userId,
      ReleaseDate: moment().utc().toISOString(),
      ReleaseSchedulingType: 'immediate',
      ReleaseNotes: null,
      TrainingNotes: null,
      IsAcknowledgementRequired: false,
      AcknowledgementDueDate: null,
      NotificationUsers: [],
    };

    this.state = {
      ReleaseDateStartDate: moment(),
      AcknowledgementDueDateStartDate: moment(),
      releaseDocumentObject: initialObject,
      releaseNotificationDisctribution: [],
      userSubmittedForm: false,
      formErrors: 0,
      toastrFormAlertCount: 0,
    };

    this.buttonLoader = false;
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { userSubmittedForm, formErrors, releaseDocumentObject } = this.state;

    // console.log('=================================================');
    // console.log('userSubmittedForm:', userSubmittedForm);

    // Check if user click on the Save button.
    if (userSubmittedForm) {
      // console.log('formErrors:', formErrors);

      // Check if the form is valid.
      // if ( isFormValid ) {
      if ( !formErrors ) {
        // console.log('-------> SUBMIT FORM <-------');

        // console.log('releaseDocumentObject:', releaseDocumentObject);

        // Save it. Post document details data.
        dispatch( postReleaseDocument(releaseDocumentObject) );
        // console.log('releaseDocumentObject:', releaseDocumentObject);

        // Turn on button loader.
        this.buttonLoader = true;
      } else {
        // console.log('-------> SHOW ERROR <-------');

        this.showFormErrorToastr();
        return false;
      }
    }

    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, dmDocument } = nextProps;

    // console.log('this.buttonLoader:', this.buttonLoader);
    // console.log('dmDocument.isFetching:', dmDocument.isFetching);

    if (this.buttonLoader && !dmDocument.isFetching) {
      Promise.all([
        // Set Right Panel to the Detail view.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL)),

        // Reset form field validation.
        dispatch(dmValidateFormField(false))
      ]);
    }
  }

  handleCheckboxChange(key, e) {
    let newSelected = _.extend({}, this.state.releaseDocumentObject);
    newSelected[key] = e.target.checked;

    // Update the state.
    this.setState({ releaseDocumentObject: newSelected });

    // Reset userSubmittedForm.
    this.setState({ userSubmittedForm: false });
  }

  handleDateChange(key, date) {
    let newSelected = _.extend({}, this.state.releaseDocumentObject);
    newSelected[key] = moment(date).utc().toISOString();

    // Update the state.
    this.setState({
      releaseDocumentObject: newSelected,
      [`${key}StartDate`]: date,
    });

    // Reset userSubmittedForm.
    this.setState({ userSubmittedForm: false });
  }

  // Method to handle Input field and state.
  handleInputChange(key, e) {
    let newSelected = _.extend({}, this.state.releaseDocumentObject);
    newSelected[key] = e.target.value;

    // Update the state.
    this.setState({ releaseDocumentObject: newSelected });

    // Reset userSubmittedForm.
    this.setState({ userSubmittedForm: false });
  }

  // Method to handle DataSelect and state.
  handleDataSelectChange(key, type, exportAs, value, obj) {
    const arr = [];
    let newSelected = _.extend({}, this.state.releaseDocumentObject);

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) {
        const exportItem = exportAs ? item[exportAs] : item;
        arr.push(exportItem);
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
    this.setState({ releaseDocumentObject: newSelected });

    // Reset userSubmittedForm.
    this.setState({ userSubmittedForm: false });
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

  // Cancel button.
  handleCancelButtonClick() {
    const { dispatch } = this.props;
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
  }

  // Save button.
  handleSaveButtonClick() {
    const { dispatch } = this.props;

    // console.log(this.state.releaseDocumentObject);

    // Reset form errors counter.
    this.setState({ formErrors: 0 });

    // Dispatch to tell form fields to check themselves.
    dispatch( dmValidateFormField(true) );

    // Set that the user has submitted the form.
    this.setState({ userSubmittedForm: true });

    // Reset toastr form alert.
    this.setState({ toastrFormAlertCount: 0 });

    // Turn button loader on.
    this.buttonLoader = true;
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
    const { dmFormValidation, dmLookups } = this.props;
    const {
      releaseDocumentObject,
      ReleaseDateStartDate,
      AcknowledgementDueDateStartDate,
      releaseNotificationDisctribution,
    } = this.state;
    const { validateField } = dmFormValidation;

    // Get data from Lookups.
    const lookupsData = dmLookups ? dmLookups.items : [];
    const notificationUsers = lookupsData.DocumentViewers;
    const releaseSchedulingTypesOptions = lookupsData.ReleaseSchedulingTypes;

    // Get data from document copy on local state.
    const releaseNotificationUsers = releaseDocumentObject.NotificationUsers ? releaseDocumentObject.NotificationUsers : null;
    // const notificationUsersValue = releaseNotificationUsers;
    // console.log(notificationUsersValue);
    const releaseSchedulingTypesValue = releaseDocumentObject.ReleaseSchedulingType;
    const showFutureDate = releaseSchedulingTypesValue === 'futuredate';
    const isAcknowledgementRequired = releaseDocumentObject.IsAcknowledgementRequired;


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
            {this.buttonLoader ?
              <Button bsStyle="success" bsSize="xs" disabled>
                <Loader dots />
              </Button>
            :
              <Button bsStyle="success" bsSize="xs" onClick={this.handleSaveButtonClick.bind(this)}>
                Release
              </Button>
            }
          </div>
        </div>

        <div className="sidebar-details">
          <div className="document-details">

            <DataInput
              type="textarea"
              label="Release Notes"
              onChange={this.handleInputChange.bind(this, 'ReleaseNotes')}
            />

            <DataInput
              type="textarea"
              label="Training and Communication Notes"
              onChange={this.handleInputChange.bind(this, 'TrainingNotes')}
            />

            <DataSelect
              label="Release Notification Distribution"
              value={releaseNotificationDisctribution}
              placeholder="None Selected"
              multi
              disabled
            />

            <DataSelect
              label="Additional Release Notifications"
              options={notificationUsers}
              value={releaseNotificationUsers}
              onChange={this.handleDataSelectChange.bind(this, 'NotificationUsers', 'array', null)}
              multi
            />

            <div className="form-group">
              <label className="control-label">
                <input type="checkbox" onClick={this.handleCheckboxChange.bind(this, 'IsAcknowledgementRequired')}/>
                {' '}
                Is Acknowledgement Required?
              </label>
            </div>

            {isAcknowledgementRequired ?
              <div className="form-group">
                <label className="control-label required">Acknowledgement Due Date</label>
                <DatePicker
                  className="form-control"
                  selected={AcknowledgementDueDateStartDate}
                  onChange={this.handleDateChange.bind(this, 'AcknowledgementDueDate')}
                  dateFormat="MMMM DD, YYYY"
                  // isClearable
                  showYearDropdown
                />
              </div>
            : null}

            <DataSelect
              label="Release Schedule"
              options={releaseSchedulingTypesOptions}
              value={releaseSchedulingTypesValue}
              onChange={this.handleDataSelectChange.bind(this, 'ReleaseSchedulingType', 'object', 'Id')}

              // Form validation.
              isRequired
              validateField={validateField}
              handleErrorCallback={this.handleErrorCallback.bind(this)}
            />

            {showFutureDate ?
              <div className="form-group">
                <label className="control-label required">Future Document Release Date</label>
                <DatePicker
                  className="form-control"
                  selected={ReleaseDateStartDate}
                  onChange={this.handleDateChange.bind(this, 'ReleaseDate')}
                  dateFormat="MMMM DD, YYYY"
                  // isClearable
                  showYearDropdown
                />
              </div>
            : null}

          </div>
        </div>
      </div>
    );
  }
}

// propTypes.
DocumentRelease.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmFormValidation: React.PropTypes.object,
  dmLookups: React.PropTypes.object,
  dmUi: React.PropTypes.object,
  globalAuth: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmFormValidation: state.dmFormValidation,
  dmLookups: state.dmLookups,
  dmUi: state.dmUi,
  globalAuth: state.globalAuth,
});

// Export.
export default connect(mapStateToProps)(DocumentRelease);
