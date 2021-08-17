/*
 * Execution context
 */

function f1() {
  console.log(this);
  return this;
}

f1(); // Window

("use strict");
function f1() {
  console.log(this);
  return this;
}

f1(); // undefined

const o = {
  prop: 37,
  func() {
    return this;
  },
};

console.log(o.func());
// Object o -  {prop: 37, func: ƒ}

const b = {
  b: 2,
  func: o.func,
};

console.log(b.func());
// Object b -  {b: 2, func: ƒ}

const node = document.querySelector("div");

node.addEventListener("click", o.func);
node.click(); // dom element

/*
 * Arrow function context
 */

const c = () => console.log(this);
c(); // Window

("use strict");
const a = () => console.log(this);
a(); // Window

{
  const o = {
    prop: 37,
    func: () => {
      return this;
    },
  };

  console.log(o.func());
  // Window

  const b = {
    b: 2,
    func: o.func,
  };

  console.log(b.func());
  // Window

  const node = document.querySelector("div");

  node.addEventListener("click", o.func);
  node.click(); // Window
}

{
  const o = {
    prop: 37,
    func: () => this,
  };

  console.log(o.func());
  // Window

  const b = {
    b: 2,
    func: o.func.bind(o),
  };

  console.log(b.func());
  // Window
}

// ===================================================
/*
 * this
 */

// Будь-яка функція є методом якого-небудь об’єкта
// 1. Функція func лежить у глобальному об'єкті window
function func() {
  console.log("works");
}

window.func;

// 2. Якщо пишемо функці у замиканні, функція буде методом об'єкту lexical environment (з консолі цей об'єкт не доступний)
(() => {
  function func1() {
    console.log("works");
  }
})();

// this - ключове слово, яке говорить на чому була викликана функція
var bob = {
  name: "Bob",
  // Є 2 варіанти написання методів об'єкта з точки зору синтаксису
  // 1. Повний (так писали раніше)
  // showName: function () {},

  // 2. short hand
  showName() {
    // За допомогою ключового слова this можна взяти що-небудь із об'єкта, на якому викликали
    console.log(this.name);
  },
};

// Перед .showName() стоїть bob, тому об'єкт на якому викликається - об'єкт bob
bob.showName(); // Bob

const bill = {
  name: "Bill",
  showName: bob.showName, // вказали, що метод showName в об'єкті bill такий самий, як у bob
};

// В об'єкті bob вказали, що метод showName через this бере bob. Але у цьому випадку, він отримав Bill
// Перед .showName() стоїть bill, тому метод викликається на об'єкті bill. this посилається на об'єкт bill
bill.showName(); // Bill

// ===================================================
/*
 * Прив'язування контексту
 */

/*
 * call та apply
 * Методи дуже схожі. Першим параметром приймають this, на якому потрібно викликати функцію
 * Другим та іншими параметрами приймають список аргументів, які потрібно прокинути у цю функцію
 * Різниця: apply приймає не список аргументів, а масив з аргументами
 */
var bob = {
  name: "Bob",
  showName() {
    console.log("this:", this, ", this.name:", this.name);
  },
};

const bill = {
  name: "Bill",
  showName: bob.showName,
};

bob.showName.call(bill); // this: {name: "Bill", showName: ƒ} , this.name: Bill
bob.showName.call({ name: "Mango" }); // this: {name: "Mango"} , this.name: Mango

/*
 * Таким самим способом можна, н-д, викликати методи масиву на рядку
 * Викличемо map на рядку. Для цього у call передамо рядок і аргументи (map приймає callback, тому передали функцію)
 * Це те саме, що конвертувати рядок у масив. Просто замість конвертації беремо метод масиву і використовуємо його на рядку
 */
[].map.call("astr", function (item) {
  return item;
}); // (4) ["a", "s", "t", "r"]

[].map
  .call("astr", function (item) {
    return item;
  })
  .reverse()
  .join(""); // "rtsa"

// Передаємо замість 1 аргумента список аргументів
const maks = {
  name: "Maks",
  // Збираємо аргументи у agrs. Тепер буде створюватися змінна args, яка буде масивом зі всіма аргументами
  showName(...args) {
    console.log("args:", args, ", this:", this);
  },
};

maks.showName(1, 2, 3, 4, 5); // args: (5) [1, 2, 3, 4, 5] , this: {name: "Maks", showName: ƒ}

// Прокидуємо аргументи "str", "arr", "snt" та this { name: "Mary" } (те, на чому викликається)
maks.showName.call({ name: "Mary" }, "str", "arr", "snt"); // args: (3) ["str", "arr", "snt"] , this: {name: "Mary"}

// apply замість списку аргументів приймає масив аргументів
// Коли не знаємо, скільки аргументів буде, просто передаємо у apply 2 - м параметром масив з аргументами
maks.showName.apply({ name: "Mary" }, ["str", "arr", "snt"]); // args: (3) ["str", "arr", "snt"] , this: {name: "Mary"}

/*
 * bind
 * Якщо хочемо багато разів викликати showName з різними параметрами, тоді використовуємо bind
 * bind повертає не виклик функції (як у випадку із call та apply), а нову функцію, яку можна викликати
 */
const newFunc = maks.showName.call({ name: "Mary" }, "str", "arr", "snt");
newFunc(); // args: (3) ["str", "arr", "snt"] , this: {name: "Mary"}

// ===================================================
// this "пішов" із функцій-конструкторів (фабричних функцій)
function CarMaker(model, year) {
  this.model = model;
  this.year = year;
}

var tesla = new CarMaker("tesla", 2014);

// Новій машині tesla через this присвоїлися всі значення (model: "tesla", year: 2014). this - це доступ до об'єкта
console.log(tesla); // CarMaker {model: "tesla", year: 2014}

// ===================================================
// Створюємо компонент LinkComponent і будемо рахувати кількість кліків на DOM-елемент
class LinkComponent {
  constructor() {
    this.linksCount = 0;

    // $0 - дозволяє взяти останній елемент, по якому клікнули. Працює тільки у Console
    $0.addEventListener("click", this.increaseLinksCount);
  }

  increaseLinksCount() {
    // У this очікуємо отримати екземпляр класу, а нам приходить DOM-елемент. Це часта проблема React-компонентів
    this.linksCount += 1;
    console.log(this);
  }

  getLinksCount() {
    console.log(this.linksCount);
  }
}

const link = new LinkComponent();

// Скільки б разів не клікали по DOM-елементу, завжди отримуємо 0
link.getLinksCount(); // 0

// У DOM-елемента з'явилася властивість linksCount
$0.linksCount; // NaN

/*
 * Фіксимо помилку
 */
// Варіант 1
class LinkComponent {
  constructor() {
    this.linksCount = 0;

    /*
     * Перевизначаємо функцію increaseLinksCount - кажемо, що це те саме, але з this, який є зараз
     * this всередині bind появляється у момент виклику constructor. А this.increaseLinksCount - це просто посилання на функцію
     */
    // this.increaseLinksCount = this.increaseLinksCount.bind(this);
    // $0.addEventListener("click", this.increaseLinksCount);

    // Те саме, що у варіанті вище, тільки там створили додаткову змінну
    $0.addEventListener("click", this.increaseLinksCount.bind(this));
  }

  increaseLinksCount() {
    this.linksCount += 1;
    console.log(this);
  }

  getLinksCount() {
    console.log(this.linksCount);
  }
}

const link = new LinkComponent();

link.getLinksCount(); // буде показувати кількість кліків по елементу

// Варіант 2
class LinkComponent {
  constructor() {
    this.linksCount = 0;

    /*
     * Обгортаємо функцію this.increaseLinksCount у стрілкову
     * Особливість стрілкової функції - вона запам'ятовує контекст відразу в тому місці, де вона оголошена
     */
    $0.addEventListener("click", () => this.increaseLinksCount());
  }

  increaseLinksCount() {
    this.linksCount += 1;
    console.log(this);
  }

  getLinksCount() {
    console.log(this.linksCount);
  }
}

const link = new LinkComponent();

link.getLinksCount(); // буде показувати кількість кліків по елементу

// Варіант 3 - якщо використовуємо трайнспайлер (типу Babel)
class LinkComponent {
  constructor() {
    this.linksCount = 0;
    $0.addEventListener("click", this.increaseLinksCount);
  }

  // Використати стрілкову функцію. Ця функція буде прив'язана до конкретного екземпляру
  increaseLinksCount = () => {
    this.linksCount += 1;
    console.log(this);
  };

  getLinksCount() {
    console.log(this.linksCount);
  }
}

const link = new LinkComponent();

link.getLinksCount(); // буде показувати кількість кліків по елементу

// ===================================================
/*
 * - Якщо використовуємо класи, доведеться методи прив'язувати через bind(this) або обгортати у стрілкові функції
 * - Якщо не використовуємо класи, рекомендують завжди callback оголошувати як стрілкові функції. Тоді у них ніколи не зміниться this
 *   Код буде більш прогнозованим
 */

const bob = {
  name: "Bob",
  showName() {
    // При кліку на DOM - елемент this.name буде undefined, тому що this посилається на DOM-елемент
    console.log("this: ", this);
    console.log("this.name: ", this.name);
  },
};

// this буде DOM-елемент, this.name - undefined
$0.addEventListener("click", bob.showName);

/*
 * Фіксимо помилку
 */
// Варіант 1
const bob = {
  name: "Bob",
  showName() {
    console.log("this: ", this);
    console.log("this.name: ", this.name);
  },
};

// Обгортаємо bob.showName у стрілкову функцію. Тоді this.name буде Bob
$0.addEventListener("click", () => bob.showName());

// Варіант 2
const bob = {
  name: "Bob",
};

// Виносимо showName за межі об'єкта bob. Будемо звертатися до bob напряму
const showName = () => {
  console.log(this);
  console.log(bob.name);
};

// this буде window; this.name - Bob
$0.addEventListener("click", showName);

/*
 * У стрілковій функції неможливо змінити контекст, тому що СТРІЛКОВА ФУНКЦІЯ БЕРЕ THIS У МОМЕНТ ЇЇ ОГОЛОШЕННЯ
 */
showName.call({ name: "Bill" }); // this все рівно буде window; this.name - Bob

var func = showName.bind({ name: "Bill" });
func(); // this все рівно буде window; this.name - Bob
