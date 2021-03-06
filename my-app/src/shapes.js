// ../src/shapes.js

function makeAndGate (s, x, y, label) {
	var radius = 20;
	var andP = s.path("m 0,0 c -7.26998,0 -13.122844,6.783271 -13.122844,15.208568 v 79.419914 c 0,8.4253 5.852864,15.208 13.122844,15.208 h 78.880209 c 0.38097,0 0.75707,-0.0228 1.12962,-0.0593 61.85855,-0.71256 62.764,-109.020895 -0.005,-109.718421 -0.37122,-0.03626 -0.74593,-0.05875 -1.12552,-0.05875 z");
	andP.attr({id: label + "S", fill: "#ff0000", "fill-opacity": 1, style: "opacity:1;"});
	var box = andP.getBBox();
	var andR = s.rect(box.x, box.y, box.width, box.height).attr({id: label + "B", visibility: "hidden", fill: "none", stroke: "#84ddff", "stroke-width": 5, "stroke-dasharray": "20,20"});
	var andCI0 = s.circle(box.x-radius/2, box.y, radius).attr({id: label+"CI0", fill: "#84ddff", visibility: "hidden"});
	var andCI1 = s.circle(box.x-radius/2, box.y+box.height, radius).attr({id: label+"CI1", fill: "#84ddff", visibility: "hidden"});
	var andCO0 = s.circle(box.x+box.width+radius, box.y+box.height/2, radius).attr({id: label+"CO0", fill: "#84ddff", visibility: "hidden"});
	var andT = s.text(0.543783, 73.968241, "AND").attr({id: label + "T", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:50.79999924px;font-family:Orkney;-inkscape-font-specification:'Orkney, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;fill:#ffffff;stroke-width:0.26458332", "pointer-events": "none"});
	var andG = s.group(andP, andR, andCI0, andCI1, andCO0, andT).attr({id: label});
	andG.attr({transform: "translate(" +  (x-17.48) + "," + (y-13) + ") scale(0.25)", cx: x, cy: y});
	return andG;
}

function makeNotGate(s, x, y, label) {
	var radius = 20;
	var notP = s.path("m 75.604712,-58.792831 a 5.3562737,5.6433762 0 0 0 -5.515456,5.675429 l 0.453561,78.228029 -0.453561,78.228933 a 5.3562737,5.6433762 0 0 0 8.062309,4.90284 L 142.22739,68.716177 206.75585,30.013459 a 5.3562737,5.6433762 0 0 0 0,-9.805658 l -64.52846,-38.701812 -64.075825,-39.52622 a 5.3562737,5.6433762 0 0 0 -2.546853,-0.7726 z M 231.31909,3.2496799 A 21.859776,21.859776 0 0 0 209.45995,25.10972 21.859776,21.859776 0 0 0 231.31909,46.96976 21.859776,21.859776 0 0 0 253.17911,25.10972 21.859776,21.859776 0 0 0 231.31909,3.2496799 Z");
	notP.attr({id: label + "S", fill: "#ffff00", "Fill-opacity": 1, style: "fill-rule:nonzero;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"});
	var box = notP.getBBox();
	var notR = s.rect(box.x, box.y, box.width, box.height).attr({id: label + "B", visibility: "hidden", fill: "none", stroke: "#84ddff", "stroke-width": 5, "stroke-dasharray": "20,20"});	
	var notCI0 = s.circle(box.x-radius, box.y+box.height/2, radius).attr({id: label+"CI0", fill: "#84ddff", visibility: "hidden"});
	var notCO0 = s.circle(box.x+box.width+radius, box.y+box.height/2, radius).attr({id: label+"CO0", fill: "#84ddff", visibility: "hidden"});
	var notT = s.text(72.35701, 44.160145, "NOT").attr({id: label + "T", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:50.79999924px;font-family:Orkney;-inkscape-font-specification:'Orkney, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;fill:#ffffff;stroke-width:0.26458332", "pointer-events": "none"});
	var notG = s.group(notP, notR, notT, notCI0, notCO0).attr({id: label});
	notG.attr({transform: "translate(" +  (x-34) + "," + (y-6) + ") scale(0.25)", cx: x, cy: y});
	return notG;
}

function makeOrGate(s, x, y, label) {
	var radius = 20;
	var orP = s.path("m 51.846365,10.465391 a 2.9171977,2.9145956 0 0 0 -1.794906,5.226458 l 0.186897,0.143028 c 0.89164,0.792731 1.803448,2.0492 2.739332,3.27026 0.865249,1.132007 1.701734,2.27325 2.509188,3.422725 0.808148,1.150459 1.586972,2.308831 2.336705,3.474869 0.749929,1.166335 1.470604,2.340183 2.162241,3.521055 0.691606,1.180833 1.354512,2.369358 1.988258,3.564261 0.633652,1.194728 1.238144,2.396122 1.813793,3.603495 0.575566,1.207184 1.122033,2.420085 1.63983,3.639251 0.517757,1.219083 1.006598,2.443682 1.46634,3.673024 0.459844,1.229598 0.890978,2.463988 1.292869,3.702819 0.40184,1.238675 0.774713,2.48242 1.118897,3.730133 0.344214,1.247819 0.659708,2.498993 0.945918,3.753475 0.28624,1.254626 0.543391,2.512758 0.771945,3.774333 0.228482,1.261229 0.427762,2.525886 0.598465,3.792706 0.170662,1.266546 0.312603,2.53621 0.425486,3.807607 0.112934,1.271888 0.197035,2.544532 0.252016,3.818532 0.05494,1.274183 0.08097,2.550347 0.078,3.82797 -0.0031,1.27714 -0.03505,2.555376 -0.09594,3.833925 -0.06088,1.278805 -0.15047,2.557976 -0.26941,3.83691 -0.118941,1.278883 -0.267217,2.557578 -0.444377,3.83641 -0.177192,1.278982 -0.383001,2.557209 -0.61835,3.833926 -0.23538,1.27691 -0.500445,2.553243 -0.794311,3.827969 -0.293877,1.27476 -0.616464,2.548222 -0.968786,3.81903 -0.352363,1.270948 -0.734154,2.539642 -1.145239,3.806118 -0.41088,1.26584 -0.851577,2.52938 -1.321702,3.79072 -0.470125,1.26136 -0.969473,2.51933 -1.498156,3.77284 -0.528765,1.25371 -1.087337,2.5043 -1.675613,3.75099 -0.588071,1.24628 -1.206113,2.48821 -1.853552,3.72567 -0.647388,1.23735 -1.324009,2.46975 -2.031011,3.69736 -0.707114,1.22778 -1.444035,2.45044 -2.210456,3.66656 -0.766595,1.21639 -1.562925,2.42655 -2.38939,3.63079 -0.826397,1.20415 -1.68284,2.40211 -2.569339,3.59308 -0.840423,1.12906 -1.545266,1.99724 -2.46843,3.14411 -0.02746,0.0265 -0.0427,0.0412 -0.07555,0.0735 -0.07711,0.0759 -0.147477,0.13884 -0.30321,0.31833 -0.07786,0.0897 -0.145129,0.0133 -0.477182,0.73153 -0.08301,0.17956 -0.211659,0.42044 -0.259966,0.97636 -0.04831,0.55593 0.156325,1.73546 1.004569,2.46474 0.848246,0.72927 1.680614,0.72722 2.09613,0.70024 0.415514,-0.027 0.613441,-0.10179 0.765482,-0.15395 l -0.558704,0.13211 c 3.073814,-0.41244 6.2028,-0.79559 9.369691,-1.16558 3.167004,-0.37001 6.371881,-0.72712 9.597351,-1.08561 3.2255,-0.3585 6.471593,-0.71857 9.722615,-1.09705 3.25089,-0.37847 6.506381,-0.77506 9.74946,-1.2053 3.243028,-0.43025 6.473643,-0.8941 9.676387,-1.40843 3.20276,-0.51432 6.37731,-1.07911 9.50738,-1.71037 1.56502,-0.31562 3.11947,-0.64803 4.6605,-0.99919 1.5406,-0.35109 3.06854,-0.72097 4.58144,-1.11195 1.51329,-0.39107 3.01115,-0.80306 4.49151,-1.23808 1.48054,-0.43507 2.94423,-0.89332 4.38907,-1.37712 1.4445,-0.48371 2.87019,-0.99266 4.27478,-1.5296 1.40471,-0.53699 2.78825,-1.10195 4.14802,-1.69647 1.36022,-0.59471 2.69677,-1.21976 4.00785,-1.87674 1.31097,-0.65693 2.59656,-1.34605 3.85475,-2.07042 1.25806,-0.72429 2.48809,-1.48352 3.68773,-2.27949 1.19991,-0.79617 2.3691,-1.62925 3.5053,-2.5015 1.1361,-0.87217 2.2401,-1.78361 3.30798,-2.73688 1.06758,-0.95301 2.09918,-1.9472 3.09226,-2.9847 0.99303,-1.03749 1.94734,-2.1185 2.8601,-3.24394 0.9128,-1.12546 1.78402,-2.29507 2.6106,-3.51113 0.8267,-1.21622 1.60863,-2.478531 2.34366,-3.787738 0.73495,-1.309075 1.42323,-2.665459 2.06184,-4.070322 0.63874,-1.405151 1.22739,-2.858436 1.76458,-4.359847 0.53718,-1.501383 1.02347,-3.052264 1.4559,-4.654349 0.43231,-1.601565 0.81075,-3.253257 1.13431,-4.956792 0.32364,-1.703805 0.59222,-3.459298 0.80376,-5.267678 a 2.9171977,2.9145956 0 0 0 0,-0.676398 c -0.21108,-1.804435 -0.47869,-3.555816 -0.80127,-5.255759 -0.32258,-1.699876 -0.70051,-3.348471 -1.13132,-4.946859 -0.43079,-1.598237 -0.91448,-3.146133 -1.44994,-4.645408 -0.5355,-1.499335 -1.12256,-2.949723 -1.75862,-4.351908 -0.63615,-1.402351 -1.3216,-2.757012 -2.05389,-4.064358 -0.73225,-1.307329 -1.51115,-2.567572 -2.33471,-3.78228 -0.8236,-1.21475 -1.69194,-2.383471 -2.60116,-3.507645 -0.90927,-1.124257 -1.85981,-2.203733 -2.84917,-3.240463 -0.98914,-1.036511 -2.01691,-2.030924 -3.08081,-2.983711 -1.06374,-0.952621 -2.16336,-1.863733 -3.29556,-2.735894 -1.13214,-0.872129 -2.29681,-1.705306 -3.49239,-2.501489 -1.19558,-0.796204 -2.42192,-1.555571 -3.6753,-2.279996 -1.25353,-0.724515 -2.53415,-1.413923 -3.84084,-2.071413 -1.30702,-0.657667 -2.63978,-1.282636 -3.99491,-1.877731 -1.35544,-0.595233 -2.73386,-1.160874 -4.13361,-1.698449 -1.39959,-0.537522 -2.8203,-1.047018 -4.26034,-1.531585 -1.44001,-0.484545 -2.89921,-0.943662 -4.37518,-1.379618 -1.47607,-0.435978 -2.969,-0.848743 -4.47708,-1.240564 -1.50765,-0.391703 -3.03079,-0.763282 -4.56754,-1.115414 -1.53677,-0.352135 -3.08661,-0.684829 -4.64658,-1.001192 -3.12079,-0.632903 -6.28602,-1.19911 -9.48003,-1.714839 -3.19389,-0.515725 -6.41608,-0.981245 -9.65103,-1.412414 -3.234992,-0.431177 -6.482468,-0.828096 -9.72607,-1.206793 -3.243756,-0.378716 -6.483739,-0.738687 -9.703223,-1.096543 -3.190896,-0.354679 -6.24513,-0.74224 -9.436805,-1.113925 -3.16112,-0.368128 -1.882529,-0.2375 -4.999483,-0.65306 a 2.9171977,2.9145956 0 0 0 -0.07554,-0.0089 L 52.13716,10.481817 a 2.9171977,2.9145956 0 0 0 -0.290785,-0.01638 z");
	orP.attr({id: label + "S", fill: "#0000ff", "fill-opacity": 1, style: "fill-rule:nonzero;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"});
	var box = orP.getBBox();
	var orR = s.rect(box.x, box.y, box.width, box.height).attr({id: label + "B", visibility: "hidden", fill: "none", stroke: "#84ddff", "stroke-width": 5, "stroke-dasharray": "20,20"});
	var orCI0 = s.circle(box.x-radius/2, box.y, radius).attr({id: label+"CI0", fill: "#84ddff", visibility: "hidden"});
	var orCI1 = s.circle(box.x-radius/2, box.y+box.height, radius).attr({id: label+"CI1", fill: "#84ddff", visibility: "hidden"});
	var orCO0 = s.circle(box.x+box.width+radius, box.y+box.height/2, radius).attr({id: label+"CO0", fill: "#84ddff", visibility: "hidden"});
	var orT = s.text(83.761383, 93.807991, "OR").attr({id: label + "T", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:50.79999924px;font-family:Orkney;-inkscape-font-specification:'Orkney, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;fill:#ffffff;fill-opacity:1;stroke-width:0.26458332", "pointer-events": "none"});
	var orG = s.group(orP, orR, orCI0, orCI1, orCO0, orT).attr({id: label});
	orG.attr({transform: "translate(" +  (x-27) + "," + (y-19) + ") scale(0.25)", cx: x, cy: y});
	return orG;
}

function makeInGate(s, x, y, label) {
	var radius = 20;
	var inP = s.rect(0, 0, 137.58333, 177.64879, 10.757587);
	inP.attr({id: label + "S", fill: "#000000", "fill-opacity": 1, style: "opacity:1;"});	
	var box = inP.getBBox();
	var inR = s.rect(box.x, box.y, box.width, box.height).attr({id: label + "B", visibility: "hidden", fill: "none", stroke: "#84ddff", "stroke-width": 5, "stroke-dasharray": "20,20"});	
	var inCO0 = s.circle(box.x+box.width+radius/2, box.y, radius).attr({id: label+"CO0", fill: "#84ddff", visibility: "hidden"});
	var inCO1 = s.circle(box.x+box.width+radius/2, box.y+box.height, radius).attr({id: label+"CO1", fill: "#84ddff", visibility: "hidden"});
	var inT = s.text(39.803436,106.451813, "IN").attr({id: label + "T", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:50.79999924px;font-family:Orkney;-inkscape-font-specification:'Orkney, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;fill:#ffffff;stroke-width:0.26458332", "pointer-events": "none"});
	var inG = s.group(inP, inR, inCO0, inCO1, inT).attr({id: label});
	inG.attr({transform: "translate(" +  (x-17) + "," + (y-22) + ") scale(0.25)", cx: x, cy: y});
	return inG;
}

function makeOutGate(s, x, y, label) {
	var radius = 20;
	var outP = s.rect(0, 0, 137.58333, 177.64879, 10.757587);
	outP.attr({id: label + "S", fill: "#000000", "fill-opacity": 1, style: "opacity:1;"});
	var box = outP.getBBox();
	var outR = s.rect(box.x, box.y, box.width, box.height).attr({id: label + "B", visibility: "hidden", fill: "none", stroke: "#84ddff", "stroke-width": 5, "stroke-dasharray": "20,20"});	
	var outCI0 = s.circle(box.x-radius/2, box.y, radius).attr({id: label+"CI0", fill: "#84ddff", visibility: "hidden"});
	var outCI1 = s.circle(box.x-radius/2, box.y+box.height, radius).attr({id: label+"CI1", fill: "#84ddff", visibility: "hidden"});
	var outT = s.text(14.437648, 106.451813, "OUT").attr({id: label + "T", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:50.79999924px;font-family:Orkney;-inkscape-font-specification:'Orkney, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;fill:#ffffff;stroke-width:0.26458332", "pointer-events": "none"});
	var outG = s.group(outP, outR, outCI0, outCI1, outT).attr({id: label});
	outG.attr({transform: "translate(" +  (x-17) + "," + (y-22) + ") scale(0.25)", cx: x, cy: y});
	return outG;
}
