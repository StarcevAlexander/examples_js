//функция для отрисовки карточек с категориями дохода/расхода

function createCategoryCards(categoryArray) {

  const cards = document.getElementById('cards');

  categoryArray.forEach(element => {
    const card = document.createElement('div');
    cards.appendChild(card);
    card.innerHTML = `<div class="card hov">
    <div class="card-title">${element.title}</div>
    <div class="card-buttons">
      <div class="card-btn blue hov redact">Редактировать</div>
      <div class="card-btn red hov delete">Удалить</div>
    </div>
  </div>`}
  );

  let linkAdd
  categoryArray === categoryExtenceInitial ? linkAdd = `<a href="#/out-add"  style="text-decoration: none;">+</a>` : linkAdd = `<a href="#/in-add" style="text-decoration: none;">+</a>`
  let cardAdd = document.createElement('div')
  cardAdd.innerHTML = `<div class="card add-card hov">
  <div class="add-card">` + linkAdd + `</div>
  </div>`

  cards.appendChild(cardAdd)
}