import React from 'react';
// expect, should are globably defined, but imported for eslint complaint
import {
  mountComponent,
  shallowComponent,
  expect } from './test_helper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// import expectJSX from 'expect-jsx';

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <input id="checked" defaultChecked />
        <input id="not" defaultChecked={false} />
      </div>
    );
  }
}

describe('(Framework) Test Plugins', () => {
  let wrapper;
  it('Should have Expect working', () => {
    expect(expect).toExist();
  });

  it('Should have Expect-JSX working', () => {
    // Shallow Render a Component
    wrapper = shallowComponent(Fixture);

    // This example uses expect-JSX to check if the HTML-like string returned from .debug()
    // is what you expected.
    expect(wrapper.debug()).toIncludeJSX('<input id="checked" defaultChecked={true} />');
  });

  // Shallow rendering is great for rendering an component one level deep.
  it('Should have Enzyme\'s shallow rendering working', () => {
    // Shallow Render a Component
    wrapper = shallowComponent(Fixture);
    expect(wrapper.find('#checked')).toExist();

    // This example uses enzyme to check if the wrapper has a node in it's render tree
    // that looks like the one passed in.
    expect(wrapper.contains(<input id="checked" defaultChecked />)).toBe(true);
  });

  // Mount rendering uses JSDOM to mount the component, and it's entire render tree to
  // a headless browser. Needed if you will be testing events.
  it('Should have Enzyme\'s mount rendering working', () => {
    // import { toggleModal } from '../../../../../src/modules/document-management/redux/actions/ui-actions';
    describe('(Component) <UploadNewVersion />', () => {
      const mockStore = configureMockStore([thunk]);
      const fakeStore = mockStore({});
      wrapper = mountComponent(Fixture, fakeStore);
      expect(wrapper.find('#checked')).toExist();
    });
  });
});
