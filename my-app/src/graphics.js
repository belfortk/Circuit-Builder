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

function Gate (x, y, size, type, label) {
	var setControls = function (gate) {
		var onmove = function (dx, dy, posx, posy) {
			if (!shift) {
				this.attr({transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]});
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
			//console.log(this.attr("type"));
			if (e.shiftKey) {
				if (clicked.from === null || clicked.from === this) {
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

		//gate.drag(onmove, ondragstart, ondragend);
		gate.drag();
		gate.mousedown(onmousedown);
		gate.mouseup(onmouseup);
	}
	this.type = type;
	this.label = label;
	this.from = [];
	this.to = [];
	this.value = [];
	
	var color = "#ffffff";
	var tint = "#ffffff";
	switch(type) {
		case "and":
			this.gate = makeAndGate(s, x, y);
			color = "#ff3939";
			tint = "#ff7474";
			break;
		case "not":
			this.gate = makeNotGate(s, x, y);
			color = "#ffe339";
			tint = "#ffeb74";
			break;
		case "or":
			this.gate = makeOrGate(s, x, y);
			color = "#3950ff";
			tint = "#7484ff";
			break;
		case "in":
			this.gate = makeInGate(s, x, y);
			color = "#2d2d2d";
			tint = "#6c6c6c";
			break;
		default:
			this.gate = makeOutGate(s, x, y);
			color = "#ababab";
			tint = "#eaeaea";
			break;
	}

	this.gate.attr({fill: color, tint: tint, type: type, label: label});

	setControls(this.gate);
}