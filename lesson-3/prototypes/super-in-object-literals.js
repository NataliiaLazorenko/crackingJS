/*
 * This is the example of super in object literals
 */

const protoObject = {
  method1() {
    console.log("Used method from prototype");
  },
};

const obj = {
  method2() {
    super.method1(); // через super використовуємо метод об'єкту protoObject
  },
};

Object.setPrototypeOf(obj, protoObject); // сетимо прототип

obj.method2(); // Used method from prototype
