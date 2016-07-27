// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
// import { Link } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
// import _ from 'lodash';
import { DropdownButton, MenuItem } from 'react-bootstrap';

// Shell Actions.
import {
  toggleLeftSidebar,
  setLeftSidebarDepth,
  changeFrameSource,
  setReloadIframe,
  setMenuClickCount,
} from '../../redux/actions/ui-actions';
import { fetchBreadcrumbs } from '../../redux/actions/breadcrumbs-actions';

// Global Actions.
import { setModuleId, setSelectedMenuItem } from '../../../../redux/actions/settings-actions';

import utils from '../../../../utils';
import { postAspSettings, clearAspGridSession } from '../../../../redux/actions/aspSettings-actions';
import { postAspLegacySession } from '../../../../redux/actions/aspLegacySession-actions';

import { history } from '../../../../redux/store';
import { setModalView, toggleModal, isDirty } from '../../../../redux/actions/ui-actions';
import { SH_MODAL_AUTO_ALERT } from '../../redux/constants/ui-constants';
import { shSetSelectedMenuItemForDirty } from '../../redux/actions/settings-actions';

// Define class.
class BreadcrumbItems extends React.Component {
  hancleClick(data) {
    const { dispatch, shUi } = this.props;

    let _isDirty = isDirty();
    if (!_isDirty) {
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
      dispatch(fetchBreadcrumbs(data.Id));
      // Update asp sessions.
      dispatch( postAspSettings() );
      dispatch( postAspLegacySession() );
    } else {
       // console.log('caurrent page is not dirty. isDirty:', isDirty);
      dispatch(shSetSelectedMenuItemForDirty(data));
      dispatch(setModalView(SH_MODAL_AUTO_ALERT));
      dispatch(toggleModal(true));
    }
  }

  // Render method.
  render() {
    const { menuData, breadcrumbApi, shFlatModuleMenu } = this.props;
    let listItems = [];
    let dropdown = [];
    // console.log(menuData);
    // console.log(breadcrumbApi);

    if (menuData.Children && breadcrumbApi[0].Name !== undefined && !shFlatModuleMenu.isFecthing) {
      // Iterate through each breadcrumb item.
      for (let i = 0; i < breadcrumbApi.length; i++) {
        const thisBreadcrumbItem = breadcrumbApi[i];
        // console.log('breadcrumb Item:', i, thisBreadcrumbItem, breadcrumbApi.length, breadcrumbApi[0].Name);
        // console.log('breadcrumb Item:', i, thisBreadcrumbItem, thisBreadcrumbItem.Name);

        // Check if first or last breadcrumb item.
        if (i === 0 || i === breadcrumbApi.length - 1) {
          // Set name as breadcrumb list item.
          listItems.push(
            <li key={utils.unique()} className={i === breadcrumbApi.length - 1 ? 'active' : ''}>
              {thisBreadcrumbItem.Name}
            </li>
          );
        } else {
          // console.log('breadcrumb Item:', i, thisBreadcrumbItem, thisBreadcrumbItem.Id);
          // console.log('menuData.Children:', menuData.Children);

          // Else, these are dropdown breadcrumb items.
          for (let j = 0; j < shFlatModuleMenu.items.length; j++) {
            const menuItem = shFlatModuleMenu.items[j];

            // Check if the parentId of each menu item matches the current breadcrumb id.
            if (menuItem.ParentId === thisBreadcrumbItem.Id) {
              // console.log(menuItem.ParentId, menuItem.Id, menuItem.Name, menuItem);

              let link;
              if (menuItem.IframeURL) {
                link = (
                  <a onClick={this.hancleClick.bind(this, menuItem)} id={`shell_breadcrumbs-items_link_select_menu-spa`}>
                    {menuItem.Name}
                  </a>
                );
              } else {
                link = (
                  menuItem.SpaRoute ?
                    <a onClick={this.hancleClick.bind(this, menuItem)} id={'shell_breadcrumbs-items_link_select-menu-spa'}>
                      {menuItem.Name}
                    </a>
                :
                  <MenuItem disabled>
                    <span className="text-muted">
                      {menuItem.Name}
                    </span>
                  </MenuItem>
                );
              }

              // Push each match into the dropdown array.
              dropdown.push(
                <li key={utils.unique()}>
                  {menuItem.Children ?
                    <MenuItem disabled>
                      <span className="text-muted">
                        {menuItem.Name}
                      </span>
                    </MenuItem>
                  : link }
                </li>
              );
            }
          }

          // Set breadcrumb section/list item (as dropdown).
          listItems.push(
            <li key={utils.unique()}>
              <DropdownButton title={thisBreadcrumbItem.Name} bsStyle="link" bsSize="lg" id={`shell_breadcrumbs-items_dropdown_toggle_${menuData.Id}`}>
                {dropdown}
              </DropdownButton>
            </li>
          );

          // Reset dropdown array before the next iteration.
          dropdown = [];
        }
      }
    } else {
      // Push each breadcrumb section/list item to the breadcrumb.
      listItems.push(
        <li key={utils.unique()} className="active">
          Home
        </li>
      );
    }

    return (
      <ol className="breadcrumb">
        {listItems}
      </ol>
    );
  }
}

// Validation.
BreadcrumbItems.propTypes = {
  menuData: React.PropTypes.object,
  breadcrumbApi: React.PropTypes.array,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  shBreadcrumbs: React.PropTypes.object,
  shFlatModuleMenu: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalSettings: state.globalSettings,
  shBreadcrumbs: state.shBreadcrumbs,
  shFlatModuleMenu: state.shFlatModuleMenu,
});

// Export.
export default connect(mapStateToProps)(BreadcrumbItems);
