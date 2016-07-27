// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';
import Loader from '../../../../../components/Loader';
import {Row, Col, ListGroupItem, MenuItem, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import Icon from 'react-fa';
import moment from 'moment';

import utils from '../../../../../utils';

// Global actions.
import { toggleModal, setModalView } from '../../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import {
  DM_RIGHT_PANEL_ACTIVITY,
  DM_RIGHT_PANEL_DETAIL,
  DM_CONTENT_AREA_PREVIEW,
  // DM_MODAL_SHARE,
  DM_MODAL_CHECKIN,
  DM_MODAL_CHECKOUT,
  DM_MODAL_CANCEL_CHECKOUT,
  DM_MODAL_DOWNLOAD,
  DM_MODAL_UPLOAD_NEW_VERSION,
  DM_MODAL_DELETE,
} from '../../../redux/constants/ui-constants';
import {
  setRightPanelAreaView,
  toggleRightSidebar,
  setContentAreaView,
  setPrintDocument,
} from '../../../redux/actions/ui-actions';
import { fetchDocument } from '../../../redux/actions/document-actions';
import { fetchPreviewDocument } from '../../../redux/actions/previewDocument-actions';


// Define class.
class FileManagerRowFile extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.counter = 0;
  }

  clickListGroupItemHandler(documentId, versionId, e) {
    e.preventDefault();
    const { dispatch, shUi, isSelected } = this.props;

    if (!isSelected) {
      dispatch(fetchDocument(documentId, versionId));
    }

    // Redux actions.
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));

    // Open right sidebar if it's closed.
    if (!shUi.rightSidebarOpened) {
      dispatch(toggleRightSidebar(shUi.rightSidebarOpened));
    }

    // console.log(this.state.isFocused);
    // this.setState({ isFocused: true });
    // this.setState({ selectedId: documentId });
    // console.log('SELECTED ROW', e.target);
  }

  handlePreviewClick(print, e) {
    e.preventDefault();
    const { dispatch, verData } = this.props;
    const uid = verData.Uid;

    dispatch(fetchPreviewDocument(uid, 'view'));
    dispatch(setContentAreaView(DM_CONTENT_AREA_PREVIEW));

    dispatch(setPrintDocument(print));
  }

  handleModalToggle(view) {
    const { dispatch } = this.props;
    dispatch(setModalView(view));
    dispatch(toggleModal(true));
  }

  handleClickOutside() {
    // const { dispatch } = this.props;
    // dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));

    // this.setState({ isFocused: false });
  }


  // Render method.
  render() {
    const {
      labelPreview,
      // labelPrint,
      // labelShare,
      labelDownload,
      labelNewVersion,
      labelDelete
    } = this.props.strings;
    const { globalLang, shUi, dmUi, isSelected, isFetching} = this.props;

    // Load locale.
    moment.locale(globalLang.languageCode);

    const styles = {
      row: {
        marginTop: 6,
      },

      fileName: {
        width: '88%',
        marginTop: -3,
      },

      fileTypeIcon: {
        marginLeft: 4,
        marginRight: 6,
      },

      toolbar: {
        position: 'absolute',
        right: 0,
        top: 0,
      },

      overide: {
        color: 'gray',
        padding: 5,
        boxShadow: 'none',
        background: 'transparent',
        border: 'none',
      },

      'version': {
        paddingTop: 8,
      },

      description: {
        fontSize: '85%',
        margin: shUi.browserInfo.width <= 768 ? '4px 0 -4px 0' : '0 0 0 36px',
      },
    };

    const documentData = this.props.docData;
    const versionData = this.props.verData;
    const documentActions = versionData.Actions ? versionData.Actions.Ellipsis : [];
    // const typesMapping = {'doc': 'word', 'docx': 'word', 'xls': 'excel', 'jpg': 'image', 'tif': 'image', 'gif': 'image', 'png': 'image', 'ppt': 'powerpoint', 'pptx': 'powerpoint'};

    const rightPanelAreaView = dmUi.rightPanelAreaView ? dmUi.rightPanelAreaView : null;

    const isFocused = isSelected && rightPanelAreaView !== DM_RIGHT_PANEL_ACTIVITY ? 'on' : null;
    const isLocked = documentData.IsLocked;

    const documentId = documentData.Uid;
    const versionId = versionData.Uid;
    const documentName = documentData.Title;
    const documentDescription = documentData.Description ? <p>{documentData.Description}</p> : null;
    const documentOwner = documentData.Owner ? documentData.Owner : null;
    const documentOwnerDescription = documentOwner ? <p>Document Owner: {documentData.Owner.Description}</p> : null;
    const documentInternalId = documentData.InternalId ? <p>Internal ID: {documentData.InternalId}</p> : null;

    const fileNameIcon = utils.filenameIcon(documentData.FileName);
    const documentVersion = versionData.VersionNumber;
    const documentModifiedDate = moment(versionData.UpdatedDate ? versionData.UpdatedDate : versionData.CreatedDate).format('L');
    // const documentStatus = documentData.DocumentState ? documentData.DocumentState.CurrentStateDescription : '';
    const documentStatus = versionData.StateDescription;

    const documentDetails = (
      <div className="file_manager-row_description" style={styles.description}>
        {documentInternalId}
        {documentOwnerDescription}
        {documentDescription}
      </div>
    );

    // Reorganise actions into a new object.
    let actions = {};
    if (documentActions) {
      documentActions.forEach(action => {
        switch (action.Id) {
        case 'UploadWithoutApproval':
          actions.UploadWithoutApproval = action;
          break;
        case 'CheckOut':
          actions.CheckOut = action;
          break;
        case 'CheckIn':
          actions.CheckIn = action;
          break;
        case 'Delete':
          actions.Delete = action;
          break;
        case 'Download':
          actions.Download = action;
          break;
        case 'Share':
          actions.Share = action;
          break;
        case 'Print':
          actions.Print = action;
          break;
        case 'CancelCheckOut':
          actions.CancelCheckOut = action;
          break;
        case 'Preview':
          actions.Preview = action;
          break;
        case 'CreateNewVersion':
          actions.CreateNewVersion = action;
          break;
        default:
        }
      });
    }

    // Build actions view.
    // Note that translation is static. To make it dinamic use the field actions.OBJ.Description.
    let actionsView = [];
    if (actions.Preview) {
      actionsView.push(
        <MenuItem eventKey="1" key={actions.Preview.Id} onClick={this.handlePreviewClick.bind(this, false)}>
          <Icon name="eye" fixedWidth />
          {labelPreview}
        </MenuItem>
      );
    }
    /*
    if (actions.Share) {
      actionsView.push(
        <MenuItem eventKey="3" key={actions.Share.Id} onClick={this.handleModalToggle.bind(this, DM_MODAL_SHARE)}>
          <Icon name="share" fixedWidth />
          {labelShare}
        </MenuItem>
      );
    }
    */
    if (actions.Download) {
      actionsView.push(
        <MenuItem eventKey="4" key={actions.Download.Id} onClick={this.handleModalToggle.bind(this, DM_MODAL_DOWNLOAD)}>
          <Icon name="download" fixedWidth />
          {labelDownload}
        </MenuItem>
      );
    }
    /*
    if (actions.Print) {
      actionsView.push(
        <MenuItem eventKey="5" key={actions.Print.Id} onClick={this.handlePreviewClick.bind(this, true)}>
          <Icon name="print" fixedWidth />
          {labelPrint}
        </MenuItem>
      );
    }
    */
    if (actions.Delete) {
      actionsView.push(
        <MenuItem eventKey="6" key={actions.Delete.Id} onClick={this.handleModalToggle.bind(this, DM_MODAL_DELETE)}>
          <Icon name="trash" fixedWidth />
          {labelDelete}
        </MenuItem>
      );
    }

    if (
      actions.CreateNewVersion ||
      actions.CheckIn ||
      actions.CheckOut ||
      actions.CancelCheckOut
    ) {
      actionsView.push(<MenuItem divider key={utils.unique()} />);
    }

    if (actions.CreateNewVersion) {
      actionsView.push(<MenuItem eventKey="7" key={actions.CreateNewVersion.Id} onClick={this.handleModalToggle.bind(this, DM_MODAL_UPLOAD_NEW_VERSION)}>{labelNewVersion}</MenuItem>);
    }
    if (actions.CheckIn) {
      actionsView.push(<MenuItem eventKey="8" key={actions.CheckIn.Id} onClick={this.handleModalToggle.bind(this, DM_MODAL_CHECKIN)}>Check In</MenuItem>);
    }
    if (actions.CheckOut) {
      actionsView.push(<MenuItem eventKey="9" key={actions.CheckOut.Id} onClick={this.handleModalToggle.bind(this, DM_MODAL_CHECKOUT)}>Check Out</MenuItem>);
    }
    if (actions.CancelCheckOut) {
      actionsView.push(<MenuItem eventKey="10" key={actions.CancelCheckOut.Id} onClick={this.handleModalToggle.bind(this, DM_MODAL_CANCEL_CHECKOUT)}>Cancel Check Out</MenuItem>);
    }

    // Debug only.
    // actionsView.push(<MenuItem eventKey="8" key={utils.unique()} onClick={this.handleModalToggle.bind(this, DM_MODAL_SHARE)}>Share TEST</MenuItem>);

    this.counter += 1;
    // console.log('FileManagerRowDocumentCounter -> render counter: ', this.counter);

    return (
      <ListGroupItem className={ isFocused }>

        {isFetching ?
          <Row>
            <Col sm={4}>
              <Loader size={18} padding="0 6px 0 14px" theme="dark" inline />
              {' '}
              Loading...
            </Col>
          </Row>
        :
          <div onClick={this.clickListGroupItemHandler.bind(this, documentId, versionId)}>
            <Row>

              <Col sm={6}>
                <div className="clearfix text-primary" style={styles.row} onClick={this.handlePreviewClick.bind(this, false)}>
                  <Icon name={fileNameIcon} className="fa-fw fa-lg text-muted pull-left" style={styles.fileTypeIcon} />
                  <div className="pull-left" style={styles.fileName}>
                    {isLocked ?
                      <Icon name="lock" className="fa-fw fa-sm text-muted" />
                    : null}
                    {documentName}
                  </div>
                </div>
                <div className="visible-xs-block">
                  {documentDetails}
                </div>
              </Col>

              <Col sm={1} className="text-center text-left-xs">
                <p>
                  <small className="visible-xs-inline-block" style={styles.version}>
                    <strong>Version: </strong>
                  </small>
                  {documentVersion}
                </p>
              </Col>

              <Col sm={2} className="text-center text-left-xs">
                <p>
                  <small className="visible-xs-inline">
                    <strong>Date Modified: </strong>
                  </small>
                  {documentModifiedDate}
                </p>

              </Col>
              <Col sm={3} className="text-center text-left-xs">
                {documentStatus}
              </Col>

            </Row>
            <div className="hidden-xs">
              <Row>
                <Col xs={10}>
                  {documentDetails}
                </Col>
              </Row>
            </div>
          </div>
        }

        <ButtonToolbar className="row-options" style={styles.toolbar} onClick={this.clickListGroupItemHandler.bind(this, documentId, versionId)}>
          <DropdownButton
            bsStyle="default"
            title={<Icon name="ellipsis-v"/>}
            pullRight
            noCaret
            id="dropdown-no-caret"
            className="btn-override" style={styles.overide}>

            {/* Actions view */}
            {actionsView}

          </DropdownButton>
        </ButtonToolbar>

      </ListGroupItem>
    );
  }
}

// Validation.
FileManagerRowFile.propTypes = {
  strings: React.PropTypes.object,
  docData: React.PropTypes.object,
  verData: React.PropTypes.object,
  isSelected: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
  globalLang: React.PropTypes.object,
  shUi: React.PropTypes.object,
  dmUi: React.PropTypes.object,
};

FileManagerRowFile.defaultProps = {
  strings: {
    labelPreview: 'Preview',
    labelPrint: 'Print',
    labelShare: 'Share',
    labelDownload: 'Download',
    labelNewVersion: 'New Version',
    labelDelete: 'Delete'
  }
};

const mapStateToProps = (state) => ({
  globalLang: state.globalLang,
  shUi: state.shUi,
  dmUi: state.dmUi,
});

// Export.
export default connect(mapStateToProps)(enhanceWithClickOutside(FileManagerRowFile));
