/**
 * svg画直线函数封装
 *
 */

// 计算坐标值
var lineData = [];

var drawLine = function() {
  var xList = [], yList = [];
  var i;
  for (i in pathLinks) {
    if (i != 'path') {
      var sl = parseInt(pathLinks[i].offset().left), st = parseInt(pathLinks[i].offset().top);
      xList.push(sl);
      yList.push(st);
    } else {
      var path = pathLinks[i];
      for (var j = 0; j < path.length; j++) {
        var tl = parseInt(path[j].offset().left), tt = parseInt(path[j].offset().top);
        xList.push(tl);
        yList.push(tt);
      }
    }
  }

  // 计算宽度和高度
  var svgHeight = d3.max(yList) - d3.min(yList) + 10;
  var svgWidth = d3.max(xList) - d3.min(xList) + 10;
  var chart = d3.select('body').append('svg').attr('style', 'position:absolute;left:' + d3.min(xList) + 'px;top:' + d3.min(yList) + 'px;').attr('width', svgWidth).attr('height', svgHeight);

  //线生成器
  var lineFunction = d3.svg.line().x(function(d) {
    return d.x - d3.min(xList) + 5;
  }).y(function(d) {
    return d.y - d3.min(yList) + 5;
  }).interpolate('linear');

  //把path扔到容器中，并给d赋属性
  var lineGraph = chart.append('path').attr('d', lineFunction(lineData)).attr('stroke', 'green').attr('stroke-width', 2).attr('fill', 'none');
};

var drawDot = function(evt) {
  return '<span class="dot" style="left:' + evt.offsetX + 'px;top:' + evt.offsetY + 'px;"></span>';
};

var pathLinks = {};
pathLinks.path = [];

$('.box .content').on('click', function(evt) {
  evt.stopPropagation();

  var self = $(this);
  var dot = $(drawDot(evt));
  self.append(dot);

  // 加入数据列表
  lineData.push({
    'x' : dot.offset().left,
    'y' : dot.offset().top
  });
  if (pathLinks.start) {
    pathLinks.end = dot;

    // 开始划线
    drawLine();
  } else {
    pathLinks.start = dot;
  }
});

var $body = $('body');
$(document).on('click', function(evt) {

  var dot = $(drawDot(evt));
  $body.append(dot);

  dot.contextMenu('myMenu', {
    //菜单项样式
    itemStyle : {
      fontFamily : 'verdana',
      backgroundColor : 'green',
      color : 'white',
      border : 'none',
      padding : '1px'

    }
  });
  pathLinks.path.push(dot);
  lineData.push({
    'x' : dot.offset().left,
    'y' : dot.offset().top
  });
});

