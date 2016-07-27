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
class DetailFormTreeView extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
    const { displayFolders, departments, data, primaryFolder } = this.props;
    // DetailData is initially an empty array.
    let detailData = _.cloneDeep(data);
    // If displayFolders exist.
    if (displayFolders) {
      detailData = utils.assignNodesToTree(detailData, displayFolders);
    }
    // If departments exist.
    if (departments) {
      // Assign the departments to the data.
      detailData = utils.assignNodesToTree(detailData, departments);
    }
    // Set the current data state to a deep-nested clone.
    // Set state of the current selected Primary Folder.
    this.state = {
      data: detailData,
      primarySelected: primaryFolder
    };
  }

  // Toggle the node
  onToggle(node) {
    node.toggled = !node.toggled;
    this.props.onTreeViewClick(node);
  }

  // Recieves node and toggled boolean from child.
  onSelection(node) {
    // node toggled is set to the opposite of what it currenty is.
    node.selected = !node.selected;
    // Pass this node to parent onClick handler.
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
    const { shModuleLabels, decorators, departments, displayFolders } = this.props;

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

    // Set treeData to the data in state.
    let treeData = this.state.data;

    // If treeData is not an Array
    if (!Array.isArray(treeData)) { treeData = [ treeData ];}
    const listItems = treeData.map((node, index) => {
      // NOTE: If node.id = '00000000-0000-0000-0000-000000000000' then node is root for displayFolders
      // NOTE: If node.id = 0 then node is root for departments
      if (node.id === '00000000-0000-0000-0000-000000000000' || node.id === 0) {
        // Toggle Root if departments is not undefined and has selections.
        if ( typeof departments !== 'undefined' && departments.length ) {
          // Toggle.
          node.toggled = true;
        }
        // Toggle Root if displayFolders is not undefined and has selections.
        if ( typeof displayFolders !== 'undefined' && displayFolders.length ) {
          node.toggled = true;
        }
        // The root should not be selectable.
        if (node.selected) {
          node.selected = !node.selected;
        }
      }

      // Return the list item as a TreeNode
      return (
      <TreeNode
          key={node.id || index}
          node={node}
          style={styles}
          displayFolderNode={typeof displayFolders !== 'undefined'}
          primarySelected={this.props.primaryFolder}
          onToggle={this.onToggle.bind(this)}
          onSelection={this.onSelection.bind(this)}
          animations={this.props.animations || defaultAnimations}
          decorators={decorators}
          selected={node.selected}
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
        {/* Render the Tree Data into a list of tree Nodes */}
        <ul style={ listStyles } >
        { listItems }
        </ul>

      </div>
    );
  }
}

// PropTypes.
DetailFormTreeView.propTypes = {
  data: React.PropTypes.object.isRequired,
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
  decorators: React.PropTypes.object,
  isPrimaryView: React.PropTypes.bool,
  isDisplayFolder: React.PropTypes.bool
};

const mapStateToProps = (state) => ({
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(DetailFormTreeView);
