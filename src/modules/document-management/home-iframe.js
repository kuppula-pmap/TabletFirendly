// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Doc Mgt actions.
import {
  DM_CONTENT_AREA_DEFAULT,
  DM_RIGHT_PANEL_ACTIVITY
} from './redux/constants/ui-constants';
import {
  setContentAreaView,
  setRightPanelAreaView,
  toggleRightSidebar,
  setDevMode,
  changeFolder,
  setFullScreen,
} from './redux/actions/ui-actions';
import { dmSetModuleId, dmSetFolderViewType } from './redux/actions/settings-actions';
import { dmFetchModuleLabels } from './redux/actions/moduleLabels-actions';
import { fetchFolder } from './redux/actions/folder-actions';
import { fetchLookups } from './redux/actions/lookups-actions';
import { fetchTasks } from './redux/actions/tasks-actions';
import { fetchPermissions } from './redux/actions/permissions-actions';
import { dmSetIsFormValid, dmValidateFormField } from './redux/actions/formValidation-actions';


// Layouts.
import Iframe from '../../layouts/noFrame';
import ContentArea from './content-area';
import RightPanelArea from './right-panel-area';


// Utility methods.
import utils from '../../utils';

// Define class.
class HomepageIframe extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
    // Set page title.
    utils.title(props);

    this.state = {
      initialDataLoaded: false,
    };
  }

  // Is called after the render method.
  componentDidMount() {
    const { dispatch } = this.props;
    // Set initial settings.
    dispatch(dmSetModuleId(36));
    dispatch(dmSetFolderViewType('AllDocuments'));
    dispatch(toggleRightSidebar(false));
    dispatch(setFullScreen(true));
    dispatch(setDevMode(false));
    dispatch(dmSetIsFormValid(true));
    dispatch(dmValidateFormField(false));
    dispatch(dmValidateFormField(false));

    // Set initial view state.
    dispatch(setContentAreaView(DM_CONTENT_AREA_DEFAULT));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));
  }

  // Only called when the props have changed and when this is not an initial rendering.
  componentWillReceiveProps() {
    const { dispatch, globalSettings } = this.props;

    // Initial settings.
    const initialDMFolder = 'root';
    dispatch(changeFolder(initialDMFolder));

    // Dispatch actions after authentication.
    if (globalSettings.authorizationToken && !this.state.initialDataLoaded) {
      dispatch(dmFetchModuleLabels());
      dispatch(fetchFolder(initialDMFolder));
      dispatch(fetchLookups());
      dispatch(fetchTasks());
      dispatch(fetchPermissions());
      this.setState({initialDataLoaded: true});
    }
  }

  // Render method.
  render() {
    let styles = {
      base: {
        position: 'relative',
        margin: '-100px 0 0 -40px',
      },
    };

    return (
      <Iframe>
        <div className="main-content-wrapper" style={styles.base}>
          <ContentArea fullscreen />
          <RightPanelArea isIframe />
        </div>
      </Iframe>
    );
  }
}

// propTypes.
HomepageIframe.propTypes = {
  dispatch: React.PropTypes.func,
  globalSettings: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  globalSettings: state.globalSettings
});

// Export.
export default connect(mapStateToProps)(HomepageIframe);
