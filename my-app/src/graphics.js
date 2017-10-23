// ../src/graphics.js

var svg = document.getElementById("svg");
var body = document.getElementById("body");
svg.viewBox = "0 0 100 100";

var s = Snap(svg);

var width = window.screen.availWidth;
var height = window.screen.availHeight;

console.log("Width: " + width);
console.log("Height: " + height);

function Board () {
	// round width/height for easier calculation
	this.width = width * 0.4;
	this.height = this.width;
	this.scale = width * 0.02;
	this.xOffset = width * 0.3;
	this.yOffset = height * 0.15;
	this.background = s.rect(this.xOffset, this.yOffset, this.width, this.height).attr({fill: "#ffffff"});
	this.gridX = [];
	this.gridY = [];
	var lineAttr = {
		"stroke": "#cecece",
		"stroke-width": 1,
	};

	for (var i = this.xOffset; i < (this.width+this.xOffset); i+=this.scale) {
		this.gridX.push(s.line(i, this.yOffset, i, (this.height+this.yOffset)).attr(lineAttr));
	}
	for (var i = this.yOffset; i < (this.height+this.yOffset); i+=this.scale) {
		this.gridY.push(s.line(this.xOffset, i, (this.width+this.xOffset), i).attr(lineAttr));
	}

	this.centerX = (this.width + this.xOffset*2) * 0.5;
	this.centerY = (this.height + this.yOffset*2) * 0.5;

	$("body").on("contextmenu", "#svg", function(e){ return false; });

}

function GGate (x, y, size, type, label) {
	var setControls = function (gate) {
		var onmove = function (dx, dy, posx, posy) {
			if (shift) {
			} else {
				this.attr({cx: posx, cy: posy});
				//console.log("Moving!");
			}
		}

		var ondragstart = function (x, y) {
			var tint = this.attr("tint");
			var color = this.attr("fill");
			this.attr({fill: tint, tint: color});
			//console.log("Starting!");
		}

		var ondragend = function () {
			var color = this.attr("tint");
			var tint = this.attr("fill");
			this.attr({fill: color, tint: tint});
			//console.log("Stopping!");
		}

		var onmousedown = function (e) {
			if (e.shiftKey) {
				if (clicked.from === null) {
					clicked.from = this;
				} else {
					var pathDef = "M" + clicked.from.attr("cx") + " " + clicked.from.attr("cy") + "L" + this.attr("cx") + " " + this.attr("cy");
					var path = s.path(pathDef);
					clicked.from.node.parentElement.appendChild(clicked.from.node);
					this.node.parentElement.appendChild(this.node);
					path.attr({"stroke": "#000000", "stroke-width": 2});
					var g = s.group(clicked.from, this);
					clicked.to = this;
				}
			} else {
				clicked.from = this;
			}
		}

		var onmouseup = function (e) {
			if (e.button === 2) {
				clicked.from = null;
				this.remove();
			}
			if (e.shiftKey) {
				if (clicked.from !== null && clicked.to !== null) {
					clicked.from = null;
					clicked.to = null;
				}
			}	
		}

		gate.drag(onmove, ondragstart, ondragend);
		gate.mousedown(onmousedown);
		gate.mouseup(onmouseup);
	}
	var gate =  s.circle(x, y, size);
	var color = "#ffffff";
	var tint = "#ffffff";
	if (type === "and") {
		color = "#ff3939";
		tint = "#ff7474"
	} else if (type === "not") {
		color = "#ffe339";
		tint = "#ffeb74";
	} else {
		color = "#3950ff";
		tint = "#7484ff";
	}
	gate.attr({fill: color, tint: tint, logic: type, label: label});

	setControls(gate);
	return gate;
}