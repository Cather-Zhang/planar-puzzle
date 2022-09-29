import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Model from './model/Model.js'
import {Up, Down, Left, Right} from './model/Model.js'
import {extend, selectSquare} from './controller/Controller.js'


import { configuration_1, configuration_2, configuration_3 } from './model/Puzzle.js'

var level1 = JSON.parse(JSON.stringify(configuration_1));
var level2 = JSON.parse(JSON.stringify(configuration_2));
var level3 = JSON.parse(JSON.stringify(configuration_3));


test('model level 1 initialize test', () => {
  var model = new Model(level1);
  expect(model.victory).toBe(false);
  expect(model.isLevel(1)).toBe(true);
  expect(model.puzzle.rowNum).toBe(2);
  expect(model.puzzle.colNum).toBe(4);
  expect(model.puzzle.squares[0].location().row).toBe(0);
  expect(model.puzzle.squares[0].location().column).toBe(0);
});

test('First valid extend', () => {
  var model = new Model(level1);
  var redBase = model.puzzle.squares[0];

  model.puzzle.select(redBase);
  expect(model.puzzle.selected).toBe(redBase);
  expect(model.puzzle.isSelected(redBase)).toBe(true);
  expect(model.puzzle.canExtend(Up)).toBe(false);
  expect(model.puzzle.canExtend(Down)).toBe(true);
  expect(model.puzzle.canExtend(Right)).toBe(true);
  expect(model.puzzle.canExtend(Left)).toBe(false);

  let newModel = extend(model, Right)
  expect(newModel.puzzle.squares[1].color).toBe("red");
  expect(newModel.puzzle.squares[1].count).toBe(1);
  expect(newModel.isWin()).toBe(false);
});


test('copy model', () => {
  var model = new Model(level1);
  var redBase = model.puzzle.squares[0];
  model.puzzle.select(redBase);
  var newModel = model.copy();
  expect(newModel.puzzle.selected.color).toBe("red");

});

test('Solve puzzle 1', () => {
  var model = new Model(level1);
  var redBase = model.puzzle.squares[0];
  const redStep = [Down, Right, Up]
  model.puzzle.select(redBase);
  redStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  var orangeBase = model.puzzle.squares[3];
  model.puzzle.select(orangeBase);
  model.puzzle.extend(Down);

  expect(model.isWin()).toBe(true);
})

test('not solve puzzle 1: duplicate count red', () => {
  var model = new Model(level1);
  var redBase1 = model.puzzle.squares[0];
  var redBase2 = model.puzzle.squares[2];
  model.puzzle.select(redBase1);
  
  model.puzzle.extend(Down);
  model.puzzle.extend(Right);
  
  model.puzzle.select(redBase2);
  model.puzzle.extend(Left);

  var orangeBase = model.puzzle.squares[3];
  model.puzzle.select(orangeBase);
  model.puzzle.extend(Down);

  expect(model.isWin()).toBe(false);
})

test('not solve puzzle 1: duplicate count orange', () => {
  var model = new Model(level1);
  var redBase = model.puzzle.squares[0];
  var orangeBase = model.puzzle.squares[6];
  model.puzzle.select(redBase);
  model.puzzle.extend(Right);

  model.puzzle.select(orangeBase);
  model.puzzle.extend(Left);
  model.puzzle.extend(Left);

  model.puzzle.select(orangeBase);
  model.puzzle.extend(Right);

  expect(model.isWin()).toBe(false);
})

test('not solve puzzle 2: duplicate count blue and yellow', () => {
  var model = new Model(level2);
  var redBase = model.puzzle.squares[1];
  var blueBase1 = model.puzzle.squares[2];
  var blueBase2 = model.puzzle.squares[5];

  var yellowBase1 = model.puzzle.squares[12];
  var yellowBase2 = model.puzzle.squares[28];

  const redStep = [Left, Down, Down, Down, Right, Up, Right, Down, Right, Up]
  const blue1Step = [Down, Right]
  const blue2Step = [Left, Left]

  const yellow1Step = [Right, Right, Right, Up, Left]
  const yellow2Step = [Right, Right, Right, Up, Left, Left]

  model.puzzle.select(redBase);
  redStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(blueBase1);
  blue1Step.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(blueBase2);
  blue2Step.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(yellowBase1);
  yellow1Step.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(yellowBase2);
  yellow2Step.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  expect(model.isWin()).toBe(false);
})

test('not solving puzzle 2, last square not next to neighbor', () => {
  var model = new Model(level2);
  var redBase = model.puzzle.squares[1];
  var blueBase = model.puzzle.squares[2];
  var yellowBase = model.puzzle.squares[12];

  const redStep = [Left, Down, Down, Down, Right, Up, Right, Down, Right, Up]
  const blueStep = [Down, Right, Up, Right]
  const yellowStep = [Right, Right, Up, Right, Down, Down, Down, Left, Left, Left, Up, Right]

  model.puzzle.select(redBase);
  redStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(blueBase);
  blueStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(yellowBase);
  yellowStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  expect(model.isWin()).toBe(false);
})


test('Solve puzzle 2', () => {
  var model = new Model(level2);
  var redBase = model.puzzle.squares[1];
  var blueBase = model.puzzle.squares[2];
  var yellowBase = model.puzzle.squares[12];

  const redStep = [Left, Down, Down, Down, Right, Up, Right, Down, Right, Up]
  const blueStep = [Down, Right, Up, Right]
  const yellowStep = [Right, Right, Up, Right, Down, Down, Down, Left, Up, Left, Down]

  model.puzzle.select(redBase);
  redStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(blueBase);
  blueStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  model.puzzle.select(yellowBase);
  yellowStep.forEach(function(dir) {
    model.puzzle.extend(dir);
  })

  expect(model.isWin()).toBe(true);
})


test('Access GUI', () => {
  const { getByText } = render(<App />);

  const downButton = screen.getByTestId('downbutton');
  const rightButton = screen.getByTestId('rightbutton');
  const canvasElement = screen.getByTestId('canvas');

  // initially, this button
  expect(downButton.disabled).toBeTruthy()
  expect(rightButton.disabled).toBeTruthy()

  // where I click where the first square is
  // 207 233 is first block
  fireEvent.click(canvasElement, { clientX: 207, clientY: 233} )

   // now this button is NOT disabled
   expect(rightButton.disabled).toBeFalsy()
   expect(downButton.disabled).toBeFalsy()

   // make a right move
   fireEvent.click(rightButton);

   // no longer can go further right
   expect(rightButton.disabled).toBeTruthy()

});

test('Access GUI 2', () => {
  const { getByText } = render(<App />);

  const upButton = screen.getByTestId('upbutton');
  const leftButton = screen.getByTestId('leftbutton');
  const canvasElement = screen.getByTestId('canvas');

  // initially, this button
  expect(upButton.disabled).toBeTruthy()
  expect(leftButton.disabled).toBeTruthy()

  // where I click where the first square is
  // 207 233 is first orange square
  fireEvent.click(canvasElement, { clientX: 319, clientY: 277} )

   // now this button is NOT disabled
   expect(leftButton.disabled).toBeFalsy()
   expect(upButton.disabled).toBeTruthy()

   // make a right move
   fireEvent.click(leftButton);

   // no longer can go further right
   expect(leftButton.disabled).toBeFalsy()
   expect(upButton.disabled).toBeFalsy()

});

test('Change config', () => {
  const { getByText } = render(<App />);

  const l1Button = screen.getByTestId('l1button');
  const l2Button = screen.getByTestId('l2button');
  const l3Button = screen.getByTestId('l3button');

  expect(l1Button.disabled).toBeTruthy()
  expect(l2Button.disabled).toBeFalsy()
  expect(l3Button.disabled).toBeFalsy()

  fireEvent.click(l2Button);

  expect(l2Button.disabled).toBeTruthy()
  expect(l1Button.disabled).toBeFalsy()
  expect(l3Button.disabled).toBeFalsy()

  fireEvent.click(l3Button);

  expect(l3Button.disabled).toBeTruthy()
  expect(l1Button.disabled).toBeFalsy()
  expect(l2Button.disabled).toBeFalsy()
});

