import React from 'react';
import logo from './logo.svg';
import './App.css';
import {layout} from './Layout.js';
import { redrawCanvas } from './boundary/Boundary.js'
import Model from './model/Model.js';
import {configuration_1} from './model/Puzzle.js';

var actualPuzzle = JSON.parse(JSON.stringify(configuration_1));

function App() {

  const [model, setModel] = React.useState(new model(actualPuzzle));

  React.useEffect(()=>{
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]
  )


  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tableIndex = "1"
      className="App-canvas"
      ref={canvasRef}
      width={layout.canvas.width}
      height={layout.canvas.height}
      />

      <label style={layout.text}>message</label>
      <div style={layout.buttons}>

          <button data-testid="upbutton" style={layout.upbutton}   >^</button>
           <button data-testid="leftbutton" style={layout.leftbutton}  >&lt;</button>
           <button data-testid="rightbutton" style={layout.rightbutton} >&gt;</button>
           <button data-testid="downbutton" style={layout.downbutton}  >v</button>


      </div>

    </main>
  );
}


export default App;
