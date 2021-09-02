// Функція, яка рендерить зображення у DOM
const insertToDom = (pokemon) => {
  const body = document.querySelector("body");
  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default;

  body.appendChild(image);
};

const req1 = fetch("https://pokeapi.co/api/v2/pokemon/1").then((resp) =>
  resp.json()
);
const req2 = fetch("https://pokeapi.co/api/v2/pokemon/10").then((resp) =>
  resp.json()
);
const req3 = fetch("https://pokeapi.co/api/v2/pokemon/12").then((resp) =>
  resp.json()
);

/*
 * Залежно від того, яку послідовність передамо у масиві, в такій самій послідовності прийдуть результати у масив pokemonList
 * Але послідовність відправки запитів зберігатися не буде
 */
Promise.all([req1, req2, req3])
  .then((pokemonList) => {
    // pokemonList === [resp1, resp2, resp3]

    console.log(pokemonList);
    pokemonList.forEach(insertToDom);
  })
  .catch((errorText) => console.log());

// ==================================================
// Задача: зробити, щоб зображення завантажувалися порціями по 3 шт. (тільки після отримання і рендерингу однієї порції, надсилалися наступні 3 запити)
const showPokemon = (pokemon) => {
  const body = document.querySelector("body");
  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default; // sprites.front_default - шлях до url зображення у відповіді з сервера

  body.appendChild(image);
};

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

(() => {
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

    // Функція showPokemon приймає тільки одного pokemon, тому запускаємо цикл forEach по масиву pokemonsToRender
    pokemonsToRender.forEach((pokemon) => showPokemon(pokemon));

    // Якщо з масиву, в якому є 2 елементи відрізати 3 елементи, просто отримаємо порожній масив. Код не поламається
    const nextReqList = requestList.slice(3);

    getNextPokemon(nextReqList);
  };

  getNextPokemon(requestList);
})();
