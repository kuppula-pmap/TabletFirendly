// Dependencies.
import React from 'react';
import { Treebeard } from 'react-treebeard';
import NodeViewer from './NodeViewer';

import defaultDecorators from './decorators';
import * as filters from './filters';
import { styles } from './styles';

import { Input } from 'react-bootstrap';
import Icon from '../Icon';


// Define class.
class TreeView extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      data: props.data
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    const { noSelection } = this.props;

    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.toggled = toggled;
    this.setState({ cursor: node });

    if (!noSelection) {
      node.selected = !node.selected;
      node.active = node.selected;
    }

    this.props.onTreeViewClick(node);
  }

  filterOnKeyUp(e) {
    const filter = e.target.value;
    // console.log(filter);
    const data = this.props.data;
    if (!filter) { return this.setState({data}); }
    let filtered = filters.filterTree(data, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.setState({data: filtered});
  }

  // Render method.
  render() {
    const { decorators, animations } = this.props;

    const iconStyle = {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    };

    return (
      <div>

        {this.props.filter ?
          <div style={{ padding: '8px 6px 0' }}>
            <Input type="search" addonBefore={(<Icon name="search-o" style={iconStyle} />)}
                   bsSize="small"
                   placeholder="Filter the tree below..."
                   onKeyUp={this.filterOnKeyUp.bind(this)} />
          </div>
        : null }

        {animations ?
          <Treebeard data={this.state.data} style={styles} decorators={decorators} animations={animations} onToggle={this.onToggle} />
        :
          <Treebeard data={this.state.data} style={styles} decorators={decorators} onToggle={this.onToggle} />
        }

        { this.props.showNode ?
          <div style={styles.component}>
            <NodeViewer node={this.state.cursor}/>
          </div>
        : null }

      </div>
    );
  }
}

// PropTypes.
TreeView.propTypes = {
  data: React.PropTypes.object.isRequired,
  decorators: React.PropTypes.object,
  animations: React.PropTypes.object,
  onTreeViewClick: React.PropTypes.func,
  filter: React.PropTypes.bool,
  noSelection: React.PropTypes.bool,
  showNode: React.PropTypes.bool,
  editMode: React.PropTypes.bool
};
TreeView.defaultProps = {
  decorators: defaultDecorators,
};

// Export.
export default TreeView;
