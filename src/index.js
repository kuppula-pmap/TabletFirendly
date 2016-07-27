// Dependencies.
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Local Dependencies.
import Routes from './routes';
import App from './app';

// Language actions.
import { setLanguageCode, setLanguageName} from './redux/actions/lang-actions';

// Global Actions.
import {
  setApiUrl,
  setConsumerId,
  setModuleId,
  setSelectedMenuItem,
  setUrlPrefix,
  setLocationId,
  setUserId,
  setLevelId,
  setTopLevelId,
  setNotificationUrl,
  setEncryptedAppId,
  setSessionTimeout,
  setSessionResetTime,
  setSessionIsActive,
  setSSOType,
} from './redux/actions/settings-actions';
import { fetchAuth } from './redux/actions/auth-actions';
import { fetchAspUserLoginInfo } from './redux/actions/aspUserLoginInfo-actions';

// Stylesheets.
// import './styles/sass/themes/legacy.scss';
import './styles/sass/themes/andromeda.scss';
import './styles/sass/themes/bootstrap.scss';
// import './styles/sass/themes/walgreens.scss';
// import './styles/sass/themes/mustard.scss';


// Use Shell or Doc. Mgmt. credentials.
const useShellCredentials = false;

// Get host(it will get hostname and port no also if available).
const windowLocation = document.location.host;

// Use hard coded credentials for local authentication.
let hardCodedCredentials = false;

// Rest Service Host Api Url will come from this seb service:
// /WebServices/Foundation/UserService.asmx/GetUserLoggedinInformation
let apiUrl = null;

// Handle api call and authentication on special cases.
switch (windowLocation) {
// Use hard coded credentials for local authentication.
case 'localhost:2015':
case 'cosmos.pmapconnect.com':
  hardCodedCredentials = true;
  apiUrl = useShellCredentials ? 'https://devind.pmapconnect.com:338' : 'https://devind.pmapconnect.com:558';
  // apiUrl = 'https://devsvc.pmapconnect.com';

  // Set Rest Service Host Api Url.
  store.dispatch(setApiUrl(apiUrl));

  break;
default:
}

// Set Global ModuleId for the API calls.
store.dispatch(setModuleId(1));

// Set default language code and name.
store.dispatch(setLanguageCode('en'));
store.dispatch(setLanguageName('english'));

// Set selectedMenuItem.
store.dispatch(setSelectedMenuItem({
  'Id': 1,
  'ModuleId': 0,
  'Description': null,
  'IframeURL': 'LandingPage/MainLandingPage.aspx?',
  'SpaRoute': null,
  'Icon': 'home-o',
  'OrderId': 1,
  'QueryString': null,
  'Children': [],
  'Name': 'Home',
  'ParentId': 1,
  'IsNavigatorDisplay': true,
  'IsLevelDisplay': true
}));

// Set (dev) url prefix.
store.dispatch(setUrlPrefix( hardCodedCredentials ? 'http://productfacelift.pmapconnect.com' : '' ));

// Init global session activity to true.
store.dispatch(setSessionIsActive(true));

// Authenticate with React.
if (hardCodedCredentials) {
  // SHELL data.
  store.dispatch(setUserId(1000));
  store.dispatch(setTopLevelId(1000));
  store.dispatch(setLevelId(0));
  store.dispatch(setNotificationUrl(null));
  store.dispatch(setEncryptedAppId('45+240+164+156+220+106+26+128'));
  store.dispatch(setSessionTimeout(60));
  store.dispatch(setSessionResetTime(20));
  store.dispatch(setSSOType(1));

  if (useShellCredentials) {
    store.dispatch(setConsumerId(3646));
    store.dispatch(setLocationId(1000));
    store.dispatch(fetchAuth('demouser', 'Passw1rd', '0'))
    .catch(error => {
      console.log('shell error: check fetchAuth method on index.js', error);
    });
  } else {
    // DM hard codeded values;
    store.dispatch(setConsumerId(3724));
    store.dispatch(setLocationId(8790)); // 9016 or 8790
    store.dispatch(fetchAuth('demouser', 'Pmap@1234', '0'))

    // // DM hard codeded values;
    // store.dispatch(setUserId(12946));
    // store.dispatch(setConsumerId(3724));
    // store.dispatch(setLocationId(11468)); // 9016 or 8790
    // store.dispatch(fetchAuth('naveend', 'Pmap@123', '0'))
    .catch(error => {
      console.log('dm error: check fetchAuth method on index.js', error);
    });
  }
} else {
  store.dispatch(fetchAspUserLoginInfo())
  .then(response => {
    const obj = response.aspUserLoginInfo.d.Object;
    Promise.all([
      // Set language code and name.
      store.dispatch(setLanguageCode(obj.LanguageCode)),
      store.dispatch(setLanguageName(obj.Language)),
      store.dispatch(setConsumerId(Number(obj.ConsumerId))),
      store.dispatch(setUserId(Number(obj.UserId))),
      store.dispatch(setLocationId(Number(obj.LocationId))),
      store.dispatch(setTopLevelId(Number(obj.TopLevelId))),
      store.dispatch(setLevelId(Number(obj.LevelId))),
      store.dispatch(setEncryptedAppId(obj.EncryptedAppId)),
      store.dispatch(setNotificationUrl(obj.NotificationUrl)),
      store.dispatch(setSessionTimeout(obj.SessionTimeout)),
      store.dispatch(setSSOType(obj.SSOType)),
      store.dispatch(setSessionResetTime(2)),
      // Set Rest Service Host Api Url.
      store.dispatch(setApiUrl(obj.RestServiceHostUrl)),

      // Authenticate.
      store.dispatch(
        fetchAuth(
        obj.UserName,
        obj.Password,
        '1',
        obj.LocationLevelName
      )
      )
    ])
    .catch(error => {
      console.log('error: check fetchAspUserLoginInfo method on index.js', error);
    });
  });
}

// Needed for onTouchTap - Can go away when react 1.0 release
// Check this repo: https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Routes template.
const template = (
  <Provider store={store}>
    <App>
      <Router history={history}>
        {Routes}
      </Router>
    </App>
  </Provider>
);

// Insertion point.
const el = document.getElementById('app');

ReactDOM.render(template, el);
