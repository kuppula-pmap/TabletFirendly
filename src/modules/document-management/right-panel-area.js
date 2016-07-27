// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import {
  NavItem,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
import Icon from 'react-fa';


// Redux Actions.
import {
  toggleRightSidebar,
  setRightPanelAreaView
} from './redux/actions/ui-actions';
import {
  DM_CONTENT_AREA_PREVIEW,
  DM_RIGHT_PANEL_ACTIVITY,
  DM_RIGHT_PANEL_DETAIL,
  DM_RIGHT_PANEL_DETAILFORM,
  DM_RIGHT_PANEL_APPROVAL_WORKFLOW,
  DM_RIGHT_PANEL_VERSION_HISTORY,
  DM_RIGHT_PANEL_RELEASE_DOCUMENT,
  DM_RIGHT_PANEL_PERIODIC_REVIEW,
  DM_RIGHT_PANEL_CHANGE_REQUEST_LIST,
  DM_RIGHT_PANEL_VIEWER_CHANGE_REQUEST,
  DM_RIGHT_PANEL_OWNER_CHANGE_REQUEST,
  DM_RIGHT_PANEL_VIEW_HISTORY,
  DM_RIGHT_PANEL_VIEW_DETAILS,
  DM_RIGHT_PANEL_AUDIT_TRAIL,
} from './redux/constants/ui-constants';

// Components.
// import DocumentActivityList from './components/RightPanelArea/ActivityList';
import DocumentActivityList from './components/RightPanelArea/TaskList/TaskList';
import DocumentDetail from './components/RightPanelArea/DocumentDetails/Detail';
import DocumentDetailForm from './components/RightPanelArea/DocumentDetails/DetailForm';
import ChangeRequestSubmit from './components/RightPanelArea/ChangeRequests/SubmitChangeRequest';
import VersionHistoryList from './components/RightPanelArea/VersionHistory/VersionHistoryList';
import ChangeRequestList from './components/RightPanelArea/ChangeRequests/ChangeRequestList';
import ReleaseDocument from './components/RightPanelArea/ReleaseDocument';
import ApprovalWorkflow from './components/RightPanelArea/ApprovalWorkflow/ApprovalWorkflow';
import PeriodicReview from './components/RightPanelArea/PeriodicReview/PeriodicReview';
import ViewHistory from './components/RightPanelArea/ViewHistory';
import ViewDetails from './components/RightPanelArea/ViewDetails';
import AuditTrailList from './components/RightPanelArea/AuditTrail/AuditTrailList';

// Const.
const TAB_TASKS = 'TAB_TASKS';
const TAB_DETAIL = 'TAB_DETAIL';

const expandCollapseTooltip = <Tooltip id="expandCollapseTooltip">Expand/Collapse</Tooltip>;
// const tasksTooltip = <Tooltip id="tasksTooltip">View All Tasks</Tooltip>;
// const detailTooltip = <Tooltip id="detailTooltip">Document Detail</Tooltip>;

// Define class.
class RightPanelArea extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      currentTab: TAB_TASKS,
    };
  }

  handleTabClick(tab) {
    const { dispatch, dmUi, dmDocument } = this.props;
    const { currentTab } = this.state;

    // Document data.
    const documentData = dmDocument.items ? dmDocument.items : null;
    // console.log('documentData:', documentData.length, documentData);

    switch (tab) {
    case TAB_DETAIL:
      // Check if user has selected a document in the File Manager.
      if (documentData) {
        // Toggle right sidebar.
        dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));

        // Toggle right side panel.
        dispatch(toggleRightSidebar(dmUi.rightSidebarOpened));

        // Set currentTab to arg value.
        this.setState({ currentTab: tab });
      }
      break;
    case TAB_TASKS:
      // Do nothing if user clicks on tab that is already selected.
      if (tab === currentTab) return;

      // Open right sidebar.
      dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));

      // Open right sidebar.
      dispatch(toggleRightSidebar(false));

      // Set currentTab to arg value.
      this.setState({ currentTab: tab });
      break;
    default:
    }
  }

  handleCloseButtonClick() {
    const { dmUi, dispatch } = this.props;
    dispatch(toggleRightSidebar(dmUi.rightSidebarOpened));
  }

  // Render method.
  render() {
    const { dmUi, isIframe, shUi } = this.props;
    // const { currentTab } = this.state;

    // console.log('currentTab:', currentTab);

    // Right panel view.
    const currentView = dmUi.rightPanelAreaView;
    let rightPanelArea;
    switch (currentView) {
    case DM_RIGHT_PANEL_ACTIVITY:
      rightPanelArea = <DocumentActivityList />;
      this.state.currentTab = TAB_TASKS;
      break;
    case DM_RIGHT_PANEL_DETAIL:
      rightPanelArea = <DocumentDetail />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_DETAILFORM:
      rightPanelArea = <DocumentDetailForm />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_VIEWER_CHANGE_REQUEST:
      rightPanelArea = <ChangeRequestSubmit />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_OWNER_CHANGE_REQUEST:
      rightPanelArea = <ChangeRequestSubmit view="owner" />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_CHANGE_REQUEST_LIST:
      rightPanelArea = <ChangeRequestList />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_VERSION_HISTORY:
      rightPanelArea = <VersionHistoryList />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_AUDIT_TRAIL:
      rightPanelArea = <AuditTrailList />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_APPROVAL_WORKFLOW:
      rightPanelArea = <ApprovalWorkflow />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_RELEASE_DOCUMENT:
      rightPanelArea = <ReleaseDocument />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_PERIODIC_REVIEW:
      rightPanelArea = <PeriodicReview />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_VIEW_HISTORY:
      rightPanelArea = <ViewHistory />;
      this.state.currentTab = TAB_DETAIL;
      break;
    case DM_RIGHT_PANEL_VIEW_DETAILS:
      rightPanelArea = <ViewDetails />;
      this.state.currentTab = TAB_DETAIL;
      break;
    default:
      rightPanelArea = <DocumentActivityList />;
      this.state.currentTab = TAB_TASKS;
    }

    let sidebarWidth = 282;
    const topOffset = 60;
    const rightOffset = shUi.isNavigatorPinned ? 274 : 0;

    const styles = {
      base: {
        position: 'fixed',
        top: isIframe ? 0 : topOffset,
        right: !dmUi.rightSidebarOpened ? -(sidebarWidth - 6) + rightOffset : 0 + rightOffset,
        width: sidebarWidth,
        height: '100%',
        padding: '0 0 0 6px',
        zIndex: 999,
        transition: 'all .5s ease',
      },

      sidebar: {
        height: shUi.browserInfo.height - 20,
        overflowY: 'auto',
        padding: '0 4px 40px 6px',
        borderLeft: 'none',
      },

      tabs: {
        display: dmUi.contentAreaView === DM_CONTENT_AREA_PREVIEW ? 'none' : 'block',
        position: 'absolute',
        top: dmUi.isFullscreen ? 18 : 58,
        left: -22,
        zIndex: 9,
      },

      listItem: {
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 6,
        borderRadius: '2px 0 0 2px',
      },

    };

    return (
      <div className="main-right-sidebar" style={styles.base}>
        <div className="sidebar" style={styles.sidebar}>
          {rightPanelArea}
        </div>

        <div>
          <ul className="nav sidebar-tabs" style={styles.tabs}>

          <OverlayTrigger placement="left" overlay={expandCollapseTooltip}>
            <NavItem className="active" style={styles.listItem}
              onClick={this.handleCloseButtonClick.bind(this)}>
              <Icon name={ dmUi.rightSidebarOpened ? 'chevron-right' : 'chevron-left' } fixedWidth />
            </NavItem>
          </OverlayTrigger>

            {/*
            <OverlayTrigger placement="left" overlay={expandCollapseTooltip}>
              <NavItem onClick={this.handleCloseButtonClick.bind(this, TAB_DETAIL)}
                className={currentTab === TAB_DETAIL ? 'active' : ''} style={styles.listItem}>
                <Icon name={ dmUi.rightSidebarOpened ? 'chevron-right' : 'chevron-left' } fixedWidth />
              </NavItem>
            </OverlayTrigger>

            <OverlayTrigger placement="left" overlay={tasksTooltip}>
              <NavItem onClick={this.handleCloseButtonClick.bind(this, TAB_TASKS)}
                className={currentTab === TAB_TASKS ? 'active' : ''} style={styles.listItem}>
                <Icon name="tasks" fixedWidth />
              </NavItem>
            </OverlayTrigger>
            */}

          </ul>
        </div>

      </div>
    );
  }
}

// propTypes.
RightPanelArea.propTypes = {
  dmDocument: React.PropTypes.object,
  dmUi: React.PropTypes.object,
  shUi: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  isIframe: React.PropTypes.bool,
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmUi: state.dmUi,
  shUi: state.shUi,
});

// Export.
export default connect(mapStateToProps)(RightPanelArea);
