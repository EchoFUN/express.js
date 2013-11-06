var singleton = function(fn) {
  var instance;
  return function() {
    return instance || ( instance = fn.apply(this, arguments));
  };
};

var getMask = singleton(function() {
  var login = document.createElement('div');
  login.innerHTML = 'I am a login test!';
  return login;
});

var getWords = singleton(function() {
  var test = document.createElement('span');
  test.innerHTML = 'I am a words test!';
  return test;
});

debugger;
document.body.appendChild(getMask());
document.body.appendChild(getMask());
document.body.appendChild(getWords());




