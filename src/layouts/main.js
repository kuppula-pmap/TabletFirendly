import React from 'react';
import { connect } from 'react-redux';
import Shell from '../modules/shell/shell';


// Define class.
class Layout extends React.Component {
  // Render method.
  render() {
    const { children, shUi, noHeader } = this.props;

    let styles = {
      base: {
        paddingLeft: shUi.browserInfo.width >= 768 ? 60 : 0,
        transition: 'all .5s ease',
      },

      content: {
        position: 'relative',
        transition: 'all .5s ease',
      },
    };

    // Check left sidebar status.
    const leftSidebarOpened = shUi.leftSidebarOpened;

    return (
      <div id="shellWrapper" style={styles.base}
           className={`shell-wrapper doc-wrapper ${ !leftSidebarOpened ? 'toggled' : '' }`}>

        { !noHeader ? <Shell /> : null }

        <div className="main-content-wrapper" style={styles.content}>
          {children}
        </div>

      </div>
    );
  }
}

// Validation.
Layout.propTypes = {
  children: React.PropTypes.node,
  noHeader: React.PropTypes.bool,
  shUi: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
});

// Export.
export default connect(mapStateToProps)(Layout);
