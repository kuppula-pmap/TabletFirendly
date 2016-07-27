import Avatar from '../../src/components/Avatar';
import { shallowComponent } from '../test_helper';

describe('(Component) <Avatar />', () => {
  let component;

  beforeEach(() => {
    component = shallowComponent(Avatar);
  });

  it('Should be present after shallow call', () => {
    expect(component).toExist();
  });

  it('Should have a className of avatar', () => {
    expect(component.hasClass('avatar')).toExist();
  });
});
