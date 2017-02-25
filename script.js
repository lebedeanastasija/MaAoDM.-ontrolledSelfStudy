var points = [],
	сenters = [],
	classes = [],
	pointsCount = 20000,
	coordinateCount = 2;
	classesCount = 6;

var svg;

var colors = ["red", "green", "blue", "purple", "yellow", "black"];

function onLoad (){

	svgContainer = d3.select("body")
	.append("svg")                                 
	.attr("width", 200)
	.attr("height", 200);

   points = generatePoints(pointsCount);
   centers = generateClassCenters(classesCount);

   initializeClasses();
   dividePointToClasses();
   drawClasses();

   //console.log(points);
   //console.log(centers);
   //console.log(classes);
   //console.log(pointsAreEqual(points[1024], points[10000]));
   //console.log(points[1024], " ", points[10000]);
   //console.log(findDistanceBetweenPoints(points[1024], points[10000]));
}

function drawClasses() {

	classes.forEach(function(pointsClass, index) {
		pointsClass.forEach(function(point) {
			svgContainer.append("circle")
		   .attr("cx", point[0])
		   .attr("cy", point[1])
		   .attr("r", 2)
		   .style("fill", colors[index]);
		});
	});
}

function dividePointToClasses(){

	points.forEach(function(point) {
		if(!(isClassCenter(point))) {
			var minDistance,
				ownerClassIndex = 0;

			centers.forEach(function(center, index) {
				if(minDistance > findDistance(point, center) || minDistance === undefined) {
					minDistance = findDistance(point, center);
					ownerClassIndex = index;
				}
			});
			classes[ownerClassIndex].push(point);
		}
	});
}

function findDistance(point1, point2) {
	return Math.pow((Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2) ), 0.5);
}

function generatePoints(pointsCount) {
	var points = []
	for(var i = 0; i < pointsCount; i++) {
		var vector = [];
		for(var j = 0; j < coordinateCount; j++){
			vector.push(randomInRange(1, 500));
		}
		points.push(vector);
	}

	return points;
}

function generateClassCenters(classCount) {
	var centers = []
	for(var i = 0; i < classCount; i++) {
		var index = randomInRange(0, pointsCount - 1);
		centers.push(points[index]);
	}

	return centers;
}

function randomInRange(min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pointsAreEqual(point1, point2) {
	var result = true;
	for(var i = 0; i < coordinateCount; i++){
		if(point1[i] !== point2[i]) {
			result = false;
		}
	}

	return result;
}

function isClassCenter(point){
	var result = false;
	centers.forEach(function(center) {
		if(pointsAreEqual(point, center)) {
			result = true;
		}
	});
	return result;
}

function initializeClasses(){
	for(var i = 0; i < classesCount; i++) {
		classes.push([]);
	}
}