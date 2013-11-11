// 一个中心计时器，它收集 timer 以便统一管理，优化性能。
// by viclm
window.timer = (function() {
   var uuid = 0;
   var timers = {};
   var work = function() {
      var delay, timer;
      for (delay in timers) {
         timer = timers[delay];
         if (timer.id) {
            return;
         }
         (function(delay, timer) {
            timer.id = setTimeout(function() {
               for (var i = 0; i < timer.callbacks.length; i += 1) {
                  if (timer.callbacks[i]() === false) {
                     timer.callbacks.splice(i, 1);
                     i -= 1;
                  }
               }
               if (timer.callbacks.length === 0) {
                  clearTimeout(timer.id);
                  delete timers[delay];
               } else {
                  timer.id = setTimeout(arguments.callee, delay);
               }
            }, delay);
         })(delay, timer);
      }
   };

   var clear = function(id) {
      if (!id) {
         return;
      }
      var info = id.split('-'), uuid = Number(info[1]), callbacks = timers[info[0]] && timers[info[0]].callbacks;
      if (callbacks) {
         for (var i = 0; i < callbacks.length; i += 1) {
            if (callbacks[i].__nxtimeruuid === uuid) {
               callbacks[i] = function() {
                  return false;
               };
               break;
            }
         }
      }
   };

   return {
      setTimeout : function(fn, delay) {
         return this.setInterval(function() {
            fn();
            return false;
         }, delay);
      },
      setInterval : function(fn, delay) {
         delay = isNaN(Number(delay)) ? 0 : delay;
         timers[delay] = timers[delay] || {};
         timers[delay].id = timers[delay].id || 0;
         timers[delay].callbacks = timers[delay].callbacks || [];
         timers[delay].callbacks.push(fn);
         fn.__nxtimeruuid = ++uuid;
         work();
         return delay + '-' + fn.__nxtimeruuid;
      },
      clearTimeout : clear,
      clearInterval : clear
   };

})(); 