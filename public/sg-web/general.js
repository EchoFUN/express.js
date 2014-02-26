/**
 *
 *
 *
 */

// 首次加载绘图额时候的数据
var Servers = [{
  id : '9',
  name : '统一权限',
  appKey : 'mtupm'
}, {
  id : '10',
  name : '统一认证',
  appKey : 'mtsso'
}, {
  id : '11',
  name : 'saleskits系统',
  appKey : 'mtks'
}, {
  id : '12',
  name : 'POI雷达',
  appKey : 'mtradar'
}, {
  id : '13',
  name : '主站/mis',
  appKey : 'mtmis'
}];

var Links = [[9, 13], [10, 13], [9, 11], [12, 13]];

var groupLocation = [{
  id: '1',
  x: '11',
  y: '12'
}, {
  id: '1',
  x: '11',
  y: '12'
}, {
  id: '1',
  x: '11',
  y: '12'
}];

var lineLocation = [];

// 首次加载绘图额时候的数据 ---------------------- end

// 当前的画布
var brush = Snap('#brush');

var wh = $(window).height() - 80, ww = $(window).width() - 50;

// 画出服务器
var serverList = {};
var moveServer = function(dx, dy, x, y) {
  var circle = this.select('circle');

  var xPos = x - parseInt(circle.attr('cx'), 10);
  var yPos = y - parseInt(circle.attr('cy'), 10);
  this.attr('transform', 'matrix(1,0,0,1,' + xPos + ',' + yPos + ')');
  
  rePaint();
};
for (var i = 0; i < Servers.length; i++) {
  var serverData = Servers[i];

  var xLocate = Math.random() * ww, yLocate = Math.random() * wh;
  var server = brush.rect(xLocate, yLocate, 100, 55).attr({
    'fill' : '#CCCCCC',
    'stroke' : '#3C6EBA',
    'strokeWidth' : 2,
    'data-sid' : serverData.id
  });
  var serverHandler = brush.circle(xLocate, yLocate, 5).attr({
    'fill' : '#3C6EBA',
    'stroke' : '#3C6EBA',
    'strokeWidth' : 2,
  });
  var text1 = brush.text(xLocate + 5, yLocate + 20, serverData.appKey).attr({
    'font-size': 10,
    'fill': '#3C6EBA'
  });
  var text2 = brush.text(xLocate + 5, yLocate + 40, serverData.name).attr({
    'font-size': 10,
    'fill': '#3C6EBA'
  });
  

  var serverPair = brush.g(server, serverHandler, text1, text2);
  serverHandler.drag(moveServer, function() {
  }, function() {
  }, serverPair);
  serverList[server.id] = server;
}

var getServer = function(id) {
  for (var i in serverList) {
    if (serverList[i].attr('data-sid') == id) {
      return serverList[i];
    }
  }
};

// 画出连接
var lines = {};
for (var i = 0; i < Links.length; i++) {
  var link = Links[i];
  var server1 = getServer(link[0]), server2 = getServer(link[1]);

  var server1X = parseInt(server1.attr('x'), 10), server1Y = parseInt(server1.attr('y'), 10);
  var server2X = parseInt(server2.attr('x'), 10), server2Y = parseInt(server2.attr('y'), 10);
  var line = brush.line(server1X, server1Y, server2X, server2Y).attr({
    'stroke' : '#3C6EBA',
    'strokeWidth' : 1
  });
  brush.prepend(line);
  
  lines[line.id] = {
    'line': line,
    'server1': server1,
    'server2': server2
  };
}

var rePaint = function() {
  for (var i in lines) {
    var line = lines[i].line;
    var server1 = lines[i].server1, server2 = lines[i].server2;
    var source1 = server1.parent().select('circle'), source2 = server2.parent().select('circle');
    
    var server1Matrix = server1.parent().attr('transform').globalMatrix;
    var server2Matrix = server2.parent().attr('transform').globalMatrix;
    var server1X = parseInt(source1.attr('cx'), 10) + server1Matrix.e, server1Y = parseInt(source1.attr('cy'), 10) + server1Matrix.f;
    var server2X = parseInt(source2.attr('cx'), 10) + server2Matrix.e, server2Y = parseInt(source2.attr('cy'), 10) + server2Matrix.f;
    
    line.attr('x1', server1X).attr('x2', server2X).attr('y1', server1Y).attr('y2', server2Y);
  }
};











