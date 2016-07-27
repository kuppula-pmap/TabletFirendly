// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ListCard from '../../../../components/ListCard';
import Loader from '../../../../components/Loader';


// DM Actions.
// import { fetchViewHistory } from '../../redux/actions/viewHistory-actions';
import { setRightPanelAreaView } from '../../redux/actions/ui-actions';
import { DM_RIGHT_PANEL_VERSION_HISTORY } from '../../redux/constants/ui-constants';

// Utility methods.
import utils from '../../../../utils';

// Define class.
class ViewHistory extends React.Component {

  // Cancel button.
  handleBackButtonClick() {
    const { dispatch } = this.props;
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_VERSION_HISTORY));
  }


  // Render method.
  render() {
    const { dmViewHistory } = this.props;

    // Change Request Data.
    const viewHistoryData = dmViewHistory.items || [];

    // console.log('viewHistoryData:', viewHistoryData);

    const styles = {
      base: {
        margin: '0 0 4px',
      },

      viewAction: {
        textTransform: 'capitalize',
      },
    };

    let list = [];
    if (viewHistoryData.length) {
      viewHistoryData.map( item => {
        // console.log('viewHistoryData item:', item);
        list.push(
          <ListGroupItem key={utils.unique()} >
            <ListCard status="default">
              <p>
                <strong>{item.UserName}</strong>
              <br/>
                {moment(item.EditDate).format('ll')}
                {' '}
                {moment(item.EditDate).format('LT')}
              </p>
              <div className="clearfix">
                <p className="pull-right text-uppercase">
                  {item.Action}
                </p>
              </div>
            </ListCard>
          </ListGroupItem>
        );
      });
    }

    // Check if list has items or is empty.
    let viewHistoryList;
    if (list.length) {
      viewHistoryList = (
        <ListGroup bsStyle="info" style={styles.base}>
          {list}
        </ListGroup>
      );
    } else {
      viewHistoryList = (
        <div className="sidebar-details">
          <p className="lead">Awe, shucks.</p>
          <p>Unfortunately, this document does not have any views yet.</p>
        </div>
      );
    }


    return (
      <div>

        <div className="fixed-title clearfix">
          <h3 className="pull-left">
            View History
          </h3>
          <div className="pull-right sidebar-header-actions">
            <Button bsStyle="default" bsSize="xs" onClick={this.handleBackButtonClick.bind(this)}>
              Back
            </Button>
          </div>
        </div>

        <div>
          {dmViewHistory.isFetching ?
            <Loader size={16} padding="0 0 10px" theme="dark" />
          :
            viewHistoryList
          }
        </div>

      </div>
    );
  }
}

// propTypes.
ViewHistory.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmViewHistory: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmViewHistory: state.dmViewHistory,
});

// Export.
export default connect(mapStateToProps)(ViewHistory);
