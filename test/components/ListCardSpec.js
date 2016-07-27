import { shallowComponent } from '../test_helper';
import ListCard from '../../src/components/ListCard';

describe('(Component) <ListCard />', () => {
  let component;

  beforeEach(() => {
    component = shallowComponent(ListCard);
  });

  it('Should be present after shallow call', () => {
    expect(component).toExist();
  });

  it('Should render as a div', () => {
    expect(component.type()).toEqual('div');
  });

  it('Should render with \'list-card\' className', () => {
    expect(component.hasClass('list-card')).toEqual(true);
  });
});
