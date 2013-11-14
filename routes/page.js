exports.test = function(req, resp) {

   var ret = {
      'code' : 591
   };

   resp.end(JSON.stringify(ret));
};

var counter = 0;

exports.mock = function(req, resp) {

   var ret = {
      "newCount" : {
         "userId" : "3594522269280926827",
         "newDigg" : 0,
         "newMessage" : 0,
         "newNotice" : 0,
         "newVisitors" : 0,
         "newFollow" : 0
      },
      
      "newOnlineUsers": [{
            'url' : '/232332',
            'avatar': '',
            'name' : '楷哥'
         }, {
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐2'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐3'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐4'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐5'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐6'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐7'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐8'
         },{
            'url' : '/232332',
            'avatar': '',
            'name' : '欣欣姐9'
         }]
   };

   resp.setHeader('Content-Type', 'application/json; charset=UTF-8');
   
   if (counter == 0) {
      resp.end(JSON.stringify(ret));
   } else {
      ret.newOnlineUsers = [];
      resp.end(JSON.stringify(ret));
   }
   
   counter++;
};
