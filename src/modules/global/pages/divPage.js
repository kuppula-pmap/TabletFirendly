// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../../redux/store';

// Layout components.
import Main from '../../../layouts/main';

// Misc components.
// import Iframe from '../../../components/Iframe';
import Loader from '../../../components/Loader';

// Global actions.
import { setNotificationUrl } from '../../../redux/actions/settings-actions';

// Shell actions.
import { setReloadIframe } from '../../../modules/shell/redux/actions/ui-actions';
import { fetchBreadcrumbs } from '../../../modules/shell/redux/actions/breadcrumbs-actions';

// Utility methods.
// import utils from '../../../utils';

class divPage extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      url: '',
      isLoading: true,
      isIframeLoaded: 0,
    };
  }

    componentWillMount() {
      const { dispatch, shFlatModuleMenu, shCustomSettings } = this.props;
      const { query } = this.props.location;

      let queryId = null;
      // console.log('queryId', queryId);

      // Set id to dispatch to breadcrumbs to be either menuItem.Id or query.id.
      if (!shFlatModuleMenu.isFetching && !shCustomSettings.isFetching) {
        queryId = query.id;
        // console.log(queryId, queryId !== undefined);
        // Check that id to dispatch to breadcrumbs is a Number.
        if (!isNaN(queryId)) {
          // console.log('DISPATCH:', queryId);
          dispatch( fetchBreadcrumbs(queryId) );
        } else {
          // Otherwise, check that id to dispatch to breadcrumbs is not undefined.
          if (queryId !== undefined) {
            // console.log('DISPATCH: 0');
            dispatch( fetchBreadcrumbs('Preferences') );
          }
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      const { dispatch, shUi, shFlatModuleMenu, shCustomSettings, globalSettings } = nextProps;
      const { frameUrl, reloadIframe } = shUi;

      const landingpageURL = shCustomSettings.items ? shCustomSettings.items.LandingpageURL : null;
      const selectedMenuItem = globalSettings.selectedMenuItem;
      const notificationUrl = globalSettings.notificationUrl;

      let { url } = this.state;
      this.setState({ isLoading: true });

      const queryId = nextProps.location.query.id;

      // Reload view if user clicks on menu item in the left nav that is already loaded in the iframe.
      const { query } = this.props.location;
      const oldQueryId = query.id;
      let { isIframeLoaded } = this.state;

      // console.log('======================================');
      // console.log('oldQueryId', oldQueryId);
      // console.log('queryId', queryId);
      // console.log('isIframeLoaded', isIframeLoaded);
      // console.log('reloadIframe', reloadIframe);
      // console.log(queryId !== undefined && queryId === oldQueryId && isIframeLoaded);
      // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

      // Check if previous id querystring matches the most recent.
      if (queryId !== undefined && queryId === oldQueryId && isIframeLoaded && reloadIframe) {
        // console.log('isIframeLoaded:', isIframeLoaded);

        // Reload the iframe source without full page reload/refresh.
        const iframe = document.getElementById('iframeComponent');
        if (iframe) {
          const menuClickCount = shUi.menuClickCount;
          const menuClickCountPrevious = this.props.shUi.menuClickCount;
          // console.log('menuClickCount:', menuClickCount);
          // console.log('menuClickCountPrevious:', menuClickCountPrevious);
          // shUi.menuClickCount value is updating, only when the breadcrumb is clicked or left side menuitem(last child item) is clicked
          if (menuClickCount > menuClickCountPrevious) {
            iframe.src = iframe.src;
          }
        }
        dispatch(setReloadIframe(false));
      }

      this.setState({ isIframeLoaded: isIframeLoaded + 1 });


      // console.log('Iframe componentWillReceiveProps - moduleId', moduleId);
      // console.log('frameUrl', frameUrl);
      // console.log(shFlatModuleMenu.isFetching, shCustomSettings.isFetching, isLoading);
      // console.log(!shFlatModuleMenu.isFetching && !shCustomSettings.isFetching && isLoading);

      // Make sure flat and nested module menus are loaded.
      if (!shFlatModuleMenu.isFetching && !shCustomSettings.isFetching) {
        // console.log('url:', url.length, url);

        // Check for notificationUrl for post login page redirect.
        if (notificationUrl) {
          // Set url to login redirect value.
          url = notificationUrl;

          // console.log('notificationUrl', url);

          // Reset/clear notificationUrl.
          dispatch( setNotificationUrl(null) );
        } else if (frameUrl.length) {
          // Set url to login redirect value.
          url = frameUrl;

          // console.log('shUi.frameUrl', url);
        } else if (queryId) {
          // console.log('queryId:', queryId);
          // console.log('selectedMenuItem:', selectedMenuItem);

          if (selectedMenuItem) {
            url = selectedMenuItem.IframeURL;
            dispatch( fetchBreadcrumbs(selectedMenuItem.Id) );
          } else {
            // alert('404!');
            history.pushState(null, '/404');
          }
        } else if (landingpageURL) {
          url = landingpageURL;
        }

        // console.log('Turn loader off...');
        this.setState({ isLoading: false });
      }

      // console.log(url);
      // this.querystringUrl(globalSettings, url);

      // Check whether the current page should display in Level selection or not.
      if ( globalSettings.selectedMenuItem.IsLevelDisplay === false && globalSettings.locationId === 0 ) {
        this.setState({ url: '/LocationSelectorMessage.html' });
      } else {
        this.setState({ url: this.querystringUrl(globalSettings, url) });
      }
    }

    querystringUrl(globalSettings, url) {
      // console.log('PRE', url);

      const locationId = globalSettings.locationId;
      const levelId = globalSettings.levelId;
      const moduleId = globalSettings.moduleId;
      // console.log('Iframe - moduleId', moduleId);

      const hasQuestionMark = (url || '').match(/[?]/g);
      const endsWithQuestionMark = (url || '').match(/[?]$/g);
      let questionMark = '?';
      if (hasQuestionMark && endsWithQuestionMark) {
        questionMark = '';
      } else if (hasQuestionMark && !endsWithQuestionMark) {
        questionMark = '&';
      }

      let locationLevelLabelNet;
      let locationLevelLabelAsp;
      let locationLevelValue;
      if ( locationId > 0 ) {
        locationLevelLabelNet = 'LocationId';
        locationLevelLabelAsp = 'Location_Id';
        locationLevelValue = locationId;
      } else {
        locationLevelLabelNet = 'LevelId';
        locationLevelLabelAsp = 'Level_Id';
        locationLevelValue = levelId;
      }

      let appendedQuerystring = '';
      if (globalSettings.selectedMenuItem.IsNavigatorDisplay) {
        appendedQuerystring = `&${locationLevelLabelNet}=${locationLevelValue}&${locationLevelLabelAsp}=${locationLevelValue}`;
      }

      url = `${globalSettings.urlPrefix}/${url}${questionMark}ModuleId=${moduleId}&Module_Id=${moduleId}${appendedQuerystring}`;
      // console.log(hasQuestionMark, endsWithQuestionMark, questionMark);
      // console.log(url);

      // Check for and global prefix in the url.
      const urlPrefixRegex = new RegExp( globalSettings.urlPrefix, 'g' );
      // console.log('urlPrefixRegex length', url.match(urlPrefixRegex).length);
      if ( url.match(urlPrefixRegex).length ) {
        // Remove global prefix to avoid duplication.
        url = url.replace(urlPrefixRegex, '');
        url = `${globalSettings.urlPrefix}/${url}`;
      }
      // console.log('url', url);

      url = url.replace(/\/\/+/g, '/');
      url = url.replace(/http:\/+/g, 'http://');

      // console.log('POST', url);

      return url;
    }

    // Render method.
    render() {
      const { isLoading, url } = this.state;
      const { shUi, globalSettings } = this.props;
      const styles = {
        iframe: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: shUi.isNavigatorPinned && globalSettings.selectedMenuItem.IsNavigatorDisplay ? 'calc(100% - 274px)' : '100%',
          height: shUi.browserInfo.height - 100,
          border: 0,
          transition: 'all .5s ease',
        }
      };

      // console.log('isLoading', isLoading);
      // console.log('IFRAME state.url', url);

      return (
        <Main>
          {isLoading ?
            <Loader theme="dark" />
          :
            <div id="divDivPageXXX">
              <object id="objDivPageXXX" type="text/html" data={url} scrolling="yes" className="iframeWrapper home" style={styles.iframe}></object>
            </div>
          }
        </Main>
      );
    }
  }

  // propTypes.
divPage.propTypes = {
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  shFlatModuleMenu: React.PropTypes.object,
  shCustomSettings: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  globalUi: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  shFlatModuleMenu: state.shFlatModuleMenu,
  shCustomSettings: state.shCustomSettings,
  globalSettings: state.globalSettings,
  globalUi: state.globalUi,
});

// Export.
export default connect(mapStateToProps)(divPage);
