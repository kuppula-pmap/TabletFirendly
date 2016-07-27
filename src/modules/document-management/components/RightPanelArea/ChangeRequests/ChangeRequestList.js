// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../../components/Loader';
import ChangeRequestCard from './ChangeRequestCard';
import DetailViewDropdown from '../DetailViewDropdown';

import utils from '../../../../../utils';


// DM Actions.
import { fetchChangeRequest } from '../../../redux/actions/changeRequest-actions';
import {
  setRightPanelAreaView,
  setSelectedChangeRequest,
} from '../../../redux/actions/ui-actions';
import { DM_RIGHT_PANEL_OWNER_CHANGE_REQUEST } from '../../../redux/constants/ui-constants';


// Define class.
class ChangeRequestList extends React.Component {

  componentWillMount() {
    const { dispatch, dmDocument } = this.props;

    // Document data.
    const documentData = dmDocument ? dmDocument.items : [];
    const uid = documentData.CurrentVersion ? documentData.CurrentVersion.Uid : null;

    // Fetch change requests.
    if (uid) dispatch( fetchChangeRequest(uid) );
  }

  viewChangeRequestDetail(id) {
    const { dispatch } = this.props;

    // Set right panel to owner change request view.
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_OWNER_CHANGE_REQUEST));

    // console.log('viewChangeRequestDetail id:', id);

    // Set selected change request id.
    dispatch(setSelectedChangeRequest(id));
  }


  // Render method.
  render() {
    const { dmChangeRequests } = this.props;

    // Change Request Data.
    const changeRequestData = dmChangeRequests.items || [];

    // console.log('changeRequestData:', changeRequestData);

    let list = [];
    if (changeRequestData.length) {
      changeRequestData.map( item => {
        // console.log('changeRequestData item:', item);
        list.push(
          <ChangeRequestCard
            key={utils.unique()}
            data={item}
            handleParentCallback={this.viewChangeRequestDetail.bind(this)}
          />
        );
      });
    }

    // Check if list has items or is empty.
    let changeRequestList;
    if (list.length) {
      changeRequestList = list;
    } else {
      changeRequestList = (
        <div className="sidebar-details">
          <p>This document does not have any pending change requests.</p>
        </div>
      );
    }


    return (
      <div>

        <div className="fixed-title clearfix">
          <div className="pull-left">
            <DetailViewDropdown />
          </div>
        </div>

        {dmChangeRequests.isFetching ?
          <Loader size={16} padding="0 0 10px" theme="dark" />
        :
          changeRequestList
        }

      </div>
    );
  }
}

// propTypes.
ChangeRequestList.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmChangeRequests: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmChangeRequests: state.dmChangeRequests,
});

// Export.
export default connect(mapStateToProps)(ChangeRequestList);
