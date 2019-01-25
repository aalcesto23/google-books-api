import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import renderer from 'react-test-renderer';

it('Header renders without crashing', () => {
  const headerComp = renderer.create(
    <Header />
  )
  let header = headerComp.toJSON();
  expect(header).toMatchSnapshot();
});
