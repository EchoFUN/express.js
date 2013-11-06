var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var canvasHeight = canvas.offsetHeight, canvasWidth = canvas.offsetWidth;

var shapes = [], isMoving = true;

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  var shapesLength = shapes.length;
  for (var j = 0; j < shapesLength; j++) {
    var tmpShape = shapes[j];
    
    // 实现运动轨迹
    var x = tmpShape.x + (tmpShape.radius * Math.cos(tmpShape.angle * Math.PI / 180));
    var y = tmpShape.y + (tmpShape.radius * Math.sin(tmpShape.angle * Math.PI / 180));
    tmpShape.angle += 5;
    if (tmpShape.angle > 360) {
      tmpShape.angle = 0;
    }
    
    ctx.fillRect(x, y, tmpShape.width, tmpShape.height);
  }

  if (isMoving) {
    setTimeout(animate, 33);
  }
}

document.addEventListener('click', function(evt) {
  var cursorX = evt.pageX, cursorY = evt.pageY;
  if (cursorX > x && cursorX < (x + 10) && cursorY > 250 && cursorY < 260) {
    isMoving = false;
  }
});

var Shape = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.radius = Math.random() * 30;
  this.angle = 0;
};

for (var i = 0; i < 10; i++) {
  var x = Math.random() * 250, y = Math.random() * 250;
  var width = height = Math.random() * 50;

  shapes.push(new Shape(x, y, width, height));
}

animate();
