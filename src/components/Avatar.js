// Dependencies.
import React from 'react';
import Icon from 'react-fa';

// Define class.
class Avatar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      randomColor: Math.floor((Math.random() * 5) + 1)
    };
  }

  // Render method.
  render() {
    const { backgroundColor, borderWidth, random, borderColor, size, shape, color, padding } = this.props;
    const { randomColor } = this.state;
    let contents;

    let styles = {
      avatar: {
        position: 'relative',
        display: 'inline-block',
        width: '30px',
        height: '30px',
        overflow: 'hidden',
        textAlign: 'center',
        textTransform: 'capitalize',
        margin: padding.length ? padding : '5px 3px 5px 0',
        borderRadius: '50%',
        borderWidth: borderWidth || 3,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        transition: 'all .5s ease',
      },

      img: {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        width: '100%',
        height: 'auto',
        borderRadius: '50%',
      },

      icon: {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        width: '100%',
        fontSize: '16px',
        color: 'rgba(255,255,255,.8)',
        // paddingTop: '5px',
      },

      initials: {
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        display: 'block',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: 100,
        transform: 'translateY(-50%)',
      }
    };

    // Size.
    let sizeStyle;
    if (size === 'xs') {
      sizeStyle = 16;
    } else if (size === 'sm') {
      sizeStyle = 24;
    } else if (size === 'md') {
      sizeStyle = 48;
    } else if (size === 'lg') {
      sizeStyle = 64;
    } else {
      sizeStyle = size || 32;
    }


    // Border.
    let radius;
    if (shape === 'square') {
      radius = 0;
    } else {
      radius = '50%';
    }


    // Icon.
    const icon = this.props.icon || '';
    if (icon.length >= 1) {
      contents = (<Icon name={icon} style={styles.icon} className="fa-fw" />);
    }


    // Initials
    const name = this.props.name || '';
    let initials;
    if (name.length > 0) {
      // Get all initials from name prop
      const allInitials = name.split(' ').map( (s) => {
        return s.charAt(0);
      });
      // Join first and last initials
      initials = allInitials[0] + allInitials[allInitials.length - 1];
      contents = (
        <span className="avatar-initials" style={styles.initials}>
          {initials}
        </span>
      );
    }

    // Image.
    const imageSrc = this.props.src || '';
    if (imageSrc.length > 0) {
      contents = (<img src={imageSrc} style={styles.img} />);
    }


    // Status.
    const status = this.props.status || '';
    let classnames = 'avatar ' + status;


    // styles override.
    styles = { ...styles,
      avatar: { ...styles.avatar,
        width: sizeStyle,
        height: sizeStyle,
        verticalAlign: 'middle',
        borderRadius: radius,
        borderColor: borderColor + ' !important' || 'rgba(0,0,0,.25)',
      },
      img: { ...styles.img,
        borderRadius: radius,
      }
    };

    if (!random) {
      styles = { ...styles,
        avatar: { ...styles.avatar,
          backgroundColor
        }
      };
    }
    if (color) {
      styles = { ...styles,
        initials: { ...styles.initials,
          color
        }
      };
    }

    return (
      <span className={`${classnames} color-${randomColor}`} style={styles.avatar}>
        {contents}
      </span>
    );
  }
}

// Validation.
Avatar.propTypes = {
  status: React.PropTypes.string,
  shape: React.PropTypes.string,
  size: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  padding: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  borderWidth: React.PropTypes.number,
  borderColor: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  src: React.PropTypes.string,
  icon: React.PropTypes.string,
  background: React.PropTypes.string,
  name: React.PropTypes.string,
  random: React.PropTypes.bool,
  color: React.PropTypes.string,
};

Avatar.defaultProps = {
  random: true,
  padding: '5px 3px 5px 0',
};

// Export.
export default Avatar;
