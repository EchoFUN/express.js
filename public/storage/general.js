/**
 * 测试localStorage添加监听事件。
 *
 * @author KEN.
 */

var Storage = LS;

var targetMethod = function(data) {

   // TODO 处理准备好的逻辑。
   console.log(data);
};

var storageChangeHandler = function(data) {
   if ( typeof data == 'string') {
      if (data == '') {
         return;
      }
      targetMethod($.parseJSON(data));
   } else {
      if (data.key == 'users') {
         if (!data.newValue) {
            return;
         }
         targetMethod($.parseJSON(data.newValue));
      }
   }
};

if (window.localStorage && window.localStorage.setItem) {
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

document.addEventListener('click', function() {
   Storage.set('users', '{"a":"test"}');
});

/* ---------------------------- 转换成string --------------------------- */

function stringify(obj) {
   if ('JSON' in window) {
      return JSON.stringify(obj);
   }

   var n, v, json = [], arr = (obj && obj.constructor == Array);
   for (n in obj) {
      v = obj[n];
      var t = typeof (v);
      if (obj.hasOwnProperty(n)) {
         if (t == 'string') {
            v = '"' + v + '"';
         } else if (t == 'object' && v !== null) {
            v = stringify(v);
         }
         json.push(( arr ? "" : '"' + n + '":') + String(v));
      }
   }
   return ( arr ? "[" : "{") + String(json) + ( arr ? "]" : "}");
}

