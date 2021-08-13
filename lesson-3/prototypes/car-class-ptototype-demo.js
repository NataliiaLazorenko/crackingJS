class Vehicle {
  constructor(carName, driverName) {
    this.carName = carName;
    this.driverName = driverName;

    console.log(
      "Constructor Vehicle was started: ",
      this.carName,
      this.driverName
    );
  }

  start() {
    this.started = true;

    console.log(this.carName, " was started");
  }

  stop() {
    this.started = false;

    console.log(`${this.carName} was stopped`);
  }
}

class Car extends Vehicle {
  constructor(carName, driverName) {
    super(carName, driverName); // через super запускаємо конструктор класу, від якого наслідувалися

    this.carName = carName;
    this.driverName = driverName;

    console.log("constructor Car was started");
  }

  setSpeedLimit(speedLimit) {
    this.speedLimit = speedLimit;
    console.log(this.speedLimit, " was set");
  }

  changeDriver(driverName) {
    this.driverName = driverName;
    console.log(this.driverName, " is in the", this.carName);
  }
}

const car1 = new Car("tesla", "Bob");

// ==================================================
// У класі, що наслідує (Car) можна не вказувати constructor, якщо у екземпляр не потрібно нічого встановлювати. constructor і super викличуться під капотом
// Але, якщо вже вказали constructor, обов'язково необхідно викликати super, щоб запустився батьківський конструктор (клас, від якого наслідуємося)
class Vehicle {
  start() {
    this.started = true;

    console.log("was started");
  }

  stop() {
    this.started = false;

    console.log("was stopped");
  }
}

class Car extends Vehicle {
  setSpeedLimit(speedLimit) {
    this.speedLimit = speedLimit;
    console.log(this.speedLimit, " was set");
  }

  changeDriver(driverName) {
    this.driverName = driverName;
    console.log(this.driverName);
  }
}

const car1 = new Car();

car1.start(); // was started
car1.changeDriver("Vlad"); // Vlad

// ==================================================
// Ще один кейс використання supper: якщо є метод з однаковою назвою (н-д, у класах Vehicle та Car). Тоді можемо через super викликати метод класу від якого наслідувалися
// Дублюємо метод start в обох класах і додамо у Car метод parentStart для запуску методу start із батьківського класу
class Vehicle {
  start() {
    console.log("Vehicle start method was used");
  }

  stop() {
    this.started = false;

    console.log(`${this.carName} was stopped`);
  }
}

class Car extends Vehicle {
  constructor(carName, driverName) {
    super(carName, driverName);

    this.carName = carName;
    this.driverName = driverName;
  }

  start() {
    console.log("Car start method was used");
  }

  parentStart() {
    super.start(); // використовуємо super щоб викликати метод start класу Vehicle
  }

  setSpeedLimit(speedLimit) {
    this.speedLimit = speedLimit;
    console.log(this.speedLimit, " was set");
  }

  changeDriver(driverName) {
    this.driverName = driverName;
    console.log(this.driverName, " is in the", this.carName);
  }
}

const car1 = new Car("Honda", "Bill");

car1.parentStart(); // Vehicle start method was used
car1.start(); // Car start method was used
