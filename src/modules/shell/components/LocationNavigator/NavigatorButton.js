import React from 'react';
import {connect} from 'react-redux';
import Icon from '../../../../components/Icon';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class NavigatorButton extends React.Component {
  handlePanelToggleClick(e) {
    this.props.handlePanelToggleClick(e);
  }

  handlePinningClick(e) {
    this.props.handlePinningClick(e);
  }

  render() {
    const { shUi, styles, isOpened, globalSettings, shModuleLabels } = this.props;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblToggleNavigation = shModuleLabelsItems ? shModuleLabelsItems.lblToggleNavigation : null;

    const tooltip = <Tooltip id="location_navigator_toggle">{lblToggleNavigation}</Tooltip>;

    return (
      <ul className="nav main-top-nav navigator-button">

        <OverlayTrigger placement="left" overlay={tooltip}>
          <li className={`navbar-text ${isOpened ? 'active' : ''}`} style={styles.navigator}
              onClick={this.handlePanelToggleClick.bind(this)}
              id={`shell_navigator-button_list-item_panel-toggle`}>
            <Icon name={`${ globalSettings.levelId > globalSettings.locationId ? 'home-pin-o' : 'map-marker-o' }`} size="lg" fixedWidth
              className="nav-icon" style={styles.navigatorIcon} />
            <span className="navigator-button-label ellipsis-overflow" style={styles.navigatorButtonLabel}>
              {globalSettings.locationLevelName}
            </span>
          </li>
        </OverlayTrigger>

        <li style={styles.rightNavLink} onClick={this.handlePinningClick.bind(this)}>
          <a href className={`navigator-pin-btn ${shUi.isNavigatorPinned ? 'active' : 'oi-rotate-45' }`}>
            <Icon name={`${shUi.isNavigatorPinned ? 'pin' : 'pin-o'}`} size="lg" fixedWidth className="nav-icon" style={styles.navIcon} />
          </a>
        </li>

      </ul>
    );
  }
}

NavigatorButton.propTypes = {
  styles: React.PropTypes.object,
  handlePanelToggleClick: React.PropTypes.func,
  handlePinningClick: React.PropTypes.func,
  isOpened: React.PropTypes.bool,
  shUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalSettings: state.globalSettings,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(NavigatorButton);
