const redactButtons = document.querySelectorAll('.redact');

redactButtons.forEach(button => {
  button.addEventListener('click', () => {
    const cardTitle = button.parentNode.parentNode.querySelector('.card-title').textContent;
    localStorage.setItem('redact-item', cardTitle);
    location.href=linkRedact
  });
});

let linkRedact
const title = document.getElementById("title-page")
title.innerText == 'Доходы'? linkRedact = '#/in-red': linkRedact = '#/out-red'

const input = document.getElementById("red-category");
const placeholderText = localStorage.getItem("redact-item");

input.placeholder = placeholderText;
input.value = placeholderText;