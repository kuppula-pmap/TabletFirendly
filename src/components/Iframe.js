// Dependencies.
import React from 'react';
import { connect } from 'react-redux';


// Define class.
class Iframe extends React.Component {
  // Render method.
  render() {
    const { shUi, globalSettings, url } = this.props;
    const iframewidth = screen.width > 768 ? '100%' : shUi.browserInfo.width - 50;

    const styles = {
      iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: shUi.isNavigatorPinned && globalSettings.selectedMenuItem.IsNavigatorDisplay ? 'calc(100% - 274px)' : iframewidth,
        height: shUi.browserInfo.height - 100,
        border: 0,
        transition: 'all .5s ease',
      }
    };

    return (
        <iframe id="iframeComponent" src={url} scrolling={ screen.width > 768 ? 'yes' : 'no' } className="iframeWrapper home" style={styles.iframe} />
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
