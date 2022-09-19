

export function drawPuzzle (ctx, puzzle, showLabels) {
  
    ctx.shadowColor = 'black';
    
    let selected = puzzle.selected;
    
    puzzle.pieces.forEach(piece => {
        let rect = computeRectangle(piece);

        if (piece === selected) {
            //TODO: change this line
            ctx.fillStyle = 'yellow';
         } 
         else {

              ctx.fillStyle = piece.color;
            
         }

        //ctx.shadowBlur = 10;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    })

}



/**
 * redraw the canvas
 * @param {*} model 
 * @param {*} canvasObj 
 * @param {*} appObj 
 * @returns 
 */
export function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');
    if (ctx === null) {return;}

    ctx.clearRect(0,0,canvasObj.width, canvasObj.height)
  
    if (model.puzzle) { 
        drawPuzzle (ctx, model.puzzle, model.showLabels);
    }
}