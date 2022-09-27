import React from 'react';
import logo from './logo.svg';
import './App.css';
import { layout } from './Layout.js';
import { redrawCanvas } from './boundary/Boundary.js'
import Model from './model/Model.js';
import {configuration_1, configuration_2, configuration_3} from './model/Puzzle.js';
import {selectSquare, extend, reset} from './controller/Controller.js';
import {Up, Down, Left, Right} from './model/Model.js';

var level1 = JSON.parse(JSON.stringify(configuration_1));
//var level2 = JSON.parse(JSON.stringify(configuration_2));
//var level3 = JSON.parse(JSON.stringify(configuration_3));

function App() {
  const [model, setModel] = React.useState(new Model(level1));
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]);

  const handleClick = (e) => {
    let newModel = selectSquare(model, canvasRef.current, e);
    setModel(newModel);
  }

  const extendHandler = (direction) => {
    let newModel = extend(model, direction);
    setModel(newModel);
  }

  const resetHandler = (levelNum) => {
    let newModel = reset(model, levelNum);
    setModel(newModel);
  }


  return(
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"
              className="App-canvas"
              ref={canvasRef}
              width={layout.canvas.width}
              height={layout.canvas.height}
              onClick = {handleClick}
              />

      <div style={layout.buttons}>
          <button style={layout.upbutton} 
                  onClick={(e) => extendHandler(Up)} 
                  disabled={!model.puzzle.canExtend(Up)}>^
          </button>

          <button style={layout.leftbutton} 
                  onClick={(e) => extendHandler(Left)} 
                  disabled={!model.puzzle.canExtend(Left)}>&lt;
          </button>

          <button style={layout.rightbutton} 
                  onClick={(e) => extendHandler(Right)} 
                  disabled={!model.puzzle.canExtend(Right)} >&gt;
          </button>

          <button style={layout.downbutton} 
                  onClick={(e) => extendHandler(Down)} 
                  disabled={!model.puzzle.canExtend(Down)} >v
          </button>
      </div>

      <div style={layout.resetButtons}>
          <button style={layout.level1button} 
                  onClick={(e) => resetHandler(1)}
                  disabled={model.isLevel(1)} 
                  >Level1
          </button>
          <button style={layout.level2button} 
                  onClick={(e) => resetHandler(2)} 
                  disabled={model.isLevel(2)} 
                  >Level2
          </button>
          <button style={layout.level3button} 
                  onClick={(e) => resetHandler(3)} 
                  disabled={model.isLevel(3)} 
                  >Level3
          </button>

          <button style={layout.resetbutton} 
                  onClick={(e) => resetHandler(0)} 
                  >Reset
          </button>

      </div>

    </main>
  );
}


export default App;
