// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Core components.
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Icon from 'react-fa';
import ListCard from '../../../../../components/ListCard';

// Date format.
import moment from 'moment';

// Redux.
import {
  DM_RIGHT_PANEL_APPROVAL_WORKFLOW,
  DM_RIGHT_PANEL_DETAIL,
  DM_RIGHT_PANEL_DETAILFORM,
  DM_RIGHT_PANEL_RELEASE_DOCUMENT,
  DM_CONTENT_AREA_PREVIEW,
  // DM_CONTENT_AREA_UPLOAD,
  DM_RIGHT_PANEL_OWNER_CHANGE_REQUEST,
  DM_RIGHT_PANEL_PERIODIC_REVIEW,
} from '../../../redux/constants/ui-constants';
import {
  setContentAreaView,
  setRightPanelAreaView,
  setSelectedChangeRequest,
} from '../../../redux/actions/ui-actions';
import { fetchDocument } from '../../../redux/actions/document-actions';

import utils from '../../../../../utils';

// Define class.
class TaskListCards extends React.Component {

  handleTaskClick(view, task) {
    const { dispatch } = this.props;

    const targetViewMapping = {
      'ApprovalWorkflow': DM_RIGHT_PANEL_APPROVAL_WORKFLOW,
      'Details': DM_RIGHT_PANEL_DETAIL,
      'DetailForm': DM_RIGHT_PANEL_DETAILFORM,
      'PeriodicReview': DM_RIGHT_PANEL_PERIODIC_REVIEW,
      'ChangeRequest': DM_RIGHT_PANEL_OWNER_CHANGE_REQUEST,
      'ReleaseDocument': DM_RIGHT_PANEL_RELEASE_DOCUMENT,

      /*
       * This is the list sent to Ivan to setup map keys from the API end.
       *
        `Uploaded Pending Details` => `DetailForm`
        `Pending Change Requests` => `ChangeRequest`
        `Pending Periodic Reviews` => `PeriodicReview`
        `Pending Acknowledgments` => `DetailForm`
        `Pending Approvals` => `ApprovalWorkflow`
        `Draft Pending Submittal` => `Details`
        `Approved Pending Release` => `ReleaseDocument`
      */
    };

    // ID's.
    const documentUid = task.DocumentUid;
    const documentVersionUid = task.DocumentVersionUid;

    const targetView = targetViewMapping[view] ? targetViewMapping[view] : DM_RIGHT_PANEL_DETAIL;

    // Fetch document and dispatch other actions only after document loaded.
    dispatch(fetchDocument(documentUid, documentVersionUid))
    .then(() => {
      // Additional view-specific actions.
      switch (targetView) {
      // case DM_RIGHT_PANEL_DETAILFORM:
      //   dispatch(setContentAreaView(DM_CONTENT_AREA_UPLOAD));
      //   break;
      case DM_RIGHT_PANEL_OWNER_CHANGE_REQUEST:
        // Dispatch the selected Change Request.
        dispatch(setSelectedChangeRequest(task.TargetObject));
        break;
      default:
        dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW));
      }

      // Change right panel view.
      dispatch(setRightPanelAreaView(targetView));
    });
  }

  // Render method.
  render() {
    const {data, selectedItem} = this.props;
    let tasks = [];

    let styles = {
      listGroup: {
        margin: '0 0 4px',

        // Animation.css override.
        animationDuration: '.5s',
      },

      icon: {
        position: 'absolute',
        top: 8,
        right: 2,
      },
    };

    if (data) {
      data.forEach(category => {
        if (selectedItem === 'default' || String(category.Category) === selectedItem) {
          if (category.Tasks) {
            category.Tasks.forEach( task => {
              const statusValue = task.Status === 'Overdue' ? 'rejected' : 'pending';
              tasks.push(
                // className="animated zoomIn"
                <ListGroup bsStyle="info" key={utils.unique()} style={styles.listGroup}>
                  <ListGroupItem onClick={this.handleTaskClick.bind(this, category.TargetView, task)}>
                    <ListCard status={statusValue}>
                      <h4 className="ellipsis-overflow">{task.Title}</h4>
                      <Icon
                        name={`file-${task.FileType ? task.FileType : 'text'}-o`}
                        className="fa-fw fa-lg text-muted"
                        style={styles.icon}
                      />
                      <div className="meta-wrapper">
                        <div className="clearfix">
                          <p className="pull-left">{task.UserName}</p>
                          {task.DueDate ? <p className="pull-right"><strong>Due:</strong> {moment(task.DueDate).format('L')}</p> : null}
                        </div>
                        <div className="clearfix">
                          <p className={`pull-right ${statusValue}`}>{category.Category}</p>
                        </div>
                      </div>
                    </ListCard>
                  </ListGroupItem>
                </ListGroup>
              );
            });
          }
        }
      });
    }

    return (
      <div>
        {tasks}
      </div>
    );
  }
}

// Validation.
TaskListCards.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.array,
  selectedItem: React.PropTypes.string
};
const mapDispatchToProps = (dispatch) => ({
  dispatch
});


// Export.
export default connect(mapDispatchToProps)(TaskListCards);
