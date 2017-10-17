// ../src/graphics.js

var svg = document.getElementById("svg");
var body = document.getElementById("body");
svg.viewBox = "0 0 600 1200";

var s = Snap(svg);

var width = 1200;
var height = 600;
var scale = Math.round(width * 0.03)
var svgOffset = svg.getBoundingClientRect();
var bodyOffset = body.getBoundingClientRect();
var xOffset = svgOffset.left + bodyOffset.left;
var yOffset = svgOffset.top + bodyOffset.top;
var rect = s.rect(0, 0, width, height);
rect.attr({fill: "#f2f2f2"});

console.log("Width: " + width);
console.log("Height: " + height);
console.log("Scale: " + scale);
console.log("Offset: " + xOffset + " " + yOffset);

function Board() {
	// round width/height for easier calculation
	this.width = width;
	this.height = height;
	this.gates = new Array();
	this.iGates = Math.round(width/scale);
	this.jGates = Math.round(width/scale);
	var x = scale;
	var y = scale;
  for (var i = 0; i < this.iGates; i++) {
  	this.gates[i] = new Array();
  	for (var j = 0; j < this.jGates; j++) {
  		this.gates[i][j] = new Gate(x, y);
  		this.gates[i][j].setControls();
  		y += scale;
  	}
  	y = scale;
  	x += scale;
  }
}

Board.prototype.checkBounds = function(x, y) {
	if (x >= 0 && x < this.gates.length) {
		if (y >= 0 && y < this.gates[x].length) {
			return true;
		}
	}
	return false;
};

Board.prototype.draw = function() {
	for (var i = 0; i < this.iGates; i++) {
		for (var j = 0; j < this.jGates; i++) {

		}
	}
}

function Gate(x, y) {
	this.x = x;
	this.y = y;
	this.size = scale * 0.125;
	this.color = "#cecece";
	this.mouseDown = false;
	this.circuits = { inputX: -1,
										inputY: -1,
										outputX: -1,
										outputY: -1 };
	this.gate = s.circle(x, y, this.size);
	this.gate.attr({fill: this.color});

}

Gate.prototype.setControls = function() {
	var onmove = function(dx, dy, posx, posy) {
		console.log(dx, dy, posx, posy);
		this.attr({cx: (posx - xOffset), cy: (posy - yOffset/2)});
		console.log("Moving!");
	}

	var ondragstart = function(x, y) {
		this.attr({fill: "#000"});
		//console.log(x, y);
		console.log("Starting!");
	}

	var ondragend = function() {
		this.attr({fill: "#cecece"});
		console.log("Stopping!");
	}

	this.gate.drag(onmove, ondragstart, ondragend);
	
}

var board = new Board();