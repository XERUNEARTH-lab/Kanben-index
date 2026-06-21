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
      "黄緑": "#e6ffcc",
      "緑": "#c4f5cb",
      "青緑": "#9bebd3",
      "水": "#cff5fc",
      "青": "#c8d1fa",
      "紫": "#d5bdff",
      "桃": "#ffd9fb",
      "黒": "#7a7a7a",
      "白": "#e8e8e8"
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

    const subcategoryFilter =
  document.getElementById("subcategory-filter");

    function updateSubcategories() {

  subcategoryFilter.innerHTML =
    '<option value="all">すべてのサブカテゴリ</option>';

      const selectedCategory =
        categoryFilter.value;

  let subcategories;

  if (selectedCategory === "all") {

    subcategories =
      [...new Set(
        characters.map(c => c.subcategory)
      )];

  } else {

    subcategories =
      [...new Set(
        characters
          .filter(c =>
            c.category === selectedCategory
          )
          .map(c => c.subcategory)
      )];

  }

  subcategories.forEach(subcategory => {

    const option =
      document.createElement("option");

    option.value = subcategory;
    option.textContent = subcategory;

    subcategoryFilter.appendChild(option);

  });

}

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
    
  const selectedSubcategory =
  subcategoryFilter.value;
    
  const filtered =
    characters.filter(character => {

      const matchName =
        character.name
          .toLowerCase()
          .includes(keyword);

      const matchCategory =
        selectedCategory === "all"
        || character.category === selectedCategory;
      const matchSubcategory =
        selectedSubcategory === "all"
        || character.subcategory === selectedSubcategory;
      
      return (
        matchName
        && matchCategory
        && matchSubcategory
      );

    });

  alert(filtered.length);

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
  () => {

    updateSubcategories();

    filterCharacters();

  }
);
    subcategoryFilter.addEventListener(
  "change",
  filterCharacters
);

updateSubcategories();
filterCharacters();

  })
  
 .catch(error => {
  alert(error);
  console.error(error);
});
