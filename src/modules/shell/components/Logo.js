// Dependencies.
import React from 'react';
import {connect} from 'react-redux';


// Define class.
class Logo extends React.Component {
  handleLogoClick() {
    this.props.handleLogoClick();
  }

  // Render method.
  render() {
    const { shUi, shCustomSettings, globalSettings } = this.props;
    let HeaderLogo = shCustomSettings.items ? globalSettings.urlPrefix + shCustomSettings.items.HeaderLogoNameShell : null;
    const Title = shCustomSettings.items ? shCustomSettings.items.TITLE : null;

    switch (document.location.host) {
    // Use static logo image when in localhost or cosmos dev server.
    case 'localhost:2015':
    case 'cosmos.pmapconnect.com':
      HeaderLogo = '/static/images/logo/processmap-logo-white.png';
      break;
    default:
    }

    const styles = {
      base: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        width: shUi.browserInfo.width >= 768 ? 150 : 100,
      },

      logo: {
        display: 'inline-block',
        width: 'auto',
        maxWidth: '100%',
        height: 'auto',
        maxHeight: shUi.browserInfo.width >= 768 ? 40 : 24,
        paddingRight: 10,
        transition: 'all .5s ease',
      },
    };

    return (
      <div style={styles.base} onClick={this.handleLogoClick.bind(this)} id={`shell_logo_img_toggle-nav`}>
        {HeaderLogo ?
          <img src={HeaderLogo} alt={Title} className="brand-logo" style={styles.logo}/>
        : null }
      </div>
    );
  }
}

// Validation.
Logo.propTypes = {
  handleLogoClick: React.PropTypes.func,
  shUi: React.PropTypes.object,
  shCustomSettings: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  shCustomSettings: state.shCustomSettings,
  globalSettings: state.globalSettings,
});
export default connect(mapStateToProps)(Logo);
