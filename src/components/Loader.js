// Dependencies.
import React from 'react';


// Define class.
class Loader extends React.Component {

  // Render method.
  render() {
    const { theme, padding, size, inline, dots } = this.props;

    if (dots) {
      return (
        <span className="dots-loader">
          <span/><span/><span/>
        </span>
      );
    }

    let color;
    switch (theme) {
    case 'dark':
      color = '#000000';
      break;
    default:
      color = '#FFFFFF';
    }

    let styles = {
      base: {
        display: inline ? 'inline-block' : 'block',
        textAlign: 'center',
        margin: padding,
        verticalAlign: 'middle',
      },

      spinner: {
        width: size,
        height: size,
        margin: inline ? 0 : '0 auto',
      },

      circle: {
        backgroundColor: color,
      },
    };

    return (
      <div style={styles.base}>
        <div className="spinner--loader" style={styles.spinner}>
          <div className="spinner--loader--circle_1" style={styles.circle} />
          <div className="spinner--loader--circle_2" style={styles.circle} />
        </div>
      </div>
    );
  }
}

// Validation.
Loader.propTypes = {
  padding: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  size: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  theme: React.PropTypes.oneOf(['light', 'dark']),
  inline: React.PropTypes.bool,
  dots: React.PropTypes.bool,
};

Loader.defaultProps = {
  padding: 40,
  size: 50,
  theme: 'light',
  inline: false,
};

// Export.
export default Loader;
