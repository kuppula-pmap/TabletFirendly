// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  FormControls,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import Avatar from '../../../../../components/Avatar';

import utils from '../../../../../utils';


// Define class.
class WorkflowQuickView extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      todaysDate: moment().format('l'),
    };
  }

  // Render method.
  render() {
    // Flag to show the tooltip for the final checkbox.
    const {dmDocument} = this.props;
    const documentData = dmDocument ? dmDocument.items : null;
    const workflowData = documentData ? documentData.Workflow : null;
    const stagesData = workflowData ? workflowData.Stages : [];

    const ownerData = documentData.Owner ? documentData.Owner : null;
    const docOwner = ownerData ? ownerData.Description : null;
    const {DocumentState, IsFinal} = documentData;
    const currentState = DocumentState ? DocumentState.CurrentState : null;

    const owner = [];
    const users = [];

    // Static tooltip.
    const tooltipOwner = (
      <Tooltip id="tooltipOwner">Document Owner</Tooltip>
    );
    const tooltipStatusFinal = (
      <Tooltip id="tooltipStatusFinal">The document is final</Tooltip>
    );
    const tooltipStatusPending = (
      <Tooltip id="tooltipStatusPending">Pending Release</Tooltip>
    );

    // If the current state of the document is draft, turn the avatar color to yellow. Otherwise keep it green.
    let ownerAvatarStatus = currentState === 'Draft' ? 'warning' : 'success';

    // Owner.
    owner.push(
      <OverlayTrigger placement="bottom" overlay={tooltipOwner} key={utils.unique()}>
        <span><Avatar name={docOwner} status={ownerAvatarStatus} size={28} random={false} borderWidth={1} /></span>
      </OverlayTrigger>
    );

    // Users stages separator.
    users.push(
      <div className="divider-vertical" key={utils.unique()}></div>
    );

    // Loop through stages.
    if (stagesData) {
      stagesData.forEach(stage => {
        // console.log('stage:', stage);
        const { NumberOfUsers, Description, UserApprovals, IsCompleted, IsInProgress } = stage;

        // Push all Grey avatars for a stage that has started.
        if (!IsCompleted && !IsInProgress) {
          if (NumberOfUsers) {
            // Loop through all the users.
            for (let i = 0; i < NumberOfUsers; i++) {
              // Create a unique key based on iteration and the description.
              const itemKey = `${Description} #${i + 1}`;
              // If UserApprovals has items.
              if (UserApprovals.length) {
                // Obtain the fullname of the user.
                const approvalUserFullName = UserApprovals[i].ApprovalUserFullName;

                let avatarStatus = 'neutral';
                let avatarStatusText = 'is pending approval';

                const tooltipUser = (
                  <Tooltip id={`tooltip${itemKey}`}>
                    {`${approvalUserFullName} ${avatarStatusText}`}
                  </Tooltip>
                );

                // Reviewers and approvers.
                users.push(
                  <OverlayTrigger placement="bottom" overlay={tooltipUser} key={utils.unique()}>
                    <span><Avatar name={approvalUserFullName} status={avatarStatus} size={28} random={false} borderWidth={1} /></span>
                  </OverlayTrigger>
                );
              }
            }
          }
        // Else if this stage is in progress.
        } else {
          // Check number of users.
          if (NumberOfUsers) {
            // Loop through all the users.
            for (let i = 0; i < NumberOfUsers; i++) {
              // Create a unique key based on iteration and the description.
              const itemKey = `${Description} #${i + 1}`;
              // If UserApprovals has items.
              if (UserApprovals.length) {
                // Obtain the fullname of the user.
                const approvalUserFullName = UserApprovals[i].ApprovalUserFullName;
                // const dueDate = moment(UserApprovals[i].DueDate).format('l'); // && moment().isBefore(dueDate)
                const isApproved = UserApprovals[i].IsApproved;

                let avatarStatus;
                let avatarStatusText = '';

                if ( !isApproved ) {
                  avatarStatus = 'warning';
                  avatarStatusText = 'is pending approval';
                } else {
                  avatarStatus = 'success';
                  avatarStatusText = 'has approved this document';
                }

                const tooltipUser = (
                  <Tooltip id={`tooltip${itemKey}`}>
                    {`${approvalUserFullName} ${avatarStatusText}`}
                  </Tooltip>
                );

                // Reviewers and approvers.
                users.push(
                  <OverlayTrigger placement="bottom" overlay={tooltipUser} key={utils.unique()}>
                    <span><Avatar name={approvalUserFullName} status={avatarStatus} size={28} random={false} borderWidth={1} /></span>
                  </OverlayTrigger>
                );
              }
            }
          }
        }
        // Sometimes UserApprovals will be empty when NumberOfUsers = 1. This means you will have two dividers side by side.
        // Before we add a divider, check to see if we have UserApprovals, and then push the divder.
        if (UserApprovals.length) {
          users.push(
            <div className="divider-vertical" key={utils.unique()}></div>
          );
        }
      });
    }

    // If the current state of the document is approved.
    if (currentState === 'Approved') {
      // Push Overlay with tooltip that displays 'pending release'
      users.push(
        <OverlayTrigger placement="bottom" overlay={tooltipStatusPending} key={utils.unique()}>
          <span><Avatar icon="ellipsis-h" status="neutral" size={28} random={false} borderWidth={1}/></span>
        </OverlayTrigger>
      );
    // If the current state of the document is final.
    } else if (IsFinal) {
      // Push Overlay with tooltip that displays 'approved'
      users.push(
        <OverlayTrigger placement="bottom" overlay={tooltipStatusFinal} key={utils.unique()}>
          <span><Avatar icon="check" status="approved" size={28} random={false} borderWidth={1} /></span>
        </OverlayTrigger>
      );
    // Hide the tooltip for everything else.
    } else {
      // NOTE: Using delayShow to hide the tooltip on mouse hover.
      users.push(
      <OverlayTrigger placement="bottom" overlay={tooltipStatusPending} delayShow={999999999} key={utils.unique()}>
        <span><Avatar icon="ellipsis-h" status="neutral" size={28} random={false} borderWidth={1}/></span>
      </OverlayTrigger>
      );
    }

    return (
      <div className="workflow-avatars">
        <div className="document-details">
          <FormControls.Static label="Workflow" />
        </div>

        {owner ? owner[0] : null}

        {users}

      </div>
    );
  }
}

// Validation.
WorkflowQuickView.propTypes = {
  dmDocument: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
});

// Export.
export default connect(mapStateToProps)(WorkflowQuickView);
