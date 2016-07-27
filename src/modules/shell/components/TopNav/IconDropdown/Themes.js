import React from 'react';
import { NavDropdown, MenuItem, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Icon from '../../../../../components/Icon';


class ThemesIcon extends React.Component {
  changeTheme(theme) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('andromeda');
    body.classList.remove('bootstrap');
    body.classList.remove('walgreens');
    body.classList.add(theme);
  }

  render() {
    const { styles } = this.props;

    const tooltip = <Tooltip id="ThemesIcon_tooltip">Switch theme</Tooltip>;

    const title = (
      <div>
          <Icon name="paint-palette-o" size="lg" fixedWidth className="nav-icon" style={styles.navIcon} />
      </div>
    );

    return (
      <OverlayTrigger placement="left" overlay={tooltip}>
        <NavDropdown eventKey={2} id="headerNavDropdown_2" noCaret pullRight title={title} style={styles.rightNavLink}>
          <MenuItem eventKey={2.1} style={styles.dropDownListItem}
            onClick={this.changeTheme.bind(this, 'andromeda')} id={`shell_themes_menu-item_change-theme_andromeda`}>
            Andromeda
          </MenuItem>
          <MenuItem eventKey={2.2} style={styles.dropDownListItem}
            onClick={this.changeTheme.bind(this, 'bootstrap')} id={`shell_themes_menu-item_change-theme_bootstrap`}>
            Bootstrap
          </MenuItem>
          {/*
            <MenuItem eventKey={2.1} style={styles.dropDownListItem}
            onClick={this.changeTheme.bind(this, 'legacy')}>
            Legacy
            </MenuItem>
          <MenuItem eventKey={2.2} style={styles.dropDownListItem}
            onClick={this.changeTheme.bind(this, 'walgreens')}>
            Walgreens
          </MenuItem>
          */}
        </NavDropdown>
      </OverlayTrigger>
    );
  }
}

ThemesIcon.propTypes = {
  styles: React.PropTypes.object,
};

export default ThemesIcon;
