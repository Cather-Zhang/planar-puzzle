import { computeRectangle } from "../boundary/Boundary.js";

export function selectSquare(model, canvas, event) {
    const canvasRect = canvas.getBoundingClientRect();

    //find squares on which mouse was clicked
    let idx = model.puzzle.squares.findIndex((square, level) => {
        let rect = computeRectangle(square, level);
        return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.right);
    });

    let selected = null;
    if (idx >= 0) {
        selected = model.puzzle.squares[idx];
        console.log(selected);
    }
    else {
        return model;
    }
    model.puzzle.select(selected);
    return model.copy();

}