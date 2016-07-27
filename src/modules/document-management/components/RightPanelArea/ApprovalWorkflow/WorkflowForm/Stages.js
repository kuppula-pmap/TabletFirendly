// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import StageRow from './StageRow';
import { Row, Col } from 'react-bootstrap';

// DatePicker.
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Utilities.
import utils from '../../../../../../utils';


// Define class.
class Stages extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      approvalDate: {},
    };
  }

  // Method to handle date picker and state.
  handleDateChange(dueDateObj, date) {
    const dueDate = date ? new Date(date) : new Date();
    // Mutate Stage due date.
    dueDateObj.DueDate = dueDate.toISOString();

    // Update the state.
    this.setState({ approvalDate: dueDateObj.DueDate });
  }

  handleErrorCallback() {
    this.props.handleErrorCallback();
  }

  // Render method.
  render() {
    const {workflowData, dmDocument, validateField} = this.props;

    const documentData = dmDocument ? dmDocument.items : [];
    const stagesData = workflowData ? workflowData.Stages : [];

    const documentVersionUid = documentData.TargetVersionUid;
    const canChangeWorkflow = documentData.CanChangeWorkflow;

    let stages = [];
    if (stagesData) {
      stagesData.forEach(stage => {
        const {NumberOfUsers, Description, UserApprovals} = stage;

        // Check number of users.
        if (NumberOfUsers) {
          stages.push(
            <p key={utils.unique()}><strong>{Description}</strong></p>
          );
          stages.push(
            <hr key={utils.unique()} />
          );

          for (let i = 0; i < NumberOfUsers; i++) {
            const itemKey = `${Description}-${i}`;
            const newUser = {
              Id: null,
              Description: null
            };

            if (UserApprovals) {
              // Build object and get values.
              newUser.Id = UserApprovals[i] ? UserApprovals[i].ApprovalUserId : null;
              newUser.Description = UserApprovals[i] ? UserApprovals[i].ApprovalUserFullName : null;
            }

            // Mutate data.
            // Create UserApprovals object.
            stage[itemKey] = newUser;

            // console.log('stage: ' + itemKey + ' :', stage);
            stages.push(
              <StageRow
                docStateMutableData={stage}
                key={itemKey}
                itemKey={itemKey}
                validateField={validateField}
                handleErrorCallback={this.handleErrorCallback.bind(this)}
              />);
          }

          // Get date.
          const dueDateValue = stage.DueDate ? moment(stage.DueDate) : moment(new Date());

          // Mutate Stage due date if empty.
          if (!stage.DueDate) {
            const dueDate = new Date();
            stage.DueDate = dueDate.toISOString();
          }
          stage.DocumentVersionUid = documentVersionUid;
          // console.log(`***${Description} STAGE :`, stage);

          stages.push(
            <Row key={utils.unique()}>
              <Col xs={12}>
                  <div className="form-group">
                    <label className="control-label required">Approval Time Frame</label>
                      <DatePicker
                        className="form-control"
                        onChange={this.handleDateChange.bind(this, stage)}
                        dateFormat="MMMM DD, YYYY"
                        minDate={moment()}
                        placeholderText="Click to select a date"
                        selected={dueDateValue}
                        showYearDropdown
                        disabled={!canChangeWorkflow}
                      />
                  </div>
              </Col>
            </Row>
          );
        }
      });
    }

    return (
      <div>
        <p><small>Assign an approver to each position in the approval process.</small></p>
        {stages}
      </div>
    );
  }
}

// Validation.
Stages.propTypes = {
  workflowData: React.PropTypes.object,
  dataOptions: React.PropTypes.array,
  docStateMutableData: React.PropTypes.object,
  validateField: React.PropTypes.bool,
  handleErrorCallback: React.PropTypes.func,
  dmLookups: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
};


const mapStateToProps = (state) => ({
  dmLookups: state.dmLookups,
  dmDocument: state.dmDocument,
});

// Export.
export default connect(mapStateToProps)(Stages);
