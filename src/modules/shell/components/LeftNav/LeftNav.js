// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
// import enhanceWithClickOutside from 'react-click-outside';
import Logo from '../Logo';
import MenuIcon from '../MenuIcon';
import Icon from '../../../../components/Icon';
import NavLink from './NavLink';
import UserInfo from './UserInfo';
import ScrollCloak from '../../../../components/ScrollCloak';

// Global actions.
import { toggleModal, setModalView } from '../../../../redux/actions/ui-actions';

// Shell actions.
import { toggleLeftSidebar, setLeftSidebarDepth } from '../../redux/actions/ui-actions';

import utils from '../../../../utils';


// Define class.
class LeftNav extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      menuHeight: 120,
      current0Section: {name: '', icon: ''},
      current1Section: {name: '', icon: ''},
      current2Section: {name: '', icon: ''},
      current3Section: {name: '', icon: ''},
      current4Section: {name: '', icon: ''},
      current5Section: {name: '', icon: ''},
      current6Section: {name: '', icon: ''},
      current7Section: {name: '', icon: ''},
      current8Section: {name: '', icon: ''},
      current9Section: {name: '', icon: ''},
      level0Menu: [],
      level1Menu: [],
      level2Menu: [],
      level3Menu: [],
      level4Menu: [],
      level5Menu: [],
      level6Menu: [],
      level7Menu: [],
      level8Menu: [],
      level9Menu: [],
    };
  }

  loadData(menuData = [], level = 0, direction = '') {
    this.setState({ menuHeight: 120 });
    let moduleMenu = this.state['level' + level + 'Menu'];

    let updatedCurrentSection = {
      name: menuData.Name || 'main_menu',
      icon: menuData.Icon || '< Back',
    };

    let dataToLoad = menuData;

    // If the direction is 'down' or 'right'.
    if (direction === 'down' || direction === 'right' ) {
      // And the level is greater than 0.
      if (level > 0) {
        // Set dataToLoad to the children of menuData.
        dataToLoad = menuData.Children;
        // Set the state of the current level to the updated current section.
        this.setState({ ['current' + level + 'Section']: updatedCurrentSection });
      }
      // If the direction is not 'up'
    } else if (direction !== 'up') {
      // Set the state of the current level to the updated current section.
      this.setState({ ['current' + level + 'Section']: updatedCurrentSection });
      // Set the state of the next level menu to empty
      this.setState({ ['level' + (level + 1) + 'Menu']: [] });
    }

    // If there is data to load.
    // console.log(dataToLoad);
    if ( dataToLoad && dataToLoad.length ) {
      // Before pushing data to load, empty Module Menu of contents.
      if ( moduleMenu.length > 0 ) {
        moduleMenu = [];
      }
      dataToLoad.sort((a, b) => a.OrderId - b.OrderId).forEach( menuItem => {
        moduleMenu.push(
          <li key={utils.unique()}>
            <NavLink
              data={menuItem}
              depthDirection="down"
              changeDepthOnClick={this.changeDepthOnClick.bind(this)}
            />
          </li>
        );
      });
    }

    // console.log('moduleMenu =>', moduleMenu);
    // console.log('level0Menu =>', this.state.level0Menu);
    // console.log('level1Menu =>', this.state.level1Menu);
    // console.log('level2Menu =>', this.state.level2Menu);
    // console.log('level3Menu =>', this.state.level3Menu);
    // console.log('level4Menu =>', this.state.level4Menu);
    // console.log('level5Menu =>', this.state.level5Menu);
    // console.log('level6Menu =>', this.state.level6Menu);
    // console.log('level7Menu =>', this.state.level7Menu);
    // console.log('level8Menu =>', this.state.level8Menu);
    // console.log('level9Menu =>', this.state.level9Menu);

    // Apply the ModuleMenu contents to the current level.
    this.setState({ ['level' + level + 'Menu']: moduleMenu});
    this.setState({ menuHeight: moduleMenu.length * 70 });
  }

  // If there are props available, load them when you mount
  componentDidMount() {
    const { shModuleMenu } = this.props;
    if (shModuleMenu.items.length) {
      this.loadData(shModuleMenu.items);
    }
  }

  // The LeftNav component expects shModuleMenu to deliver a payload from an async call.
  componentWillReceiveProps(nextProps) {
    // Compare `lastUpdated` to check for change in async api calls.
    const oldLastUpdated = this.props.shModuleMenu.lastUpdated;
    const newLastUpdated = nextProps.shModuleMenu.lastUpdated;
    const didLastUpdatedChange = oldLastUpdated !== newLastUpdated;

    // console.log('props:', oldLastUpdated, ' / nextProps:', newLastUpdated);

    // If the level0Menu contains nothing.
    if ( didLastUpdatedChange ) {
      // Clear level0Menu.
      this.setState({ level0Menu: [] });

      // Toss items from props into loadData function
      this.loadData(nextProps.shModuleMenu.items);
    }
  }

  // Toggle SidebarLeft.
  handleMenuIconClick() {
    this.props.onUserToggle();
  }

  handleModalToggle(view) {
    const { dispatch } = this.props;
    dispatch(setModalView(view));
    dispatch(toggleModal(true));
  }

  changeDepthOnClick(direction, data, e) {
    if (e) e.preventDefault();
    const { shUi, dispatch } = this.props;
    if (shUi.isNavigatorOpen) {
      this.props.onUserToggle();
    }
    let depth = shUi.leftSidebarDepth;

    // Set depth according to the direction.
    if (direction === 'up' || direction === 'left') {
      if (depth > 0) {
        depth--;
      }
    } else if (direction === 'down' || direction === 'right') {
      depth++;
    } else {
      depth = 1;
    }

    // Update depth redux store.
    dispatch( setLeftSidebarDepth(depth) );

    // Load column data.
    if (data) this.loadData(data, depth, direction);

    // Open sidebar if closed.
    if (!shUi.leftSidebarOpened) dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
  }

  handleClickOutside() {
    const { shUi, dispatch } = this.props;
    if (shUi.leftSidebarOpened) {
      dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
      dispatch( setLeftSidebarDepth(0) );
    }
  }

  // Render method.
  render() {
    const { shUi, shCustomSettings } = this.props;
    const { menuHeight } = this.state;
    const columnWidth = shUi.browserInfo.width < 768 ? shUi.browserInfo.width : 260;
    const menuLeftInMobile = shUi.leftSidebarOpened ? 0 : -60;

    let styles = {
      base: {
        position: 'fixed',
        top: 0,
        left: shUi.browserInfo.width >= 768 ? 0 : menuLeftInMobile,
        width: shUi.leftSidebarOpened ? columnWidth : 60,
        height: shUi.browserInfo.height + 20,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBottom: 20,
        transition: 'all .5s ease',
        zIndex: shUi.browserInfo.width >= 768 ? 99999 : 99998,
      },

      brandHeader: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: shUi.leftSidebarOpened ? 270 : 60,
        height: 60,
        zIndex: 1,
        transition: 'all .5s ease',
      },

      logoWrapper: {
        display: 'inline-block',
        height: 60,
        marginLeft: 75,
      },

      slidingColumns: {
        position: 'relative',
        width: columnWidth,
        overflowX: 'hidden',
        overflowY: 'auto',
      },

      slidingColumnsWrapper: {
        position: 'absolute',
        left: -( shUi.leftSidebarDepth * columnWidth ),
        width: ( columnWidth * 12 || (shUi.leftSidebarDepth + 2) ),
        paddingTop: 60,
        transition: 'left .5s cubic-bezier(.47,.01,.21,.98)',
      },

      slidingColumn: {
        width: columnWidth,
        height: menuHeight,
        float: 'left',
      },

      sidenavBottom: {
        position: 'fixed',
        bottom: 0,
        width: 'inherit',
        zIndex: 1,
      },

      currentSectionLabel: {
        padding: 15,
      },

      currentSectionIcon: {
        fontSize: 20,
        verticalAlign: 'middle',
        margin: '-4px 8px 0 0',
      },
    };

    const backButton = (
      <NavLink
        data={{
          Id: 'main_menu',
          Name: 'Back',
          Icon: 'arrow-left-o',
        }}
        depthDirection="up"
        changeDepthOnClick={this.changeDepthOnClick.bind(this)}
      />
    );

    const logoutButton = (
      <li key={utils.unique()} style={styles.slidingColumn}>
       <NavLink
         data={{
           Id: 'logout',
           Name: 'Logout',
           Icon: 'logout-o',
           URL: '/Logout.aspx'
         }}
         href
         depthDirection="down"
         changeDepthOnClick={this.changeDepthOnClick.bind(this)}
       />
      </li>
    );

    // const homeButton = (
    //   <li>
    //     <NavLink
    //       data={{
    //         Id: '0',
    //         Name: 'Home',
    //         Icon: 'home-o',
    //         IframeURL: "LandingPage/MainLandingPage.aspx?",
    //         "SpaRoute": null,
    //       }}
    //       depthDirection="down"
    //       changeDepthOnClick={this.changeDepthOnClick.bind(this)}
    //     />
    //   </li>
    // );

    let subMenuColumns = [];
    for (let i = 1; i < 10; i++) {
      subMenuColumns.push(
        <li key={`${utils.unique()}}_${i}`} style={styles.slidingColumn}>
          {/* This is where you would refactor into NavLink */}
          <ul className="nav sidebar-nav">
            <li className="current-section-header">
              {backButton}
            </li>
            <li className="current-section-label" style={styles.currentSectionLabel}>
              {this.state['current' + i + 'Section'].icon ?
                <Icon name={this.state['current' + i + 'Section'].icon} style={styles.currentSectionIcon} />
              : null }
              {this.state['current' + i + 'Section'].name}
            </li>
          </ul>
          <ul className="nav sidebar-nav">
            {this.state['level' + i + 'Menu']}
          </ul>
        </li>
      );
    }

    return (
      <div className="sidebar-wrapper" style={styles.base}>

        <ScrollCloak>
          <div>
            {this.state.level0Menu.length || !shCustomSettings.isFetching ?

              <div>
                <div className="sidebar-brand-header" style={styles.brandHeader}>
                  <MenuIcon handleLogoClick={this.handleMenuIconClick.bind(this)} />
                  <div style={styles.logoWrapper}>
                    <Logo handleLogoClick={this.handleMenuIconClick.bind(this)} />
                  </div>
                </div>

                <ul className="nav" style={styles.slidingColumnsWrapper}>

                  {/* Sliding Columns */}
                  <li style={styles.slidingColumn}>

                    <UserInfo />

                    <ul className="nav sidebar-nav">
                      { this.state.level0Menu }
                    </ul>

                    <ul className="nav sidebar-nav">
                      {logoutButton}
                    </ul>

                  </li>

                  {subMenuColumns}

                </ul>
              </div>

            :
              <ul className="nav sidebar-nav">
                <li>
                  <NavLink loader />
                </li>
              </ul>
            }

          </div>
        </ScrollCloak>
      </div>
    );
  }
}

// Validation.
LeftNav.propTypes = {
  onUserToggle: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  shModuleMenu: React.PropTypes.object,
  shCustomSettings: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shModuleMenu: state.shModuleMenu,
  shUi: state.shUi,
  shCustomSettings: state.shCustomSettings,
});

// Export.
// export default connect(mapStateToProps)(enhanceWithClickOutside(LeftNav));
export default connect(mapStateToProps)(LeftNav);
