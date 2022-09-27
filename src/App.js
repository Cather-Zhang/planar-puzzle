import React from 'react';
import logo from './logo.svg';
import './App.css';
import { layout } from './Layout.js';
import { redrawCanvas } from './boundary/Boundary.js'
import Model from './model/Model.js';
import {configuration_1, configuration_2, configuration_3} from './model/Puzzle.js';
import {selectSquare} from './controller/Controller.js';

var level1 = JSON.parse(JSON.stringify(configuration_1));
var level2 = JSON.parse(JSON.stringify(configuration_2));
var level3 = JSON.parse(JSON.stringify(configuration_3));

function App() {
  const [model, setModel] = React.useState(new Model(level3));
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]);

  const handleClick = (e) => {
    let newModel = selectSquare(model, canvasRef.current, e);
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

      <label style={layout.text}>message</label>
      <div style={layout.buttons}>
          <button style={layout.upbutton} >^</button>
          <button style={layout.leftbutton}  >&lt;</button>
          <button style={layout.rightbutton} >&gt;</button>
          <button style={layout.downbutton}  >v</button>
      </div>

    </main>
  );
}


export default App;
