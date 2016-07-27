// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Icon from '../../../components/Icon';


// Define class.
class MenuIcon extends React.Component {
  handleLogoClick() {
    this.props.handleLogoClick();
  }

  // Render method.
  render() {
    const { shUi } = this.props;

    const styles = {
      hamburger: {
        position: 'absolute',
        top: 12,
        left: 8,
        borderRadius: '50%',
        padding: '12px 8px 10px',
        lineHeight: 1,
        transition: 'all .5s ease',
        zIndex: 1,
      },
    };

    return (
      <Button
        bsStyle="link"
        bsSize="xs"
        className="hamburger-icon"
        style={styles.hamburger}
        onClick={this.handleLogoClick.bind(this)}
        id={`shell_menu-icon_button_toggle-nav`}>

        <Icon
          name="bars"
          size="lg"
          fixedWidth
          className={`menu-icon ${shUi.leftSidebarOpened ? 'menu-icon--open' : null }`} />

      </Button>
    );
  }
}

// Validation.
MenuIcon.propTypes = {
  handleLogoClick: React.PropTypes.func,
  shUi: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
});
export default connect(mapStateToProps)(MenuIcon);
