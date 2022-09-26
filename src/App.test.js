import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';
import Model from './model/Model.js'


import { configuration_1 } from './model/Puzzle.js'

var actualPuzzle = JSON.parse(JSON.stringify(configuration_1));

var model = new Model(actualPuzzle)


test('victory is false when model initialized', () => {
  expect(model.victory).toBe(false);
  expect(model.puzzle.rowNum).toBe(2);
  expect(model.puzzle.colNum).toBe(4);
});
