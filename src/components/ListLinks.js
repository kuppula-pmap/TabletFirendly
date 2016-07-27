// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

// Shell Actions.
import {
  toggleLeftSidebar,
  setLeftSidebarDepth,
  changeFrameSource,
  setReloadIframe,
} from '../modules/shell/redux/actions/ui-actions';
import { fetchBreadcrumbs } from '../modules/shell/redux/actions/breadcrumbs-actions';

// Global Actions.
import { setModuleId, setSelectedMenuItem } from '../redux/actions/settings-actions';
import { postAspSettings } from '../redux/actions/aspSettings-actions';
import { postAspLegacySession } from '../redux/actions/aspLegacySession-actions';


// Utility methods.
import utils from '../utils';


// Define class.
class ListLinks extends React.Component {

  handleLinkClick(data) {
    // e.preventDefault();
    // console.log('NavLink data:', data);

    const { dispatch, shUi } = this.props;

    // Set depth.
    dispatch( setLeftSidebarDepth(0) );

    // Set frame source.
    if (data.IframeURL) {
      // Set frame source.
      dispatch( changeFrameSource(data.IframeURL) );
      dispatch(setReloadIframe(true));

      // Set module id.
      dispatch( setModuleId(data.ModuleId) );
    }

    // Toggle left sidebar
    if (shUi.leftSidebarOpened) dispatch( toggleLeftSidebar(shUi.leftSidebarOpened) );

    // Assign as selected menu item.
    dispatch( setSelectedMenuItem(data) );

    // Call breadcrumbs api.
    dispatch( fetchBreadcrumbs(data.Id) );

    // Update asp sessions.
    dispatch( postAspSettings() );
    dispatch( postAspLegacySession() );
  }

  // Render method.
  render() {
    const { data, parentMatch } = this.props;

    const styles = {
      item: {
        wordWrap: 'break-word',
      },
    };

    const list = data.map( item => {
      if (!item.isDisabled || parentMatch) {
        return (
          <li key={utils.unique()} style={styles.item}>
            <Link to={item.SpaRoute} onClick={this.handleLinkClick.bind(this, item)}>
              <span className={item.isDisabled ? 'text-muted' : ''}>
                {item.Name}
              </span>
            </Link>
          </li>
        );
      }
    });

    return (
      <ul className="nav">
        {list}
      </ul>
    );
  }
}

// Validation.
ListLinks.propTypes = {
  data: React.PropTypes.array,
  parentMatch: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
});

// Export.
export default connect(mapStateToProps)(ListLinks);
