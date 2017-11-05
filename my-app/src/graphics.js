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
	this.setControls(s, this.background);
}

Board.prototype.setControls = function (s, board) {
	var that = this;
	var onmousedown = function(e) {
		if (clicked.from !== null) {
			switch (clicked.from.logic) {
				case "not":
					s.select("#"+clicked.from.label+"CI0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CO0").attr({visibility: "hidden"});
					break;
				case "in":
					s.select("#"+clicked.from.label+"CO0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CO1").attr({visibility: "hidden"});
					break;
				case "out":
					s.select("#"+clicked.from.label+"CI0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CI1").attr({visibility: "hidden"});
					break;
					default:
					s.select("#"+clicked.from.label+"CI0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CI1").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CO0").attr({visibility: "hidden"});
					break;
			}
			clicked.from = null;
		}
	}
	board.mousedown(onmousedown);
};

function Gate (s, x, y, size, logic, label) {
	this.logic = logic;
	this.from = [];
	this.to = [];
	this.value = [];
	
	var color = "#ffffff";
	switch(logic) {
		case "and":
			this.label = "A" + label;
			this.gate = makeAndGate(s, x, y, this.label);
			color = "#ff3939";
			break;
		case "not":
			this.label = "N" + label;
			this.gate = makeNotGate(s, x, y, this.label);
			color = "#ffe339";
			break;
		case "or":
			this.label = "O" + label;
			this.gate = makeOrGate(s, x, y, this.label);
			color = "#3950ff";
			break;
		case "in":
			this.label = "I" + label;
			this.gate = makeInGate(s, x, y, this.label);
			color = "#2d2d2d";
			break;
		default:
			this.label = "P" + label;
			this.gate = makeOutGate(s, x, y, this.label);
			color = "#ababab";
			break;
	}
	s.select("#"+this.label+"S").attr({fill: color});
	this.setControls();
}

Gate.prototype.setControls = function() {
	var that = this;
	var onmove = function (dx, dy, x, y, e) {
		switch(that.logic) {
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
	};

	var onstart = function (x, y, e) {
		
	};

	var onend = function (e) {
		
	};

	var c_onmove = function (dx, dy, x, y, e) {
		//console.log(this.attr("id"));
		//console.log(x, y);
		//var p = s.path("m " + this.attr("cx") + "," + this.attr("cy") + " l " + dx + "," + dy);
		//p.attr({stroke: "black", "stroke-width": 15});
	};

	var c_onstart = function (x, y, e) {
		that.gate.undrag();
	};

	var c_onend = function (e) {
		that.gate.drag(onmove, onstart, onend);
		s.select("#"+that.label+"CI0").undrag();
		s.select("#"+that.label+"CI1").undrag();
		s.select("#"+that.label+"CO0").undrag();
	};

	var onmousedown = function (e) {
		//console.log(this.attr("logic"));
		//s.select("#"+this.attr("id")+"B").attr({visibility: "visible"});
		if (clicked.from !== null) {
			switch (clicked.from.logic) {
				case "not":
					s.select("#"+clicked.from.label+"CI0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CO0").attr({visibility: "hidden"});
					break;
				case "in":
					s.select("#"+clicked.from.label+"CO0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CO1").attr({visibility: "hidden"});
					break;
				case "out":
					s.select("#"+clicked.from.label+"CI0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CI1").attr({visibility: "hidden"});
					break;
				default:
					s.select("#"+clicked.from.label+"CI0").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CI1").attr({visibility: "hidden"});
					s.select("#"+clicked.from.label+"CO0").attr({visibility: "hidden"});
					break;
			}			
		}
		switch (that.logic) {
			case "not":
				s.select("#"+that.label+"CI0").attr({visibility: "visible"});
				s.select("#"+that.label+"CO0").attr({visibility: "visible"});
				break;
			case "in":
				s.select("#"+that.label+"CO0").attr({visibility: "visible"});
				s.select("#"+that.label+"CO1").attr({visibility: "visible"});
				break;
			case "out":
				s.select("#"+that.label+"CI0").attr({visibility: "visible"});
				s.select("#"+that.label+"CI1").attr({visibility: "visible"});
				break;
			default:
				s.select("#"+that.label+"CI0").attr({visibility: "visible"});
				s.select("#"+that.label+"CI0").drag(c_onmove,c_onstart,c_onend);
				s.select("#"+that.label+"CI1").attr({visibility: "visible"});
				s.select("#"+that.label+"CI1").drag(c_onmove,c_onstart,c_onend);
				s.select("#"+that.label+"CO0").attr({visibility: "visible"});
				s.select("#"+that.label+"CO0").drag(c_onmove,c_onstart,c_onend);
				break;
		}
		clicked.from = that;
	};

	var onmouseup = function (e) {

	};

	var onmouseover = function (e) {
		this.attr({stroke: "#84ddff", "stroke-width": 10});
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