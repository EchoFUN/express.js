exports.test = function(req, resp) {

   var ret = {
      'code' : 591
   };

   resp.end(JSON.stringify(ret));
};

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
         }]
   };

   resp.setHeader('Content-Type', 'application/json; charset=UTF-8');

   resp.end(JSON.stringify(ret));
};
