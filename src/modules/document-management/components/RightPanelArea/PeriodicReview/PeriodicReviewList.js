// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ListCard from '../../../../../components/ListCard';
import Loader from '../../../../../components/Loader';

import utils from '../../../../../utils';

// Doc mgt actions
import { fetchPeriodicReviews } from '../../../redux/actions/periodicReviews-actions';


// Define class.
class PeriodicReviewList extends React.Component {

  componentWillMount() {
    const { dispatch, dmDocument } = this.props;

    // Document data.
    const documentData = dmDocument.items ? dmDocument.items : null;
    const uid = documentData ? documentData.Uid : null;

    if (uid) dispatch(fetchPeriodicReviews(uid));
  }

  // Render method.
  render() {
    const { dmPeriodicReviews } = this.props;

    // Period Review data.
    const periodicReviewData = dmPeriodicReviews ? dmPeriodicReviews.items : null;

    console.log('periodicReviewData:', periodicReviewData);

    const styles = {
      base: {
        margin: '0 0 4px',
        cursor: 'pointer',
      },
    };

    let list = [];
    if (periodicReviewData.length) {
      periodicReviewData.map( item => {
        let status;
        switch (item.ReviewStatus) {
        case 'archived':
          status = 'rejected';
          break;
        case 'revised':
          status = 'pending';
          break;
        case 'approved':
          status = 'approved';
          break;
        default:
          status = 'default';
        }

        // console.log('periodicReviewData item:', item);
        list.push(
          <ListGroupItem key={utils.unique()}>
            <ListCard status={status}>
              <div className="clearfix">
                <div className="pull-left">
                  <p><strong>{item.ReviewedByName}</strong></p>
                </div>
                <div className="pull-right">
                  <p>{moment(item.ReviewedDate).format('l')}</p>
                </div>
              </div>
              {item.Comments ?
                <div>{item.Comments}</div>
              : null}
              <p className="text-right text-uppercase"><small>{item.ReviewStatus}</small></p>
            </ListCard>
          </ListGroupItem>
        );
      });
    }

    // Check if list has items or is empty.
    let periodicReviewList;
    if (list.length) {
      periodicReviewList = (
        <div>
          <h4 style={{ marginLeft: 10 }}>Previous Reviews</h4>
          <hr/>
          <ListGroup bsStyle="info" style={styles.base}>
            {list}
          </ListGroup>
        </div>
      );
    } else {
      periodicReviewList = (
        <div className="sidebar-details">
          <p>No Periodic Reviews have been submitted.</p>
        </div>
      );
    }

    return (
      dmPeriodicReviews.isFetching ?
        <Loader size={16} padding="0 0 10px" theme="dark" />
      :
        periodicReviewList
    );
  }
}

// propTypes.
PeriodicReviewList.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmPeriodicReviews: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmPeriodicReviews: state.dmPeriodicReviews,
});

// Export.
export default connect(mapStateToProps)(PeriodicReviewList);
