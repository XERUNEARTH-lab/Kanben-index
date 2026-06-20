function displayCharacters(characters) {

  const container =
    document.getElementById("character-list");

  container.innerHTML = "";

  characters.forEach(character => {

    const card =
      document.createElement("div");

    card.className = "character-card";

    const colors = {
      "赤": "#ffd6d6",
      "橙": "#ffe5d4",
      "黄": "#fff7c7",
      "緑": "#cfffcc",
      "水": "#abfffb",
      "青": "#91baff",
      "紫": "#d5bdff",
      "桃": "#ffbde2",
      "黒": "#dddddd",
      "白": "#ffffff"
    };

    card.style.backgroundColor =
      colors[character.color] || "#ffffff";

    card.innerHTML = `
      <img src="${character.image}">
      <h3>${character.name}</h3>
      <p>${character.category}</p>
      <p>${character.author}</p>
    `;

    container.appendChild(card);

  });

}

fetch("characters.json")
  .then(response => response.json())
  .then(characters => {

    const categoryFilter =
  document.getElementById("category-filter");

const categories =
  [...new Set(
    characters.map(c => c.category)
  )];

categories.forEach(category => {

  const option =
    document.createElement("option");

  option.value = category;
  option.textContent = category;

  categoryFilter.appendChild(option);

});

    function filterCharacters() {

  const keyword =
    searchBox.value.toLowerCase();

  const selectedCategory =
    categoryFilter.value;

  const filtered =
    characters.filter(character => {

      const matchName =
        character.name
          .toLowerCase()
          .includes(keyword);

      const matchCategory =
        selectedCategory === "all"
        || character.category === selectedCategory;

      return matchName && matchCategory;

    });

  displayCharacters(filtered);

}

const searchBox =
  document.getElementById("search");

searchBox.addEventListener(
  "input",
  filterCharacters
);

categoryFilter.addEventListener(
  "change",
  filterCharacters
);

filterCharacters();

  })
  .catch(error => {
    console.error(error);
  });
