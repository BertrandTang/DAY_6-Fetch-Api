const squareDisplay = document.querySelector(".square");
const buttonDisplay = document.querySelector(".display_dog");
const raceSelector = document.querySelector("#selector");
const favDisplay = document.querySelector(".fav");

onInit();
// Fonction asynchrone qui attend la réponse de la function getBreedsAndAddToSelect()
async function onInit() {
  const breeds = await getBreeds();
  addToSelect(breeds);
}

// Fonction qui crée les images avec les données de la response
// Et ajoute un eventlistener pour ajouter la photo aux favoris
function createImg(data) {
  squareDisplay.innerHTML = "";
  const img = document.createElement("img");
  img.src = data.message;
  squareDisplay.appendChild(img);
  img.addEventListener("click", () => {
    // On clone l'image sinon celle-ci est déplacée
    const favImg = img.cloneNode(true);
    favDisplay.appendChild(favImg);
  });
}

// Fonction de capitalisation de string
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fonction asynchrone qui récupère tous les breeds et renvoie un array
async function getBreeds() {
  const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
  const jsonResponse = await response.json();
  return Object.keys(jsonResponse.message);
}

// Fonction qui prends un array en paramètre et ajoute les breeds au select
function addToSelect(array) {
  for (let index = 0; index < array.length; index++) {
    const newOption = document.createElement("option");
    newOption.value = array[index];
    newOption.textContent = capitalize(array[index]);
    raceSelector.appendChild(newOption);
  }
}

// Eventlistener qui contient une fonction fléchée asynchrone qui attend la réponse du fetch
// Puis attend le parse de la response en json avant d'exécuter la fonction createImg avec la réponse
buttonDisplay.addEventListener("click", async () => {
  const selectedRace = raceSelector.value;
  const response = await fetch(
    selectedRace === ""
      ? `https://dog.ceo/api/breeds/image/random`
      : `https://dog.ceo/api/breed/${selectedRace}/images/random`
  ); 
  const jsonResponse = await response.json();
    createImg(jsonResponse);
});
