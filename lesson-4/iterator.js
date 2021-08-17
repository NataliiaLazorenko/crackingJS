// example 1 - ітератор з масиву
var arr = [1, 2, 3, 4];

// Створюємо ітератор з масиву
var iterator = arr[Symbol.iterator]();
console.log(iterator); // Array Iterator {}

/*
 * У ітератора є метод next. Він повертає об'єкт з 2-ма властивостями:
 * - value - сам елемент;
 * - done - показує, чи вже кінець ітерованої структури (має значення true/false)
 * Щоразу, коли викликаємо iterator.next (це може бути асинхронно), повертається наступний елемент
 * Коли ітерована колекція закінчується, приходить {value: undefined,done: true}
 * За допомогою ітератора можна асинхронно через певний час перебирати колекцію і робити все, що потрібно
 * next можна використати лише 1 раз - взяти тільки 0-й елемент і все
 */
iterator.next(); // {value: 1, done: false}
iterator.next(); // {value: 2, done: false}
iterator.next(); // {value: 3, done: false}
iterator.next(); // {value: 4, done: false}
iterator.next(); // {value: undefined, done: true}

// example 2 - ітератор з об'єкта
var bob = {
  name: "Bob",
  age: 40,
  profession: "QA",
};

// Спершу потрібно взяти масив пар ключ-значення через Object.entries, після цього створити ітератор
var iterator = Object.entries(bob)[Symbol.iterator]();

iterator.next(); // {value: ["name", "Bob"], done: false}
iterator.next(); // {value: ["age", 40], done: false}
iterator.next(); // {value: ["profession", "QA"], done: false}
iterator.next(); // {value: undefined, done: true}
