import { shallowComponentWithProps } from '../test_helper';
import Icon from '../../src/components/Icon';

describe('(Component) <Icon />', () => {
  let props = {
    name: 'file-word-o'
  };

  let component;

  beforeEach(() => {
    component = shallowComponentWithProps(Icon, props);
  });

  it('Should be present after shallow call', () => {
    expect(component).toExist();
  });

  it('Should have the correct className', () => {
    expect(component.hasClass('oi-file-word-o')).toEqual(true);
  });

  it('Contains the correct JSX structure ', () => {
    expect(component.debug()).toEqualJSX('<span className="oi oi-file-word-o" />');
  });
});
