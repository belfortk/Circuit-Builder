// src/canvas.js

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var body = document.querySelector("body");

var width = canvas.width = canvas.offsetWidth;
var height = canvas.height = canvas.offsetHeight;
var bodyOffset = body.getBoundingClientRect();
var canvasOffset = canvas.getBoundingClientRect();

//console.log(bodyOffset.top, bodyOffset.right, bodyOffset.left, bodyOffset.bottom);

var scale = Math.floor(width * 0.03);
var xOffset = 0;
var yOffset = 0;

console.log("Width: " + width);
console.log("Height: " + height);
console.log("Scale: " + scale);
console.log("Body Top offset: " + bodyOffset.top);
console.log("Body Right offset: " + bodyOffset.right);
console.log("Body Left offset: " + bodyOffset.left);
console.log("Body Bottom offset: " + bodyOffset.bottom);
console.log("Canvas Top offset: " + canvasOffset.top);
console.log("Canvas Right offset: " + canvasOffset.right);
console.log("Canvas Left offset: " + canvasOffset.left);
console.log("Canvas Bottom offset: " + canvasOffset.bottom);
console.log("xOffset: " + xOffset);
console.log("yOffset: " + yOffset);

function Board() {
	// round width/height for easier calculation
	this.width = width;
	this.height = height;
	this.gates = new Array();
	this.iGates = Math.round(width / scale);
	this.jGates = Math.round(height / scale);
	var x = scale + xOffset;
	var y = scale + yOffset;
	console.log(x, y);
  for (var i = 0; i < this.iGates; i++) {
  	this.gates[i] = new Array();
  	for (var j = 0; j < this.jGates; j++) {
  		this.gates[i][j] = new Gate(x, y);
  		y += scale;
  	}
  	y = scale + yOffset;
  	x += scale;
  }
  this.which = -1;
	this.clickedX = -1;
	this.clickedY = -1;
}

Board.prototype.addGate = function(x, y) {
	this.gates[x][y].color = "#ba0000";
	this.gates[x][y].size = scale * 0.25;
};

Board.prototype.removeGate = function(x, y) {
	this.gates[x][y].color = "#cecece";
	this.gates[x][y].size = scale * 0.125;
};

Board.prototype.addCircuit = function(oX, oY, iX, iY) { 
	this.gates[oX][oY].circuits.outputX = this.gates[iX][iY].x
	this.gates[oX][oY].circuits.outputY = this.gates[iX][iY].y
	this.gates[iX][iY].circuits.inputX = this.gates[oX][oY].x
	this.gates[iX][iY].circuits.inputY = this.gates[oX][oY].y
	//console.log(this.gates[oX][oY].circuits.outputX);
	//console.log(this.gates[oX][oY].circuits.outputY);
}

Board.prototype.removeCircuit = function(oX, oY, iX, iY) {
	this.gates[oX][oY].circuits.outputX = -1
	this.gates[oX][oY].circuits.outputY = -1
	this.gates[iX][iY].circuits.inputX = -1
	this.gates[iX][iY].circuits.inputY = -1
}


Board.prototype.setControls = function() {
	var _this = this;
	$("body").on("contextmenu", "#boardCanvas", function(e){ return false; });
	$(window).mousedown(function (e) {
		var clickCoords = "(" + e.pageX + ", " + e.pageY + ")";
		var rX = Math.round((e.pageX - bodyOffset.left - canvasOffset.left - xOffset) / scale) - 1; // Round coordinates based on scale
		var rY = Math.round((e.pageY - bodyOffset.top - canvasOffset.top - yOffset) / scale) - 1; // ^^^
		console.log("rX: " + rX);
		console.log((e.pageX - bodyOffset.left - xOffset) / scale);
		console.log("rY: " + rY);
		console.log((e.pageY - bodyOffset.top - yOffset) / scale);
		if (_this.checkBounds(rX, rY)) {
			switch (e.which) {
				case 1:
					$( "#click" ).text( " mouse left down: " + clickCoords);
					_this.clickedX = rX;
					_this.clickedY = rY;
					_this.which = 1;
					_this.addGate(rX, rY);
					break;
				case 3: 
					$( "#click" ).text( " mouse right down: " + clickCoords);
					_this.clickedX = rX;
					_this.clickedY = rY;
					_this.which = 3;
					_this.removeGate(rX, rY);
					break;
			}
		}
	});

	$(window).mousemove(function (e) {
		var trackCoords = "(" + e.pageX + ", " + e.pageY + ")";
		var rX = Math.round((e.pageX - bodyOffset.left - canvasOffset.left - xOffset) / scale) - 1; // Round coordinates based on scale
		var rY = Math.round((e.pageY - bodyOffset.top - canvasOffset.top - yOffset) / scale) - 1; // ^^^
		if (_this.checkBounds(rX, rY) && _this.clickedX > -1 && _this.clickedY > -1) {
			switch (_this.which) {
				case 1:
					$( "#track" ).text(" mouse left move: " + trackCoords);
					if (rX !== _this.clickedX || rY !== _this.clickedY) {
						_this.addCircuit(_this.clickedX, _this.clickedY, rX, rY);
						_this.clickedX = rX;
						_this.clickedY = rY;
					}
					break;
				case 3:
					$( "#track" ).text(" mouse right move: " + trackCoords);
					if (rX !== _this.clickedX || rY !== _this.clickedY) {
						_this.removeCircuit(_this.clickedX, _this.clickedY, rX, rY);
						_this.clickedX = rX;
						_this.clickedY = rY;
					}
					break;
			}
		} else {
			_this.clickedX = -1;
			_this.clickedY = -1;
			_this.which = -1;
		}
	});

	$(window).mouseup(function (e) {
		var unclickCoords = "(" + e.pageX + ", " + e.pageY + ")";
		var rX = Math.round((e.pageX - bodyOffset.left - canvasOffset.left - xOffset) / scale) - 1; // Round coordinates based on scale
		var rY = Math.round((e.pageY - bodyOffset.top - canvasOffset.top - yOffset) / scale) - 1; // ^^^
		_this.clickedX = -1;
		_this.clickedY = -1;
		_this.which = -1;
		switch (e.which) {
			case 1:
				$( "#click" ).text( " mouse left up: " + unclickCoords);
				break;
			case 3: 
				$( "#click" ).text( " mouse right up: " + unclickCoords);
				break;
		}
	});
};

Board.prototype.checkBounds = function(x, y) {
	if (x >= 0 && x < this.gates.length) {
		if (y >= 0 && y < this.gates[x].length) {
			return true;
		}
	}
	return false;
}

Board.prototype.draw = function() {
	for (var i = 0; i < this.gates.length; i++) {
		for (var j = 0; j < this.gates[i].length; j++) {
			this.gates[i][j].draw();
		}
	}
};

function Gate(x, y) {
	this.x = x;
	this.y = y;
	this.size = scale * 0.125;
	this.color = "#cecece";
	this.circuits = { inputX: -1,
										inputY: -1,
										outputX: -1,
										outputY: -1 };
}

Gate.prototype.draw = function() {
	if (this.circuits.outputX > -1 && this.circuits.outputY > -1) {
		if (this.circuits.outputX >= this.x && this.circuits.outputY >= this.y) {
			ctx.beginPath();
			ctx.lineWidth = scale*0.0625;
			ctx.strokeStyle = "black";
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.circuits.outputX, this.circuits.outputY);
			ctx.stroke();
		}
	}

	if (this.circuits.inputX > -1 && this.circuits.inputY > -1) {
		if (this.circuits.inputX >= this.x && this.circuits.inputY >= this.y) {
			ctx.beginPath();
			ctx.lineWidth = scale*0.0625;
			ctx.strokeStyle = "black";
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.circuits.inputX, this.circuits.inputY);
			ctx.stroke();
		}
	}

	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	ctx.fill();
};

var board = new Board();
board.setControls();

function loop() {
	ctx.fillStyle = "#f2f2f2";
	ctx.fillRect(0, 0, width, height);
	board.draw();
	requestAnimationFrame(loop);
}

loop();