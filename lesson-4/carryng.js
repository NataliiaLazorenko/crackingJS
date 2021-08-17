// Можемо за допомогою однієї функції зробити іншу функцію
const multiply = (a, b) => a * b;

// Створюємо функцію, яка завжди множить на 5
// const multiply5 = multiply.bind(this, 5);

// У стрілковій функції не можна перевизначити this. bind не тільки перевизначає this, але ще й "забиває" у функцію
// один із аргументів або й всі аргументи. Тому this нам тут і не потрібен, можемо замість нього передати null
const multiply5 = multiply.bind(null, 5);

multiply(10, 5); // 50
multiply5(5); // 25
