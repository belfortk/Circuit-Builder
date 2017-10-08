import React from "react";

class CanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram: null
    };
  }

  render() {
    return (
      <div className ='row' style={{'marginTop':'10px' }} >
        <canvas id="canvas" width="900" height="700" style={{'margin':'0 auto', 'border': '1px solid black'}}>
          An alternative text describing what your canvas displays.
        </canvas>
      </div>
    );
  }
}

export default CanvasComponent;
