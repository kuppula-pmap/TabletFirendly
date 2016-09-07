// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';
import NavigatorButton from './NavigatorButton';
import NavigatorPanel from './NavigatorPanel';

import {
  toggleNavigatorPin,
  toggleNavigator,
  toggleLeftSidebar,
  setLeftSidebarDepth,
} from '../../redux/actions/ui-actions';
import { fetchRecentLocationsList } from '../../redux/actions/recentLocationsList-actions';
import { fetchLocationsList } from '../../redux/actions/locationsList-actions';
import { fetchLocationsTree } from '../../redux/actions/locationsTree-actions';
import { fetchLocationsTreeTopLevels } from '../../redux/actions/locationsTreeTopLevels-actions';

// Define class.
class Navigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      inputValue: '',
      inputFocus: false,
      treeView: false,
    };
  }

  componentWillMount() {
    const { dispatch, globalSettings } = this.props;
    if (!globalSettings.selectedMenuItem.IsNavigatorDisplay) {
      dispatch( toggleNavigatorPin(false));
    }
    this.setState({ treeView: false });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.shRecentLocationsList.isFetching &&
      !nextProps.shLocationsList.isFetching &&
      !nextProps.shLocationsTree.isFetching &&
      !nextProps.shLocationsTreeTopLevels.isFetching
    ) {
      this.setState({ isLoading: false });
    }
  }

  handlePinningClick(e) {
    e.preventDefault();
    const { dispatch, shUi } = this.props;
    dispatch( toggleNavigatorPin(!shUi.isNavigatorPinned));
    if (shUi.isNavigatorOpen && !shUi.isNavigatorPinned) {
      this.props.onUserToggle();
      dispatch( toggleLeftSidebar(!shUi.leftSidebarOpened) );
    }
  }

  handlePanelToggleClick(e) {
    e.preventDefault();
    const { dispatch, shUi } = this.props;

    // console.log(shUi.isNavigatorOpen);

    if (!shUi.isNavigatorOpen) {
      this.setState({ treeView: false });
      dispatch(fetchRecentLocationsList());
      dispatch(fetchLocationsList());
      dispatch(fetchLocationsTree());
      dispatch(fetchLocationsTreeTopLevels());
    }

    if (shUi.browserInfo.width < 768 && shUi.leftSidebarOpened) {
      this.props.onUserToggle();
    }

    dispatch( toggleNavigator(!shUi.isNavigatorOpen) );
    this.setState({ inputValue: '' });
    // document.getElementById('navigator_input_field').focus();

    if (shUi.leftSidebarOpened) {
      dispatch( toggleLeftSidebar(shUi.leftSidebarOpened) );
      dispatch( setLeftSidebarDepth(0) );
    }
  }

  handleNavigatorInputOnChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInputClearClick() {
    this.setState({ inputValue: '' });
  }

  handleViewToggleClick(e) {
    e.preventDefault();
    this.setState({ treeView: !this.state.treeView });
    this.setState({ inputValue: '' });
  }

  handleInputFocusToggle(bool) {
    this.setState({ inputFocus: bool });
  }

  handleClickOutside() {
    // const { dispatch, shUi } = this.props;
    // if (!shUi.isNavigatorPinned) {
    //   dispatch( toggleNavigator(false) );
    // }

    const { dispatch, shUi } = this.props;
    if (shUi.isNavigatorOpen && !shUi.isNavigatorPinned) {
      dispatch( toggleNavigator(false) );
    }
  }

  // Render method.
  render() {
    const { shUi } = this.props;
    const { isLoading, treeView, inputValue, inputFocus } = this.state;

    const panelWidth = 274;
    const responsiveRight = shUi.browserInfo.width < 480 ? shUi.browserInfo.width : panelWidth;

    let styles = {
      base: {
        maxWidth: panelWidth,
        marginRight: shUi.browserInfo.width >= 480 ? 0 : -210,
        transition: 'all .5s ease',
      },

      navigator: {
        margin: '4px 0 0 4px',
        cursor: 'pointer',
      },

      navigatorButtonLabel: {
        display: 'inline-block',
        maxWidth: panelWidth,
        fontSize: 14,
        // fontWeight: 100,
        padding: shUi.browserInfo.width >= 480 ? '9px 20px 6px 40px' : '9px 20px 6px 60px',
        paddingRight: shUi.isNavigatorOpen || shUi.isNavigatorPinned ? 60 : 20,
        transition: 'all .5s ease',
      },

      navigatorIcon: {
        position: 'absolute',
        top: 12,
        left: 8,
        zIndex: 1,
        transition: 'all .25s ease',
      },

      navigatorPanel: {
        position: 'fixed',
        top: 60,
        right: shUi.isNavigatorOpen || shUi.isNavigatorPinned ? 0 : -responsiveRight,
        width: shUi.browserInfo.width < 480 ? shUi.browserInfo.width : panelWidth,
        height: shUi.browserInfo.height - 60,
        borderTopLeftRadius: 0,
        zIndex: -1,
        transition: 'all .5s ease',
      },

      navigatorInputBar: {
        position: 'relative',
        height: treeView || isLoading ? 0 : 44,
        overflow: 'hidden',
        transition: 'all .5s ease',
      },

      navigatorInput: {
        position: 'relative',
        display: 'block',
        width: '100%',
        height: 44,
        overflow: 'hidden',
        padding: '12px 15px 12px 60px',
        boxShadow: 'inset 0px 4px 8px 0px rgba(0,0,0,0.4)',
        transition: 'all .5s ease',
      },

      navigatorInputIcon: {
        position: 'absolute',
        top: 15,
        left: 15,
      },

      navigatorInputClearIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        cursor: 'pointer',
      },

      resultsList: {
        height: shUi.browserInfo.height - 148,
        overflowY: 'auto',
      },

      resultsListItem: {
        padding: '8px 15px',
      },

      resultsStatusBar: {
        position: 'relative',
        height: 44,
        overflow: 'hidden',
        fontSize: 10,
        padding: 15,
      },

      listText: {
        margin: 20,
      },

      viewToggleButton: {
        position: 'absolute',
        top: 5,
        right: 10,
        padding: 5,
        borderRadius: '50%',
        transition: 'all .5s ease',
      },

      select: {
        margin: '0 6px',
      },

      treeview: {
        height: shUi.browserInfo.height - 122,
        overflowY: 'auto',
        padding: 4,
        margin: 10,
        borderRadius: 6,
      },


      rightNavLink: {
        ...this.props.styles.rightNavLink,
        position: 'absolute',
        top: 2,
        right: shUi.isNavigatorOpen || shUi.isNavigatorPinned ? 10 : -40,
        transition: 'all .5s ease',
      },

      navIcon: {
        ...this.props.styles.navIcon,
        display: 'block',
      },

      closeNavigatorButton: {
        cursor: 'pointer',
      },
    };

    return (
      <div className="pull-right navigator-wrapper" style={styles.base}>

        <NavigatorButton
          isOpened={shUi.isNavigatorOpen}
          handlePanelToggleClick={this.handlePanelToggleClick.bind(this)}
          handlePinningClick={this.handlePinningClick.bind(this)}
          styles={styles}
        />

        <NavigatorPanel
          isLoading={isLoading}
          inputValue={inputValue}
          inputFocus={inputFocus}
          treeView={treeView}
          handlePanelToggleClick={this.handlePanelToggleClick.bind(this)}
          handlePinningClick={this.handlePinningClick.bind(this)}
          handleViewToggleClick={this.handleViewToggleClick.bind(this)}
          handleInputFocusToggle={this.handleInputFocusToggle.bind(this)}
          handleNavigatorInputOnChange={this.handleNavigatorInputOnChange.bind(this)}
          handleInputClearClick={this.handleInputClearClick.bind(this)}
          styles={styles}
        />

      </div>
    );
  }
}

// Validation.
Navigator.propTypes = {
  styles: React.PropTypes.object,
  onUserToggle: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  shRecentLocationsList: React.PropTypes.object,
  shLocationsList: React.PropTypes.object,
  shLocationsTree: React.PropTypes.object,
  shLocationsTreeTopLevels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalSettings: state.globalSettings,
  shRecentLocationsList: state.shRecentLocationsList,
  shLocationsList: state.shLocationsList,
  shLocationsTree: state.shLocationsTree,
  shLocationsTreeTopLevels: state.shLocationsTreeTopLevels,
});

// Export.
export default connect(mapStateToProps)(enhanceWithClickOutside(Navigator));
