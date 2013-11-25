function Human(name) {
   this.name = name;
}

Human.prototype.say = function() {
   console.log('say');
}
// function SuperMan() {
//
// }
//
// SuperMan.prototype = new Human;
// SuperMan.prototype.constructor = SuperMan;
//
// var SM = new SuperMan;
// SM.say();

function object(o) {
   var F = function() {
   };
   F.prototype = o;
   return new F();
}

function Man(name, age) {
   Human.call(this, name);
   this.age = age;
}

Man.prototype = object(Human.prototype);
Man.prototype.constructor = Man;

function makeClass() {
   return function(args) {
      if (this instanceof arguments.callee) {

      }
   }
}
