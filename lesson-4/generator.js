/*
 * Generator function example
 */

/*
 * Знак * після function вказує на те, що у нас не звичайна функція, а генератор
 * У генераторі є ключове слово yield, яке говорить, що зараз потрібно зупинитися
 * і запуститься тільки тоді, коли запустимо наступний next
 * yield пишемо самі і залежно від цього наша функція виконується
 *
 * При 1-му next спрацює console.log("Function scope is active!", getFunc); та yield "First action";
 * При 2-му next: console.log("Start moving after 1st action"); та yield "Second action";
 * При 3-му next: console.log("Start moving after 2st action"); та function getFunc() {}
 *
 * getFunc можна використовувати на всьому діапазоні функції makeGenerator
 * Можемо користуватися всіма змінними функції, але в цей же час її зупиняти
 */
function* makeGenerator() {
  console.log("Function scope is active!", getFunc);

  yield "First action";

  console.log("Start moving after 1st action");

  yield "Second action";

  console.log("Start moving after 2st action");

  function getFunc() {}
}

const gen = makeGenerator();

gen.next(); // Function scope is active! ƒ getFunc() {}       {value: "First action", done: false}
gen.next(); // Start moving after 1st action                  {value: "Second action", done: false}
gen.next(); // Start moving after 2st action                  {value: undefined, done: true}
gen.next();

/*
 * Advanced generator function example
 */
function* makeGenerator() {
  console.log("Function scope is active!");

  // yield показує де потрібно зупинитися. Якщо у next щось передаємо, то yield замість себе підставляє це значення
  const value1 = yield;

  console.log("1st action", value1);

  // Якщо після yield щось вказати, то це значення повернеться у властивості value
  const value2 = yield "Hello";

  console.log("2nd action", value2);

  const value3 = yield 3;

  console.log("3d action", value3);
}

const gen = makeGenerator();

// Перший next спрацьовує до першого yield. Навіть якби щось передали у цей next, результат би не змінився
gen.next(); // Function scope is active!                 {value: undefined, done: false}

// Спрацював код до наступного yield
gen.next("Bob"); // 1st action Bob                       {value: "Hello", done: false}

gen.next("Bill"); // 2nd action Bill                     {value: 3, done: false}
gen.next("Mary"); // 3d action Mary                      {value: undefined, done: true}
