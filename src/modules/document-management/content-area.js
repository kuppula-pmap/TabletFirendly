// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import {
  DM_CONTENT_AREA_DEFAULT,
  DM_CONTENT_AREA_PREVIEW,
  DM_CONTENT_AREA_UPLOAD,
  DM_CONTENT_AREA_SEARCH_RESULTS,
  DM_CONTENT_AREA_DATAGRID
} from './redux/constants/ui-constants';

// Components.
import ContentAreaHeader from './components/ContentArea/ContentAreaHeader';
import Default from './components/ContentArea/Default';
import Preview from './components/ContentArea/Preview';
// import UploadFileDropzone from './components/ContentArea/FileUploader/UploadFileDropzone';
import Uploader from './components/ContentArea/FileUploader/Uploader';
import SearchResults from './components/ContentArea/SearchResults';
import DataGrid from './components/ContentArea/DataGrid';
import Info from '../../components/Info';


// Define class.
class ContentArea extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
    this.counter = 0;
  }

  // Render method.
  render() {
    const { dmUi, fullscreen, shUi } = this.props;
    this.counter += 1;
    // console.log('content-area -> render counter: ', this.counter);

    // Right Panel
    const currentView = dmUi.contentAreaView;
    let contentArea;

    switch (currentView) {
    case DM_CONTENT_AREA_DEFAULT:
      contentArea = (
        <div>
          <ContentAreaHeader />
          <Default />
        </div>
      );
      break;
    case DM_CONTENT_AREA_PREVIEW:
      contentArea = <Preview />;
      break;
    case DM_CONTENT_AREA_UPLOAD:
      contentArea = (
        <div>
          <ContentAreaHeader />
          <br/>
          <Uploader />
        </div>
      );
      break;
    case DM_CONTENT_AREA_SEARCH_RESULTS:
      contentArea = (
        <div>
          <ContentAreaHeader customTitle="Search" />
          <SearchResults />
        </div>
      );
      break;
    case DM_CONTENT_AREA_DATAGRID:
      contentArea = (
        <div>
          <ContentAreaHeader />
          <DataGrid />
        </div>
      );
      break;
    default:
      contentArea = (
        <div>
          <ContentAreaHeader />
          <Default />
        </div>
      );
    }

    const sidebarWidth = fullscreen ? 260 : 340;
    const scrollOffset = -14;
    const paddingRight = 46;
    const rightOffset = shUi.isNavigatorPinned ? 274 : 0;

    let styles = {
      base: {
        position: 'relative',
        width: dmUi.rightSidebarOpened ?
          ((shUi.browserInfo.width - sidebarWidth) + scrollOffset - rightOffset + 20)
          :
          `calc(100% - ${rightOffset}px)`,
        paddingTop: 10,
        paddingRight: fullscreen ? 66 : paddingRight,
        paddingBottom: 0,
        paddingLeft: 20,
        marginRight: -20,
        transition: 'all .5s ease',
      },
    };

    return (
      <div className="page-content-wrapper" style={styles.base}>
        {contentArea}
        {dmUi.devMode ? <Info css={styles.devInfo} /> : ''}
      </div>
    );
  }
}

// propTypes.
ContentArea.propTypes = {
  dispatch: React.PropTypes.func,
  dmUi: React.PropTypes.object,
  shUi: React.PropTypes.object,
  fullscreen: React.PropTypes.bool,
};
const mapStateToProps = (state) => ({
  dmUi: state.dmUi,
  shUi: state.shUi,
  // fullscreen: false,
});

// Export.
export default connect(mapStateToProps)(ContentArea);
