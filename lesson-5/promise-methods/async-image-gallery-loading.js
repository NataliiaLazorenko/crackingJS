// Задача: зробити, щоб зображення завантажувалися порціями по 3 шт. (тільки після отримання і рендерингу однієї порції, надсилалися наступні 3 запити)

// /* cb - це опційний параметр. Не завжди потрібно знати, коли завантажилося зображення. Якщо не передамо cb, код зламається
//  * Тому використовуємо функцію-заглушку noop (з англ. петля): cb = noop. Якщо cb не передамо cb, присвоїться дефолтне значення noop
//  * Інший варіант: перед викликом функції cb, зробити перевірку на її наявність (cb && cb())
//  */
// const noop = () => {}; // функція-заглушка, є у пакеті lodash

// const showPokemon = (pokemon, cb = noop) => {
//   cb();
// };

// Зі всіх функцій, які використовують callback можна зробити проміс, тому що ми точно можна сказати, коли функція завершить виконання
const showPokemonAsync = (pokemon) =>
  new Promise((resolve, reject) => {
    const body = document.querySelector("body");
    const image = document.createElement("img");

    image.src = pokemon.sprites.front_default; // sprites.front_default - шлях до url зображення у відповіді з сервера

    /*
     * Обробник події image.onload буде викликано не елементі image коли зображення завершило завантажуватися.Функція в обробнику асинхронна
     * Таким чином можна підписатися на одну подію. Якщо потрібно на багато, використовуємо image.addEventListener('load', () => {})
     */
    image.onload = resolve;
    image.onerror = reject;

    body.appendChild(image);
  });

const pokemonList = [
  "https://pokeapi.co/api/v2/pokemon/1",
  "https://pokeapi.co/api/v2/pokemon/10",
  "https://pokeapi.co/api/v2/pokemon/12",
  "https://pokeapi.co/api/v2/pokemon/45",
  "https://pokeapi.co/api/v2/pokemon/64",
  "https://pokeapi.co/api/v2/pokemon/78",
  "https://pokeapi.co/api/v2/pokemon/3",
  "https://pokeapi.co/api/v2/pokemon/21",
  "https://pokeapi.co/api/v2/pokemon/37",
  "https://pokeapi.co/api/v2/pokemon/19",
];

const getPokemon = async (pokemonUrl) =>
  fetch(pokemonUrl).then((res) => res.json());

(async () => {
  const requestList = [...pokemonList]; // копіюємо масив, щоб не змінювати початковий

  const getNextPokemon = async (requestList) => {
    /*
     * Можна ітеруватися, передаючи індекс і збільшуючи його. Ми ж будемо із скопійованого масиву видаляти всі запити, які вже опрацювали
     * Коли елементів у масиві не залишиться, виходимо
     */
    if (!requestList.length) {
      console.log("Done!");
      return;
    }

    const currentReqList = requestList.slice(0, 3); // отримуємо масив із 3-х Url

    /*
     * У масиві currentReqList є 3 Url, а нам потрібні проміси. Тому кожен url обгортаємо у getPokemon
     * getPokemon(url) повертає проміс, а map повертає новий масив
     * Promise.all повертає масив результатів
     */
    const pokemonsToRender = await Promise.all(
      currentReqList.map((url) => getPokemon(url))
    );

    /*
     * Функція showPokemonAsync приймає тільки одного pokemon. Застосовуємо map, щоб отримати масив
     * pokemonsToRender запускає створення проміса. Оскільки у нас завантажується по 3 зображення, матимето 3 проміси
     * Щоб дочекатися результатів кількох промісів, використовуємо Promise.all і передаємо туди масив із 3-ма промісами
     */
    const promiseList = pokemonsToRender.map((pokemon) =>
      showPokemonAsync(pokemon)
    );

    await Promise.all(promiseList);
    // Якщо з масиву, в якому є 2 елементи відрізати 3 елементи, просто отримаємо порожній масив. Код не поламається
    console.log("3 images were loaded!!!");
    const nextReqList = requestList.slice(3);

    getNextPokemon(nextReqList);
  };

  getNextPokemon(requestList);
})();
