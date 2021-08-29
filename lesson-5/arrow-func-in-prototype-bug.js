// Маємо функцію-конструктор CarFactory. Потрібно у її прототип додати методи start та stop

function CarFactory(model) {
  this.model = model;
  this.carStatus = null;
}

/*
 * problem
 */

/*
 * this тут потрібно використовувати, тому що це методи прототипу
 * Стрілкова функція отримує this тільки один раз у момент створення. Застосувати bind можемо (це не змінить результату)
 * this буде window, а ми очікуємо отримати екземпляр. Тому необхідно використовувати звичайну функцію
 */
CarFactory.prototype.start = () => {
  console.log(this); // window
  this.carStatus = "start";
};

CarFactory.prototype.stop = () => {
  console.log(this); // window
  this.carStatus = "stop";
};

var tesla = new CarFactory("Tesla");

tesla.start();

// carStatus не змінився
console.log(tesla); // CarFactory {model: "Tesla", carStatus: null}

/*
 * solution
 */
function CarFactory(model) {
  this.model = model;
  this.carStatus = null;
}

// Використовуємо звичайні функції
CarFactory.prototype.start = function () {
  this.carStatus = "start";
};

CarFactory.prototype.stop = function () {
  this.carStatus = "stop";
};

var tesla = new CarFactory("Tesla");

tesla.start();
console.log(tesla); // CarFactory {model: "Tesla", carStatus: "start"}

tesla.stop();
console.log(tesla); // CarFactory {model: "Tesla", carStatus: "stop"}

/*
 * Переписуємо функцію-конструктор на клас
 */
class CarFactory {
  constructor(model) {
    this.model = model;
    this.carStatus = null;
  }

  // Методи start і stop підуть на прототип
  start() {
    this.carStatus = "start";
  }

  stop() {
    this.carStatus = "stop";
  }
}

var tesla = new CarFactory("Tesla");

tesla.start();
console.log(tesla); // CarFactory {model: "Tesla", carStatus: "start"}

tesla.stop();
console.log(tesla); // CarFactory {model: "Tesla", carStatus: "stop"}

/*
 * Прив’язування контексту до методу із прототипу, написання методів класу
 */
class CarFactory {
  constructor(model) {
    this.model = model;
    this.carStatus = null;

    // Якщо байндимо метод із прототипу, він стає методом самого екземпляру. Функція продублюється (буде в екземплярі і у прототипі)
    this.stop = this.stop.bind(this);
  }

  /*
   * Коли методи записуємо таким чином, як зараз записали start, під капотом у constructor відбувається this.start = this.start.bind(this)
   * this у цьому випадку буде екземпляр класу CarFactory. Це прив'язує метод до екземпляра
   * Відповідно start буде не методом прототипу, а методом екземпляра
   */
  start = () => {
    this.carStatus = "start";
  };

  stop() {
    this.carStatus = "stop";
  }
}

var tesla = new CarFactory("Tesla");

// Метод start буде на екземплярі, а stop у прототипі і додатково продублюєься на екземплярі
console.log(tesla); // CarFactory {model: "Tesla", carStatus: null, start: ƒ, stop: ƒ}

tesla.start();
console.log(tesla); // CarFactory {model: "Tesla", carStatus: "start", start: ƒ, stop: ƒ}

tesla.stop();
console.log(tesla); // CarFactory {model: "Tesla", carStatus: "stop", start: ƒ, stop: ƒ}

// У tesla в прототипі лежить те саме, що і у прототипі CarFactory
console.log(tesla.__proto__ === CarFactory.prototype); // true
