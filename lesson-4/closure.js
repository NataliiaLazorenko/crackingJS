/*
 * Closure
 */

// Функція, яку напишемо у цьому місці, не буде бачити змінних currCount, increaseCount та getCurrCount

const makeCounter = function () {
  /*
   * Внутрішні функції increaseCount та getCurrCount мають доступ до змінної currCount
   * За межами функції makeCounter змінну currCount не можна
   * Грубо кажучи, змінна currCount живе у замиканні
   */
  let currCount = 0;

  const increaseCount = () => {
    // Замикання для функції increaseCount - всі змінні, які видимі у цьому місці: currCount, getCurrCount, makeCounter і певні глобальні змінні
    currCount++;
  };

  const getCurrCount = () => {
    return currCount;
  };

  /*
   * Функція повертає об'єкт з публічними функціями, які можна запускати
   * Це єдиний спосіб зробити інкапсуляцію у JS - зробити приватні змінні. З функціями таким способом легко робити приватні поля
   * Можна всередині makeCounter додати багато функцій, які будуть доступні тільки всередині,
   * а публічні функції increaseCount та getCurrCount будуть ними користуватися
   */
  return {
    increaseCount,
    getCurrCount,
  };
};

const counter1 = makeCounter();

// Змінна currCount живе у замиканні, але внутрішні функції getCurrCount та increaseCount можуть нею користуватися, тому що ми їх повернули як публічні
counter1.getCurrCount(); // 0
counter1.increaseCount(); // 1
counter1.increaseCount(); // 2
counter1.increaseCount(); // 3
counter1.getCurrCount(); // 3

// Якщо створимо новий counter, то він буде мати свої значення
const counter2 = makeCounter();

counter2.getCurrCount(); // 0
counter2.increaseCount(); // 1
counter2.getCurrCount(); // 1

counter1.getCurrCount(); // 3

// ==================================================
/*
 * Не завжди потрібно робити конструктор, який повертає лічильники
 * Зробимо, щоб змінна counter була результатом функції, що самовикликаєься
 * У такому випадку не зможемо зробити багато лічильників, counter буде тільки один
 * Лічильником буде те, що повертаємо із функції
 */

const counter = (() => {
  let currCount = 0;

  const increaseCount = () => {
    currCount++;
  };

  const getCurrCount = () => {
    return currCount;
  };

  return {
    increaseCount,
    getCurrCount,
  };
})();

console.log(counter); // {increaseCount: ƒ, getCurrCount: ƒ}

counter.increaseCount(); // 1
counter.increaseCount(); // 2
counter.increaseCount(); // 3
counter.getCurrCount(); // 3
