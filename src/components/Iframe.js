// Dependencies.
import React from 'react';
import { connect } from 'react-redux';


// Define class.
class Iframe extends React.Component {
  // Render method.
  render() {
    const { shUi, globalSettings, url } = this.props;

    const styles = {
      iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: shUi.isNavigatorPinned && globalSettings.selectedMenuItem.IsNavigatorDisplay ? 'calc(100% - 274px)' : '100%',
        height: shUi.browserInfo.height - 100,
        border: 0,
        transition: 'all .5s ease',
      }
    };

    return (
      <iframe id="iframeComponent" src={url} scrolling="yes" className="iframeWrapper home" style={styles.iframe} />
    );
  }
}

// Validation.
Iframe.propTypes = {
  url: React.PropTypes.string,
  shUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalSettings: state.globalSettings,
});

// Export.
export default connect(mapStateToProps)(Iframe);
