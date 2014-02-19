var p1 = new Pointer(100, 200);
var p2 = new Pointer(200, 400);
var p3 = new Pointer(500, 90);
var p4 = new Pointer(530, 600);
var p5 = new Pointer(630, 620);

var pathArray = [p1, p2, p3, p4, p5];

// setInterval(function() {
// pathArray.push(pathArray.shift());
draw(pathArray);
// }, 1000);