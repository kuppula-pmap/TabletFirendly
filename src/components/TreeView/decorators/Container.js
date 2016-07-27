import React from 'react';
import radium from 'radium';
import {VelocityComponent} from 'velocity-react';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  renderToggle() {
    const animations = this.props.animations;
    if (!animations) { return this.renderToggleDecorator(); }
    return (
      <VelocityComponent ref="velocity"
        duration={animations.toggle.duration}
        animation={animations.toggle.animation} >
          { this.renderToggleDecorator() }
      </VelocityComponent>
    );
  }

  renderToggleDecorator() {
    const {style, decorators} = this.props;
    return (
      <decorators.Toggle style={style.toggle} />
    );
  }

  render() {
    const {style, decorators, terminal, node, onClick} = this.props;
    return (
      <div ref="clickable" className="clearfix" style={style.container} onClick={onClick}>
        { !terminal && node.children.length > 0 ? this.renderToggle() : null }
        <decorators.Header node={node} style={style.header} />
      </div>
    );
  }

}

Container.propTypes = {
  style: React.PropTypes.object.isRequired,
  decorators: React.PropTypes.object.isRequired,
  terminal: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  animations: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ]).isRequired,
  node: React.PropTypes.object.isRequired
};

export default radium(Container);
