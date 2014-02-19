/**
 * SVG 画出直线接口的封装
 *
 */

function Pointer(x, y) {
  this.x = x || 0;
  this.y = y || 0;

  // 点的一些其他信息

}

/**
 * 获取当前的图表
 *
 */
var chart;
function getChart() {
  if (chart) {
    return chart;
  }
  return ( chart = d3.select('body').append('svg').attr('id', 'chart').attr('height', '100%').attr('width', '100%')).attr('style', 'position:absolute;top:0;left:0;z-index: -1;');
}

/**
 * 画直线的接口
 *
 * @param {Object} points 点列表
 */
function draw(points) {
  if (points.constructor !== Array || !d3) {
    return;
  }
  var chart = getChart();

  var xList = [], yList = [];
  for (var i = 0; i < points.length; i++) {
    xList.push(points[i].x);
    yList.push(points[i].y);
  }

  // 直线生成器
  var lineFunction = d3.svg.line().x(function(d) {
    return d.x;
  }).y(function(d) {
    return d.y;
  }).interpolate('cardinal');

  // 生成节点圆圈和直线
  chart.selectAll('path').remove();
  chart.append('path').attr('d', lineFunction(points)).attr('stroke', 'green').attr('stroke-width', 1).attr('fill', 'none');
  chart.selectAll('circle').data(points).enter().append('circle').attr('cx', function(d) {
    return d.x;
  }).attr('cy', function(d) {
    return d.y;
  }).attr('r', 5).attr('stroke', 'green').attr('stroke-width', 1).attr('fill', 'white');
}

