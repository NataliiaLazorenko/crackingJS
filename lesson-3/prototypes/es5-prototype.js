// ES5 - класу немає, працюємо зі звичайною функцією
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.family = true;
}

// class Person {
//   constructor(name, gender) {
//     this.name = name;
//     this.gender = gender;
//     this.family = true;
//   }
// }

var bob = new Person("Bob", "male");

// variant 1
Person.prototype.getName = function () {
  console.log(this.name);
};

Person.prototype.setName = function (name) {
  this.name = name;
  console.log(this.name);
};

bob.getName(); // Bob
bob.setName("Bill"); // Bill
bob.getName(); // Bill

// variant 2
Person.prototype = {
  getName: function () {
    console.log(this.name);
  },
  setName: function (name) {
    this.name = name;
    console.log(this.name);
  },
};
