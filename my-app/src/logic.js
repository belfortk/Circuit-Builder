// ../src/logic.js

function LGate (type, label) {
	this.type = type;
	this.label = label;
	this.from = [];
	this.to = [];
	this.value = [];
}

var logic = function(gate) {
	console.log(gate.label + ": " + gate.value);
	var result = [];
	var next = function(gate) {
		if ((gate.type === "and" || gate.type === "or") && gate.value.length === 2) {
			//console.log(gate);
			return true;
		} else if (gate.type === "not" || gate.type === "out") {
			return true;
		} else {
			return false;
		}
	}

	switch (gate.type) {
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

