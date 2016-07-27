import { jsdom } from 'jsdom';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import prunk from 'prunk';

// Suppress stylesheet imports
prunk.suppress(/\.(scss|css|less|sass)$/);

// Mock PDFJS import
// prunk.mock('PDFJS', require('react-pdfjs'));

// chai.use(chaiEnzyme());
// chaiJquery(chai, chai.util, $);

// Expose global variables.
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
// global.expect = chai.expect;

// import jquery from 'jquery';
// import TestUtils from 'react-addons-test-utils';
// import ReactDOM from 'react-dom';
// import chai, { assert, should }from 'chai';

// These imports need to happen after the jsdom declaration.
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

global.expect = expect;

// Expose browser stuff to the global scope.
for ( const key in global.window ) {
  if ( global.window.hasOwnProperty(key) && ! (key in global)) {
    global[key] = global.window[key];
  }
}

// Import React after global objects are defined, otherwise
// react will create it's own execution environment object
// and you will recieve an Invariant Violation when simulating events
const React = require('react');

// const $ = jquery(global.window);
//
// // Helper function that renders a given react class.
// function renderComponent(ComponentClass, props, state) {
//   // renderIntoDocument requires a DOM per docs.
//   const componentInstance = TestUtils.renderIntoDocument(
//     <Provider store={createStore(reducers, state)}>
//       <ComponentClass {...props} />
//     </Provider>
//   );
//   // Produces HTML.
//   return $(ReactDOM.findDOMNode(componentInstance));
// }

// Useful to constrain yourself to testing a component as a unit
// ensures that your test aren't indirectly asserting on behavior
// of child components.
function shallowComponent(Component) {
  const componentInstance = shallow(<Component />);
  return componentInstance;
}

// Same as above, but with the option to add props.
function shallowComponentWithProps(Component, props) {
  const componentInstance = shallow(<Component {...props} />);
  return componentInstance;
}

// Old version of mountComponent.
function mountComponent(Component, store) {
  // console.log('State of Store: ', store.getState());
  const componentInstance = mount(
    <Provider store={store}>
      <Component />
    </Provider>
  );
  return componentInstance;
}

// Useful for cases where you have components that interact with
// DOM APIs. May require the full lifecycle to test properly.
// Requires a full DOM API available at the global scope(a.k.a jsdom).
// function mountComponent(Component, props) {
//   console.log('mountComponent called with props: ', props);
//   const componentInstance = mount(<Component {...props} />);
//   return componentInstance;
// }

// Useful for rendering components to static HTML and then
// analyzing the HTML structure. Returns a wrapper that is similar
// to shallow and mount, but it uses Cheerio for HTML traversal
// and parsing.
// function renderComponent(Component) {
//   const componentInstance = render(<Component />);
//   return componentInstance;
// }

// Helper for simulating events.
// $.fn.simulate = function(eventName, value) {
//   // If value is passed.
//   if (value) {
//     // Set value for html element.
//     this.val(value);
//   }
//   // Trigger event on the first element.
//   TestUtils.Simulate[eventName](this[0]);
// };

export { mountComponent, shallowComponent, shallowComponentWithProps, expect};
