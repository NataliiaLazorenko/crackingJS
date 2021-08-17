var a = {
  b: 1,
  getContext: function () {
    console.log(this);
  },
};

var b = {
  b: 2,
  getContext: a.getContext,
};

var c = {
  b: 3,
  getContext() {
    [1, 2, 3].forEach(function () {
      // Кожен метод масиву викликається у глобальному контекті, тобто у this буде window або undefined, якщо включений 'use strict'
      console.log(this);
    });
  },
};

a.getContext(); // {b: 1, getContext: ƒ}
b.getContext(); // {b: 2, getContext: ƒ}
c.getContext(); // // window   window   window

var d = {
  b: 3,
  getContext() {
    [1, 2, 3].forEach(() => {
      // Оскільки у forEach передали стрілкову функцію, this посилається на об'єкт с
      console.log(this);
    });
  },
};

d.getContext(); // {b: 3, getContext: ƒ}   {b: 3, getContext: ƒ}   {b: 3, getContext: ƒ}

// Якщо хочемо у callback взяти весь масив, використовуємо параметр callback-функції arr
var e = {
  b: 3,
  getContext() {
    [1, 2, 3].forEach((item, index, arr) => {
      console.log(arr);
    });
  },
};

e.getContext(); // (3) [1, 2, 3]   (3) [1, 2, 3]   (3) [1, 2, 3]
