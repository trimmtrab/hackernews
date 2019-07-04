import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Button from './components/Button';
import Search from './components/Search';
import Table from './components/Table'; 

Enzyme.configure({ adapter: new Adapter() });

// "describe" defines test suite
// "it" describes one test case
// in jest: it === test
describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Search', () => {

  const props = {
    value: 'Redux',
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search {...props}>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);    
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search {...props}>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Button onClick={() => {}}>
        Give Me More
      </Button>, 
      div);
    ReactDOM.unmountComponentAtNode(div);    
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button onClick={() => {}}>
        Give Me More
      </Button>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onClick prop is called when clicked', () => {
    const mockOnClick = jest.fn();
    const element = shallow(
      <Button onClick={mockOnClick}>
        Mock Button
      </Button>
    );

    element.simulate('click');
    expect(mockOnClick.mock.calls.length).toBe(1);
  })
});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    onDismiss: () => {},
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);    
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table {...props} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list', () => {
    // renders the component without its children
    const element = shallow(
      <Table {...props} />
    );
    expect(element.find('.table-row').length).toBe(2);
  })
});
