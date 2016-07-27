// Dependencies.
import React, {PropTypes} from 'react';

// Define class.
class Icon extends React.Component {

  // Render method.
  render() {
    let {
      Component,
      name, size, rotate, flip, spin, fixedWidth, stack, inverse,
      pulse, className, ...props
    } = this.props;

    let classNames = `oi oi-${name}`;

    if (size) classNames = `${classNames} oi-${size}`;

    if (rotate) classNames = `${classNames} oi-rotate-${rotate}`;

    if (flip) classNames = `${classNames} oi-flip-${flip}`;

    if (fixedWidth) classNames = `${classNames} oi-fw`;

    if (spin) classNames = `${classNames} oi-spin`;

    if (pulse) classNames = `${classNames} oi-pulse`;

    if (stack) classNames = `${classNames} oi-stack-${stack}`;

    if (inverse) classNames = `${classNames} oi-inverse`;

    if (className) classNames = `${classNames} ${className}`;

    return <Component {...props} className={classNames} />;
  }
}

// Validation.
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  rotate: PropTypes.oneOf(['45', '90', '135', '180', '225', '270', '315']),
  flip: PropTypes.oneOf(['horizontal', 'vertical']),
  fixedWidth: PropTypes.bool,
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  stack: PropTypes.oneOf(['1x', '2x']),
  inverse: PropTypes.bool,
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Icon.defaultProps = {
  Component: 'span',
};

// Export.
export default Icon;
