import React from 'react';
import { shallowComponent } from '../test_helper';
import Footer from '../../src/components/Footer';

describe('(Component) <Footer />', () => {
  let component;

  beforeEach(() => {
    component = shallowComponent(Footer);
  });

  it('Should be present after shallow call', () => {
    expect(component).toExist();
  });

  it('Should render as a footer', () => {
    expect(component.type()).toEqual('footer');
  });

  it('Should have a role of \'copyright\'', () => {
    expect(component.prop('role')).toEqual('copyright');
  });

  it('Contains the correct JSX structure ', () => {
    // Test for static JSX representation
    expect(component.contains(
      <footer role="copyright">
        <hr />
        <p className="text-muted">
        <small>
        © 2015 ProcessMAP. All rights reserved.
        </small>
        </p>
        </footer>
    )).toBe(true);
  });
});
