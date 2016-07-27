// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
import Navigator from '../LocationNavigator/Navigator';
import Logo from '../Logo';
import MenuIcon from '../MenuIcon';
import {
  Navbar,
  NavBrand,
  Nav
} from 'react-bootstrap';

// Icon dropdowns.
import AlarmIcon from './IconDropdown/Alert';
import HelpIcon from './IconDropdown/Help';
// import ShellToggleIcon from './IconDropdown/ShellToggle';
// import ThemesIcon from './IconDropdown/Themes';


import utils from '../../../../utils';


// Define class.
class TopNav extends React.Component {

  // Toggle SidebarLeft.
  handleLogoClick() {
    this.props.onUserToggle();
  }

  // Render method.
  render() {
    const { shUi, shCustomSettings, globalSettings, globalAuth, shModuleLabels } = this.props;

    const HeaderLogo = shCustomSettings.items ? globalSettings.urlPrefix + shCustomSettings.items.HeaderLogoName : null;
    const Title = shCustomSettings.items ? shCustomSettings.items.TITLE : null;

    const customerMsg = shCustomSettings.items ? shCustomSettings.items.HomeCustomerMsg : null;
    const customerMsgText = shCustomSettings.items ? shCustomSettings.items.CustomerMsgText : null;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblLoading = shModuleLabelsItems ? shModuleLabelsItems.lblLoading : null;

    // Add shCustomSettings.items.TITLE to page title.
    utils.title(this.props, Title);

    let styles = {
      base: {
        position: 'relative',
        zIndex: shUi.browserInfo.width >= 768 ? 99998 : 99999,
      },

      navbar: {
        height: 60,
        paddingLeft: 60,
        border: 'none',
        transition: 'all .5s ease',
      },

      logoWrapper: {
        position: 'relative',
        display: 'block',
        height: 30,
        transition: 'all .5s ease',
      },

      titleWrapper: {
        margin: HeaderLogo ? '6px 0' : '6px 0 6px 20px',
        fontWeight: 100,
        display: shUi.browserInfo.width >= 992 ? 'block' : 'none',
      },

      title: {
        marginLeft: shUi.leftSidebarOpened ? 48 : -10,
        transition: 'all .5s ease',
      },

      rightNav: {
        position: 'absolute',
        top: 6,
        right: 0,
        width: '50%',
      },

      rightNavLink: {
        borderRadius: '50%',
        margin: 4,
        lineHeight: 1,
        marginTop: 4,
        float: 'right',
      },

      alertLink: {
        margin: '-8px -20px',
      },

      dropDownListItem: {
        width: shUi.browserInfo.width >= 768 ? 300 : 220,
      },

      navIcon: {
        transition: 'all .5s ease',
      },

      badge: {
        position: 'absolute',
        top: 4,
        right: 4,
        transition: 'all .5s ease',
      },

      navigator: {
        display: 'inline-block',
        marginLeft: 6,
        transition: 'all .5s ease',
      },
    };

    if (shUi.browserInfo.width >= 768) {
      styles = {
        ...styles,

        navBrand: {
        },

      };
    }

    const logo = (
      <NavBrand style={styles.navBrand}>
        {shUi.browserInfo.width < 768 ?
          <MenuIcon handleLogoClick={this.handleLogoClick.bind(this)} />
        : null }
        <div style={styles.logoWrapper}>
          <Logo handleLogoClick={this.handleLogoClick.bind(this)} />
        </div>
      </NavBrand>
    );

    return (
      <header className="main-menu-top" style={styles.base}>
        <Navbar fluid inverse fixedTop style={styles.navbar}>

          {HeaderLogo ? logo : null}

          <Nav style={styles.titleWrapper}>
            <li className="navbar-text" style={styles.title}>
              <span>
                {Title || lblLoading}
              </span>
            </li>
          </Nav>

          <div className="clearfix" style={styles.rightNav}>

            {!globalAuth.isFetching && globalSettings.selectedMenuItem.IsNavigatorDisplay ?
              <Navigator onUserToggle={this.handleLogoClick.bind(this)} styles={styles} />
            : null}

            {/* Switch to No to view the CustomerMsg */}
            <ul className="nav pull-right main-top-nav">

              { customerMsg === 'Yes' && customerMsgText.length ?
                <AlarmIcon customerMsgText={customerMsgText} styles={styles} />
              : null }

              {!shCustomSettings.isFetching && !globalAuth.isFetching ?
                <HelpIcon styles={styles} />
              : null }

              {/*
                <ThemesIcon styles={styles} />

                {shUi.browserInfo.width >= 768 ?
                <ShellToggleIcon styles={styles} />
                : null }
              */}

            </ul>

          </div>

        </Navbar>
      </header>
    );
  }

}

// Validation.
TopNav.propTypes = {
  onUserToggle: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  shCustomSettings: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  globalAuth: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  shCustomSettings: state.shCustomSettings,
  globalSettings: state.globalSettings,
  globalAuth: state.globalAuth,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(TopNav);
