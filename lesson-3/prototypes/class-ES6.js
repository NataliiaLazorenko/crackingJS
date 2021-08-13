// example 1
class Person {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.family = true;
  }

  getName() {
    console.log(this.name);
  }

  setName() {
    this.name = name;
    console.log(this.name);
  }
}

const bob = new Person("Bob", "male");
console.log(bob);

// =================================================
// example 2 - створюємо у класі counter, який буде рахувати скільки екземплярів класу створено:
class Person {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.family = true;

    Person.personCount += 1; // якщо у конструкторі хочемо змінювати сататичну властивість, до неї потрібно звертатися через сам клас
  }

  static personCount = 0; // властивість, де зберігається кількість створених екземплярів

  static getPersonCount() {
    return Person.personCount;
  }
}

const bob = new Person("Bob", "male");
const mike = new Person("Mike", "male");
const ann = new Person("Ann", "female");

console.log(Person.getPersonCount()); // 3
console.log(Person.personCount); // 3

console.log(typeof Person); // "function"

Person.personCount = 100; // властивість можна напряму змінювати
console.log(Person.personCount); // 100

// =================================================
// example 3 - створюємо приватну статичну властивість
// Робимо, щоб властивість personCount не можна було вручну перезаписати. Використовуємо Symbol
const countFieldName = Symbol("personCount"); // Symbol примітивний тип. Якщо викликати через new, поверне помилку. Якщо через new створити Number чи Boolean, повернеться об'єкт

class Person {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.family = true;

    Person[countFieldName] += 1;
  }

  static [countFieldName] = 0;
  static getPersonCount() {
    return Person[countFieldName];
  }
}

const bob = new Person("Bob", "male");
const mike = new Person("Mike", "male");
const ann = new Person("Ann", "female");

console.log(Person.getPersonCount()); // 3
console.log(Person.personCount); // undefined
console.log(Person.getPersonCount()); // 3

// Ми створили поле за допомогою Symbol. Якщо не знаємо, що поле personCount знаходиться у змінній countFieldName, то не зможемо його змінити
Person[countFieldName] = 100; // проте так можемо змінити значення поля
console.log(Person.getPersonCount()); // 100

// =================================================
// example 4
// class SuperPerson {
//   constructor() {

//   }

//   getFamilyStatus2() {
//     if (!this.family) {
//       return 'Free';
//     }

//     return 'married';
//   }

//   getFamilyStatus() {
//     if (!this.family) {
//       return 'Free';
//     }

//     return 'married';
//   }
// }

// class Person extends SuperPerson {
//   constructor(name, gender) {
//     super(name, gender);

//     this.name = name;
//     this.gender = gender;
//     this.family = true;

//     Person.count++
//   }

//   getFirstName() {
//     return this.name;
//   }

//   showFullName() {
//     const firstName = this.getFirstName();

//     console.log(firstName);
//   }
// }

// Person.count = 0;

// const bob = new Person('bob', 'male');

// console.log('New person: ', bob);

// console.log('New person familyStatus: ', bob.getFamilyStatus());
