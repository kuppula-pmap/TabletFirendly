import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../components/Loader';
import BreadcrumbItems from './BreadcrumbItems';

import utils from '../../../../utils';

class Breadcrumbs extends React.Component {
  render() {
    const { shUi, shBreadcrumbs, shModuleMenu } = this.props;
    const browserWidth = shUi.browserInfo.width;
    const shBreadcrumbItems = shBreadcrumbs.items;
    const topBreadcrumbId = shBreadcrumbItems.length > 0 ? (shBreadcrumbItems[0].Id || 1) : 1;
    const preferneceBreadcrumbName = shBreadcrumbItems.length > 0 ? (shBreadcrumbItems[0].preferneceBreadcrumbName || '') : '';
    const moduleMenu = shModuleMenu.items;
    let breadcrumb = [];

    // Check for desktop width.
    if (browserWidth >= 768) {
      // Check if breadcrumbs and module menu have loaded.

      if (!shModuleMenu.isFetching) {
        // Check if there is at least a top breadcrumb item.
        if ( !isNaN(topBreadcrumbId) ) {
          // console.log('shBreadcrumbItems.length', shBreadcrumbItems.length);

          // Iterate through each breadcrumb item.
          for (let i = 0; i < shBreadcrumbItems.length; i++) {
            // console.log('count i:', i);
            // console.log(shBreadcrumbItems[i].Id);
            // Iterate through each module menu item.

            for (let j = 0; j < moduleMenu.length; j++) {
              // Match module menu item id with breadcrumb id.

              if (moduleMenu[j].Id === shBreadcrumbItems[i].Id) {
                // console.log('count j:', j);
                // console.log('moduleMenu:', j, moduleMenu[j]);
                // console.log(moduleMenu[j].Id, shBreadcrumbItems[i].Id, moduleMenu[j].Name);
                // Load <BreadcrumbItems /> with matching item data.

                breadcrumb.push(
                  <BreadcrumbItems
                    key={utils.unique()}
                    menuData={moduleMenu[j]}
                    breadcrumbApi={shBreadcrumbItems}
                  />
                );
              }
            }
          }
        } else if (topBreadcrumbId.match(/Preferences/g)) {
          // Otherwise, set preferences breadcrumbs.
          breadcrumb.push(
            <ol className="breadcrumb">
              <li key={utils.unique()}>Home</li>
              <li key={utils.unique()} className="active">{preferneceBreadcrumbName}</li>
            </ol>
          );
        }
      } else {
        // Show loader.
        breadcrumb = (
          <ol className="breadcrumb">
            <li key={utils.unique()}>
              <Loader size={14} padding="-2px 10px 0 0" theme="dark" inline />
              Loading
            </li>
          </ol>
        );
      }
    }

    const styles = {
      base: {
        position: 'fixed',
        top: 60,
        left: 60,
        width: '100%',
        zIndex: 10,
        padding: '0 20px',
        transition: 'all .5s ease',
      },
    };

    return (
      <div className="shell-breadcrumbs" style={styles.base}>
        {breadcrumb}
      </div>
    );
  }
}

// Validation.
Breadcrumbs.propTypes = {
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  shBreadcrumbs: React.PropTypes.object,
  shModuleMenu: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  shBreadcrumbs: state.shBreadcrumbs,
  shModuleMenu: state.shModuleMenu,
});

export default connect(mapStateToProps)(Breadcrumbs);
