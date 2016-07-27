// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
// Components.
import { Row, Col, ListGroupItem, Button, ProgressBar } from 'react-bootstrap';
import Icon from 'react-fa';
// Global actions.
import { setModalView, toggleModal } from '../../../../../redux/actions/ui-actions';

import {
  // DM_RIGHT_PANEL_ACTIVITY,
  DM_RIGHT_PANEL_DETAILFORM,
  DM_MODAL_DELETE,
  DM_CONTENT_AREA_PREVIEW,
} from '../../../redux/constants/ui-constants';

import {
  toggleRightSidebar,
  setRightPanelAreaView,
  setContentAreaView,
} from '../../../redux/actions/ui-actions';

import { dmSetFolderViewType } from '../../../redux/actions/settings-actions';
import { resetUploadDocument } from '../../../redux/actions/upload-actions';
import { fetchDocument } from '../../../redux/actions/document-actions';
import { fetchPreviewDocument } from '../../../redux/actions/previewDocument-actions';
import { fetchFolder } from '../../../redux/actions/folder-actions';


import utils from '../../../../../utils';

// Define class.
class UploadFile extends React.Component {

  preventDefault(e) {
    e.preventDefault();
  }

  handleAddDetailsClick(panelView, documentData, e) {
    e.preventDefault();

    const { dmUi, dispatch } = this.props;

    const uid = documentData.Uid ? documentData.Uid : null;
    const versionUid = documentData.CurrentVersion ? documentData.CurrentVersion.Uid : null;
    const { currentFolderId } = dmUi;

    if (uid && versionUid && currentFolderId) {
      // Fetch document and dispatch other actions only after document loaded.
      dispatch(fetchDocument(uid))
      .then(() => {
        // If right side bar is closed, toggle it.
        if (!dmUi.rightSidebarOpened) {
          dispatch(toggleRightSidebar(dmUi.rightSidebarOpened));
        }
        Promise.all([
          // Set FolderViewType back to AllDocuments.
          dispatch(dmSetFolderViewType('AllDocuments')),

          // Call document folder api.
          dispatch(fetchFolder(currentFolderId)),

          // Load the view passed from the file click event.
          dispatch(setRightPanelAreaView(panelView)),

          // Set content view to Preview.
          dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW)),

          // Call document preview api.
          dispatch(fetchPreviewDocument(versionUid, 'view')),
        ]);
      });
    }
  }

  handleDeleteClick(documentId) {
    const { dispatch } = this.props;

    dispatch(fetchDocument(documentId))
    .then(() => {
      Promise.all([
        dispatch(setModalView(DM_MODAL_DELETE)),
        dispatch(toggleModal(true)),
        dispatch(resetUploadDocument())
      ]);
    });
  }

  render() {
    const { shUi, file, isUpload, isRequest } = this.props;

    const fileName = file.FileName ? file.FileName : file.name;
    const fileIcon = utils.filenameIcon(fileName);
    const documentId = file.Uid ? file.Uid : null;

    let styles = {
      row: {
        marginTop: 10,
      },

      fileName: {
        width: '88%',
        marginTop: -3,
      },

      actions: {
        marginTop: 6,
      },

      progressbar: {
        margin: 0,
      },

      uploadCheck: {
        position: 'absolute',
        top: 16,
        left: 8,
      },
    };

    const fileIconAndTitle = (
      <span>
        <Icon name={fileIcon} className="fa-lg" style={{ marginRight: 6 }} />
        {fileName}
      </span>
    );

    const uploadProgress = (
      isUpload ?
        <Row className="progressbar--slide-up">
          <Col sm={12}>
            <ProgressBar bsStyle="success" striped now={100} label="100%" style={styles.progressbar} />
          </Col>
        </Row>
      :
        <ProgressBar bsStyle="primary" active now={100} label={'Uploading'} style={styles.progressbar} />
    );


    return (
      <ListGroupItem>
        { /*    {uploadError ? 'Error: ' + uploadError.ErrorMessage : ''} */ }

        <Row>

          {!isRequest && isUpload ?
            <div style={styles.uploadCheck}>
              <Icon name="check-circle" className="text-success" />
            </div>
          : null}

          <Col sm={9}>

            {isRequest ?
              fileIconAndTitle
            :
              <div className="clearfix text-primary" style={styles.row}
                onClick={this.handleAddDetailsClick.bind(this, DM_RIGHT_PANEL_DETAILFORM, file)}>
                <Icon name={fileIcon} className="fa-lg pull-left" style={{ marginRight: 6 }} />
                <div className="pull-left" style={styles.fileName}>
                  {fileName}
                </div>
              </div>
            }

            {/*
            <Button href="#" bsStyle="link" disabled={isRequest && !isUpload} onClick={this.preventDefault.bind(this)}>
              {isRequest ?
                fileIconAndTitle
              :
                <div onClick={this.handleAddDetailsClick.bind(this, DM_RIGHT_PANEL_DETAILFORM, file)}>
                  {fileIconAndTitle}
                </div>
              }
            </Button>
            */}

          </Col>

          <Col sm={3} className="text-center" style={styles.actions}>
            {isRequest ?
              uploadProgress
            :
              <div className="clearfix text-center">
                <Button href="#" bsStyle="link" bsSize="xs" className={shUi.browserInfo.width <= 768 ? 'pull-left' : ''}
                  onClick={this.handleAddDetailsClick.bind(this, DM_RIGHT_PANEL_DETAILFORM, file)}>
                  <small>Add Details</small>
                  <Icon name="pencil" className="fa-fw fa-lg" style={{marginLeft: 4}} />
                </Button>
                <Button href="#" bsStyle="link" bsSize="xs" className={shUi.browserInfo.width <= 768 ? 'pull-right' : ''}
                  onClick={this.preventDefault.bind(this)}>
                  <Icon name="trash" className="fa-lg" onClick={this.handleDeleteClick.bind(this, documentId)}/>
                </Button>
              </div>
            }
          </Col>

        </Row>

      </ListGroupItem>
    );
  }
}

// propTypes.
UploadFile.propTypes = {
  file: React.PropTypes.object,
  isRequest: React.PropTypes.bool,
  isUpload: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  dmUi: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  dmUi: state.dmUi,
});

// Export.
export default connect(mapStateToProps)(UploadFile);
