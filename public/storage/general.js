/**
 * 测试localStorage添加监听事件。
 *
 * @author KEN.
 */

var Storage;

var targetMethod = function(data) {

   // TODO 处理准备好的逻辑。
};

var storageChangeHandler = function(data) {
   if ( typeof data == 'string') {
      if (data == '') {
         return;
      }
      targetMethod($.parseJSON(data));
   } else {
      if (data.key == 'users') {getItem
         if (data.newValue == '') {
            return;
         }
         targetMethod($.parseJSON(data.newValue));
      }
   }
};

if (window.localStorage && window.localStorage.) {
   window.addEventListener('storage', storageChangeHandler, false);
} else {
   var oriUsers = Storage.get('users');
   window.setInterval(function() {
      var latestUsers = Storage.get('users');
      if (oriUsers == latestUsers) {
         return;
      } else {
         storageChangeHandler(latestUsers);
      }
   }, 1000)
}
