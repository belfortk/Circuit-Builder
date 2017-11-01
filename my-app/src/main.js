// ../src/main.js
var svg = document.getElementById("svg");
var body = document.getElementById("body");
svg.viewBox = "0 0 100 100";

var s = Snap(svg);

var width = window.screen.availWidth;
var height = window.screen.availHeight;

console.log("Width: " + width);
console.log("Height: " + height);

var board = new Board(s, width, height);
var circuitMap = new Map();
//console.log(board.centerX, board.centerY);
var gate1 = new Gate(s, board.centerX-board.scale, board.centerY+board.scale, board.scale*0.5, "and", "A1");
var gate2 = new Gate(s, board.centerX+board.scale, board.centerY+board.scale, board.scale*0.5, "not", "N1");
var gate3 = new Gate(s, board.centerX-board.scale, board.centerY-board.scale, board.scale*0.5, "or", "O1");
var gate4 = new Gate(s, board.centerX+board.scale, board.centerY-board.scale, board.scale*0.5, "and", "A2");
var inGate = new Gate(s, board.centerX-board.scale*2, board.centerY, board.scale*0.5, "in", "I1");
var outGate = new Gate(s, board.centerX+board.scale*2, board.centerY, board.scale*0.5, "out", "OU1");

var clicked = {from: null, to: null};

circuitMap.set(gate1.label, gate1);
circuitMap.set(gate2.label, gate2);
circuitMap.set(gate3.label, gate3);
circuitMap.set(gate4.label, gate4);

circuitMap.set(inGate.label, inGate);
circuitMap.set(outGate.label, outGate);

$("svg").mousedown(function (e) {
	shift = e.shiftKey;
	if (clicked !== null) {
		switch (e.which) {
			case 1:
				if (clicked.from !== null && clicked.to !== null) {
					console.log(circuitMap.get(clicked.from.attr("label")));
					console.log(circuitMap.get(clicked.to.attr("label")));
					connect(circuitMap.get(clicked.from.attr("label")), circuitMap.get(clicked.to.attr("label")));
				}
				break;
			case 3:
				if (clicked.from !== null) {
					circuitMap.delete(clicked.from.attr("label"));
					clicked.from.remove();
					clicked.from = clicked.to = null;
					console.log(circuitMap.size);
					break;
				}
		}
	}
});

$("svg").mouseup(function (e) {
});

var run = function(input) {
	var start = circuitMap.get("I1");
	start.value = input;
	return logic(start)[0];
};