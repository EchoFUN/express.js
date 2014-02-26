/**
 *
 *
 *
 */

// 当前的画布
var brush = Snap('#brush');

var p = brush.paper.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
    fill: "none",
    stroke: "#beceeb",
    strokeWidth: 5
});

p.drag();
