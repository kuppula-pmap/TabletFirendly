import React from 'react';
import {connect} from 'react-redux';
import Avatar from '../../../../components/Avatar';
import UserSubnav from './UserSubnav';
import Icon from '../../../../components/Icon';

// Shell actions.
import { toggleLeftSidebar } from '../../redux/actions/ui-actions';


// Define class.
class UserInfo extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      subnavIsOpen: false,
    };
  }

  handleSubnavToggle() {
    const { shUi, dispatch } = this.props;
    if (!shUi.leftSidebarOpened) {
      dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
      this.setState({ subnavIsOpen: true });
    } else {
      this.setState({ subnavIsOpen: !this.state.subnavIsOpen });
    }
  }

  // Render method.
  render() {
    const { shUi, globalAuth, shCustomSettings, shModuleLabels, globalSettings } = this.props;
    const SSOType = globalSettings.SSOType;
    const { subnavIsOpen } = this.state;

    const UserDetails = globalAuth.items.UserDetails;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblLocationLevelPreferences = shModuleLabelsItems ? shModuleLabelsItems.lblLocationLevelPreferences : null;
    const lblLanguagesPreferences = shModuleLabelsItems ? shModuleLabelsItems.lblLanguagesPreferences : null;
    const lblChangePassword = shModuleLabelsItems ? shModuleLabelsItems.lblChangePassword : null;

    // Submenu data.
    const shCustomSettingsItems = shCustomSettings.items;
    const LanguagePreference = shCustomSettingsItems ? shCustomSettingsItems.LanguagePreference : null;
    let userSubMenu = [
      {
        Id: 'UserPreferences_locationLevel',
        Name: lblLocationLevelPreferences,
        IframeURL: '/Foundation/User/LocationPreference.aspx?LanguagePref=' + LanguagePreference,
        SpaRoute: '/menu?id=UserPreferences_locationLevel',
        IsNavigatorDisplay: true,
        ModuleId: 0,
        Description: null,
        Icon: '',
        OrderId: 1,
        QueryString: null,
        ParentId: 1,
        IsLevelDisplay: true,
        Children: [],
      },
      {
        Id: 'UserPreferences_language',
        Name: lblLanguagesPreferences,
        IframeURL: '/UserLanguagePreference/changeLangPreference.asp',
        SpaRoute: '/menu?id=UserPreferences_language',
        IsNavigatorDisplay: true,
        ModuleId: 0,
        Description: null,
        Icon: '',
        OrderId: 1,
        QueryString: null,
        ParentId: 1,
        IsLevelDisplay: true,
        Children: [],
      },
    ];

    if ( Number(SSOType) !== 2) {
      userSubMenu.push({Id: 'UserPreferences_changePassword',
        Name: lblChangePassword,
        IframeURL: '/ChangePassword/ChangePassword.aspx',
        SpaRoute: '/menu?id=UserPreferences_changePassword',
        IsNavigatorDisplay: true,
        ModuleId: 0,
        Description: null,
        Icon: '',
        OrderId: 1,
        QueryString: null,
        ParentId: 1,
        IsLevelDisplay: true,
        Children: [],
      });
    }

    const styles = {
      avatar: {
        position: 'absolute',
        top: 8,
        left: 12,
      },

      userLabel: {
        padding: '20px 15px 20px 62px',
        transition: 'all .5s ease',
      },

      iconToggle: {
        position: 'absolute',
        top: 2,
        right: 0,
        fontSize: 12,
        padding: '22px 16px',
        zIndex: -1,
        cursor: 'pointer',
        transition: 'all .5s ease',
      },
    };

    return (
      <ul className="nav sidebar-nav">
        <li>
          {shUi.leftSidebarOpened}

          <span style={styles.avatar}>
            <Avatar name={UserDetails.FullName} borderWidth={1} icon="user" size={36} />
          </span>

          <a href="#" style={styles.userLabel} onClick={this.handleSubnavToggle.bind(this)} id={`shell_user-info_anchor_subnav-toggle`}>
            {UserDetails.FullName}
            <Icon name={subnavIsOpen ? 'arrow-up-o' : 'arrow-down-o'} style={styles.iconToggle} />
          </a>

          <UserSubnav
            data={userSubMenu}
            subnavIsOpen={subnavIsOpen}
            handleSubnavToggle={this.handleSubnavToggle.bind(this)}
          />
        </li>
      </ul>
    );
  }
}

// PropTypes.
UserInfo.propTypes = {
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  globalAuth: React.PropTypes.object,
  shCustomSettings: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalAuth: state.globalAuth,
  shCustomSettings: state.shCustomSettings,
  shModuleLabels: state.shModuleLabels,
  globalSettings: state.globalSettings,
});

// Export.
export default connect(mapStateToProps)(UserInfo);
