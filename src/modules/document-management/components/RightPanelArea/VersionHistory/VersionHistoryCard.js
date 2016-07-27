// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Core components.
import { Button, ListGroupItem } from 'react-bootstrap';
import Icon from 'react-fa';

// Date format.
import moment from 'moment';

// DM Actions.
import {
  setRightPanelAreaView,
  setContentAreaView
} from '../../../redux/actions/ui-actions';

// UI constants.
import { DM_RIGHT_PANEL_VIEW_HISTORY,
         DM_CONTENT_AREA_PREVIEW,
         DM_RIGHT_PANEL_VIEW_DETAILS
} from '../../../redux/constants/ui-constants';

import { fetchDocument } from '../../../redux/actions/document-actions';
import { fetchPreviewDocument } from '../../../redux/actions/previewDocument-actions';
import { fetchViewHistory } from '../../../redux/actions/viewHistory-actions';

// Define class.
class VersionHistoryCard extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      selectedKey: 'default',
      selectedValue: 'All Tasks',
    };
  }

  handleSelect(e, key) {
    this.setState({ selectedValue: e.currentTarget.outerText });
    this.setState({ selectedKey: key });
  }

  showViewHistory() {
    const { dispatch, version } = this.props;
    const versionUid = version.DocumentVersionUid;
    dispatch(fetchViewHistory(versionUid));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_VIEW_HISTORY));
  }

  showViewDocument() {
    const { dispatch, version } = this.props;
    const { DocumentUid, DocumentVersionUid } = version;
    dispatch(fetchDocument(DocumentUid, DocumentVersionUid));
    dispatch(fetchPreviewDocument(DocumentVersionUid, 'view'));
    dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW));
  }

  showViewDetails() {
    const { dispatch, version } = this.props;
    const { DocumentUid, DocumentVersionUid } = version;
    dispatch(fetchDocument(DocumentUid, DocumentVersionUid));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_VIEW_DETAILS));
  }

  // Render method.
  render() {
    const { version } = this.props;
    const {
      Version,
      RevisionCount,
      DocumentVersionStatusType,
      UpdateComment,
      Views,
      IsCurrent,
    } = version;

    const date = moment(version.ActionDate).isValid() ? moment(version.ActionDate).format('MM/DD/YYYY h:mm:ss') : null;

    return (
      <ListGroupItem>
        <div className={`list-card ${IsCurrent ? 'success' : 'neutral'}`}>
          <h4>
            Version {Version}
          </h4>
          <Icon name="file-word-o" className="fa-fw fa-lg text-muted corner-icon" />
          <div className="meta-wrapper">
            <div className="clearfix">
              <div className="pull-left">
                <strong>Draft #:</strong> {RevisionCount}
              </div>
              <div className="pull-right">{date}</div>
            </div>
            <br/>
            <div className="clearfix">
              <div className="pull-left">
                <strong>Status:</strong> {DocumentVersionStatusType}
              </div>
            </div>
            <br/>
            <div className="clearfix">
              <div className="pull-left">
                <strong>Views:</strong>
                  <Button bsStyle="link" bsSize="xs" onClick={this.showViewHistory.bind(this)}>{Views}</Button>
              </div>
              <div className="pull-right"></div>
            </div>
            <p>{UpdateComment}</p>
            <div className="clearfix">
              {/*
              <p className="pull-left hide">
                <Button bsStyle="primary" bsSize="xs">
                  <Icon name="repeat" className="fa-fw fa-flip-horizontal" /> Restore
                </Button>
              </p>
              */}
              <p className="pull-right">
                <Button bsStyle="link" bsSize="xs" onClick={this.showViewDetails.bind(this)}>View Details</Button>
                <Button bsStyle="link" bsSize="xs" onClick={this.showViewDocument.bind(this)}>View Document</Button>
              </p>
            </div>
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

// propTypes.
VersionHistoryCard.propTypes = {
  dispatch: React.PropTypes.func,
  version: React.PropTypes.object
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument
});

// Export.
export default connect(mapStateToProps)(VersionHistoryCard);
