(() => {
  const animalsObj = {
    dog: true,
    cat: true,
    horse: true,
  };

  const getAllAnimals = () => Object.keys(animalsObj);

  const getSomeAnimal = (animal, animalsList) =>
    animalsList.filter((animalFromList) => animal === animalFromList);

  const saveToLS = (data) =>
    localStorage.setItem("animals", JSON.stringify(data));

  const horse = getSomeAnimal("horse", getAllAnimals());

  saveToLS(horse);
})();

// Call stack example

// 5. Object.keys func
// 4. getAllAnimals func
// 3. getSomeAnimal func
// 2. anonymous func
// 1. module file func

// Stack overflow example

(() => {
  const getAllAnimals = () => getSomeAnimal();

  const getSomeAnimal = () => {
    getAllAnimals();
  };

  getSomeAnimal();
})();

// Call stack example

// 4. getAllAnimals func
// 3. getSomeAnimal func
// 4. getAllAnimals func
// 3. getSomeAnimal func
// 4. getAllAnimals func
// 3. getSomeAnimal func
// 4. getAllAnimals func
// 3. getSomeAnimal func
// 4. getAllAnimals func
// 3. getSomeAnimal func
// 2. anonymous func
// 1. module file func
