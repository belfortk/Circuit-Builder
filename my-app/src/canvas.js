// ohailogic/main.js

// css -   p:hover {
//    background: yellow;
//  }

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width = $(window).width();
var height = canvas.height = $(window).height();

var scale = width * 0.01

console.log("Width: " + width);
console.log("Height: " + height);
console.log("Scale: " + scale);

function Board() {
	// round width/height for easier calculation
	this.width = width;
	this.height = height;
	this.gates = new Array();
	this.iGates = 50;
	this.jGates = 50;
	var x = scale;
	var y = scale;
  for (var i = 0; i < this.iGates; i++) {
  	this.gates[i] = new Array();
  	for (var j = 0; j < this.jGates; j++) {
  		this.gates[i][j] = new Gate(x, y);
  		y += scale;
  	}
  	y = scale;
  	x += scale;
  	if (x > this.width) {
  		break;
  	}
  }
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

Board.prototype.setControls = function() {
	var _this = this;
	$("body").on("contextmenu", "#boardCanvas", function(e){ return false; });
	$(window).mousedown(function (e) {
		var clickCoords = "(" + e.pageX + ", " + e.pageY + ")";
		var rX = Math.round(e.pageX / scale - 1); // Round coordinates based on scale
		var rY = Math.round(e.pageY / scale - 2); // ^^^
		if (_this.checkBounds(rX, rY)) {
			switch (e.which) {
				case 1:
					$( "#click" ).text( " mouse left down: " + clickCoords);
					_this.clickedX = rX;
					_this.clickedY = rY;
					_this.addGate(rX, rY);
					break;
				case 3: 
					$( "#click" ).text( " mouse right down: " + clickCoords);
					_this.removeGate(rX, rY);
					break;
			}
		}
	});

	$(window).mousemove(function (e) {
		var trackCoords = "(" + e.pageX + ", " + e.pageY + ")";
		var rX = Math.round(e.pageX / scale - 1); // Round coordinates based on scale
		var rY = Math.round(e.pageY / scale - 2); // ^^^
		$( "#track" ).text(" mouse move: " + trackCoords);
		if (_this.checkBounds(rX, rY) && _this.clickedX > -1 && _this.clickedY > -1) {
			switch (e.which) {
				case 1:
					$( "#track" ).text(" mouse left move: " + trackCoords);

					break;
				case 3:
					$( "#track" ).text(" mouse right move: " + trackCoords);
					break;
			}

		}
	});

	$(window).mouseup(function (e) {
		var unclickCoords = "(" + e.pageX + ", " + e.pageY + ")";
		var rX = Math.round(e.pageX / scale - 1); // Round coordinates based on scale
		var rY = Math.round(e.pageY / scale - 2); // ^^^
		if (_this.checkBounds(rX, rY)) {
			switch (e.which) {
				case 1:
					$( "#click" ).text( " mouse left up: " + unclickCoords);
					break;
				case 3: 
					$( "#click" ).text( " mouse right up: " + unclickCoords);
					break;
			}
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
	this.connects = [];
}

Gate.prototype.draw = function() {
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