/* Remastered version of TreeNode from https://github.com/alexcurtis/react-treebeard */

import React from 'react';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react';
import Icon from '../Icon';

import { styles } from './styles';

// Import default animations
import defaultAnimations from './animations';

class TreeNode extends React.Component {
    constructor(props) {
      super(props);
      // Initial state.
      this.state = {
        selected: this.props.selected
      };
      this.onToggle = this.onToggle.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.animations = this.animations.bind(this);
    }

    // Toggle to view chilren.
    onToggle() {
      const { onToggle, node } = this.props;
      // Pass the node to onToggle method from parent.
      if (onToggle) { onToggle(node); }
    }

    // Select to chose a node.
    onSelect() {
      const{ node, isPrimary, onSelection, primarySelected } = this.props;
      if (isPrimary) {
        if (primarySelected) {
          // If the id of the node from props does not match the currentSelected id.
          if (node.id !== primarySelected.id) {
            // Set the currentSelected to false, because setting selected to a node
            // creates a new currentSelected prop.
            if (primarySelected['0']) {
              primarySelected['0'].selected = false;
            }
            if (primarySelected.selected) {
              primarySelected.selected = false;
            }
          }
        }
        this.setState({ selected: node });
      }

      // Pass node to onSelection method from parent.
      onSelection(node);
    }

    // This is where you should decide to add the decorator toggle or native one
    renderToggle() {
      const anim = this.animations();
      let toggleStyle = {
        base: {
          position: 'relative',
          display: 'block',
          float: 'left',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '40%',
          left: '60%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0
        }
      };
      const height = toggleStyle.height;
      const width = toggleStyle.width;
      let midHeight = height * 0.5;
      let points = `0,0 0,${height} ${width},${midHeight}`;
      return (
        <VelocityComponent ref="velocity"
          duration={anim.toggle.duration}
          animation={anim.toggle.animation}>
          { this.props.decorators ? this.renderToggleDecorator() :
          <div style={toggleStyle.base} ref="clickable" onClick={this.onToggle} >
            <div style={toggleStyle.wrapper}>
              <svg height={height} width={width}>
                <polygon
                  points={points}
                  style={toggleStyle.arrow}
                />
              </svg>
            </div>
          </div>
        }
        </VelocityComponent>
      );
    }
    animations() {
      return {
        toggle: this.props.animations.toggle(this.props),
        drawer: this.props.animations.drawer(this.props)
      };
    }
    render() {
      return (
          <li style={styles.base} ref="topLevel">
              {this.renderHeader(this.animations())}
              {this.renderDrawer(this.animations())}
          </li>
      );
    }
    renderDrawer(drawerAnimation) {
      const animations = this.props.animations;
      const toggled = this.props.node.toggled;
      if (!animations && !toggled) { return null; }
      if (!animations && toggled) {
        return this.renderChildren(drawerAnimation);
      }
      return (
          <VelocityTransitionGroup {...animations.drawer} ref="velocity">
              {toggled ? this.renderChildren(drawerAnimation) : null}
          </VelocityTransitionGroup>
      );
    }
    renderHeader() {
      const { node, primarySelected, displayFolderNode } = this.props;
      const terminal = !this.props.node.children;
      let iconType = node.children ? 'folder-o' : 'file-text-o';
      switch (node.type) {
      case 'Location' || 'location':
        iconType = 'map-marker-o';
        break;
      case 'Level' || 'level':
        iconType = 'home-pin-o';
        break;
      default:
        iconType = '';
      }

      // If the node is selected, add an active class
      let nodeClass = node.selected ? 'tree-view-header active' : 'tree-view-header';
      // If the node is selected, add a bold style to fondWeight
      const selectedStyle = { fontWeight: node.selected ? 'bold' : 'normal' };

      let greyedOutStyle = {};
      // If primarySelected isn't empty
      if (typeof primarySelected !== 'undefined') {
        // and if this is a displayFolder node
        if (displayFolderNode) {
          // If the primary Selected id equals the node id
          if (primarySelected.id === node.id) {
            // Add the greyedOutStyle and update the class with text-muted
            greyedOutStyle = { pointerEvents: 'none' };
            nodeClass = 'tree-view-header text-muted';
          }
        }
      }
      // Create a new object with the gathered styles.
      const nodeStyle = Object.assign({}, selectedStyle, greyedOutStyle);
      // Node Header Styles
      let headerStyle = {
        base: {
          display: 'block',
          float: 'left',
          verticalAlign: 'top',
          width: 'calc(100% - 24px)',
          // color: 'inherit'
        },
        title: {
          fontWeight: 'normal',
          lineHeight: 1,
          verticalAlign: 'middle'
        }
      };
      return (
          <div className="clearfix" style={{ margin: '8px 0' }}>
            { !terminal && node.children.length > 0 ? this.renderToggle() : null }
              <div style={headerStyle.base}>
                <span style={headerStyle.title}>
                  {iconType ?
                    <Icon name={iconType} className="fa-fw fa-lg" style={{ margin: '0 4px' }} />
                  : null}

                  <span className={nodeClass}
                        style={nodeStyle}
                        ref="activeNode"
                        onClick={this.onSelect.bind(this)}>
                    {node.name}
                  </span>
                </span>
              </div>
          </div>
      );
    }
    renderChildren() {
      let childStyles = {
        listStyle: 'none',
        paddingLeft: '19px'
      };
      return (
        <ul style={childStyles} ref="subtree">
          {this.props.node.children.map((child) =>
            <TreeNode
              onSelection={this.props.onSelection}
              key={child.id}
              node={child}
              onToggle={this.props.onToggle}
              animations={this.props.animations || defaultAnimations}
              style={styles}
              selected={child.selected}
              isPrimary={this.props.isPrimary}
              decorators={this.props.decorators}
              primarySelected={this.props.primarySelected}
              displayFolderNode={this.props.displayFolderNode}
            />
          )}
        </ul>
      );
    }
}

TreeNode.propTypes = {
  node: React.PropTypes.object.isRequired,
  animations: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ]).isRequired,
  onSelection: React.PropTypes.func,
  onToggle: React.PropTypes.func,
  selected: React.PropTypes.bool,
  primarySelected: React.PropTypes.object,
  isPrimary: React.PropTypes.bool,
  decorators: React.PropTypes.object,
  displayFolderNode: React.PropTypes.bool,
  style: React.PropTypes.object
};

TreeNode.defaultProps = {
  selected: false,
  isPrimary: false,
  isDisplayFolders: false
};

export default TreeNode;
