var singleton = function(fn) {
  var instance;
  return function() {
    return instance || ( instance = fn.apply(this, arguments));
  };
};

var getMask = singleton(function() {

  // 执行a, b, c步骤。
  var mask = document.createElement('div');
  console.log('A div has created for once !');
  return mask;
});

var blankMask = getMask();
document.body.appendChild(blankMask);

window.setTimeout(function() {
  blankMask.parentNode.removeChild(blankMask);

  window.setTimeout(function() {
    document.body.appendChild(getMask());
  }, 1000);
}, 1000);


define(function() {
  
   
});
