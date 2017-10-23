// ../src/logic.js

function LGate (x, y, type, label) {
	this.x = x;
	this.y = y;
	this.logic = type;
	this.label = label;
	this.input = {1: null, 2: null};
	this.output = null;
}

LGate.prototype.logic = function(input) {

}

var connect =  function (from, to) {
	from.output = to;
	if (to.input[1] === null) {
		to.input[1] = from;
	} else {
		to.input[2] = from;
	}
}

var run = function (start, input) {

}