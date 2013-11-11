(function(exports) {

   var timerPair = {};

   var isPlainObject = function(obj) {
      var key;
      for (key in obj ) {
         ;
      }
      return key === undefined || {}.hasOwnProperty.call(obj, key);
   };

   var process = function() {
      if (isPlainObject(process) && isRunning) {
         return ;
      } else {
         var delay;
         for (delay in timerPair) {

            // 执行每个回调列表。
            var queue = timerPair[i];
            for (var i in queue) {
               queue[i]();
            }
            exports.setTimeout(process, delay);
         }
      }
   };

   var Timer = {

      setTimeout : function(fn, timeout) {

      },

      setInterval : function(fn, interval) {
         if (timerPair.interval) {
            timerPair[interval].queue = [fn];
         } else {
            timerPair[interval].push(fn);
         }
      },

      clearInterval : function() {

      },

      clearTimeout : function() {

      }
   };

   // 执行主序列。
   process();
   exports.Timer = Timer;

})(this);
