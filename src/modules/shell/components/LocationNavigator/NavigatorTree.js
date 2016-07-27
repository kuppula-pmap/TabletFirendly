import React from 'react';
import { connect } from 'react-redux';

import Loader from '../../../../components/Loader';
import TreeView from '../../../../components/TreeView/TreeView';
import decorators from './TreeViewDecorators';
import animations from './TreeViewDecorators/animations';
import Select from 'react-select';

// Global actions.
import { setTopLevelId } from '../../../../redux/actions/settings-actions';

// Shell actions.
import { fetchRecentLocationsList } from '../../redux/actions/recentLocationsList-actions';
import { fetchLocationsList } from '../../redux/actions/locationsList-actions';
import { fetchLocationsTree } from '../../redux/actions/locationsTree-actions';


class NavigatorTree extends React.Component {
  onTreeViewClick() {}

  handleSelectChange(value) {
    const { dispatch } = this.props;
    const topLevelId = value;
    dispatch(setTopLevelId(topLevelId));
    dispatch(fetchRecentLocationsList());
    dispatch(fetchLocationsList());
    dispatch(fetchLocationsTree());
  }

  checkLocationType(type, id, matchType, matchId) {
    if (type === matchType && id === matchId ) {
      return true;
    }
    return false;
  }

  updateLocationtreeStatus(treeViewData, nextProps) {
    const { globalSettings } = nextProps;

    if (treeViewData.children) {
      for (let i = 0; i < treeViewData.children.length; i++) {
        this.updateLocationtreeStatus(treeViewData.children[i], nextProps);
      }
    } else {
      treeViewData.selected = this.checkLocationType(treeViewData.type, treeViewData.typeId, 'Location', globalSettings.locationId) ||
      this.checkLocationType(treeViewData.type, treeViewData.typeId, 'Level', globalSettings.levelId);
    }
  }

  render() {
    const { styles, shLocationsTree, shLocationsTreeTopLevels, globalSettings } = this.props;
    // this.updateLocationtreeStatus(shLocationsTree.items[0], this.props);
    const treeData = shLocationsTree.items[0] || {};

    const options = shLocationsTreeTopLevels.items.map( (item) => ({
      value: item.Id,
      label: item.Name
    }));
    return (
      <div className="navigator-treeview" style={styles.treeview}>
        <div style={styles.select}>
          <Select
            options={options}
            clearable={false}
            value={globalSettings.topLevelId}
            onChange={this.handleSelectChange.bind(this)}
            id={`shell_navigator-tree_dropdown_select-top-level-Id`}
          />
        </div>
        {shLocationsTree.isFetching ?
          <Loader />
        :
          <TreeView
            data={treeData}
            noSelection
            decorators={decorators}
            animations={animations}
            filter
            onTreeViewClick={this.onTreeViewClick.bind(this)}
          />
        }
      </div>
    );
  }
}

NavigatorTree.propTypes = {
  styles: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  state: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  shLocationsTree: React.PropTypes.object,
  shLocationsTreeTopLevels: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalSettings: state.globalSettings,
  shLocationsTree: state.shLocationsTree,
  shLocationsTreeTopLevels: state.shLocationsTreeTopLevels,
});

// Export.
export default connect(mapStateToProps)(NavigatorTree);
