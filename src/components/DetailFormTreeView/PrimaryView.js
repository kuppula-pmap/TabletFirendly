// Dependencies.
import React from 'react';
import {connect} from 'react-redux';

import TreeNode from './TreeNode';

import defaultAnimations from './animations';
import * as filters from './filters';
import { styles } from './styles';

import { Input } from 'react-bootstrap';
import Icon from '../Icon';

import _ from 'lodash';

import utils from '../../utils';

// Define class.
class PrimaryView extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Import props.
    const { data, primaryFolder } = this.props;

    // Set the current data state to a deep-nested clone
    let detailData = _.cloneDeep(data);
    let primary = {};

    // Assign primaryFolder to the detailData tree.
    // NOTE: assignNodesToTree takes as arguements an object tree, and an array of nodes.
    detailData = utils.assignNodesToTree(detailData, [primaryFolder]);

    primary = this.findInitialPrimary(detailData, primaryFolder.id);
    // Initial State.
    this.state = {
      data: detailData,
      primarySelected: primary
    };
  }

  // Toggle a node, to expose it's children.
  onToggle(node) {
    node.toggled = !node.toggled;
  }

  // Select a node.
  onSelection(node) {
    // Import props.
    const { isPrimaryView } = this.props;
    // If primaryFolder exists.
    if (isPrimaryView) {
      // If the node is selected, then this click is to deselect.
      if (node.selected) {
        // Clear current selected.
        this.setState({
          primarySelected: {}
        });
        // Set the selection to false.
        node.selected = !node.selected;
      // Otherwise this is a non selected node
      } else {
        // Set the selection to true.
        node.selected = !node.selected;
        // Set the current selected state to the node in the arguement
        this.setState({
          primarySelected: node
        });
      }
    }
    // Pass this node to parent onClick handler.
    this.props.onTreeViewClick(node);
  }

  // find the primaryfolder based on a id.
  findInitialPrimary(folderData, id) {
    let primary = {};
    // Check children first.
    if (folderData.children) {
      // Filter through the children and return the one that has a matching id.
      primary = folderData.children.filter(child => child.id === id)[0];
    }
    // If primary folder is undefined
    if (typeof primary === 'undefined') {
      // Check the parent.
      if (folderData.id === id) {
        // Set the primary equal to the parent
        primary = folderData;
      }
    }
    // Return the primary folder.
    return primary;
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
    const { shModuleLabels } = this.props;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblFilterTreeBelow = shModuleLabelsItems ? shModuleLabelsItems.lblFilterTreeBelow : null;

    const iconStyle = {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    };

    const listStyles = {
      listStyle: 'none',
      paddingLeft: 19
    };

    // treeData is the current state of DataSelect
    let treeData = this.state.data;
    // console.log('primary folder is : ', this.state.primarySelected);
    if (!Array.isArray(treeData)) { treeData = [ treeData ];}
    const listItems = treeData.map((node, index) => {
      // If the node is Root and it has selected children
      if (node.id === '00000000-0000-0000-0000-000000000000') {
        if (node.selected) {
          node.selected = !node.selected;
        }
      }
      return (
        <TreeNode
            key={node.id || index}
            node={node}
            style={styles}
            onToggle={this.onToggle.bind(this)}
            onSelection={this.onSelection.bind(this)}
            animations={defaultAnimations}
            selected={this.state.primarySelected === node.id}
            primarySelected={this.state.primarySelected}
            isPrimary
          />
      );
    });

    return (
      <div>

        {this.props.filter ?
          <div style={{ padding: '8px 6px 0' }}>
            <Input type="search" addonBefore={(<Icon name="search-o" style={iconStyle} />)}
                   bsSize="small"
                   placeholder={lblFilterTreeBelow}
                   onKeyUp={this.filterOnKeyUp.bind(this)} />
          </div>
        : null }

        <ul style={ listStyles } >
          {listItems}
        </ul>

      </div>
    );
  }
}

// PropTypes.
PrimaryView.propTypes = {
  data: React.PropTypes.object.isRequired,
  decorators: React.PropTypes.object,
  animations: React.PropTypes.object,
  onTreeViewClick: React.PropTypes.func,
  filter: React.PropTypes.bool,
  onSelection: React.PropTypes.bool,
  showNode: React.PropTypes.bool,
  editMode: React.PropTypes.bool,
  flipNodes: React.PropTypes.bool,
  shModuleLabels: React.PropTypes.object,
  primaryFolder: React.PropTypes.object,
  displayFolders: React.PropTypes.array,
  departments: React.PropTypes.array,
  isPrimaryView: React.PropTypes.bool
};

const mapStateToProps = (state) => ({
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(PrimaryView);
