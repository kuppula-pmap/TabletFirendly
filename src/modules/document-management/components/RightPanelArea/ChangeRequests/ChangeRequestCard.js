// Dependencies.
import React from 'react';
import moment from 'moment';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import ListCard from '../../../../../components/ListCard';


// Define class.
class ChangeRequestCard extends React.Component {

  handleClick(id) {
    this.props.handleParentCallback(id);
  }

  // Render method.
  render() {
    const { data } = this.props;
    const cardData = data ? data : [];

    // Requested date formatting
    const requestedDate = moment(cardData.RequestedDate).format('l');

    // Status.
    const statusText = cardData.ChangeRequestStatus || 'pending';

    const styles = {
      base: {
        margin: '0 0 4px',
        cursor: 'pointer',
      },
    };

    return (
      <ListGroup bsStyle="info" style={styles.base}>
        <ListGroupItem onClick={this.handleClick.bind(this, cardData)}>
          <ListCard status={statusText}>
            <p><strong>Requested by:</strong> <br/> {cardData.RequestedBy}</p>
          <p><strong>Requested on:</strong> <br/> {requestedDate}</p>
            <p>
              <strong>Reason for Change Request:</strong><br/>
              {cardData.ReasonForChangeRequest}
            </p>
            <p>
              <strong>Requested Changes:</strong><br/>
              {cardData.RequestedChanges}
            </p>
            {cardData.SourceOfChange ?
              <p>
                <strong>Source of Change:</strong><br/>
                {cardData.SourceOfChange}
              </p>
            : null}
            <div className="clearfix">
              <div className="card-date pull-left">
                {cardData.ChangeRequestPriority ?
                  <p><strong>Priority:</strong> {cardData.ChangeRequestPriority}</p>
                : null}
              </div>
              <div className="card-status text-default pull-right">
                <p>
                  <small>
                    <span className="text-uppercase">{statusText}</span>
                  </small>
                </p>
              </div>
            </div>
          </ListCard>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

// Validation.
ChangeRequestCard.propTypes = {
  data: React.PropTypes.object,
  handleParentCallback: React.PropTypes.func,
  dispatch: React.PropTypes.func,
};

// Export.
export default ChangeRequestCard;
