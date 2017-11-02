// ../src/graphics.js

function Board (s, width, height) {
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

function Gate (s, x, y, size, logic, label) {
	this.logic = logic;
	this.label = label;
	this.from = [];
	this.to = [];
	this.value = [];
	
	var color = "#ffffff";
	switch(logic) {
		case "and":
			this.gate = makeAndGate(s, x, y);
			color = "#ff3939";
			break;
		case "not":
			this.gate = makeNotGate(s, x, y);
			color = "#ffe339";
			break;
		case "or":
			this.gate = makeOrGate(s, x, y);
			color = "#3950ff";
			break;
		case "in":
			this.gate = makeInGate(s, x, y);
			color = "#2d2d2d";
			break;
		default:
			this.gate = makeOutGate(s, x, y);
			color = "#ababab";
			break;
	}

	this.gate.attr({logic: logic, label: label});
	this.setControls();
}

Gate.prototype.setControls = function() {
	var onmove = function (dx, dy, x, y, e) {
		if (!e.shiftKey) {
			switch(this.attr("logic")) {
				case "and":
					this.attr({transform: "translate(" + (x-13) + "," + (y-13) + ") scale(0.25)"});
					break;
				case "not":
					this.attr({transform: "translate(" +  (x-34) + "," + (y-6) + ") scale(0.25)"});
					break;
				case "or":
					this.attr({transform: "translate(" +  (x-27) + "," + (y-19) + ") scale(0.25)"});
					break;
				case "in":
					this.attr({transform: "translate(" +  (x-17) + "," + (y-22) + ") scale(0.25)"});
					break;
				case "out":
					this.attr({transform: "translate(" +  (x-17) + "," + (y-22) + ") scale(0.25)"});
					break;
			}
			this.attr({cx: x, cy: y});
		}
	};

	var onstart = function (x, y, e) {
		
	};

	var onend = function (x, y, e) {
		
	};

	var onmousedown = function (e) {
		//console.log(this.attr("logic"));
		this.node.querySelector("#box").style.visibility = "visible";
		if (e.button === 0) {
			if (e.shiftKey) {
				if (clicked.from === null || clicked.from === this) {
					clicked.from = this;
				} else {
					clicked.to = this;
				}
			} else {
				clicked.from = clicked.to = null; 
			}
		} else {
			clicked.from = this;
		}
	};

	var onmouseup = function (e) {

		if (e.shiftKey) {
			if (clicked.from !== null && clicked.to !== null) {
				clicked.from = clicked.to = null;
			}
		}	
	};

	var onmouseover = function (e) {
		this.attr({stroke: "#ff84dd", "stroke-width": 10});
	};

	var onmouseout = function (e) {
		this.attr({stroke: "none", "stroke-width": 0});
	};

	this.gate.drag(onmove, onstart, onend);
	this.gate.mousedown(onmousedown);
	this.gate.mouseup(onmouseup);
	this.gate.mouseover(onmouseover);
	this.gate.mouseout(onmouseout);
};

function Circuit (s, fromGate, toGate, label) {
	fromGate.to.push(toGate);
	toGate.from.push(fromGate);
	this.fromGate = fromGate;
	this.toGate = toGate;
	this.label = label; 
	this.path = s.path("M" + fromGate.gate.attr("cx") + " " + fromGate.gate.attr("cy") + "L" + toGate.gate.attr("cx") + " " + toGate.gate.attr("cy"));
	this.path.attr({"stroke": "#000000", "stroke-width": 2});
	this.fromGroup = s.g(this.path, this.toGate.gate, this.fromGate.gate); 
	this.setControls();
	this.fromGate.gate.node.parentElement.appendChild(this.fromGate.gate.node);
	this.toGate.gate.node.parentElement.appendChild(this.toGate.gate.node);
}


Circuit.prototype.setControls = function () {
	this.fromGroup.drag();
	this.fromGate.gate.undrag();
	//this.toGroup.drag();
	this.toGate.gate.undrag();
}