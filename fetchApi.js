const squareDisplay = document.querySelector(".square");
const buttonDisplay = document.querySelector(".display_dog");
const raceSelector = document.querySelector("#selector");
const favDisplay = document.querySelector(".fav")

function createImg(data) {
  squareDisplay.innerHTML = "";
  const img = document.createElement("img");
  img.src = data.message;
  squareDisplay.appendChild(img);
  img.addEventListener('click', () => {
    const favImg = img.cloneNode(true);
    favDisplay.appendChild(favImg);
  })
}

fetch(`https://dog.ceo/api/breeds/list/all`)
  .then((response) => response.json())
  .then((data) => {
    const keysArray = Object.keys(data.message);
    for (let index = 0; index < keysArray.length; index++) {
      const newOption = document.createElement("option");
      newOption.value = keysArray[index];
      newOption.textContent = keysArray[index];
      raceSelector.appendChild(newOption);
    }
  });

buttonDisplay.addEventListener("click", () => {
  const selectedRace = raceSelector.value;
  fetch(
    selectedRace === ""
      ? `https://dog.ceo/api/breeds/image/random`
      : `https://dog.ceo/api/breed/${selectedRace}/images/random`
  )
    .then((response) => response.json())
    .then((data) => {
      createImg(data);
      console.log(selectedRace);
    });
});

