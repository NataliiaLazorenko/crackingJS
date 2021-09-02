// Задача: зробити так, щоб запити відправлялися один за одним (лише після отримання відповіді на 1-й запит, відсилався 2-й запит і т.д.)

const imageList = [
  "http://gallery-motorcycles.com/wp-content/uploads/2017/05/gallery-motorcycles-harley-davidson-SHOWROOM_sx.jpg",
  "https://journal.riserapp.com/wp-content/uploads/2019/02/48_riserblog_yard_built_yamaha_bunkers_eu_custom-6.jpg",
  "http://gallery-motorcycles.com/wp-content/uploads/2017/05/gallery-motorcycles-harley-davidson-SHOWROOM_REV.jpg",
];

// ==================================================
/*
 * Варіант 1. Використаємо рекурсію, щоб перебрати і завантажити всі зображення
 */
const fetchImage = (imgUrl, callback) => {
  // { mode: "no-cors" } у параметрах прописали, щоб запити не блокувало політикою CORS
  fetch(imgUrl, { mode: "no-cors" }).then((data) => {
    console.log("Image was got");
    callback && callback();
  });
};

/*
 * Рекурсія - коли функція запускає сама себе і має вихід (у нашому прикладі, коли завершується список, по якому ітеруємося)
 * Ітератор (індекс зображення) щоразу передаємо у callback. loadNextImage - функція, що запускає сама себе
 */
const loadNextImage = (imgIndex) => {
  const currentImageUrl = imageList[imgIndex];

  // Оскільки використовуємо рекурсію, необхідно знати коли зупинитися. Якщо наступного зображення немає, робимо return
  if (!currentImageUrl) {
    console.log("Done");
    return;
  }

  fetchImage(currentImageUrl, () => loadNextImage(imgIndex + 1));
};

loadNextImage(0);

// ==================================================
/*
 * Варіант 2. Замість рекурсії використаємо цикл for
 */

/*
 * Callback сигналізував, коли завершувалася функція. Тепер використовуємо async, callback немає і ми не знаємо, коли функція завершується
 * Тому з операції потрібно повертати проміс (проміс - те саме, що callback, просто дає бульш зручний API)
 */
// const fetchImage = async (imgUrl) => {
//   return new Promise((resolve, reject) => {
//     fetch(imgUrl, { mode: "no-cors" })
//       .then((data) => {
//         console.log("Image was got");
//         resolve(); // вказуємо коли завершити проміс (коли прийде відповідь від сервера)
//       })
//       .catch((e) => {
//         reject(e);
//       });
//   });
// };

// Оскільки fetch повертає проміс, можемо не прописувати new Promise, а повернути результат fetch
const fetchImage = async (imgUrl) => {
  return fetch(imgUrl, { mode: "no-cors" }).then((data) => {
    console.log("Image was got");
  });
};

(async () => {
  for (let i = 0; i < imageList.length; i++) {
    const currentImageUrl = imageList[i];

    await fetchImage(currentImageUrl);
  }
})();

// ==================================================
/*
 * Варіант 3. Замість циклу for використати ітератори
 * В ітератора є метод next, який повертає нульовий індекс. Наступний next - перший індекс і т.д. до кінця масиву
 * Ітератор повертає об'єкт із властивостями value та done. Коли індекси завершаться, отримаємо done: true
 */
const fetchImage = async (imgUrl) => {
  return fetch(imgUrl, { mode: "no-cors" }).then((data) => {
    console.log("Image was got");
  });
};

(() => {
  const imageListIterator = imageList[Symbol.iterator]();

  // Ми не використовуємо цикл, тому єдиний спосіб його симулювати - рекурсивна функція, яка запускає сама себе
  const fetchNextImage = async (imgUrl) => {
    await fetchImage(imgUrl);

    const nextImage = imageListIterator.next();

    // З рекурсії обов'язково потрібно виходити, тому перевіряємо: якщо done = true, тоді виходимо
    if (nextImage.done) {
      console.log("Done");
      return;
    }

    fetchNextImage(nextImage.value);
  };

  const currentImage = imageListIterator.next();

  // Передаємо з отриманого об'єкту лише value (url зображення)
  fetchNextImage(currentImage.value);
})();
