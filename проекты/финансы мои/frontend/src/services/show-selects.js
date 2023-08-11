myFunction()
function myFunction() {
  
  const selectElement = document.getElementById("mySelect");
  const elementCategory = document.getElementById('category');
  let selectedValue = selectElement.options[selectElement.selectedIndex].value;
  
  if (selectedValue === "Доход") {
    elementCategory.innerHTML = ""
    const selectCategory = document.createElement('select');
    selectCategory.setAttribute('id', 'category-select');
    selectCategory.style.height = '34px';
    selectCategory.style.width = '372px';
    selectCategory.style.borderRadius = '4px';
    selectCategory.style.backgroundColor = 'white';
    selectCategory.style.border = 'none';
    selectCategory.style.paddingLeft = '10px';

    const placeholderCategory = document.createElement('option');
    placeholderCategory.disabled = true;
    placeholderCategory.selected = true;
    placeholderCategory.text = 'Категория...';
    placeholderCategory.value = 0;
    selectCategory.appendChild(placeholderCategory);

    categoryIncomeInitial.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.value = category.id;
      optionElement.text = category.title;
      selectCategory.appendChild(optionElement);
    });

    // Добавляем select на страницу
    elementCategory.appendChild(selectCategory);

  }
  else {
    elementCategory.innerHTML = ""
    const selectCategory = document.createElement('select');
    selectCategory.setAttribute('id', 'category-select');
    selectCategory.style.height = '34px';
    selectCategory.style.width = '372px';
    selectCategory.style.borderRadius = '4px';
    selectCategory.style.backgroundColor = 'white';
    selectCategory.style.border = 'none';
    selectCategory.style.paddingLeft = '10px';

    const placeholderCategory = document.createElement('option');
    placeholderCategory.disabled = true;
    placeholderCategory.selected = true;
    placeholderCategory.text = 'Категория...';
    placeholderCategory.value = 0;
    selectCategory.appendChild(placeholderCategory);

    categoryExtenceInitial.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.value = category.id;
      optionElement.text = category.title;
      selectCategory.appendChild(optionElement);
    });
    elementCategory.appendChild(selectCategory);
  }
}



