// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';

// Components.
import TopNav from './components/TopNav/TopNav';
import LeftNav from './components/LeftNav/LeftNav';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

// Shell actions.
import {
  toggleLeftSidebar,
  toggleNavigatorPin,
  toggleNavigator,
  setLeftSidebarDepth,
  changeFrameSource,
  setReloadIframe,
  setMenuRefreshCounter,
  setMenuClickCount,
} from './redux/actions/ui-actions';
import { shSetModuleId } from './redux/actions/settings-actions';
import { shFetchModuleLabels } from './redux/actions/moduleLabels-actions';
import { fetchModuleMenu } from './redux/actions/moduleMenu-actions';
import { fetchFlatModuleMenu } from './redux/actions/flatModuleMenu-actions';
import { fetchCustomSettings } from './redux/actions/customSettings-actions';
import { fetchUserInfo } from './redux/actions/userInfo-actions';


// Define class.
class Shell extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      initialDataLoaded: false,
    };
  }

  handleUserToggle() {
    const { shUi, dispatch } = this.props;
    dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
    if (shUi.leftSidebarOpened) {
      dispatch( setLeftSidebarDepth(0) );
    }
    if (shUi.isNavigatorOpen) {
      dispatch( toggleNavigator(false) );
    }
  }

  // Is called after the render method.
  componentDidMount() {
    const { dispatch } = this.props;
    // Set initial settings.
    dispatch(shSetModuleId(1));

    // Set initial sidebar state.
    dispatch(toggleLeftSidebar(true));
    dispatch(setLeftSidebarDepth(0));
    dispatch(setMenuRefreshCounter(0));

    dispatch(setMenuClickCount(0));

    // Set iframe source.
    dispatch(changeFrameSource(''));
    dispatch(setReloadIframe(false));

    // Navigator.
    dispatch(toggleNavigatorPin(false));
    dispatch(toggleNavigator(false));
  }

  // Only called when the props have changed and when this is not an initial rendering.
  componentWillReceiveProps() {
    const { dispatch, globalSettings } = this.props;

    // Dispatch actions after authentication.
    if (globalSettings.authorizationToken && !this.state.initialDataLoaded) {
      dispatch(shFetchModuleLabels());
      dispatch(fetchCustomSettings());
      dispatch(fetchUserInfo());
      dispatch(fetchModuleMenu());
      dispatch(fetchFlatModuleMenu());
      this.setState({initialDataLoaded: true});
    }
  }

  handleClickOutside() {
    const { shUi, dispatch } = this.props;
    if (shUi.leftSidebarOpened) {
      dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
      dispatch( setLeftSidebarDepth(0) );
    }

    if (shUi.isNavigatorOpen) {
      dispatch(toggleNavigator(false));
    }
  }


  // Render method.
  render() {
    return (
      <div>
        <TopNav onUserToggle={this.handleUserToggle.bind(this)} />
        <LeftNav onUserToggle={this.handleUserToggle.bind(this)} />
        <Breadcrumbs />
      </div>
    );
  }
}

// Validation.
Shell.propTypes = {
  onUserToggle: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalSettings: state.globalSettings
});

// Export.
export default connect(mapStateToProps)(enhanceWithClickOutside(Shell));
// export default connect(mapStateToProps)(Shell);
