// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Icon from 'react-fa';
import StaticDocumentDetails from './StaticDocumentDetails';
import Loader from '../../../../../components/Loader';
import DetailViewDropdown from '../DetailViewDropdown';
import WorkflowQuickView from '../ApprovalWorkflow/WorkflowQuickView';

import utils from '../../../../../utils';

// Global actions.
import { toggleModal, setModalView } from '../../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import {
  DM_CONTENT_AREA_PREVIEW,
  DM_RIGHT_PANEL_DETAILFORM,
  DM_MODAL_DOWNLOAD,
  DM_MODAL_ARCHIVE,
  DM_RIGHT_PANEL_CHANGE_REQUEST_LIST,
  DM_RIGHT_PANEL_VIEWER_CHANGE_REQUEST,
  DM_RIGHT_PANEL_RELEASE_DOCUMENT,
} from '../../../redux/constants/ui-constants';
import {
  setRightPanelAreaView,
  setContentAreaView
} from '../../../redux/actions/ui-actions';
import { postApprovalWorkflow } from '../../../redux/actions/approvalWorkflow-post-actions';
import { fetchPreviewDocument } from '../../../redux/actions/previewDocument-actions';


// Define class.
class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonLoader: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dmDocument } = nextProps;
    const { buttonLoader } = this.state;

    if (buttonLoader && !dmDocument.isFetching) {
      this.setState({ buttonLoader: false });
    }
  }

  handleContentButtonClick() {
    const { dispatch } = this.props;
    dispatch(setContentAreaView(DM_RIGHT_PANEL_CHANGE_REQUEST_LIST));
  }

  handleRightPanelButtonClick(view) {
    const { dispatch } = this.props;
    dispatch(setRightPanelAreaView(view));
  }

  handleModalToggle(view) {
    const { dispatch } = this.props;
    dispatch(setModalView(view));
    dispatch(toggleModal(true));
  }

  goToView(view) {
    const { dispatch } = this.props;
    dispatch(setRightPanelAreaView(view));
  }

  handleWorkflowCommandClick(action) {
    const { dispatch, dmDocument, globalSettings } = this.props;
    const cmd = utils.getWorkflowCommand(globalSettings, dmDocument, action);
    if (cmd) {
      // console.log('cmd:', cmd);
      dispatch(postApprovalWorkflow(cmd));
    }

    // Turn on workflow loader.
    this.setState({ buttonLoader: true });
  }

  handlePreviewClick(e) {
    e.preventDefault();
    const { dispatch, dmDocument } = this.props;
    const documentData = dmDocument ? dmDocument.items : [];
    const uid = documentData.TargetVersionUid;

    // console.log('uid:', uid);
    dispatch(fetchPreviewDocument(uid, 'view'));
    dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW));
  }


  // Render method.
  render() {
    const { dmDocument, dmLookups, globalSettings } = this.props;
    const { buttonLoader } = this.state;

    // Document data.
    const documentData = dmDocument ? dmDocument.items : [];

    // Lookups data.
    const lookupsData = dmLookups ? dmLookups.items : [];

    // Loading.
    const isFetching = dmDocument.isFetching || dmLookups.isFetching;

    const styles = {
      commandButton: {
        marginBottom: 20
      },
    };

    let canEdit = false;

    // Document action buttons.
    let actionButtons = [];
    const documentActions = documentData.TargetVersion ? documentData.TargetVersion.Actions.Buttons : [];

    documentActions.forEach(command => {
      if (command.Id === 'SubmitChangeRequest') {
        if (buttonLoader) {
          actionButtons.push(
            <Button key={utils.unique()} bsStyle="info" block disabled style={styles.commandButton}>
              <Loader dots />
            </Button>
          );
        } else {
          actionButtons.push(
            <Button key={utils.unique()} bsStyle="info" block style={styles.commandButton}
              onClick={this.goToView.bind(this, DM_RIGHT_PANEL_VIEWER_CHANGE_REQUEST)}>
              {command.Description}
            </Button>
          );
        }
      }

      if (command.Id === 'Edit') canEdit = true;
    });

    // Document state available commands.
    let availableCommandButtons = [];
    const documentState = documentData.DocumentState ? documentData.DocumentState : null;
    const availableCommands = documentState ? documentState.AvailableCommands : [];

    if (availableCommands) {
      availableCommands.forEach(command => {
        // Set available command button color.
        let buttonColor = 'success';
        if (command.Direction === 'Reverse') buttonColor = 'danger';

        // Default available command actions.
        if (
          command.Name === 'SubmitForApproval' ||
          command.Name === 'CancelApprovalRequest'
        ) {
          if (buttonLoader) {
            availableCommandButtons.push(
              <Button key={utils.unique()} bsStyle={buttonColor} block disabled style={styles.commandButton}>
                <Loader dots />
              </Button>
            );
          } else {
            availableCommandButtons.push(
              <Button key={utils.unique()} bsStyle={buttonColor} block style={styles.commandButton}
                onClick={this.handleWorkflowCommandClick.bind(this, command.Name)}>
                {command.Description}
              </Button>
            );
          }
        }

        // Finalize (Release).
        if (command.Name === 'Finalize') {
          if (buttonLoader) {
            availableCommandButtons.push(
              <Button key={utils.unique()} bsStyle={buttonColor} block disabled style={styles.commandButton}>
                <Loader dots />
              </Button>
            );
          } else {
            availableCommandButtons.push(
              <Button key={utils.unique()} bsStyle={buttonColor} block style={styles.commandButton}
                onClick={this.goToView.bind(this, DM_RIGHT_PANEL_RELEASE_DOCUMENT)}>
                {command.Description}
              </Button>
            );
          }
        }
      });
    }

    // Show WorkflowQuickView
    let workflowQuickView = null;
    if (documentData.Workflow) {
      workflowQuickView = <WorkflowQuickView />;
    }

    return (
      <div>
        {isFetching ?
          <Loader size={32} padding={20} theme="dark" />
        :
          <div>
            <div className="fixed-title clearfix">

              <div className="pull-left">
                <DetailViewDropdown />
              </div>

              <div className="pull-right sidebar-header-actions">
                <Button bsStyle="link" bsSize="xs" onClick={this.handlePreviewClick.bind(this)}>
                  <Icon name="eye" className="fa-fw text-muted" />
                </Button>
                <Button bsStyle="link" bsSize="xs" onClick={this.handleModalToggle.bind(this, DM_MODAL_DOWNLOAD)}>
                  <Icon name="download" className="fa-fw text-muted" />
                </Button>
                {canEdit ?
                  <Button bsStyle="link" bsSize="xs" onClick={this.handleRightPanelButtonClick.bind(this, DM_RIGHT_PANEL_DETAILFORM)}>
                    <Icon name="pencil" className="fa-fw text-muted" />
                  </Button>
                : null}
              </div>
            </div>

            <div className="sidebar-details">

              {workflowQuickView}

              <div className="document-details">

                {actionButtons}

                {availableCommandButtons}

                <StaticDocumentDetails data={documentData} lookups={lookupsData} />

                {utils.getWorkflowCommand(globalSettings, dmDocument, 'Archive') ?
                  <div className="form-group">
                    <Button bsSize="sm" bsStyle="danger" block onClick={this.handleModalToggle.bind(this, DM_MODAL_ARCHIVE)}>Archive</Button>
                  </div>
                : ' '}
              </div>

            </div>

          </div>
        }
      </div>
    );
  }
}

// Parent Functions.
Detail.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmLookups: React.PropTypes.object,
  dmUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmLookups: state.dmLookups,
  dmUi: state.dmUi,
  globalSettings: state.globalSettings,
});

// Export.
export default connect(mapStateToProps)(Detail);
