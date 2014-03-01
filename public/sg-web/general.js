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

var Groups = [{
  id : '1'
}, {
  id : '2'
}];

var Relations = [{
  gid : 1,
  sids : [9, 10]
}, {
  gid : 2,
  sids : [11, 12, 13]
}];

// 首次加载绘图额时候的数据 ---------------------- end

var winHeight = $(window).height(), winWidth = $(window).width();
var serverWidth = 100, serverHeight = 55;
var brush = Snap('#brush');

var getServerData = function(id) {
  for (var i = 0; i < Servers.length; i++) {
    if (Servers[i].id == id) {
      return Servers[i];
    }
  }
};

var getRelatedServers = function(gid) {
  for (var i = 0; i < Relations.length; i++) {
    if (Relations[i].gid == gid) {
      return Relations[i].sids;
    }
  }
};

var drawServers = function(servers, container, xLocate, yLocate) {
  for (var i = 0; i < servers.length; i++) {
    xLocate += 10;
    var server = getServerData(servers[i]);

    var server = brush.rect(xLocate, yLocate + 10, serverWidth, serverHeight).attr({
      'fill' : '#CCCCCC',
      'stroke' : '#3C6EBA',
      'strokeWidth' : 2,
      'data-sid' : server.id
    });
    var serverHandler = brush.circle(xLocate, yLocate + 10, 5).attr({
      'fill' : '#3C6EBA',
      'stroke' : '#3C6EBA',
      'strokeWidth' : 2,
    });
    xLocate += 100;
    var serverPairG = brush.g(server, serverHandler);
    container.append(serverPairG);
  }
};

var drawGroup = function() {
  for (var i = 0; i < Groups.length; i++) {
    var group = Groups[i];
    var containedServers = getRelatedServers(group.id);

    var xLocate = Math.random() * winWidth, yLocate = Math.random() * winHeight;
    var serverSize = containedServers.length;
    var groupContent = brush.rect(xLocate, yLocate, serverSize * serverWidth + (serverSize + 1) * 10, serverHeight + 20).attr({
      'fill' : 'none',
      'stroke' : '#3C6EBA',
      'strokeWidth' : 1,
    });
    var groupTitle = brush.rect(xLocate - 1, yLocate - 30, serverSize * serverWidth + 2 + (serverSize + 1) * 10, 30).attr({
      'fill' : '#3C6EBA',
      'strokeWidth' : 0,
      'cursor' : 'move'
    });
    var groupPairG = brush.g(groupTitle, groupContent);
    drawServers(containedServers, groupPairG, xLocate, yLocate);
    groupPairG.drag();
  }
};

// 执行区域
drawGroup();

/* var wh = $(window).height() - 55, ww = $(window).width() - 100;

 // 当前的画布
 var brush = Snap('#brush');

 var serverWidth = 100, serverHeight = 55;

 var getServer = function(id) {
 for (var i=0; i<Servers.length; i++) {
 if (Servers[i].id == id) {
 return Servers[i];
 }
 }
 };

 // 首先在页面上随机画出分组框
 for (var i=0; i<GSRelation.length; i++) {
 var relation = GSRelation[i];
 var xLocate = Math.random() * ww, yLocate = Math.random() * wh;

 var serverSize = gSList.length;
 var groupContent = brush.rect(xLocate, yLocate, serverSize * serverWidth + (serverSize + 1)  * 10, serverHeight + 20 ).attr({
 'fill' : '#ffffff',
 'stroke' : '#3C6EBA',
 'strokeWidth' : 1,
 });
 var groupTitle = brush.rect(xLocate - 1, yLocate - 30, serverSize * serverWidth + 2 + (serverSize + 1)  * 10, 30 ).attr({
 'fill' : '#3C6EBA',
 'strokeWidth' : 0,
 'cursor': 'move'
 });

 var groupPair = brush.g(groupContent, groupTitle);

 for (var j=0; j<gSList.length; j++) {
 xLocate += 10;
 var serverData = gSList[j];

 var server = brush.rect(xLocate, yLocate + 10, 100, 55).attr({
 'fill' : '#CCCCCC',
 'stroke' : '#3C6EBA',
 'strokeWidth' : 2,
 'data-sid' : serverData.id
 });
 var serverHandler = brush.circle(xLocate, yLocate + 10, 5).attr({
 'fill' : '#3C6EBA',
 'stroke' : '#3C6EBA',
 'strokeWidth' : 2,
 });

 // 画入相关文字
 var tpServer = getServer(gId);
 var text1 = brush.text(xLocate + 5, yLocate + 20, tpServer.appKey).attr({
 'font-size': 10,
 'fill': '#3C6EBA'
 });
 var text2 = brush.text(xLocate + 5, yLocate + 40, tpServer.name).attr({
 'font-size': 10,
 'fill': '#3C6EBA'
 });

 xLocate += 100;
 serverPair = brush.g(server, serverHandler);
 groupPair.append(serverPair);
 }
 groupPair.drag();
 }
 */

/* var serverList = {};
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

 var lines = {};
 for (var i = 0; i < Links.length; i++) {
 var link = Links[i];
 var server1 = getServer(link[0]), server2 = getServer(link[1]);

 var server1X = parseInt(server1.attr('x'), 10), server1Y = parseInt(server1.attr('y'), 10);
 var server2X = parseInt(server2.attr('x'), 10), server2Y = parseInt(server2.attr('y'), 10);
 var line = brush.line(server1X, server1Y, server2X, server2Y).attr({
 'stroke' : '#000000',
 'strokeWidth' : 1
 });
 if (i == 2) {
 line.attr({
 'stroke': 'red'
 });
 }
 if (i == 3) {
 line.attr({
 'stroke': 'green'
 });
 }
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
 };  */

