// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {ListGroupItem } from 'react-bootstrap';


// Define class.
class AuditTrailCard extends React.Component {

  // Render method.
  render() {
    return (
      <ListGroupItem>
        <div className="list-card neutral">
          <div className="meta-wrapper">
            <h4>{this.props.action}</h4>
          </div>

          <p>
            <small>
              <strong>By:</strong> {this.props.userName}
              <br />
              <strong>Date:</strong> {moment(this.props.editDate).format('L')} at {moment(this.props.editDate).format('h:mm a')}
            </small>
          </p>

          <h5 className="text-right">{this.props.statusLog}</h5>

        </div>
      </ListGroupItem>
    );
  }
}

// propTypes.
AuditTrailCard.propTypes = {
  dispatch: React.PropTypes.func,
  editDate: React.PropTypes.string,
  action: React.PropTypes.string,
  userName: React.PropTypes.string,
  statusLog: React.PropTypes.string,
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument
});


// Export.
export default connect(mapStateToProps)(AuditTrailCard);
