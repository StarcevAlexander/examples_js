function addObject() {

  const selectElement = document.getElementById("mySelect");
  let selectedValue = selectElement.value;
  localData = localStorage.getItem('userInitial');

  if (!selectedValue) {
    alert('выберите доходы или расходы')
    closePopup()
    return

  }
  else if (!user_id) {
    alert('сбой работы приложения связан с авторизацией пользователя. заново войдите в систему')
    closePopup()
    return
  }
  else if (!summ) {
    alert('не указана сумма')
    closePopup()
    return
  }
  else if (!date) {
    alert('не указана дата')
    closePopup()
    return
  }
  else if (category == 0) {
    console.log(category.value);
    alert('не выбранна категория')
    closePopup()
    return
  }
  else if (!comment) {
    alert('не указан комментарий')
    closePopup()
    return
  }

  else if (selectedValue === "Доход") {
    console.log(
      category.value

    );

    let newObject = {
      id: lastId + 1,
      user_id: user_id,
      "category_expense_id": null,
      "category_income_id": Number(category),
      "type": "income",
      "amount": Number(summ),
      "date": date,
      "comment": comment,
    };
    console.log(newObject);
    // Добавляем новый объект в массив
    operationInitial.push(newObject);
    console.log(operationInitial);

  }
  else if (selectedValue === "Расход") {
    let newObject = {
      id: lastId + 1,
      user_id: user_id,
      "category_income_id": Number(category),
      "category_income_id": null,
      "type": "expense",
      "amount": Number(summ),
      "date": date,
      "comment": comment,
    };
    console.log(newObject);
    // Добавляем новый объект в массив
    operationInitial.push(newObject);
    console.log(operationInitial);
  }
  //удаляем попап (аналог закрытия)
  const popoff = document.getElementById("pop-off")
  popoff.parentNode.removeChild(popoff)
}

addObject()