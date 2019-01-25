import React from 'react';
import ReactDOM from 'react-dom';
import BookQueryForm from './components/BookQueryForm';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

it('Form renders', () => {
  const queryForm = renderer.create(
    <BookQueryForm />
  )
  let form = queryForm.toJSON();
  expect(form).toMatchSnapshot();
});

it('Button is disabled if query is empty', () => {
  const form = shallow(<BookQueryForm query="" />);
  const button = form.find('button')
  expect(button.props().disabled).toBe(true)
})

it('Button is enabled if query has content', () => {
  const form = shallow(<BookQueryForm query="Harry Potter" />);
  const button = form.find('button')
  expect(button.props().disabled).toBe(false)
})