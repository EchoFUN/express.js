var Context = function() {
   this._status = null;
};

Context.prototype.set = function(status) {
   this._status = status;
};

Context.prototype.execute = function() {
   if (this._status)
      this._status.handler();
};

var StatusA = function(name) {
   this._name = name;
};

StatusA.prototype.handler = function() {
   console.log(this._name);
};

var context = new Context();
context.set(new StatusA('Test!'));
// context.execute();

/*
   window.webkitNotifications.requestPermission();
*/

// window.webkitNotifications.checkPermission();

document.addEventListener('click', function() {
   var notification = window.webkitNotifications.createNotification('http://ww2.sinaimg.cn/mw1024/6bf9eebbjw1e8hiww2qlwj202602qjr7.jpg', "刷票机", "有票了哦~！");
   // notification.onshow = function() {
      // setTimeout(notification.cancel(), 3000);
   // };
   notification.show(); 
});