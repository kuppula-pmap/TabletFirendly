// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Core components.
import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

// Components.
import Avatar from '../../../../../components/Avatar';

import utils from '../../../../../utils';

import moment from 'moment';


// Define class.
class WorkflowList extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }


  // Render method.
  render() {
    const { dmDocument } = this.props;

    // Get global user Id.
    const documentData = dmDocument ? dmDocument.items : null;
    const workflowData = documentData ? documentData.Workflow : null;
    const stagesData = workflowData ? workflowData.Stages : [];
    const documentState = documentData ? documentData.DocumentState : null;
    const currentState = documentState ? documentState.CurrentState : null;

    const docOwner = documentData.Owner.Description;
    const docCreateDate = moment(documentData.CreatedDate).format('L');

    const owner = [];
    const users = [];

    const ownerStatus = currentState === 'Draft' ? 'pending' : 'success';

    owner.push(
      <ListGroupItem key={utils.unique()}>
        <div className={`list-card ${ownerStatus}`}>
          <h4>{docOwner}</h4>
          <br />
          <div className="corner-icon">
            <Avatar name={docOwner} status={ownerStatus} random={false} borderWidth={1} />
          </div>
          <div className="meta-wrapper">
            <div className="clearfix">
              <p className="pull-left">{docCreateDate}</p>
              <p className="pull-right">Owner</p>
            </div>
          </div>
        </div>
      </ListGroupItem>
    );

    if (stagesData) {
      stagesData.forEach(stage => {
        const { NumberOfUsers, UserApprovals, IsCompleted, IsInProgress } = stage;
        // Check number of users.
        if (NumberOfUsers) {
          for (let i = 0; i < NumberOfUsers; i++) {
            if (UserApprovals[i]) {
              const approvalUserFullName = UserApprovals[i].ApprovalUserFullName;
              const createDate = moment(UserApprovals[i].CreatedDate).format('L');
              const comments = UserApprovals[i].Comments;
              const isApproved = UserApprovals[i].IsApproved;
              const isRejected = UserApprovals[i].IsRejected;
              let userStatus = 'default';
              if (IsCompleted || IsInProgress) {
                userStatus = isApproved ? 'approved' : 'pending';
              }
              if (isRejected) userStatus = 'rejected';

              // Reviewers and approvers.
              users.push(
                <ListGroupItem key={utils.unique()}>
                  <div className={`list-card ${currentState === 'Draft' ? 'default' : userStatus}`}>
                    <h4>{approvalUserFullName}</h4>
                    <br />
                    <p>{comments}</p>
                    <div className="corner-icon">
                      <Avatar name={approvalUserFullName} padding={0} status={currentState === 'Draft' ? 'default' : userStatus} random={false} borderWidth={1} />
                    </div>
                    <div className="meta-wrapper">
                      <div className="clearfix">
                        <p className="pull-left">{createDate}</p>
                        <p className={`pull-right ${currentState === 'Draft' ? 'default' : userStatus}`}>{userStatus}</p>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              );
            }
          }
        }
      });
    }

    // console.log('Owner: ', owner);
    // console.log('Users: ', users);

    return (
      <ListGroup bsStyle="info">
        {owner ? owner[0] : null}
        {users}
      </ListGroup>
    );
  }
}

// Validation.
WorkflowList.propTypes = {
  dmDocument: React.PropTypes.object,
};


const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
});

// Export.
export default connect(mapStateToProps)(WorkflowList);
