(() => {
  // anonimusEnv = {
  //  a: undefined,
  //  test: function(){}, - функція може бути викликана до оголошення, тому що вона оголошена як function declaration
  //  b:  function(){},
  //  c:  function(){},
  //  this: undefined, - приходить те, на чому функція була викликана
  //  parentLexEnv: window - де функція була оголошена
  // }

  var a = 7;

  // anonimusEnv = {
  //  a: 7,
  //  test: function(){},
  //  b:  function(){},
  //  c:  function(){},
  //  this: undefined,
  //  parentLexEnv: window
  // }

  function test() {
    // testEnv = {
    //  this: undefined,
    //  parentLexEnv: anonimusEnv
    // }

    // У лексичному оточенні немає змінної a, піднімаємося вище до батьківського anonimusEnv. Там a = 7
    // Щоб console.log(a) показав 10, можна всередині функції b змінити глобальне значення a (замість var a = 10 написати a = 10) або передати a у функцію test
    console.log(a); // 7
  }

  function b() {
    // bEnv = {
    //  a: undefined,
    //  this: undefined,
    //  parentLexEnv: anonimusEnv
    // }

    // Змінні, оголошені через var вспливають зі значенням undefined. Створена у функції b змінна a "перебиває" ту, що у scope вище
    console.log(a); // undefined

    // bEnv = {
    //  a: 10,
    //  this: undefined, - приходить те, на чому функція була викликана
    //  parentLexEnv: anonimusEnv - де функція була оголошена
    // }
    var a = 10;

    test(); // test не пишемо у об'єкт lexical environment, тому що немає оголошення (змінна оголошується з ключовими словами або через агтсешщт)
  }

  function с() {
    /*
     * Якщо оголошуємо змінну всередині функції (немає значення використовуємо var, let чи const), у об'єкті Lexical environment, що формується у цій функції,
     * вже є ця змінна (у нашому випадку a). Вона вже відноситься до локального scope. На інші змінні з таким же іменем, функція вже не реагує
     * Єдина відмінність: коли оголошуємо змінну через var, при спробі звернутися до неї до ініціалізації, отримаємо undefined; якщо через let чи const - буде помилка
     */
    console.log(a); // Uncaught ReferenceError: c is not defined
    let a = 10;
  }

  b();
  c();
})();

// ==================================================
// Задаємо функції test параметр a
(() => {
  var a = 7;

  /*
   * Коли функція має параметри, вони у lexical environment оголошуються як змінні. Аргументи ініціалізуються так само, як звичайні змінні
   * test(a) еквівалентно тому, якби всередині функції написали var a. Єдине, що у test(a) може прийти значення, а у var a ні
   */
  function test(a) {
    // testEnv = {
    //  this: undefined,
    //  parentLexEnv: anonimusEnv,
    //  a: undefined
    // }

    /*
     * Помилки не буде. Якщо функцію запускаємо без аргумента, у неї приходить undefined
     * console.log покаже undefined, тому що у lexical environment функції test з'являється змінна a
     * Якщо при виклику функції test всередині функції b передати a, console.log(a) показав би 10
     */
    console.log(a); // undefined
  }

  function b() {
    var a = 10;

    test();
  }

  b();
})();

// ==================================================
(() => {
  {
    // Змінні, оголошені через const і let мають блокову область видимості. Оскільки блок коду обгорнутий у фігурні дужки, до змінної a не буде доступу зовні
    let a = 7;
    console.log("From block: ", a); // From block:  7
  }

  function test(a) {
    console.log("From test: ", a); // From test: undefined
  }

  function b() {
    var a = 10;

    test();
  }

  b();

  console.log(a); // Uncaught ReferenceError: a is not defined
})();
