import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders without error', () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find('[data-test="component-app"]');

  expect(appComponent.length).toBe(1);
  // console.log(wrapper.debug());
  // expect(wrapper).toBeTruthy();
  // expect(wrapper.find('h1')).toHaveLength(1);
});

test('renders counter display', () => {
  const wrapper = shallow(<App />);
  const counter = wrapper.find('[data-test="counter-display"]');

  expect(counter.length).toBe(1);
});

test('counter strats at 0', () => {
  const wrapper = shallow(<App />);
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

describe('Increment', () => {
  test('renders increment button', () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find('[data-test="increment-button"]');
    expect(button.length).toBe(1);
  });

  test('clicking button increments counter', () => {
    const counter = 7;
    const wrapper = shallow(<App />);
    wrapper.setState({ counter });

    const button = wrapper.find('[data-test="increment-button"]');
    button.simulate('click');
    wrapper.update();

    const counterDisplay = wrapper.find('[data-test="counter-display"]');
    expect(counterDisplay.text()).toContain(counter + 1);
  });

  test('clicking increment button clear error message', () => {
    const wrapper = shallow(<App />);

    const button = wrapper.find('[data-test="increment-button"]');
    button.simulate('click');
    wrapper.update();

    const errorHasHiddenClass = wrapper
      .find('[data-test="error-message"]')
      .hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  });
});

describe('Decrement', () => {
  test('renders debcrement button', () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find('[data-test="decrement-button"]');
    expect(button.length).toBe(1);
  });

  test('clicking button decrements counter', () => {
    const counter = 20;
    const wrapper = shallow(<App />);
    wrapper.setState({ counter });

    const button = wrapper.find('[data-test="decrement-button"]');
    button.simulate('click');
    wrapper.update();

    const counterDisplay = wrapper.find('[data-test="counter-display"]');
    expect(counterDisplay.text()).toContain(counter - 1);
  });

  test("error msg doesn't show when no need", () => {
    // const wrapper = setup();
    // const errorMsg = findByTestAttr(wrapper, 'error-message');
    const wrapper = shallow(<App />);
    const errorHasHiddenClass = wrapper
      .find('[data-test="error-message"]')
      .hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  });
});

describe('Counter is 0', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);

    const button = wrapper.find('[data-test="decrement-button"]');
    button.simulate('click');
    wrapper.update();
  });

  test('error shows', () => {
    const errorHasHiddenClass = wrapper
      .find('[data-test="error-message"]')
      .hasClass('hidden');
    expect(errorHasHiddenClass).toBe(false);
  });

  test('counter still displays 0', () => {
    const counterDisplay = wrapper.find('[data-test="counter-display"]');
    expect(counterDisplay.text()).toContain(0);
  });

  test('clicking button decrements counter but not lower then 0', () => {
    const counterDisplay = wrapper.find('[data-test="counter-display"]');

    expect(counterDisplay.text()).toContain(0);
  });
});
