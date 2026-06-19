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
      <p>${character.world}</p>
      <p>${character.author}</p>
    `;

    container.appendChild(card);

  });

}
