function showCharacterDetail(character) {

  alert("詳細関数開始");

const detail =
    document.getElementById(
      "character-detail"
    );

  detail.innerHTML = `
    <h2>${character.name}</h2>

    <img
      src="${character.image}"
      class="detail-image"
    >

    <p>作者: ${character.author}</p>

    <p>年齢: ${character.age}</p>

    <p>誕生日: ${character.birthday}</p>

    <p>${character.description}</p>
  `;

}

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
      "紫": "#ddcafa",
      "桃": "#ffd9fb",
      "黒": "#7a7a7a",
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

    card.addEventListener(
  "click",
  () => {

    alert(character.name);
    
    showCharacterDetail(character);
  }
);
  
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

  const selectedCategory =
    categoryFilter.value;

  if (selectedCategory === "all") {

    subcategoryFilter.disabled = true;

    subcategoryFilter.innerHTML =
      '<option value="all">カテゴリを選択してください</option>';

    return;

  }

  subcategoryFilter.disabled = false;

  subcategoryFilter.innerHTML =
    '<option value="all">すべてのサブカテゴリ</option>';

  const subcategories =
    [...new Set(
      characters
        .filter(c =>
          c.category === selectedCategory
        )
        .map(c => c.subcategory)
    )];

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

const matchKeyword =

  character.name
    .toLowerCase()
    .includes(keyword)

  ||

  character.author
    .toLowerCase()
    .includes(keyword)

  ||

  character.category
    .toLowerCase()
    .includes(keyword)

  ||

  character.subcategory
    .toLowerCase()
    .includes(keyword)

  ||

  character.tags.some(tag =>
    tag.toLowerCase().includes(keyword)
  );
      const matchCategory =
        selectedCategory === "all"
        || character.category === selectedCategory;
      const matchSubcategory =
        selectedSubcategory === "all"
        || character.subcategory === selectedSubcategory;
      
      return (
       matchKeyword
        && matchCategory
        && matchSubcategory
      );

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
