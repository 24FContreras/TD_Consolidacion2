console.log("🟢 Connected!");

//DOM ELEMENTS
const digimonImg = document.querySelector("#mainCard");
const mainDigiName = document.querySelector("#mainDigiName");
const mainDigiLevel = document.querySelector("#mainDigiLevel");
const searchForm = document.querySelector("#searchForm");
const digimonInput = document.querySelector("#digimonInput");
const digimonOptions = document.querySelector("#digimonOptions");

const featuredGrid = document.querySelector("#featuredGrid");

//LOGIC
const URL = "https://digimon-api.vercel.app/api/digimon";

function obtenerDigimon(digimon) {
  fetch(URL + digimon)
    .then((res) => res.json())
    .then((data) => {
      data = data[0];
      digimonImg.src = data.img;
      digimonImg.alt = data.name;
      mainDigiName.textContent = data.name;
      mainDigiLevel.textContent = data.level;
    });
}

function obtenerOpciones() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let fragmento = "";

      data.forEach((digimon) => {
        fragmento += `<option value="${digimon.name}">`;
      });

      digimonOptions.innerHTML = fragmento;
    });
}

function obtenerFeaturedDigimons() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let fragmento = "";
      let vueltas = 0;

      for (let i = 0; i < 12; i++) {
        let randomDigimonId = Math.floor(Math.random() * (208 - 1) + 1);

        fragmento += `
<article class="digicard">
<img
  src="${data[randomDigimonId].img}"
  alt="${data[randomDigimonId].name}"
  class="digimon-img"
/>

<div class="name-bar">
  <p id="mainDigiLevel">${data[randomDigimonId].level}</p>
  <p id="mainDigiName">${data[randomDigimonId].name}</p>
</div>
</article>
`;
      }

      featuredGrid.innerHTML = fragmento;
    });
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  obtenerDigimon(`/name/${digimonInput.value}`);
});

//NAV

const navLinks = document.querySelector(".nav-links");
const burger = document.querySelector("#burger");

burger.addEventListener("click", function () {
  if (navLinks.style.maxHeight) {
    navLinks.style.maxHeight = "";
    burger.style.color = "white";
  } else {
    navLinks.style.maxHeight = navLinks.scrollHeight + "px";
    burger.style.color = "#5b51ec";
  }
});

//INITIAL LOAD
window.onload = function () {
  obtenerFeaturedDigimons();
  obtenerDigimon(`/name/greymon`);
  obtenerOpciones();
};
