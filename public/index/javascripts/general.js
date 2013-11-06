var canvas = document.getElementById('canvasMap');

var supportCanvas = true;
var context;
try {
    context = canvas.getContext('2d');
} catch (e) {
    supportCanvas = false;
}
if (!supportCanvas) 
    return;

var startPosX = 40;
var intervalTimer = setInterval(function() {
    startPosX++;

    context.fillRect(startPosX, startPosX, 100, 100);
}, 50);

setTimeout(function() {
    clearInterval(intervalTimer);
}, 3000);