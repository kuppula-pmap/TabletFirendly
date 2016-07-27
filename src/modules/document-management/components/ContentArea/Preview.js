// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Button,
  Image,
  Alert
} from 'react-bootstrap';
import Loader from '../../../../components/Loader';
import Icon from 'react-fa';

// Global actions.
import { toggleModal, setModalView } from '../../../../redux/actions/ui-actions';

// Doc Mgt actions.
import {
  DM_CONTENT_AREA_DEFAULT,
  DM_RIGHT_PANEL_DETAIL,
  DM_MODAL_DOWNLOAD,
  DM_MODAL_SHARE
} from '../../redux/constants/ui-constants';
import {
  setContentAreaView,
  setRightPanelAreaView,
  toggleRightSidebar,
  setPrintDocument,
} from '../../redux/actions/ui-actions';
import { postAcknowledgement } from '../../redux/actions/acknowledgement-post-actions';


// Define class.
class Preview extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      alertVisible: true,
    };
  }

  componentDidMount() {
    const { dmUi } = this.props;
    console.log('printDocument:', dmUi.printDocument);
    if (dmUi.printDocument) {
      this.printDocument();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    // Turn print reducer value off.
    dispatch(setPrintDocument(false));
  }

  closePreview() {
    const { dispatch } = this.props;
    dispatch(setContentAreaView(DM_CONTENT_AREA_DEFAULT));
  }

  printDocument() {
    document.getElementById('pdfToPrint').contentWindow.print();
  }

  showDetail() {
    const { dmUi, dispatch } = this.props;
    const rightSidebarOpened = dmUi.rightSidebarOpened;

    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_DETAIL));
    if (!rightSidebarOpened) {
      dispatch(toggleRightSidebar(rightSidebarOpened));
    } else if (rightSidebarOpened) {
      dispatch(toggleRightSidebar(rightSidebarOpened));
    }
  }

  iAcknowledgeThisDocument() {
    const { dispatch, dmDocument } = this.props;

    // Submit user acknowledgment of this document.
    dispatch( postAcknowledgement(dmDocument.items.TargetVersionUid) );

    this.setState({ alertVisible: false });
    // alert('Thank you.');
  }

  handleModalToggle(view) {
    const { dispatch } = this.props;
    dispatch(setModalView(view));
    dispatch(toggleModal(true));
  }

  handleContentButtonClick(view) {
    const { dispatch } = this.props;
    dispatch(setContentAreaView(view));
  }

  // Render method.
  render() {
    const {
      dmUi,
      shUi,
      dmPreviewDocument,
      dmDocument,
    } = this.props;
    const { alertVisible } = this.state;

    // PDF preview data.
    const { isFetching } = dmPreviewDocument;
    const previewDocumentData = dmPreviewDocument.items ? dmPreviewDocument.items : null;
    const downloadAsPDFLink = previewDocumentData ? previewDocumentData.downloadAsPDFLink : null;

    // Document data.
    const documentData = dmDocument.items ? dmDocument.items : null;
    const title = documentData ? documentData.Title : null;
    const targetVersion = documentData ? documentData.TargetVersion : null;
    const fileAcknowledgement = targetVersion ? targetVersion.IsAcknowledgementRequired : null;

    // Dynamic CSS sizing.
    const additionalFullScreenWidth = dmUi.isFullscreen ? 34 : 0;
    const previewWidth = dmUi.rightSidebarOpened ? '100%' : 'calc(100% - -6px)';
    const previewHeight = dmUi.isFullscreen ? shUi.browserInfo.height + 4 : shUi.browserInfo.height - 96;
    const leftnavLeft = shUi.browserInfo.width <= 768 ? 0 : 40;

    let styles = {
      base: {
        position: 'relative',
        display: 'block',
        width: dmUi.rightSidebarOpened ? (shUi.browserInfo.width + additionalFullScreenWidth) : `calc(100% + ${70 + additionalFullScreenWidth}px)`,
        margin: '-14px 0 0 -20px',
        transition: 'width .5s ease',
      },

      scrollingBase: {
        position: 'relative',
        display: 'block',
        // width: ui.rightSidebarOpened ? '70%' : '100%',
        width: previewWidth,
        height: previewHeight,
        overflow: 'auto',
        textAlign: 'center',
        zIndex: 99,
        transition: 'width .5s ease',
      },

      toolbar: {
        position: 'fixed',
        top: dmUi.isFullscreen ? 0 : 96,
        left: dmUi.isFullscreen ? 0 : leftnavLeft,
        // width: ui.rightSidebarOpened ? (((70 / 100) * shUi.browserInfo.width) - 28) : (shUi.browserInfo.width - 28),
        width: dmUi.rightSidebarOpened ? (shUi.browserInfo.width + additionalFullScreenWidth) : '100%',
        padding: shUi.browserInfo.width <= 768 ? '6px 0 6px 6px' : '6px 10px 6px 20px',
        paddingRight: shUi.browserInfo.width > 768 && dmUi.rightSidebarOpened ? 284 : 10,
        transition: 'all .5s ease',
      },

      infoIcon: {
        marginRight: 10,
      },

      title: {
        width: '35%',
        textAlign: 'left',
        margin: '4px 10px 0',
        cursor: 'pointer',
      },

      toolbarButtons: {
        marginRight: shUi.browserInfo.width > 768 ? 50 : 0,
      },

      toolbarButton: {
        float: 'right',
      },

      preview: {
        display: 'block',
        width: shUi.browserInfo.width > 768 && dmUi.rightSidebarOpened ? 'calc(100% - 320px)' : '100%',
        margin: '-5px auto 20px',
        marginRight: shUi.browserInfo.width > 768 && dmUi.rightSidebarOpened ? 320 : 0,
        transition: 'all .5s ease',
      },

      acknowledge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: dmUi.rightSidebarOpened ? 'calc(100% - 330px)' : '100%',
        zIndex: 99,
        transition: 'all .5s ease',
      },

      acknowledgeAlert: {
        marginBottom: 0,
        borderRadius: 0,
      },

      embed: {
        width: '100%',
        height: previewHeight + 8,
      },

    };

    // Determine if downloadAsPDFLink is in PDF or web image format.
    let pdfOrImagePreview;
    if (downloadAsPDFLink) {
      const isPdf = downloadAsPDFLink.lastIndexOf('.pdf') !== -1;
      // console.log('isPdf:', isPdf);
      const previewDocument = (
        <embed
          type="application/pdf"
          id="pdfEmbed"
          ref="pdfEmbed"
          src={downloadAsPDFLink}
          style={styles.embed}
        />
      );
      const imagePreview = <Image src={downloadAsPDFLink} style={styles.preview} />;
      pdfOrImagePreview = isPdf ? previewDocument : imagePreview;
    }


    return (
      <div className="preview-panel" style={styles.base}>

        <iframe src={downloadAsPDFLink} style={{ display: 'none' }} id="pdfToPrint"></iframe>

        <div style={styles.scrollingBase}>
          <div className="preview-panel-toolbar clearfix" style={styles.toolbar}>
            <div className="pull-left ellipsis-overflow" style={styles.title} onClick={this.showDetail.bind(this)}>
              <span className="visible-xs-inline-block" style={styles.infoIcon}>
                <Icon name="info-circle" className="fa-lg" />
              </span>
              {title}
            </div>
            <ButtonGroup className="pull-right" style={styles.toolbarButtons}>
              <Button bsStyle="link" bsSize="sm" style={styles.toolbarButton}
                onClick={this.closePreview.bind(this)}>
                <Icon name="times" className="fa-lg" />
                  <span className="hidden-xs">
                    {' '}
                    Close
                  </span>
              </Button>
              <Button bsStyle="link" bsSize="sm" style={styles.toolbarButton}
                onClick={this.handleModalToggle.bind(this, DM_MODAL_SHARE)}>
                <Icon name="share-square-o" className="fa-lg" />
                  <span className="hidden-xs">
                    {' '}
                    Share
                  </span>
              </Button>
              <Button bsStyle="link" bsSize="sm" style={styles.toolbarButton}
                onClick={this.handleModalToggle.bind(this, DM_MODAL_DOWNLOAD)}>
                <Icon name="download" className="fa-lg" />
                  <span className="hidden-xs">
                    {' '}
                    Download
                  </span>
              </Button>
              <Button bsStyle="link" bsSize="sm" style={styles.toolbarButton}
                onClick={this.printDocument.bind(this, downloadAsPDFLink)}>
                <Icon name="print" className="fa-lg" />
                  <span className="hidden-xs">
                    {' '}
                    Print
                  </span>
              </Button>
              <Button bsStyle="link" bsSize="sm" className="hidden-xs" style={styles.toolbarButton}
                onClick={this.showDetail.bind(this)}>
                <Icon name="info-circle" className="fa-lg" />
                {' '}
                { dmUi.rightSidebarOpened ? 'Hide Details' : 'View Details'}
              </Button>
            </ButtonGroup>
          </div>

          <div style={styles.preview}>
            {isFetching ? <Loader padding={100} /> : pdfOrImagePreview }
          </div>

        </div>

        {fileAcknowledgement && alertVisible ?
          <div className="acknowledgement-wrapper" style={styles.acknowledge}>
            <Alert bsStyle="info" className="text-center" style={styles.acknowledgeAlert}>
              <p><small>By clicking here, I acknowledge that I have read and understand the content, requirements, and expectations set forth in the attached document.  I understand that if I have any questions, at any time, regarding the document content, requirements, or expectations, I will consult with my immediate supervisor.</small></p>
              <br/>
              <p>
                <Button bsStyle="primary" onClick={this.iAcknowledgeThisDocument.bind(this)}>
                  Acknowledge
                </Button>
              </p>
            </Alert>
          </div>
        : null}

      </div>
    );
  }
}

// propTypes.
Preview.propTypes = {
  print: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  dmUi: React.PropTypes.object,
  dmDocument: React.PropTypes.object,
  dmPreviewDocument: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  dmUi: state.dmUi,
  dmDocument: state.dmDocument,
  dmPreviewDocument: state.dmPreviewDocument,
});

// Export.
export default connect(mapStateToProps)(Preview);
