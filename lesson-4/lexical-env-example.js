/*
 * Lexical environment example
 *
 */

// dogCount та catCount - глобальні змінні
let dogCount = 2;
let catCount = 3;

// Коли створюється функція, всередині неї формується список змінних, які вона бачить
const func = () => {
  let dogName = "Little-Bob";
  let catName = "Little-Bill";

  debugger; // ставимо, щоб подивитися на Lexical Environment у інтрументах розробника

  // Lexical Environment є у кожної функції, це об’єкт, де прописуються всі імена змінних, які є у цій функції

  // funcLexEnv = {
  //  dogName: 'Little-Bob', - знаходяться у тій же області видимості
  //  catName: 'Little-Bill', - знаходяться у тій же області видимості
  //  foo: func,
  //  this: undefined, - this є у кожної функції. Якщо працюємо у строгому режимі, this буде undefined, не у строгому - window
  //  parentLexEnv: window - у функції є посилання на батьківський Lexical Environment. Тому вона бачить змінні, що є вище
  // }

  function foo() {
    let catOwner = "Bob";
    let dogOwner = "Bill";

    // Коли хочемо використати catCount, інтерпретатор спробує знайти цю змінну. Розпочне із fooLexEnv. Зміннної catCount там немає, перейде у батьківський funcLexEnv
    // Там catCount також немає, переходить у батьківський - глобальний window. Там catCount вже є
    console.log(catCount);

    // foo - внутрішня функція, у неї є свій Lexical Environment

    // fooLexEnv = {
    //  catOwner: 'Bob',
    //  dogOwner: 'Bill',
    //  inner: func,
    //  this: undefined, - значення this може варіюватися, виходячи з того, де функція була викликана
    //  parentLexEnv: funcLexEnv
    // }

    let inner = () => {
      let counter = [];

      debugger; // ставимо, щоб подивитися на Lexical Environment у інтрументах розробника

      console.log(catCount, dogOwner);
      console.log(catName, dogName);

      // innerLexEnv = {
      //  counter: [],
      //  this: undefined,
      //  parentLexEnv: global
      // };
    };

    inner();
  }

  foo();
};

func();
