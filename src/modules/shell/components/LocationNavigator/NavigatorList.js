import React from 'react';
import { connect } from 'react-redux';
import Icon from '../../../../components/Icon';

// Global actions.
import { setLocationId, setLevelId, setLocationLevelName } from '../../../../redux/actions/settings-actions';
import { postAspSettings } from '../../../../redux/actions/aspSettings-actions';
import { postAspLegacySession } from '../../../../redux/actions/aspLegacySession-actions';

// Shell actions.
import {
  // setMenuRefreshCounter,
  toggleLeftSidebar,
  setLeftSidebarDepth,
  toggleNavigator
} from '../../redux/actions/ui-actions';
import { fetchModuleMenu } from '../../redux/actions/moduleMenu-actions';
import { fetchFlatModuleMenu } from '../../redux/actions/flatModuleMenu-actions';
import { postCurrentLocation } from '../../redux/actions/currentLocation-actions';

import utils from '../../../../utils';
import { setModalView, toggleModal, isDirty } from '../../../../redux/actions/ui-actions';
import { SH_MODAL_AUTO_ALERT } from '../../redux/constants/ui-constants';
import { shSetSelectedMenuItemForDirty } from '../../redux/actions/settings-actions';

class NavigatorList extends React.Component {

  handleResultClick(node) {
    const { dispatch, shUi } = this.props;

    let _isDirty = isDirty();
    if (!_isDirty) {
      // Set global location id.
      if (node.type === 'Location') {
        dispatch( setLocationId(node.typeId) );
        dispatch( setLevelId(0) );
      } else {
        dispatch( setLocationId(0) );
        dispatch( setLevelId(node.typeId) );
      }
      // Set Location/Level Name in globalSettings.locationLevelName
      dispatch( setLocationLevelName(node.name) );

      // Rerender module menu.
      // dispatch( setMenuRefreshCounter(shUi.refreshCounter + 1) );
      dispatch(fetchModuleMenu());
      dispatch(fetchFlatModuleMenu());
      // Set shell location id.
      dispatch( postCurrentLocation(node.type, node.typeId) );

      // Close Navigator.
      if (!shUi.isNavigatorPinned) {
        dispatch( toggleNavigator( !shUi.isNavigatorOpen ) );
        // console.log('isNavigatorOpen', shUi.isNavigatorOpen);
      }

      // Update asp sessions.
      dispatch( postAspSettings() );
      dispatch( postAspLegacySession() );

      // Set depth.
      dispatch(setLeftSidebarDepth(0));

      // Toggle left sidebar
      if (shUi.leftSidebarOpened) dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
    } else {
       // console.log('caurrent page is not dirty. isDirty:', isDirty);
      let data = node;
      dispatch(shSetSelectedMenuItemForDirty(data));
      dispatch(setModalView(SH_MODAL_AUTO_ALERT));
      dispatch(toggleModal(true));
    }
  }

  checkLocationType(type, id, matchType, matchId) {
    if (type === matchType && id === matchId ) {
      return true;
    }
    return false;
  }

  render() {
    const { styles, FilteredResults, globalSettings } = this.props;

    return (
      <ul className="nav navigator-results-list" style={styles.resultsList}>
        {FilteredResults.map( (result) => (
          <li key={utils.unique()}
              className={`navigator-results-list-item${
                this.checkLocationType(result.type, result.typeId, 'Location', globalSettings.locationId) ||
                this.checkLocationType(result.type, result.typeId, 'Level', globalSettings.levelId)
                ? ' active' : ''
              }`}
              style={styles.resultsListItem}
              onClick={this.handleResultClick.bind(this, result)}
              id={`shell_navigator-list_list-item_location-select_${result.typeId}`}>
            <h1>
              <Icon name={`${ result.type === 'Level' ? 'home-pin-o' : 'map-marker-o' }`} fixedWidth />
              {' '}
              {result.name}
            </h1>
            {
              // console.log(result.hierarchy)
            }
            {result.hierarchy ?
              <small>
                {result.hierarchy.replace(/,/g, ' / ')}
              </small>
            : null }
          </li>
        ))}
      </ul>
    );
  }
}

NavigatorList.propTypes = {
  handleResultClick: React.PropTypes.func,
  FilteredResults: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  styles: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalSettings: state.globalSettings,
});

// Export.
export default connect(mapStateToProps)(NavigatorList);
