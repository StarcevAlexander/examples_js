function changeTextColorByClass() {
  let elements = document.getElementsByClassName('he-type');

  for (var i = 0; i < elements.length; i++) {
    let text = elements[i].innerText;

    if (text === "доход") {
      elements[i].style.color = "green";
    } else if (text === "расход") {
      elements[i].style.color = "red";
    }
  }
}

changeTextColorByClass();
