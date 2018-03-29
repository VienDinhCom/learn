var Person = function(name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

Person.prototype.setName = function (name) {
  this.name = name;
};

var alice = new Person('alice');

console.log(alice.getName());
alice.setName('bob');
console.log(alice.getName());
