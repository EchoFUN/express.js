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

var ServerMachines = [{
  '9': [{load: '50'}, {load: '20'}, {load: '100'}]
}, {
  '12': [{load: '20'}, {load: '0'}]
}];

var Links = [[9, 13], [10, 12], [9, 11], [12, 13]];

var Groups = [{
  id : '1'
}, {
  id : '2'
}, {
  id : '3'
}];

var Relations = [{
  gid : 1,
  sids : [9, 12]
}, {
  gid : 2,
  sids : [11, 13]
}, {
  gid : 3,
  sids : [10]
}];
//test commit by wanghe
// 首次加载绘图额时候的数据 ---------------------- end

var winHeight = $(window).height(), winWidth = $(window).width();
var serverWidth = 100, serverHeight = 78;
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

var getMachines = function(sid) {
  for (var i = 0; i < ServerMachines.length; i++) {
    if (ServerMachines[i][sid]) {
      return ServerMachines[i][sid];
    }
  }
};

var drawedServers = {};
var drawServers = function(servers, container, xLocate, yLocate) {
  for (var i = 0; i < servers.length; i++) {
    xLocate += 10;
    var serverData = getServerData(servers[i]);

    var server = brush.rect(xLocate, yLocate + 10, serverWidth, serverHeight).attr({
      'fill' : '#CCCCCC',
      'stroke' : '#3C6EBA',
      'strokeWidth' : 2,
      'data-sid' : serverData.id
    });
    var serverHandler = brush.circle(xLocate, yLocate + 10, 5).attr({
      'fill' : '#3C6EBA',
      'stroke' : '#3C6EBA',
      'strokeWidth' : 2
    });
    var text1 = brush.text(xLocate + 5, yLocate + 30, serverData.appKey).attr({
      'font-size' : 10,
      'fill' : '#3C6EBA'
    });
    var text2 = brush.text(xLocate + 5, yLocate + 49, serverData.name).attr({
      'font-size' : 10,
      'fill' : '#3C6EBA'
    });
    var serverPairG = brush.g(server, serverHandler, text1, text2);
    var machines = getMachines(serverData.id);
    if (machines) {
      for (var j = 0; j < machines.length; j++) {
        var loadVal = machines[j].load;
        var redVal = parseInt(510 * loadVal / 100);
        var greenVal = 510 - redVal;
        var machineRect = brush.rect(xLocate + j * 25 + 6, yLocate + 60, 20, 20).attr({
          'fill': 'rgb(' + redVal + ',' + greenVal + ',0)'
        });
        serverPairG.append(machineRect);
      }
    }
    xLocate += 100;
    container.append(serverPairG);
    drawedServers[serverData.id] = server;
  }
};

var moveGroup = function(dx, dy, x, y) {
  var moveX = this.data('startX') + dx;
  var moveY = this.data('startY') + dy;
  this.attr('transform', 'matrix(1,0,0,1,' + moveX + ',' + moveY + ')');
  
  rePaintLine();
};

var startMoveGroup = function(x, y) {
  var maxtrix = this.attr('transform').globalMatrix;
  this.data('startX', maxtrix.e);
  this.data('startY', maxtrix.f);
};

var rePaintLine = function() {
   for (var i in drawedLines) {
    var line = drawedLines[i].line;
    var server1 = drawedLines[i].server1, server2 = drawedLines[i].server2;
    var source1 = server1.parent().select('circle'), source2 = server2.parent().select('circle');

    var server1Matrix = server1.parent().parent().attr('transform').globalMatrix;
    var server2Matrix = server2.parent().parent().attr('transform').globalMatrix;
    var server1X = parseInt(source1.attr('cx'), 10) + server1Matrix.e, server1Y = parseInt(source1.attr('cy'), 10) + server1Matrix.f;
    var server2X = parseInt(source2.attr('cx'), 10) + server2Matrix.e, server2Y = parseInt(source2.attr('cy'), 10) + server2Matrix.f;

    line.attr('x1', server1X).attr('x2', server2X).attr('y1', server1Y).attr('y2', server2Y);
  }
};

var drawGroup = function() {
  for (var i = 0; i < Groups.length; i++) {
    var group = Groups[i];
    var containedServers = getRelatedServers(group.id);

    var xLocate = Math.random() * winWidth, yLocate = Math.random() * winHeight;
    var serverSize = containedServers.length;
    var groupContent = brush.rect(xLocate, yLocate, serverSize * serverWidth + (serverSize + 1) * 10, serverHeight + 20).attr({
      'fill' : '#FFFFFF',
      'stroke' : '#3C6EBA',
      'strokeWidth' : 1
    });
    var groupTitle = brush.rect(xLocate - 1, yLocate - 30, serverSize * serverWidth + 2 + (serverSize + 1) * 10, 30).attr({
      'fill' : '#3C6EBA',
      'strokeWidth' : 0,
      'cursor' : 'move'
    });
    $(groupTitle.node).on('contextmenu', groupTitleContextMenu);
    var text = brush.text(xLocate + 7, yLocate - 9, '分组').attr({
      'fill' : '#FFFFFF'
    });
    
    var groupPairG = brush.g(groupTitle, groupContent, text);
    
    drawServers(containedServers, groupPairG, xLocate, yLocate);
    groupTitle.drag(moveGroup, startMoveGroup, function(){}, groupPairG);
  }
};

var drawedLines = {};
var drawLine = function() {
  for (var i = 0; i < Links.length; i++) {
    var link = Links[i];
    var server1 = drawedServers[getServerData(link[0]).id], server2 = drawedServers[getServerData(link[1]).id];

    var server1X = parseInt(server1.attr('x'), 10), server1Y = parseInt(server1.attr('y'), 10);
    var server2X = parseInt(server2.attr('x'), 10), server2Y = parseInt(server2.attr('y'), 10);
    var line = brush.line(server1X, server1Y, server2X, server2Y).attr({
      'stroke' : '#000000',
      'strokeWidth' : 1
    });
    if (i == 2) {
      line.attr({
        'stroke' : 'red',
        'strokeWidth' : 1
      });
    }
    if (i == 3) {
      line.attr({
        'stroke' : 'green'
      });
    }
    
    line.click(function(evt) {
      if (evt.button == 2) {
        debugger;
      }
    });    

    drawedLines[line.id] = {
      'line' : line,
      'server1' : server1,
      'server2' : server2
    };
  };
};

var deleteGroup = function() {
  
};

var groupTitleContextMenu = function(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  $('.context-menu').detach();
  var xPos = evt.pageX, yPos = evt.pageY;
  var contextMenuHTML = '<div class="context-menu" style="position:absolute;left:' + xPos + 'px;top:' + yPos + 'px;"><a onclick="deleteGroup(this)" href="javascript:;" class="item">删除分组</a><a href="javascript:;" class="item border-top-0">添加服务</a></div>';
  $('body').append(contextMenuHTML);
};

// 执行区域
drawGroup();
drawLine();

var drawEmptyGroup = function(menu) {
  var $menu = $(menu);
  var xLocate = $menu.offset().left, yLocate = $menu.offset().top;
  var groupContent = brush.rect(xLocate, yLocate + 30, 1 * serverWidth + 2 * 10, serverHeight + 20).attr({
    'fill' : '#FFFFFF',
    'stroke' : '#3C6EBA',
    'strokeWidth' : 1
  });
  var groupTitle = brush.rect(xLocate - 1, yLocate, 1 * serverWidth + 2 + (1 + 1) * 10, 30).attr({
    'fill' : '#3C6EBA',
    'strokeWidth' : 0,
    'cursor' : 'move'
  });
  $(groupTitle.node).on('contextmenu', groupTitleContextMenu);
  var newGroupG = brush.g(groupTitle, groupContent);
  brush.prepend(newGroupG);
  newGroupG.drag();
};

$('#brush').on('contextmenu', function(evt) {
  evt.preventDefault();
  $('.context-menu').detach();
  var xPos = evt.pageX, yPos = evt.pageY;
  var contextMenuHTML = '<div class="context-menu" style="position:absolute;left:' + xPos + 'px;top:' + yPos + 'px;"><a href="javascript:;" onclick="drawEmptyGroup(this)" class="item">创建分组</a></div>';
  $('body').append(contextMenuHTML);
});

$(document).on('click', function() {
  $('.context-menu').detach();
});











