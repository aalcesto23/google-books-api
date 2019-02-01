import React from 'react';
import ReactDOM from 'react-dom';
import BookList from '../components/BookList'
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

it('Renders results when given an array of results', () => {
  const results = [
    {
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publishingCompany: '',
      bookImageURL: '',
      description: '',
      infoLink:'',
      id: 'wfefwefwf1'
    },
    {
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      publishingCompany: '',
      bookImageURL: '',
      description: '',
      infoLink:'',
      id: '2ffwfw'
    }
  ]
  const wrapper = shallow(
    <BookList 
      isError={false}
      noResults={false}
      results={results}
    />
  );

  expect(wrapper.find('.book-list-container').children().length).toEqual(2);
})

it('Renders Error Fetching Results when isError true', () => {
  const results = []
  const wrapper = shallow(
    <BookList 
      isError={true}
      noResults={false}
      results={results}
    />
  );

  expect(wrapper.find('.error-message').text()).toEqual('Error Fetching Results');
})

it('Renders No Results when no results return', () => {
  const results = [{}]
  const wrapper = shallow(
    <BookList 
      isError={false}
      noResults={true}
      results={results}
    />
  );

  expect(wrapper.find('.no-results-message').text()).toEqual('No Results');
})