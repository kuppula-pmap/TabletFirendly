import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Loader from '../../../../components/Loader';
import {Badge} from 'react-bootstrap';
import Icon from '../../../../components/Icon';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

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
import { postAspSettings, clearAspGridSession } from '../../../../redux/actions/aspSettings-actions';
import { postAspLegacySession } from '../../../../redux/actions/aspLegacySession-actions';
import { fetchModuleMenu } from '../../redux/actions/moduleMenu-actions';
import { fetchFlatModuleMenu } from '../../redux/actions/flatModuleMenu-actions';
import { history } from '../../../../redux/store';
import { setModalView, toggleModal, isDirty } from '../../../../redux/actions/ui-actions';
import { SH_MODAL_AUTO_ALERT } from '../../redux/constants/ui-constants';
import { shSetSelectedMenuItemForDirty } from '../../redux/actions/settings-actions';

// Define class.
class NavLink extends React.Component {

  preventDefault(e) {
    e.preventDefault();
  }

  handleChangeDepthClick(e) {
    e.preventDefault();
    const { dispatch, changeDepthOnClick, depthDirection, data } = this.props;
    // dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
    dispatch(setLeftSidebarDepth(0));
    changeDepthOnClick(depthDirection, data);
  }

  handleSpaClick() {
    const { dispatch, shUi, data } = this.props;
    let _isDirty = isDirty();
    // console.log('isCurrentPageDirty:' + isDirty);
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
        // Set frame source.
        dispatch(changeFrameSource(data.IframeURL));
        dispatch(setReloadIframe(true));

        // Set module id.
        dispatch(setModuleId(data.ModuleId));

        // increasing the count of menu clicks.
        dispatch(setMenuClickCount(shUi.menuClickCount + 1));
      }
      dispatch(clearAspGridSession());
      // Toggle left sidebar
      if (shUi.leftSidebarOpened) dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));

      // Assign as selected menu item.
      dispatch(setSelectedMenuItem(data));

      // Call breadcrumbs api.
      dispatch(fetchBreadcrumbs(data.Id, data.Name));

      // Rerender module menu on Home menu item click.
      if (data.Id === 1) {
        dispatch(fetchModuleMenu());
        dispatch(fetchFlatModuleMenu());
      }

      // Update asp sessions.
      dispatch(postAspSettings());
      dispatch(postAspLegacySession());
    } else {
      // console.log('caurrent page is not dirty. isDirty:', isDirty);
      dispatch(shSetSelectedMenuItemForDirty(data));
      dispatch(setModalView(SH_MODAL_AUTO_ALERT));
      dispatch(toggleModal(true));
    }
  }

  // Render method.
  render() {
    const {
      shUi,
      data,
      depthDirection,
      loader,
      href,
      shBreadcrumbs,
      shModuleLabels
    } = this.props;

    // Data key mapping.
    const id = data.Id;
    const name = data.Name || '';
    const icon = data.Icon || '';
    const url = data.URL || '#';
    const SpaRoute = data.SpaRoute;
    const alert = data.Alert || 0;
    const children = data.Children || [];
    const isParent = children.length;

    // console.log('leftSidebarDepth', leftSidebarDepth);
    const breadcrumbId = (shBreadcrumbs.items && shBreadcrumbs.items.length > 0) ? shBreadcrumbs.items[0].Id : 0;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblLoading = shModuleLabelsItems ? shModuleLabelsItems.lblLoading : null;

    let styles = {
      link: {
        position: 'relative',
        padding: data.Icon ? '20px 15px' : '12px 15px',
      },

      icon: {
        position: 'absolute',
        top: '50%',
        left: 14,
        fontSize: 24,
        transform: 'translateY(-50%)',
        transition: 'all .5s ease',
      },

      label: {
        display: 'block',
        paddingLeft: data.Icon || loader || href ? 46 : 0,
        transition: 'all .5s ease',
      },

      badgeAlert: {
        position: 'relative',
        width: 10,
        minWidth: 10,
        height: 10,
        overflow: 'hidden',
        padding: 0,
        margin: '-2px 0 0 18px',
        float: 'left',
        border: '1px solid #FFFFFF',
        zIndex: 1,
        transition: 'all .5s ease',
      },

      iconRight: {
        position: 'absolute',
        top: data.Icon ? 2 : -6,
        right: 0,
        fontSize: 12,
        padding: '22px 16px',
        // zIndex: -1,
        cursor: 'pointer',
        transition: 'all .5s ease',
      },
    };

    const tooltip = <Tooltip id={`module_menu_${id}_${name}`}>{name}</Tooltip>;

    // Set icon.
    let listItemIcon = '';
    if (icon) {
      if (shUi.browserInfo.width > 768 && shUi.leftSidebarDepth === 0 && !shUi.leftSidebarOpened) {
        listItemIcon = (
          <OverlayTrigger placement="right" overlay={tooltip}>
            <Icon name={icon} fixedWidth style={styles.icon} />
          </OverlayTrigger>
        );
      } else {
        listItemIcon = <Icon name={icon} fixedWidth style={styles.icon} />;
      }
    }

    // Set alert badge.
    let listItemAlert = '';
    if (alert) {
      listItemAlert = (
        <Badge className="icon-badge danger" style={styles.badgeAlert}>{' '}</Badge>
      );
    }

    // Combine icon, alert, and name/label.
    const listItemContents = (
      <span>
        {listItemIcon}
        {listItemAlert}
        <span style={styles.label}>
          {name}
        </span>
      </span>
    );

    // Set nav arrow right icon.
    let navIcon = '';
    if (isParent) {
      navIcon = (
        <Icon name="arrow-right-o" className="icon-toggle" style={styles.iconRight}/>
      );
    }

    let link = <span/>;

    // Show loader.
    if (loader) {
      link = (
        <Link to="#" onClick={this.preventDefault.bind(this)} style={styles.link}>
          <span style={styles.icon}>
            <Loader size={34} padding="20px 0 0" />
          </span>
          <span style={styles.label}>
            {lblLoading}
          </span>
        </Link>
      );

    // Hard link (<a href="" />).
    } else if (href) {
      link = (
        <a href={url} style={styles.link} id={`shell_nav-link_anchor_${id}`}>
          {listItemContents}
          {navIcon}
        </a>
      );

    // Parent or folder link.
    } else if (isParent || depthDirection === 'up') {
      link = (
        <Link
          to={url}
          className={id === breadcrumbId ? 'active' : ''}
          onClick={this.handleChangeDepthClick.bind(this)}
          style={styles.link}
          id={`shell_nav-link_link_change-depth_${id}`}
        >
          {listItemContents}
          {navIcon}
        </Link>
      );

    // SPA app route link.
    } else if (SpaRoute) {
      link = (
        <a className={id === breadcrumbId ? 'active' : ''} onClick={this.handleSpaClick.bind(this)}
          style={styles.link}
          id={`shell_nav-link_link_spa-toggle_${id}`}>
          {listItemContents}
          {navIcon}
        </a>
      );
    }

    return link;
  }
}

// Validation.
NavLink.propTypes = {
  data: React.PropTypes.object,
  changeDepthOnClick: React.PropTypes.func,
  depthDirection: React.PropTypes.string,
  loader: React.PropTypes.bool,
  href: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  shBreadcrumbs: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};
NavLink.defaultProps = {
  data: {},
  loader: false,
  href: false,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  globalSettings: state.globalSettings,
  shBreadcrumbs: state.shBreadcrumbs,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(NavLink);
