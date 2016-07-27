// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
// import Icon from 'react-fa';
import {
  Row,
  Col,
  ButtonGroup,
  DropdownButton,
  MenuItem,
  Input,
  Button
} from 'react-bootstrap';

// DM constants
import {
  DM_CONTENT_AREA_DEFAULT,
  DM_CONTENT_AREA_UPLOAD,
  DM_CONTENT_AREA_SEARCH_RESULTS,
  DM_RIGHT_PANEL_ACTIVITY
} from '../../redux/constants/ui-constants';

// DM actions
import { dmSetFolderViewType } from '../../redux/actions/settings-actions';
import { setContentAreaView, setRightPanelAreaView } from '../../redux/actions/ui-actions';
import { fetchFolder } from '../../redux/actions/folder-actions';
import { fetchFilter } from '../../redux/actions/filter-actions';
import { setSearchQuery } from '../../redux/actions/search-actions';


// Define const.
const ALLDOCS_VIEWTYPE = 'AllDocuments';
const MYDOCS_VIEWTYPE = 'MyDocuments';
const UPLOAD_VIEWTYPE = 'PendingUploads';
const RECENTDOCS_VIEWTYPE = 'RecentDocuments';


// Define class.
class ContentAreaHeader extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      sectionTitle: this.props.customTitle || 'All Documents',
      searchWidth: 150,
      showAdvancedSearchLink: false,
      callApi: false
    };
  }

  // Search Field.
  handleSearchFieldKeyUp(e) {
    const val = e.target.value;
    const { dispatch } = this.props;
    dispatch(setSearchQuery(val));

    if (e.keyCode === 13) {
      dispatch(fetchFilter());
      dispatch(setContentAreaView(DM_CONTENT_AREA_SEARCH_RESULTS));
    }
  }
  onFocus() {
    this.setState({
      searchWidth: 214,
      showAdvancedSearchLink: true
    });
  }
  onBlur() {
    setTimeout(() => {
      this.hideAdvancedSearchLink();
    }, (300));
  }

  hideAdvancedSearchLink() {
    this.setState({
      searchWidth: 150,
      showAdvancedSearchLink: false
    });
  }

  // Change list view.
  handleDropdownMenuChange(view, viewType, title, e) {
    e.preventDefault();
    const { dmUi, dispatch } = this.props;
    const { currentFolderId } = dmUi;

    dispatch(setContentAreaView(view));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));
    this.state.sectionTitle = title;

    // Set folder viewType.
    if (viewType) {
      dispatch(dmSetFolderViewType(viewType));
    }

    // Update folder and documents list on the main content area.
    if (currentFolderId) {
      dispatch(fetchFolder(currentFolderId));
    }
  }

  // Menu upload.
  handleDropdownAddChange(view, title, e) {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(setContentAreaView(view));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));
    this.state.sectionTitle = title;
  }

  handleAdvancedSearchClick() {
    const { dispatch } = this.props;
    dispatch(setContentAreaView(DM_CONTENT_AREA_SEARCH_RESULTS));
    this.setState({
      showAdvancedSearchLink: false
    });
  }

  // Render method.
  render() {
    const { dmUi, dmLookups } = this.props;

    // Lookup data.
    const lookupsData = dmLookups.items ? dmLookups.items : null;
    const userPermissions = lookupsData ? lookupsData.UserPermissions : null;
    const canAddDocument = userPermissions ? userPermissions.CanAddDocument : null;

    let styles = {
      dropdown: {
        float: 'none',
        height: 30,
        margin: '0 4px 2px',
      },

      actionBar: {
        marginTop: canAddDocument ? 10 : 15,
      },

      search: {
        position: 'relative',
        display: 'inline-block',
        width: 150,
      },

      'searchInput': {
        display: 'block',
        position: 'absolute',
        right: 0,
        top: -5,
        width: this.state.searchWidth,
        height: 30,
        transition: 'all 0.15s ease',
        zIndex: 1,
      },

      advancedSearchLink: {
        position: 'absolute',
        top: 22,
        right: -6,
      },
    };

    return (
      <div>
        <Row>
          <Col md={6}>
            <ButtonGroup className="title-dropdown">
              <DropdownButton id="file_manager-docs_dropdown" title={ dmUi.contentAreaView === DM_CONTENT_AREA_SEARCH_RESULTS ? 'Search' : this.state.sectionTitle } bsStyle="link" bsSize="lg">
                <MenuItem onClick={this.handleDropdownMenuChange.bind(this, DM_CONTENT_AREA_DEFAULT, ALLDOCS_VIEWTYPE, 'All Documents')}>
                  All Documents
                </MenuItem>
                <MenuItem onClick={this.handleDropdownMenuChange.bind(this, DM_CONTENT_AREA_DEFAULT, MYDOCS_VIEWTYPE, 'My Documents')}>
                  My Documents
                </MenuItem>
                <MenuItem onClick={this.handleDropdownMenuChange.bind(this, DM_CONTENT_AREA_UPLOAD, UPLOAD_VIEWTYPE, 'My Pending Uploads')}>
                  My Pending Uploads
                </MenuItem>
                <MenuItem onClick={this.handleDropdownMenuChange.bind(this, DM_CONTENT_AREA_DEFAULT, RECENTDOCS_VIEWTYPE, 'Recent Documents')}>
                  Recent Documents
                </MenuItem>
              </DropdownButton>
            </ButtonGroup>
          </Col>

          <Col md={6}>
            <div className="action-bar-spacing text-right" style={styles.actionBar}>

              {canAddDocument ?
                <Button bsStyle="success" bsSize="sm" pullRight style={styles.dropdown}
                  onClick={this.handleDropdownMenuChange.bind(this, DM_CONTENT_AREA_UPLOAD, UPLOAD_VIEWTYPE, 'My Pending Uploads')}>
                  Upload
                </Button>

                /*
                 * NOTE: Hidden until Web Link and Hardcopy are implemented.
                 *
                  <DropdownButton id="AddDocumentDropdown" title="Add" bsStyle="success" bsSize="sm" pullRight style={styles.dropdown}>
                    <MenuItem onClick={this.handleDropdownAddChange.bind(this, DM_CONTENT_AREA_UPLOAD, 'Upload New Document')}>
                      <Icon name="upload" /> Upload New Document
                    </MenuItem>
                    <MenuItem>
                      <Icon name="link" /> Web Link
                    </MenuItem>
                    <MenuItem>
                      <Icon name="book" /> Hardcopy
                    </MenuItem>
                  </DropdownButton>
                */
              : null}

              <div className="search-wrapper" style={styles.search}>

                <Input type="search"
                  placeholder="Find Documents"
                  bsSize="small"
                  style={styles.searchInput}
                  onFocus={this.onFocus.bind(this)}
                  onBlur={this.onBlur.bind(this)}
                  onKeyUp={this.handleSearchFieldKeyUp.bind(this)}
                />

              {this.state.showAdvancedSearchLink ?
                <Button bsStyle="link" bsSize="sm" style={styles.advancedSearchLink} onClick={this.handleAdvancedSearchClick.bind(this)}>
                  Advanced Filter
                </Button>
                :
                null
              }
              </div>

            </div>
          </Col>

        </Row>

      </div>
    );
  }
}

// Parent Functions.
ContentAreaHeader.propTypes = {
  customTitle: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  dmUi: React.PropTypes.object,
  dmLookups: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmUi: state.dmUi,
  dmLookups: state.dmLookups,
});

// Export.
export default connect(mapStateToProps)(ContentAreaHeader);
