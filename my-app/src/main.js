// ../src/main.js

var board = new Board();
var circuitMap = new Map();
console.log(board.centerX, board.centerY);
var gate1G = new GGate(board.centerX-board.scale, board.centerY+board.scale, board.scale*0.5, "and", "A1");
var gate2G = new GGate(board.centerX+board.scale, board.centerY+board.scale, board.scale*0.5, "or", "O1");
var gate3G = new GGate(board.centerX-board.scale, board.centerY-board.scale, board.scale*0.5, "not", "N1");
var gate4G = new GGate(board.centerX+board.scale, board.centerY-board.scale, board.scale*0.5, "and", "A2");
var gate1L = new LGate(board.centerX-board.scale, board.centerY+board.scale, "and", "A1");
var gate2L = new LGate(board.centerX+board.scale, board.centerY+board.scale, "or", "O1");
var gate3L = new LGate(board.centerX-board.scale, board.centerY-board.scale, "not", "N1");
var gate4L = new LGate(board.centerX+board.scale, board.centerY-board.scale, "and", "A2");
var clicked = {from: null, to: null};

circuitMap.set(gate1L.label, gate1L);
circuitMap.set(gate2L.label, gate2L);
circuitMap.set(gate3L.label, gate3L);
circuitMap.set(gate4L.label, gate4L);

$("svg").mousedown(function (e) {
	shift = e.shiftKey;
	if (clicked !== null) {
		switch (e.which) {
			case 1:
				if (clicked.from !== null && clicked.to !== null) {
					connect(circuitMap.get(clicked.from.attr("label")), circuitMap.get(clicked.to.attr("label")));
					//console.log(circuitMap.get(clicked.from.attr("label")).output);
					//console.log(circuitMap.get(clicked.to.attr("label")).input[1]);
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
