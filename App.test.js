import React from 'react';
import App from './App';
import Robot from './components/Robot';


import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Robot />).toJSON();
  expect(rendered).toBeTruthy();
});
