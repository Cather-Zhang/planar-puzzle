import { computeRectangle } from "../boundary/Boundary.js";


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
        console.log("selected square: ");
        console.log(selected);
    }
    else {
        return model;
    }
    model.puzzle.select(selected);
    return model.copy();

}


export function extend(model, dir) {
    let selected = model.puzzle.selected;
    if (!selected) {return model;}
    model.puzzle.extend(dir);
    return model.copy();
}