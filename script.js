fetch("characters.json")
  .then(response => response.json())
  .then(characters => {

    const container =
      document.getElementById("character-list");

    characters.forEach(character => {

      const card =
        document.createElement("div");

      card.className = "character-card";

      card.innerHTML = `
        <img src="${character.image}">
        <h3>${character.name}</h3>
        <p>世界観: ${character.world}</p>
        <p>作者: ${character.author}</p>
        <p>色: ${character.color}</p>
        <p>誕生日: ${character.birthday}</p>
      `;

      container.appendChild(card);
    });

  });
