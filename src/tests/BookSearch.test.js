import React from 'react';
import ReactDOM from 'react-dom';
import BookSearch from '../components/BookSearch';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

const defaultState = {
  results: [],
  noResults: false,
  isError: false,
  query: ""
}

it('Updates query', () => {
  const wrapper = mount(<BookSearch />);
  expect(wrapper.state('query')).toBe('');
  wrapper.find('input').simulate('change', {target: {value: 'Harry Potter'}});
  expect(wrapper.state('query')).toBe('Harry Potter');
})