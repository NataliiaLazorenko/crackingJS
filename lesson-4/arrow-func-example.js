// Example 1

const obj = {
  data: 5,

  method() {
    const a = function () {
      console.log(`this in simple func: `, this);
    }.bind(this);

    const b = () => {
      console.log(`this in arrow func: `, this);
    };

    a();
  },
};

// Example 2

const exampleObj = {
  data1: 10,
  cbfunc: null,

  f1(cb) {
    cb();
  },

  f3(cb) {
    this.cbfunc = cb; // приймаємо функцію і записуємо її як метод поточного об'єкта
    this.cbfunc(); // на цьому ж об'єкті викликаємо метод

    // // Верхні 2 рядки можна цим рядком
    // cb.call(this);
  },
};

const showThis = function () {
  console.log("My this: ", this);
};

// У f1 передаємо звичайну функцію
exampleObj.f1(function () {
  console.log(this);
}); // this буде window

// У f1 передаємо стрілкову функцію
exampleObj.f1(() => console.log(this)); // this буде window

// У f3 передаємо звичайну функцію
exampleObj.f3(function () {
  console.log(this);
}); // this буде поточний об'єкт exampleObj

// У f3 передаємо стрілкову функцію
exampleObj.f3(() => console.log(this)); // this буде window

// Example 3
// У callback вартує завжди старатися писати стрілкові функції

// У callback передаємо звичайну функцію
const bob1 = {
  name: "Bob",
  showData() {
    // Коли у callback передаємо звичайну функцію, this буде window
    Object.keys(bob1).map(function () {
      console.log(this);
    });
  },
};

// У callback передаємо стрілкову функцію
const bob2 = {
  name: "Bob",
  showData() {
    /*
     * Arrow function гарантує, що у момент її оголошення, прив'язався контекст
     * А оголошується вона коли спрацьовує метод showData
     */
    Object.keys(bob2).map(() => {
      console.log(this);
    });
  },
};

bob1.showData();
bob2.showData();

// Якщо хочемо все-таки мати доступ до масиву всередині callback:
// 1. Методи масиву як аргумент приймають масив
[1, 2, 3, 4].map((item, index, arr) => {
  console.log(arr); // виведе масив
});

[1, 2, 3, 4].forEach((item, index, arr) => {
  console.log(arr); // виведе масив
});

/*
 * 2. Більшість методів масиву приймають:
 * першим аргументом callback,
 * другим (необов'язковим) - значення, що використовується у якості this при виконанні функції callback
 */
[1, 2, 3, 4].forEach(
  function (item, index, arr) {
    console.log(this); // this буде {name: "Bob"}
  },
  { name: "Bob" }
);

// Проте стрілковим функціям все рівно, який this передаємо. Він завжди запам'ятовує this, в якому була оголошена
[1, 2, 3, 4].forEach(
  (item, index, arr) => {
    console.log(this); // this буде window
  },
  { name: "Bob" }
);
