/*
 * Як тільки запускаємо new Promise, відразу створюється екземпляр і проміс запускається. Тому відразу повертати проміс не правильно
 * Потрібно створити функцію, яка буде повертати проміс. Тоді проміс можна буде запустити тоді, коли буде потрібно
 * Якщо робимо кастомні проміси, їх обов'язково потрібно обгортати у функцію, інакше вони відразу запустяться
 */
// НЕПРАВИЛЬНО
const prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
});

// ПРАВИЛЬНО
const getProm = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

// Тоді можна викликати getProm і відразу підписатися на результат
getProm().then(() => console.log("all is good"));

// ==================================================
const showBackground = (cb) => {
  setTimeout(() => {
    console.log("1. showBackground works!!!");
    cb && cb();
  }, 3000);
};

const slideSidebar = (cb) => {
  setTimeout(() => {
    console.log("2. slideSidebar works!!!");
    cb && cb();
  }, 3000);
};

const showMenu = (cb) => {
  setTimeout(() => {
    console.log("3. showMenu works!!!");
    cb && cb();
  }, 3000);
};

const showCloseBtn = (cb) => {
  setTimeout(() => {
    console.log("4. showCloseBtn works!!!");
    cb && cb();
  }, 3000);
};

/*
 * У прикладі використані setTimeout лише щоб показати, що функції не виконуються синхронно.
 * У реальному житті це буде робота із DOM (асинхронні операції)
 * Функції потрібно запустити по-чергово. Якщо просто їх викликати, не зможемо гарантувати порядок виконання
 */
// showBackground();
// slideSidebar();
// showMenu();
// showCloseBtn();

// Запускаємо функції по-чергово
// Варіант 1. Використати callback-функції. Але код погано читається
showBackground(() => {
  slideSidebar(() => {
    showMenu(() => {
      showCloseBtn();
    });
  });
});

/* Варіант 2. Щоб можна було викликати then, потрібно все обернути у проміс
 * Можна вручну змінити кожну функцію, але в деяких місцях функції можуть викликатися самостійно. Там проміс не потрібен
 * Тому зробимо функцію, яка будь-яку іншу функцію обгортає у проміс. Така функція називається функцією вищого порядку
 * або декоратором (ми додаємо функціонал в іншу функцію, при цьому не змінюючи її)
 * У пакеті node.js уже є готова утиліта promisify
 * Щоб дізнатися, коли кожна із операцій завершиться, у наші 4 функції потрібно передати callback
 */

// Якщо з функції повернемо проміс, він відразу запуститься. Тому потрібно повернути функцію, яка викликає проміс
const promisify = (func) => {
  return () => {
    return new Promise((resolve, reject) => {
      /*
       * У callback функції передаємо resolve. Тоді проміс сам себе зарезолвить (коли функція допрацює до кінця,
       * спрацює resolve і ми зможемо користуватися промісом)
       */
      return func(resolve);
    });
  };
};

// Варіант 2.A. Можемо кожну функцію обгорнути у promisify
const asyncShowBackground = promisify(showBackground);
const asyncSlideSidebar = promisify(slideSidebar);
const asyncShowMenu = promisify(showMenu);
const asyncShowCloseBtn = promisify(showCloseBtn);

asyncShowBackground()
  .then(asyncSlideSidebar)
  .then(asyncShowMenu)
  .then(asyncShowCloseBtn)
  .catch((error) => console.log(("error: ", error)))
  .finally(() => {
    console.log("All done!");
  });

// Варіант 2.B. Можемо кожну функцію обгорнути у promisify
const asyncShowBackground = promisify(showBackground);

asyncShowBackground()
  /*
   * then приймає callback. Те, що вернемо із callback, те і прийде у callback наступного then
   * Щоб наступний then почекав, поки виконається проміс з поточного then, потрібно цей же проміс з поточного then повернути
   * Якщо у аргументи наступного then прийде не проміс, то проміс з того then відразу запуститься, не чекаючи виконання промісу з попереднього then
   */
  .then(() => {
    const asyncSlideSidebar = promisify(slideSidebar);
    return asyncSlideSidebar();
  })
  // У кожному then потрібно прописати код, як у then вище. Використаємо спрощений запис
  .then(promisify(showMenu))
  .then(promisify(showCloseBtn))
  .catch((error) => console.log(("error: ", error)))
  // finally спрацьовує після виконання всіх then або catch
  .finally(() => {
    console.log("All done!");
  });

// ==================================================
/*
 * Покажемо, що можна передавати параметри від then до then
 * Для цього передамо у showBackground для наступної операції об'єкт із полем slideNumber: 2
 * Це також можуть бути ланцюжок запитів, які передають один одному потрібну інформацію
 */
const showBackground = (cb) => {
  setTimeout(() => {
    console.log("1. showBackground works!!!");
    cb && cb({ slideNumber: 2 });
  }, 3000);
};

// Вказуємо, що slideSidebar приймає slideNumber
const slideSidebar = (cb, slideNumber) => {
  setTimeout(() => {
    console.log("2. slideSidebar works!!!");
    cb && cb();
  }, 3000);
};

const showMenu = (cb) => {
  setTimeout(() => {
    console.log("3. showMenu works!!!");
    cb && cb();
  }, 3000);
};

const showCloseBtn = (cb) => {
  setTimeout(() => {
    console.log("4. showCloseBtn works!!!");
    cb && cb();
  }, 3000);
};

const promisify = (func) => {
  return (...args) => {
    return new Promise((resolve) => {
      return func.apply(this, [resolve, ...args]);
    });
  };
};

const asyncShowBackground = promisify(showBackground);

// asyncShowBackground()
//   // slideNumber попаде у then, можемо його передати у asyncSlideSidebar
//   .then((slideNumber) => {
//     const asyncSlideSidebar = promisify(slideSidebar);
//     return asyncSlideSidebar(slideNumber);
//   })
//   .then(promisify(showMenu))
//   .then(promisify(showCloseBtn))
//   .catch((error) => console.log(("error: ", error)))
//   .finally(() => {
//     console.log("All done!");
//   });

// /*
//  * Переписуємо з використанням async/await (спрощує роботу з промісами)
//  * await можна використовувати тільки у тій функції, яка підписана як асинхронна
//  * Щоб у async/await відловлювати помилки, використовується try/catch
//  */
// (async () => {
//   try {
//     const asyncShowBackground = promisify(showBackground);
//     const asyncSlideSidebar = promisify(slideSidebar);
//     //   const asyncShowMenu = promisify(showMenu);
//     //   const asyncShowCloseBtn = promisify(showCloseBtn);

//     // Якщо проміс щось повертаємо, записуємо результат у змінну і передаємо її у наступну функцію
//     const slideNumber = await asyncShowBackground();
//     // Код у наступному рядку не запуститься, поки не зарезолвиться проміс у рядку вище
//     await asyncSlideSidebar(slideNumber);
//     // Можна не створювати асинхронні функції, а просто додати запуск обгорнутих у promisify функцій
//     //   await asyncShowMenu();
//     //   await asyncShowCloseBtn();
//     await promisify(showMenu)();
//     await promisify(showCloseBtn)();
//   } catch (e) {
//     console.log("Error was caught");
//   }
// })();

// // Не обов'язково використовувати функцію, що самовикликається. Можемо створити звичайну функцію, перед нею написати async, а потім її запустити
// const start = async () => {
//   try {
//     const asyncShowBackground = promisify(showBackground);
//     const asyncSlideSidebar = promisify(slideSidebar);

//     const slideNumber = await asyncShowBackground();
//     await asyncSlideSidebar(slideNumber);
//     await promisify(showMenu)();
//     await promisify(showCloseBtn)();
//   } catch (e) {
//     console.log("Error was caught");
//   }
// };

// start();

/*
 * Можна також у циклі for так само почергово виконувати проміси. Збираємо їх у масив, далі перебираємо циклом і запускаємо з використанням await
 * Оскільки await зупиняє виконання коду, будемо щоразу чекати і функції будуть виконуватися по-чергово
 */
const start = async () => {
  const operations = [
    promisify(showBackground),
    promisify(slideSidebar),
    promisify(showMenu),
    promisify(showCloseBtn),
  ];

  for (i = 0; i < operations.length; i += 1) {
    const operation = operations[i];
    await operation();
  }
};

start();
