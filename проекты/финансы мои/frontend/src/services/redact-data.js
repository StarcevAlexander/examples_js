// Получаем значения из localStorage по ключу whatYouReduct
const whatYouReduct = localStorage.getItem('whatYouReduct');

const inputSelect = document.getElementById('select');
const inputCategory = document.getElementById('category');
const inputSumm = document.getElementById('summ');
const inputDate = document.getElementById('date');
const inputComment = document.getElementById('comment');

const operation = operationInitial.find(item => item.id == whatYouReduct);
//по айди операции находим элемент и работаем с его свойствами. если доход, то  выводим "доход" и работаем с данными доходов и наоборот

if (operation) {
  let parseData

  if (operation.type == "income") {
    inputSelect.value = 'Доход'
    parseData = categoryIncomeInitial
  }
  else {
    inputSelect.value = 'Расход'
    parseData = categoryExtenceInitial
  }

  if (operation.type == "expense") {
    inputCategory.value = operation.category_expense_id
  }
  else {
    inputCategory.value = operation.category_income_id
  }
  inputSumm.value = operation.amount;
  inputDate.value = operation.date;
  inputComment.value = operation.comment;

  let categorygNum = inputCategory.value
  let category = parseData.find(item => item.id == categorygNum);
  inputCategory.value = category.title;
}