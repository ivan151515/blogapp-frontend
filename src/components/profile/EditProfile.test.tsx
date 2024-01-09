import * as renderer from 'react-test-renderer';
import EditProfile from './EditProfile';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchSnapshot(): R;
    }
  }
}
test('Component renders correctly', () => {
  //const tree = renderer.create(<EditProfile />).toJSON();
  //expect(tree).toMatch;
  const tree = renderer.create(<EditProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});