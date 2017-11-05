// ../src/main.js
var svg = document.getElementById("svg");
var body = document.getElementById("body");
svg.viewBox = "0 0 100 100";

var s = Snap(svg);

var width = window.screen.availWidth;
var height = window.screen.availHeight;

console.log("Width: " + width);
console.log("Height: " + height);

var clicked = {from: null, to: null};
var count = {"and": 0, "or": 0, "not": 0, "in": 0, "out": 0, "g": 0};

var board = new Board(s, width, height);
var circuitMap = new Map();
//console.log(board.centerX, board.centerY);
var gate1 = new Gate(s, board.centerX-board.scale, board.centerY+board.scale, board.scale*0.5, "and", count.and);
count.and += 1;
var gate2 = new Gate(s, board.centerX+board.scale, board.centerY+board.scale, board.scale*0.5, "not", count.not);
count.not += 1;
var gate3 = new Gate(s, board.centerX-board.scale, board.centerY-board.scale, board.scale*0.5, "or", count.or);
count.or += 1;
var gate4 = new Gate(s, board.centerX+board.scale, board.centerY-board.scale, board.scale*0.5, "and", count.and);
count.and += 1;
var inGate = new Gate(s, board.centerX-board.scale*2, board.centerY, board.scale*0.5, "in", count.in);
count.in += 1;
var outGate = new Gate(s, board.centerX+board.scale*2, board.centerY, board.scale*0.5, "out", count.out);
count.out += 1;

var run = function(input) {
	var start = circuitMap.get("I0");
	start.value = input;
	return logic(start)[0];
};

$("svg").mousedown(function (e) {

});

$("svg").mouseup(function (e) {
});

circuitMap.set(gate1.label, gate1);
circuitMap.set(gate2.label, gate2);
circuitMap.set(gate3.label, gate3);
circuitMap.set(gate4.label, gate4);

circuitMap.set(inGate.label, inGate);
circuitMap.set(outGate.label, outGate);