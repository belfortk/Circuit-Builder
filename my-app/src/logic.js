// ../src/logic.js

var logic = function(gate) {
	console.log(gate.label + ": " + gate.value);
	var result = [];
	var next = function(gate) {
		if ((gate.logic === "and" || gate.logic === "or") && gate.value.length === 2) {
			//console.log(gate);
			return true;
		} else if (gate.logic === "not" || gate.logic === "out") {
			return true;
		} else {
			return false;
		}
	}

	switch (gate.logic) {
		case "and":
			for (var i = 0; i < gate.to.length; i++) {
				gate.to[i].value.push(gate.value[0] & gate.value[1]);
				if (next(gate.to[i])) {
					result = logic(gate.to[i]);
				}
			}
			gate.value = [];
			break;
		case "or":
			for (var i = 0; i < gate.to.length; i++) {
				gate.to[i].value.push(gate.value[0] | gate.value[1]);
				if (next(gate.to[i])) {
					result = logic(gate.to[i]);
				}
			}
			gate.value = [];
			break;
		case "not":
			for (var i = 0; i < gate.to.length; i++) {
				gate.to[i].value.push(gate.value[0] ^ 1);
				if (next(gate.to[i])) {
					result = logic(gate.to[i]);
				}
			}
			gate.value = [];
			break;
		case "in":
			for (var i = 0; i < gate.to.length; i++) {
				gate.to[i].value = gate.value;
				if (next(gate.to[i])) {
					result = logic(gate.to[i]);
				}
			}
			gate.value = [];
			break;
		default:
			result = gate.value;
			gate.value = [];
			return result;
			break;
	}
	return result;
};

var connect =  function (fromGate, toGate) {
	fromGate.to.push(toGate);
	toGate.from.push(fromGate);
};

