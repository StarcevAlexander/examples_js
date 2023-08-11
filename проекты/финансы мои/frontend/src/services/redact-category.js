function reductCategory() {
  let categoryName = document.getElementById("red-category").value;

  const placeholderText = localStorage.getItem("redact-item");
  console.log(`placeholderText: ` + placeholderText);
  
  let redactDate
  let linkRedact
  const title = document.getElementById("title-page")
  title.innerText == 'Редактирование категории дохода' ? redactDate = categoryIncomeInitial : redactDate = categoryExtenceInitial
  title.innerText == 'Редактирование категории дохода' ? linkRedact = '#/in': linkRedact = '#/out'


  const category = redactDate.find(item => item.title === placeholderText);
  if (category && categoryName !== placeholderText) {
    category.title = categoryName;
    location.href= linkRedact
  }
  else if (!category) {
    alert("вы редактируете несуществуюшую категорию")
    location.reload()
  }
}