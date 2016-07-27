// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

import utils from '../../../../utils';


// Doc Mgt actions.
import {
  DM_RIGHT_PANEL_DETAIL,
  /* DM_RIGHT_PANEL_VIEWER_CHANGE_REQUEST, */
  DM_RIGHT_PANEL_CHANGE_REQUEST_LIST,
  DM_RIGHT_PANEL_VERSION_HISTORY,
  DM_RIGHT_PANEL_RELEASE_DOCUMENT,
  DM_RIGHT_PANEL_APPROVAL_WORKFLOW,
  DM_RIGHT_PANEL_PERIODIC_REVIEW,
  DM_RIGHT_PANEL_AUDIT_TRAIL,
  // DM_RIGHT_PANEL_VIEW_HISTORY,
} from '../../redux/constants/ui-constants';
import { setRightPanelAreaView } from '../../redux/actions/ui-actions';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';


// Const.
const DETAIL_TITLE = 'Document Details';
const DM_RIGHT_PANEL_VERSION_HISTORY_TITLE = 'Version History';
const APPROVE_CHANGE_REQUEST_TITLE = 'Change Requests';
const DM_RIGHT_PANEL_APPROVAL_WORKFLOW_TITLE = 'Approval Workflow';
const DM_RIGHT_PANEL_RELEASE_DOCUMENT_TITLE = 'Release Document';
const DM_RIGHT_PANEL_PERIODIC_REVIEW_TITLE = 'Periodic Review';
const DM_RIGHT_PANEL_AUDIT_TRAIL_TITLE = 'Audit Trail';
// const DM_RIGHT_PANEL_VIEW_HISTORY_TITLE = 'View History';


// Define class.
class DetailViewDropdown extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      currentViewTitle: 'Dropdown'
    };
  }

  componentWillMount() {
    const { dmUi } = this.props;
    switch (dmUi.rightPanelAreaView) {
    case DM_RIGHT_PANEL_DETAIL:
      this.setState({ currentViewTitle: DETAIL_TITLE });
      break;
    case DM_RIGHT_PANEL_VERSION_HISTORY:
      this.setState({ currentViewTitle: DM_RIGHT_PANEL_VERSION_HISTORY_TITLE });
      break;
    case DM_RIGHT_PANEL_CHANGE_REQUEST_LIST:
      this.setState({ currentViewTitle: APPROVE_CHANGE_REQUEST_TITLE });
      break;
    case DM_RIGHT_PANEL_APPROVAL_WORKFLOW:
      this.setState({ currentViewTitle: DM_RIGHT_PANEL_APPROVAL_WORKFLOW_TITLE });
      break;
    case DM_RIGHT_PANEL_RELEASE_DOCUMENT:
      this.setState({ currentViewTitle: DM_RIGHT_PANEL_RELEASE_DOCUMENT_TITLE });
      break;
    case DM_RIGHT_PANEL_PERIODIC_REVIEW:
      this.setState({ currentViewTitle: DM_RIGHT_PANEL_PERIODIC_REVIEW_TITLE });
      break;
    case DM_RIGHT_PANEL_AUDIT_TRAIL:
      this.setState({ currentViewTitle: DM_RIGHT_PANEL_AUDIT_TRAIL_TITLE});
      break;
    // DEBUG only!
    // case DM_RIGHT_PANEL_VIEW_HISTORY:
    //   this.setState({ currentViewTitle: DM_RIGHT_PANEL_VIEW_HISTORY_TITLE });
    //   break;
    default:
      this.setState({ currentViewTitle: DETAIL_TITLE });
    }
  }

  handleTabClick(view) {
    // console.log(view);
    const { dispatch } = this.props;
    dispatch(setRightPanelAreaView(view));
  }

  // Render method.
  render() {
    const {
      // globalAuth,
      dmDocument
    } = this.props;
    const dropdownTitle = this.state.currentViewTitle;

    // DocumentState Data
    const documentData = dmDocument.items;
    const documentState = documentData ? documentData.DocumentState : null;
    const availableCommands = documentState ? documentState.AvailableCommands : null;
    // const currentState = documentState ? documentState.CurrentState : null;
    const isFinal = documentData.IsFinal;
    // const documentOwner = documentData ? documentData.Owner : null;

    // User data.
    // const authData = globalAuth.items ? globalAuth.items : null;
    // const userDetails = authData ? authData.UserDetails : null;

    // console.log('documentOwner:', documentOwner.Id);
    // console.log('userDetails:', userDetails.UserId);
    // console.log(documentOwner.Id === userDetails.UserId);

    // Change request menu item.
    const changeRquestMenuItem = [];
    // Turn if to show changeRquestMenuItem only if the user is the docOwner.
    // if (documentOwner.Id === userDetails.UserId) {
    if (isFinal) {
      changeRquestMenuItem.push(
        <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_CHANGE_REQUEST_LIST)}>
          {APPROVE_CHANGE_REQUEST_TITLE}
        </MenuItem>
      );
    }

    // Available commands.
    const documentReleaseMenuItem = [];
    if (availableCommands) {
      availableCommands.forEach(command => {
        // Document Release: Finalize
        if ( command.Name === 'Finalize') {
          documentReleaseMenuItem.push(
            <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_RELEASE_DOCUMENT)}>
              {DM_RIGHT_PANEL_RELEASE_DOCUMENT_TITLE}
            </MenuItem>
          );
        }
      });
    }

    let styles = {
      base: {
        marginBottom: 0,
        // marginLeft: -12,
      },

      dropdown: {
        marginBottom: 0,
      },
    };

    return (
      <ButtonGroup className="title-dropdown" style={styles.base}>
        <DropdownButton
          id="documentDetailViewDropdown"
          title={dropdownTitle}
          bsStyle="link"
          bsSize="md"
          style={styles.dropdown}>

          <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_DETAIL)}>
            {DETAIL_TITLE}
          </MenuItem>

          <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_APPROVAL_WORKFLOW)}>
            {DM_RIGHT_PANEL_APPROVAL_WORKFLOW_TITLE}
          </MenuItem>

          <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_VERSION_HISTORY)}>
            {DM_RIGHT_PANEL_VERSION_HISTORY_TITLE}
          </MenuItem>

          {changeRquestMenuItem}

          <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_PERIODIC_REVIEW)}>
            {DM_RIGHT_PANEL_PERIODIC_REVIEW_TITLE}
          </MenuItem>

          {documentReleaseMenuItem}

          <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_AUDIT_TRAIL)}>
            {DM_RIGHT_PANEL_AUDIT_TRAIL_TITLE}
          </MenuItem>

          {/*
          <MenuItem key={utils.unique()} onClick={this.handleTabClick.bind(this, DM_RIGHT_PANEL_VIEW_HISTORY)}>
            {DM_RIGHT_PANEL_VIEW_HISTORY_TITLE}
          </MenuItem>
          */}

        </DropdownButton>
      </ButtonGroup>
    );
  }
}

// propTypes.
DetailViewDropdown.propTypes = {
  dispatch: React.PropTypes.func,
  globalAuth: React.PropTypes.object,
  dmUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalAuth: state.globalAuth,
  dmUi: state.dmUi,
  dmDocument: state.dmDocument,
});

// Export.
export default connect(mapStateToProps)(DetailViewDropdown);
