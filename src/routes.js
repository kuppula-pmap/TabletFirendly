// Dependencies.
import React from 'react';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route } from 'react-router';
import { history } from './redux/store';

// Pages.
import Iframe from './modules/global/pages/iframe';
// import Home from './modules/global/pages/home';
import DocMgtPage from './modules/document-management/home';
import DocMgtIframe from './modules/document-management/home-iframe';
import SetupPage from './modules/global/pages/setup';
import PageNotFound from './modules/global/pages/404';

import LoginPage from './modules/global/pages/login';

// import divPage from './modules/global/pages/divPage';
// <Route path="/divContentPage" component={divPage} title="div content" onUpdate={onUpdate} />

let onUpdate = () => { window.scrollTo(0, 0); };

// Routes template.
export default (
	<Router history={history}>

		<Route path="/" component={Iframe} onUpdate={onUpdate} />
		<Route path="/home" component={Iframe} onUpdate={onUpdate} />
		<Route path="/menu" component={Iframe} onUpdate={onUpdate} />
		<Route path="/menu/:id" component={Iframe} onUpdate={onUpdate} />

		<Route path="/login" component={LoginPage} title="Login Page" onUpdate={onUpdate} />
		<Route path="/document-management" component={DocMgtPage} title="Document Management" onUpdate={onUpdate} />
		<Route path="/document-management-iframe" component={DocMgtIframe} title="Document Management" onUpdate={onUpdate} />
		<Route path="/setupmenu" component={SetupPage} title="Setup" onUpdate={onUpdate} />
		<Route path="/setupmenu/:parentId" component={SetupPage} title="Setup" onUpdate={onUpdate} />
		<Route path="/404" component={PageNotFound} title="Page Not Found" onUpdate={onUpdate} />

	</Router>
);
