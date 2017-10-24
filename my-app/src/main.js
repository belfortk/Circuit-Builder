// ../src/main.js

var board = new Board();
var circuitMap = new Map();
console.log(board.centerX, board.centerY);
var gate1G = new GGate(board.centerX-board.scale, board.centerY+board.scale, board.scale*0.5, "and", "A1");
var gate2G = new GGate(board.centerX+board.scale, board.centerY+board.scale, board.scale*0.5, "not", "N1");
var gate3G = new GGate(board.centerX-board.scale, board.centerY-board.scale, board.scale*0.5, "or", "O1");
var gate4G = new GGate(board.centerX+board.scale, board.centerY-board.scale, board.scale*0.5, "and", "A2");
var inGate1 = new GGate(board.centerX-board.scale*2, board.centerY, board.scale*0.5, "in", "I1");
var outGate = new GGate(board.centerX+board.scale*2, board.centerY, board.scale*0.5, "out", "OU1");
var gate1L = new LGate("and", "A1");
var gate2L = new LGate("or", "O1");
var gate3L = new LGate("not", "N1");
var gate4L = new LGate("and", "A2");
var inGate = new LGate("in", "I1");
var outGate = new LGate("out", "OU1");
var clicked = {from: null, to: null};

circuitMap.set(gate1L.label, gate1L);
circuitMap.set(gate2L.label, gate2L);
circuitMap.set(gate3L.label, gate3L);
circuitMap.set(gate4L.label, gate4L);
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
					//console.log(circuitMap.get(clicked.from.attr("label")).output);
					//console.log(circuitMap.get(clicked.to.attr("label")).input[0]);
				}
				break;
			case 3:
				circuitMap.delete(clicked.from.attr("label"));
				console.log(circuitMap.size);
				break;
		}
	}
});

$("svg").mouseup(function (e) {

});

var run = function (input) {
	var start = circuitMap.get("I1");
	var end = [];
	start.value = input;
	end = logic(start);
	return end.pop();
};