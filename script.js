var points = [],
	сenters = [],
	classes,
	pointsCount = 12000,
	coordinateCount = 2;
	classesCount = 8,
	isTheSameClasses = true;

var svg;

var colors = [
	"red",
 	"brown",
 	"blue", 
 	"purple", 
 	"yellow", 
 	"orange", 
 	"gray", 
 	"green", 
 	"crimson", 
 	"lavender", 
 	"indigo", 
 	"moccasin", 
 	"orchid", 
 	"plum", 
 	"silver", 
 	"tan"
 	];

function onLoad (){

	svgContainer = d3.select("div")
	.append("svg")                                 
	.attr("width", 400)
	.attr("height", 400);

	points = generatePoints(pointsCount);
    centers = generateClassCenters(classesCount);
    initializeClasses();
    dividePointsToClasses();

    drawClasses();   
   
    //console.log(classes);
    //console.log(pointsAreEqual(points[1024], points[10000]));
    //console.log(findDistanceBetweenPoints(points[1024], points[10000]));
    /*console.log(
    				classes[0].length +
   				  	classes[1].length + 
	   				classes[2].length + 
   				 	classes[3].length + 
   				 	classes[4].length + 
   				 	classes[5].length);*/
}

function nextDistribution(){
	var newCenters = recalculateCenters();
	console.log(isTheSameClasses);
	if(!isTheSameClasses){
		initializeClasses();
		d3.selectAll("circle").remove();
		centers = newCenters;
		dividePointsToClasses();
		drawClasses();
	}
	
}

function finishDistribution() {
	isTheSameClasses = false;
	while(!isTheSameClasses){
		var newCenters = recalculateCenters();
		console.log(isTheSameClasses);
		initializeClasses();
		d3.selectAll("circle").remove();
		centers = newCenters;
		dividePointsToClasses();
	}
	drawClasses();
	console.log(isTheSameClasses);
}

function recalculateCenters() {	
	var newCenters = [];

	isTheSameClasses = true;
	classes.forEach(function(pointsClass, index) {
		var vector = [0, 0];

		pointsClass.forEach(function(point) {
			vector[0] += point[0];
			vector[1] += point[1];
		});

		vector[0] = Math.floor(vector[0] / pointsClass.length);
		vector[1] = Math.floor(vector[1] / pointsClass.length);

		newCenters.push(vector);
		if(!pointsAreEqual(vector, centers[index])) {
			isTheSameClasses = false;
		}
	});

	return newCenters;
}

function drawClasses() {
	classes.forEach(function(pointsClass, index) {
		pointsClass.forEach(function(point) {
			svgContainer.append("circle")
		   .attr("cx", point[0])
		   .attr("cy", point[1])
		   .attr("r", 3)
		   .style("fill", colors[index]);
		});
		svgContainer.append("circle")
		.attr("cx", centers[index][0])
		.attr("cy", centers[index][1])
		.attr("r", 6)
		.style("fill", "black");
	});
}



function dividePointsToClasses(){
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
		points.splice(index,1);
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
	classes = []
	for(var i = 0; i < classesCount; i++) {
		classes.push([]);
	}
}