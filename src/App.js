import React from 'react';
import logo from './logo.svg';
import './App.css';
import {layout} from './Layout.js';

function App() {
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

      <button style={layout.upbutton}>^</button>

      </div>

    </main>
  );
}


export default App;
