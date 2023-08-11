const buttonsDelRed = document.querySelectorAll('.comment-element');

let idRow;
const copiedArray = operationInitial.slice();

// Перебор каждой кнопки удаления или редактирования
buttonsDelRed.forEach(button => {
  // Добавление обработчика события на клик
  button.addEventListener('click', () => {
    // Получение родительского элемента
    const id = button.getAttribute('value');

    // Получение значения элемента he-number
    idRow = Number(id);
  });
});

function removeById() {
  const updatedOperation = copiedArray.filter(operation => operation.id !== idRow);
  console.log(updatedOperation);
  renderTableRows(updatedOperation)
  changeTextColorByClass();
  closePopup()
}



