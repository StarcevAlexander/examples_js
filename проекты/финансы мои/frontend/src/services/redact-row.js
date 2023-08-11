// Перебор каждой кнопки удаления иди редактирования
buttonsDelRed.forEach(button => {
  // Добавление обработчика события на клик
  button.addEventListener('click', () => {
    // Получение родительского элемента
    const id = button.getAttribute('value');
    // Получение значения элемента he-number
    idRow = id;
  });
});


function saveIdReductElToLocalStorage() {
  const elements = document.getElementsByClassName("redact");

  Array.from(elements).forEach(element => {
    element.addEventListener("click", function() {
      localStorage.setItem("whatYouReduct", idRow);
      location.href = "#/in-out-reduct"
    });
  });
}

saveIdReductElToLocalStorage()