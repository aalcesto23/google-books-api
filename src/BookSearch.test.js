import React from 'react';
import ReactDOM from 'react-dom';
import BookSearch from './components/BookSearch';
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

it('Provides a non-image if API does not provide', () => {
  const wrapper = shallow(<BookSearch />);
  const instance = wrapper.instance();
  const imageInfo = {imageLinks: ''};
  const NO_IMAGE_DEFAULT= 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png'
  expect(instance.getImageURL(imageInfo)).toBe(NO_IMAGE_DEFAULT)
})

it('Splits up multiple authors', () => {
  const wrapper = shallow(<BookSearch />);
  const instance = wrapper.instance();
  const authorObject = ["Alan", "Ein the Corgi", "Gohan the Elk Hound"]
  const authorsString = 'Alan, Ein the Corgi, Gohan the Elk Hound'
  expect(instance.handleMultipleAuthors(authorObject)).toEqual(authorsString)
})

it('Sets isError if empty response is returned', () => {
  const wrapper = shallow(<BookSearch />);
  const instance = wrapper.instance();
  const data = {}
  expect(wrapper.state()).toEqual(defaultState);
  instance.parseResponse(data);
  expect(wrapper.state()).toEqual({
    results: [],
    noResults: false,
    isError: true,
    query: ""
  });
})

it('Sets noResults if no results are returned', () => {
  const wrapper = shallow(<BookSearch />);
  const instance = wrapper.instance();
  const data = {
    totalItems: 0
  }
  expect(wrapper.state()).toEqual(defaultState);
  instance.parseResponse(data);
  expect(wrapper.state()).toEqual({
    results: [],
    noResults: true,
    isError: false,
    query: ""
  });
})

it('Sets results if results are returned', () => {
  const wrapper = shallow(<BookSearch />);
  const instance = wrapper.instance();
  const data = {
    items: [
      {
        id: "fsfsef23",
        volumeInfo: {
          "title": "Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)",
          "authors": [
           "J.K. Rowling",
           "John Tiffany",
           "Jack Thorne"
          ],
          "publisher": "Pottermore Publishing",
          "description": "Based",
          "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=2sSMCwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=2sSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          "infoLink": "https://play.google.com/store/books/details?id=wrOQLV6xB-wC&source=gbs_api",
        }
      }
    ],
    totalItems: 1
  }
  expect(wrapper.state()).toEqual(defaultState);
  instance.parseResponse(data);
  expect(wrapper.state()).toEqual({
    results: [{
      author: "J.K. Rowling, John Tiffany, Jack Thorne",
      title: "Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)",
      publishingCompany: "Pottermore Publishing",
      bookImageURL: "http://books.google.com/books/content?id=2sSMCwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      description: "Based",
      infoLink:"https://play.google.com/store/books/details?id=wrOQLV6xB-wC&source=gbs_api",
      id: 'fsfsef23'
    }],
    noResults: false,
    isError: false,
    query: ""
  });
})