/**
 * D3研究
 *
 */

var data = [4, 8, 15, 16, 23, 42, 8, 15, 16, 23, 42, 8, 15, 16, 23, 42, 8, 15, 16, 23, 42];

var w = 20, h = 80;

var x = d3.scale.linear().domain([0, 1]).range([0, w]);

var y = d3.scale.linear().domain([0, 100]).rangeRound([0, h]);

var chart = d3.select("body").append("svg").attr("class", "chart").attr("width", w * data.length - 1).attr("height", h);

chart.selectAll("rect").data(data).enter().append("rect").attr("x", function(d, i) {
  return x(i) - .5;
}).attr("y", function(d) {
  return h - y(d) - .5;
}).attr("width", w).attr("height", function(d) {
  return y(d);
});






function redraw1() {
  chart.selectAll("rect").data(data).transition().duration(1000).attr("y", function(d) {
    return h - y(d) - .5;
  }).attr("height", function(d) {
    return y(d);
  });
}
