var counter = 90;

var p1 = new Pointer(100, 200);
var p2 = new Pointer(200, 400);
var p3 = new Pointer(500, counter);
var p4 = new Pointer(530, 600);
var p5 = new Pointer(630, 620);

var pathArray = [p1, p2, p3, p4, p5];

var chart = draw(pathArray);
var counterY = 90, counterX = 500;

var circles = chart.selectAll('circle')[0];
for (var i in circles) {
  (function(circle) {
    $(circle).draggable({'drag': function(event, ui) {
      
      counterX = event.offsetX;
      counterY = event.offsetY;
  
      var p1 = new Pointer(100, 200);
      var p2 = new Pointer(200, 400);
      var p3 = new Pointer(counterX, counterY);
      var p4 = new Pointer(530, 600);
      var p5 = new Pointer(630, 620);
      
      var pathArray = [p1, p2, p3, p4, p5];
      
      var chart = draw(pathArray);
      
      
    }});
    
  })(circles[i]);
  
  
}