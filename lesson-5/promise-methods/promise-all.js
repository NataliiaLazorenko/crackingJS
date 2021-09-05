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
