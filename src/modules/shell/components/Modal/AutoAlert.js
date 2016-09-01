// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
// Global actions.
import { toggleModal, eraseDirty } from '../../../../redux/actions/ui-actions';
import { history } from '../../../../redux/store';
import {
  toggleLeftSidebar,
  setLeftSidebarDepth,
  changeFrameSource,
  setReloadIframe,
  setMenuClickCount
} from '../../redux/actions/ui-actions';
// Global Actions.
import { setModuleId, setSelectedMenuItem, setLocationId, setLevelId, setLocationLevelName } from '../../../../redux/actions/settings-actions';
import { postCurrentLocation } from '../../redux/actions/currentLocation-actions';

import { postAspSettings, clearAspGridSession } from '../../../../redux/actions/aspSettings-actions';
import { postAspLegacySession } from '../../../../redux/actions/aspLegacySession-actions';
import { fetchBreadcrumbs } from '../../redux/actions/breadcrumbs-actions';
import { fetchModuleMenu } from '../../redux/actions/moduleMenu-actions';
import { fetchFlatModuleMenu } from '../../redux/actions/flatModuleMenu-actions';
// Define class.
class AutoAlert extends React.Component {

  handleLeave(e) {
    e.preventDefault();
    const { dispatch, shSettings, shUi } = this.props;
    let data = shSettings.data;
    eraseDirty();
    dispatch(toggleModal(false));
    if (data.typeId) {
      // Set global location id.
      if (data.type === 'Location') {
        dispatch( setLocationId(data.typeId) );
        dispatch( setLevelId(0) );
      } else {
        dispatch( setLocationId(0) );
        dispatch( setLevelId(data.typeId) );
      }
      // Set Location/Level Name in globalSettings.locationLevelName
      dispatch( setLocationLevelName(data.name) );

      // Rerender module menu.
      // dispatch( setMenuRefreshCounter(shUi.refreshCounter + 1) );
      dispatch(fetchModuleMenu());
      dispatch(fetchFlatModuleMenu());
      // Set shell location id.
      dispatch( postCurrentLocation(data.type, data.typeId) );

      // // Close Navigator.
      // if (!shUi.isNavigatorPinned) {
      //   dispatch( toggleNavigator( false ) );
      //   // console.log('isNavigatorOpen', shUi.isNavigatorOpen);
      // }

      // Update asp sessions.
      dispatch( postAspSettings() );
      dispatch( postAspLegacySession() );

      // Set depth.
      dispatch(setLeftSidebarDepth(0));

      // Toggle left sidebar
      if (shUi.leftSidebarOpened) dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
    } else {
      if (data.IframeURL) {
        history.push('/menu?id=' + data.Id );
      } else if (data.SpaRoute) {
        history.push('/setupmenu?id=' + data.Id );
      }

      // Set depth.
      dispatch(setLeftSidebarDepth(0));
      // Set frame source.
      if (data.IframeURL) {
        dispatch(changeFrameSource(data.IframeURL));
        dispatch(setReloadIframe(true));
        // increasing the count of menu clicks.
        dispatch(setMenuClickCount(shUi.menuClickCount + 1));
      }
      dispatch(clearAspGridSession());
      // Toggle left sidebar
      if (shUi.leftSidebarOpened) dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));

      dispatch(setModuleId(data.ModuleId));
      dispatch(setSelectedMenuItem(data));
      dispatch(fetchBreadcrumbs(data.Id, data.Name));
      // Rerender module menu on Home menu item click.
      if (data.Id === 1) {
        dispatch(fetchModuleMenu());
        dispatch(fetchFlatModuleMenu());
      }
      // Update asp sessions.
      dispatch( postAspSettings() );
      dispatch( postAspLegacySession() );
      return false;
    }
  }

  handleStay() {
    const { dispatch } = this.props;
    dispatch(toggleModal(false));
  }

  // Render method.
  render() {
    const { globalUi, shModuleLabels } = this.props;
    const shModuleLabelsItems = shModuleLabels.items;
    const lblConfirm = shModuleLabelsItems ? shModuleLabelsItems.lblConfirm : null;
    const lblStay = shModuleLabelsItems ? shModuleLabelsItems.lblStay : null;
    const lblLeave = shModuleLabelsItems ? shModuleLabelsItems.lblLeave : null;
    const lblUnSavedChanges = shModuleLabelsItems ? shModuleLabelsItems.lblUnSavedChanges : null;
    return (
      <Modal show={globalUi.isModalOpen} onHide={this.handleStay.bind(this)}>

        <Modal.Header closeButton>
          <Modal.Title>{lblConfirm}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{lblUnSavedChanges}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="default" onClick={this.handleStay.bind(this)}>{lblStay}</Button>
          <Button bsStyle="success" onClick={this.handleLeave.bind(this)}>{lblLeave}</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

// propTypes.
AutoAlert.propTypes = {
  dispatch: React.PropTypes.func,
  globalUi: React.PropTypes.object,
  shSettings: React.PropTypes.object,
  shUi: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi,
  shSettings: state.shSettings,
  shUi: state.shUi,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(AutoAlert);
