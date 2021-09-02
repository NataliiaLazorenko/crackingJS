const multiply = (number) => {
  return number * 2;
};
const addString = (number) => number + " is my number"; // приймає число і повертає рядок

// Функція зберігає myNumber і його ж повертає
const saveToLocalStorage = (number) => {
  localStorage.setItem("myNumber", number);

  return number;
};

// Функція вставляє текст у DOM
const insertToDom = (text) => {
  const body = document.querySelector("body");
  const node = document.createElement("p");
  node.innerHTML = text;

  body.appendChild(node);
};

const number = 5;

/*
 * Promise.resolve обгортає значення у проміс, який повертає це значення і відразу запускається
 * Може бути корисним, якщо хочемо зачейнити певні методи через then (як у даному прикладі)
 */
Promise.resolve(number)
  .then(addString)
  .then(saveToLocalStorage)
  .then(insertToDom)
  .catch((error) => {
    console.log(error);
  });

Promise.reject(error);
