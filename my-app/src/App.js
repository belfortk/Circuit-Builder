import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasComponent from './CanvasComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };

  
  }


  render() {
    return (
      <div className='container'>
      <div className='row' style = {{'padding': '1em', 'borderBottom':'solid' }}>
      <h2 > Circuit Builder </h2>
      </div>
      <div className='section'>
        <CanvasComponent />
      </div>
      <div className='row' style={{'paddingLeft':'25px', 'paddingRight':'25px'}}>
        <button className='col-md-12 btn-primary' > UI Button Bar goes here? </button>
      </div>
      </div>
    
    );
  }
}

export default App;
