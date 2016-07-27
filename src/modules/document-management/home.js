// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Global actions.
import { toggleModal } from '../../redux/actions/ui-actions';

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
import Main from '../../layouts/main';
import ContentArea from './content-area';
import RightPanelArea from './right-panel-area';


// Utility methods.
import utils from '../../utils';

// Define class.
class Home extends React.Component {
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
    // Initial settings.
    dispatch(dmSetModuleId(36));
    dispatch(dmSetFolderViewType('AllDocuments'));
    dispatch(toggleRightSidebar(false));
    dispatch(setFullScreen(false));
    dispatch(setDevMode(false));
    dispatch(dmSetIsFormValid(true));
    dispatch(dmValidateFormField(false));

    // Set view state.
    dispatch(setContentAreaView(DM_CONTENT_AREA_DEFAULT));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));
    dispatch(toggleModal(false));

    // Fetch data.
    this.fetchInitialData();
  }

  // Only called when the props have changed and when this is not an initial rendering.
  componentWillReceiveProps() {
    // Fetch data.
    this.fetchInitialData();
  }

  // Fetch data method.
  fetchInitialData() {
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
    return (
      <div>
        <Main>
          <ContentArea />
          <RightPanelArea />
        </Main>
      </div>
    );
  }
}

// propTypes.
Home.propTypes = {
  dispatch: React.PropTypes.func,
  globalSettings: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  globalSettings: state.globalSettings
});

// Export.
export default connect(mapStateToProps)(Home);
