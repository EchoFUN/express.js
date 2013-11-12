(function(exports) {

   // ----------------------- 工具方法 start
   var isPlainObject = function(obj) {
      var key;
      for (key in obj ) {
         ;
      }
      return key === undefined || {}.hasOwnProperty.call(obj, key);
   };
   var uuid = function() {
      return setTimeout(function() {
      }, 0);
   };
   // ----------------------- 工具方法 end

   var timerPair = {};

   var runMap = {};
   var process = function(interval, queue) {
      if (runMap[interval] == false) {
         delete runMap[interval];
         return;
      } else {
         runMap[interval] = true;
      }

      // 执行每个回调列表。
      var queue = timerPair[i];
      for (var i in queue) {
         queue[i]();
      }
      exports.setTimeout(process, delay);
   };

   var proxy = function() {
      for (var i in timerPair) {
         if (!runMap[interval]) {
            process(i, timerPair[i].queue);
         }
      }
   };

   var Timer = {

      setTimeout : function(fn, timeout) {
         this.setInterval(function() {
            fn();
            runMap[interval] = false;
         }, timeout);
      },

      setInterval : function(fn, interval) {
         if (timerPair.interval) {
            timerPair[interval].queue = [fn];
         } else {
            timerPair[interval].push(fn);
         }
         proxy();
         return interval;
      },

      clearInterval : function(interval) {
         runMap[interval] = false;
      },

      clearTimeout : function(timeout) {
         runMap[interval] = false;
      }
   };

   exports.Timer = Timer;
})(this);
