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
					this.attr({transform: "translate(" +  (x-15) + "," + (y-15) + ") scale(0.25)"});
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
		this.attr({opacity: 0.5});
	};

	var onend = function (x, y, e) {
		this.attr({opacity: 1});
	};

	var onmousedown = function (e) {
		//console.log(this.attr("logic"));
		this.attr({opacity: 0.5});
		if (e.button === 0) {
			if (e.shiftKey) {
				if (clicked.from === null || clicked.from === this) {
					clicked.from = this;
				} else {
					console.log(this.attr("cx"), this.attr("cy"));
					var pathDef = "M" + clicked.from.attr("cx") + " " + clicked.from.attr("cy") + "L" + this.attr("cx") + " " + this.attr("cy");
					var path = s.path(pathDef);
					clicked.from.node.parentElement.appendChild(clicked.from.node);
					this.node.parentElement.appendChild(this.node);
					path.attr({"stroke": "#000000", "stroke-width": 2});
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
		this.attr({opacity: 1});
		if (e.shiftKey) {
			if (clicked.from !== null && clicked.to !== null) {
				clicked.from = clicked.to = null;
			}
		}	
	};
	this.gate.drag(onmove, onstart, onend);
	this.gate.mousedown(onmousedown);
	this.gate.mouseup(onmouseup);
};