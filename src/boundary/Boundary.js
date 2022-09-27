const LEVEL1OFFSETH=190;
const LEVEL1OFFSETW=170;
const LEVEL2OFFSETW = 20;
const LEVEL2OFFSETH = 120;
const LEVEL3OFFSETH = 20;
const BOXSIZE = 60;
const OFFSET = 5;

export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * redraw the canvas from model
 * @param {*} model 
 * @param {*} canvasObj 
 * @param {*} appObj 
 * @returns 
 */
export function redrawCanvas(model, canvasObj, appObj) {
    //for testing purpose
    if (typeof canvasObj === "undefined") {return;}

    const ctx = canvasObj.getContext('2d');

    //for testing purpose
    if (ctx === null) {return;}

    //clear the canvas area
    ctx.clearRect(0,0,canvasObj.width, canvasObj.height)
  
    if (model.puzzle) {

        drawPuzzle(ctx, model.level, model.puzzle, model.showLabels);
    }
    

}

export function drawPuzzle(ctx, level, puzzle, showLabels) {
    let nr = puzzle.rowNum;
    let nc = puzzle.colNum;

    let selected = puzzle.selected;

    ctx.shadowColor = "black";
    
    puzzle.squares.forEach(square => {
        let rect = computeRectangle(square, level);
        ctx.fillStyle = square.color;
        ctx.strokeStyle = "black";
        if (square === selected) {
            ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    })

    if (level === 1) {

        ctx.strokeRect(LEVEL1OFFSETW,LEVEL1OFFSETH,BOXSIZE*nc,BOXSIZE*nr);
    }
    else if (level === 2) {
        ctx.strokeRect(LEVEL2OFFSETW,LEVEL2OFFSETH,BOXSIZE*nc,BOXSIZE*nr);
    }
    else {
        ctx.strokeRect(LEVEL2OFFSETW,LEVEL3OFFSETH,BOXSIZE*nc,BOXSIZE*nr);
    }


}

export function computeRectangle(square, level) {
    let c = square.location();
    let levelOffh = LEVEL3OFFSETH;
    let levelOffw = LEVEL2OFFSETW;
    if (level === 1) {
        levelOffh = LEVEL1OFFSETH;
        levelOffw = LEVEL1OFFSETW;
    }
    else if (level === 2) {
        levelOffh = LEVEL2OFFSETH;
    }

    let rect = new Rectangle(BOXSIZE*c.column + OFFSET + levelOffw, BOXSIZE*c.row + OFFSET + levelOffh, BOXSIZE-2*OFFSET, BOXSIZE-2*OFFSET);
    return rect;
}