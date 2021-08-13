const studentOperator = {
  getSortedMarks: function () {
    return this.marks.sort(function (mark1, mark2) {
      if (mark1 === mark2) return 0;
      if (mark1 > mark2) return 1;

      return -1;
    });
  },

  getAverageMark: function () {
    const marksSum = this.marks.reduce(function (acc, item) {
      return acc + item;
    });

    return Math.round(marksSum / this.marks.length);
  },
};

const student1 = {
  marks: [10, 8, 3, 4, 5, 6, 2, 7, 3, 2],
};

const student2 = {
  marks: [8, 2, 6, 4, 5, 6, 7, 4, 2],
};

// Способи задати прототип (встановлюємо studentOperator прототипом об'єктів student1 та student2)

// 1. setPrototypeOf - мутує student1 та student2 (у __proto__ об'єктів будуть методи getSortedMarks та getAverageMark)
Object.setPrototypeOf(student1, studentOperator);
Object.setPrototypeOf(student2, studentOperator);

console.log("Sorted marks: ", student1.getSortedMarks()); // Sorted marks:  (10) [2, 2, 3, 3, 4, 5, 6, 7, 8, 10]
console.log("Average mark is: ", student2.getAverageMark()); // Average mark is:  5

/*
 * hasOwnProperty дозволяє визначити чи містить об’єкт вказану властивість в якості власної властивості об’єкта
 * Метод не перевіряє наявність властивостей у ланцюжку прототипів об’єкта. Повертає true/false
 */
console.log(student1.hasOwnProperty("getSortedMarks")); // false
console.log(student1.hasOwnProperty("marks")); // true

// 2. __proto__ - поганий варіант, властивість __proto__ має по 2 підкреслення зліва і справа, щоб ніхто її не змінював
student2.__proto__ = studentOperator;

/*
 * 3. Object.create - передаємо прототип, а далі об'єкт із набором властивостей, які потрібно додати
 * Для кожної властивості потрібно вказати об'єкт дискрипторів
 */
Object.create(studentOperator, {
  marks: {
    value: [1, 2, 3, 4, 5],
  },
});
