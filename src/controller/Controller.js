import { computeRectangle } from "../boundary/Boundary.js";
import {configuration_1, configuration_2, configuration_3} from '../model/Puzzle.js';
import Model from '../model/Model.js';

var level1 = JSON.parse(JSON.stringify(configuration_1));
var level2 = JSON.parse(JSON.stringify(configuration_2));
var level3 = JSON.parse(JSON.stringify(configuration_3));

/**
 * Select Controller
 * @param {*} model 
 * @param {*} canvas 
 * @param {*} event 
 * @returns a copy of model with selected square in puzzle
 */
export function selectSquare(model, canvas, event) {
    const canvasRect = canvas.getBoundingClientRect();

    //find squares on which mouse was clicked
    let idx = model.puzzle.squares.findIndex(square => {
        let rect = computeRectangle(square, model.level);
        //console.log(square.row + " " + square.column + " " + square.color);
        //console.log(rect);
        //console.log("clicked point is: x: " + (event.clientX - canvasRect.left) + ", y: " +(event.clientY - canvasRect.top));
        return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
    });

    let selected = null;
    //console.log(idx);
    if (idx >= 0) {
        selected = model.puzzle.squares[idx];
        //console.log("selected square: ");
        //console.log(selected);
    }
    else {
        return model;
    }
    model.puzzle.select(selected);
    return model.copy();

}

/**
 * Extend Controller
 * @param {*} model 
 * @param {*} dir 
 * @returns a copy of model after the selected has extended its color
 */
export function extend(model, dir) {
    let selected = model.puzzle.selected;
    if (!selected) {return model;}
    model.puzzle.extend(dir);
    model.isWin();
    return model.copy();
}

/**
 * Reset / Select Config Controller
 * @param {*} model 
 * @param {*} num 
 * @returns a copy of model after the level has been reset
 */
export function reset(model, num) {
    switch (num) {
        case 0: 
            return new Model(model.info);
        case 1: 
            return new Model(level1);
        case 2: 
            return new Model(level2);
        case 3: 
            return new Model(level3);
        default:
            return model;
    }
}