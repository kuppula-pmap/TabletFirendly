// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import DocumentDetails from './DocumentDetails/StaticDocumentDetails';

// DM Actions.
// import { fetchViewHistory } from '../../redux/actions/viewHistory-actions';
import { setRightPanelAreaView } from '../../redux/actions/ui-actions';
import { DM_RIGHT_PANEL_VERSION_HISTORY } from '../../redux/constants/ui-constants';

import { Button } from 'react-bootstrap';

// Define class.
class ViewDetails extends React.Component {

  // Cancel button.
  handleBackButtonClick() {
    const { dispatch } = this.props;
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_VERSION_HISTORY));
  }


  // Render method.
  render() {
    const { dmDocument, dmLookups } = this.props;

    let documentData = dmDocument ? dmDocument.items : [];
    let lookupsData = dmLookups ? dmLookups.items : [];

    return (
      <div className="document-details">

        <div className="fixed-title clearfix">
          <h3 className="pull-left">
            Document Version Details
          </h3>
          <div className="pull-right sidebar-header-actions">
            <Button bsStyle="default" bsSize="xs" onClick={this.handleBackButtonClick.bind(this)}>
              Back
            </Button>
          </div>
        </div>

        <DocumentDetails data={documentData} lookups={lookupsData} />

      </div>
    );
  }
}

// propTypes.
ViewDetails.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmLookups: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmLookups: state.dmLookups,
});

// Export.
export default connect(mapStateToProps)(ViewDetails);
