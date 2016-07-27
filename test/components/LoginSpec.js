import Login from '../../src/components/Login';
import { shallowComponent } from '../test_helper';

describe('(Component) <Login />', () => {
  let component;

  beforeEach(() => {
    component = shallowComponent(Login);
  });

  it('Should be present after shallow call', () => {
    expect(component).toExist();
  });
});
