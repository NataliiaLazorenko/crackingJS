/*
 * Functions
 */

declaration();

function declaration(numA, numB) {
  return numA + numB;
}

var getSquare = function (number) {
  return number * number;
};

const getMultipliedValue = (param1, param2) => param1 * param2;

// IIFE example
(function () {
  const x = 9;

  console.log(x);
})();

/*
 * Example with arrow function
 */

function Person() {
  this.age = 0;

  setInterval(function () {
    this.age++;
  }, 1000);
}

const obj = new Person();

/*
 * Scopes example
 */

const b = "Bob";

function getB() {
  console.log(b);
}

function common() {
  const b = 10;
  getB();
}

common();

// ===================================================
console.log(funcDecl()); // decl
console.log(funcExpr); // Uncaught ReferenceError: funcExpr is not defined

const funcExpr = function () {
  return "expression";
};

function funcDecl() {
  return "decl";
}

// Function declaration можна перевизначити
console.log(funcDecl); // ƒ funcDecl() { return "decl" }
funcDecl = 2;
console.log(funcDecl); // 2

// ===================================================
// Особливості стрілкових функцій:
// 1. Короткий запис
const arrow = () => {
  return 5;
};

arrow(); // 5

// 2.	У стрілковій функції може не бути тіла. Якщо функцію можна записати в один рядок, то тіло функції можна не вказувати
const arrow = () => 5;

arrow(); // 5

// 3. Стрілкова функція прив'язує контекст коли оголошується, інші види функцій - коли викликаються
