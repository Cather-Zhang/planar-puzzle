import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';
import Model from './model/Nodel.js'


import { configuration_1 } from './model/Puzzle.js'

var actualPuzzle = JSON.parse(JSON.stringify(configuration_1));

var model = new Model(actualPuzzle)


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
