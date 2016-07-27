// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
} from 'react-bootstrap';

// Components.
import Avatar from '../../../../../../components/Avatar';
import DataSelect from '../../../../../../components/DataForms/DataSelect';


// Define class.
class StageRow extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  // Method to handle DataSelect and state.
  handleDataSelectChange(key, value, obj) {
    const selectedStage = this.props.docStateMutableData;
    const arr = [];

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) {
        arr.push(item);
      }
    });

    if (arr[0]) {
      // Mutate the original state.
      selectedStage[key] = arr[0];
    } else {
      const newUser = {
        Id: null,
        Description: null
      };
      selectedStage[key] = newUser;
    }

    // Keep UserApproval array in sync.
    const {NumberOfUsers, Description, WorkflowCommand} = selectedStage;
    const userApprovals = [];

    for (let i = 0; i < NumberOfUsers; i++) {
      const itemKey = `${Description}-${i}`;
      // Check if dropdown is selected.
      if (selectedStage[itemKey].Id) {
        // Add obj to the array.
        const newUser = {
          ApprovalUserId: selectedStage[itemKey].Id,
          ApprovalUserFullName: selectedStage[itemKey].Description,
          WorkflowCommand
        };

        userApprovals.push(newUser);
      }
    }

    // console.log(`${key} BEFORE:`, JSON.stringify(selectedStage.UserApprovals));

    // Mutate UserApproval.
    selectedStage.UserApprovals = userApprovals;
    // console.log(`${key} AFTER:`, JSON.stringify(selectedStage.UserApprovals));
  }

  handleErrorCallback() {
    this.props.handleErrorCallback();
  }


  // Render method.
  render() {
    const { dmLookups, dmDocument, validateField } = this.props;

    const lookupsData = dmLookups ? dmLookups.items : [];
    const documentData = dmDocument ? dmDocument.items : [];

    const approversOptions = lookupsData.Approvers;
    const canChangeWorkflow = documentData.CanChangeWorkflow;

    // Key per select dropdown;
    const {itemKey} = this.props;
    const selectedStage = this.props.docStateMutableData;

    return (
      <Row className="form-group">
        <Col xs={2}>
          <Avatar name={selectedStage[itemKey].Description} padding="5px 0 0" borderWidth={1} size={28} status="default" icon="user" />
        </Col>
        <Col xs={10}>
          <DataSelect
            options={approversOptions}
            value={selectedStage[itemKey]}
            placeholder="Select Approver"
            onChange={this.handleDataSelectChange.bind(this, itemKey)}
            clearable={false}
            disabled={!canChangeWorkflow}

            // Form validation.
            isRequired
            validateField={validateField}
            handleErrorCallback={this.handleErrorCallback.bind(this)}
            showAsterisk
            log
          />
        </Col>
      </Row>
    );
  }
}

// Validation.
StageRow.propTypes = {
  docStateMutableData: React.PropTypes.object,
  itemKey: React.PropTypes.string,
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
export default connect(mapStateToProps)(StageRow);
