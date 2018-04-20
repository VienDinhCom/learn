class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}

var alice = new Person('alice');

console.log(alice.getName());
alice.setName('bob');
console.log(alice.getName());
