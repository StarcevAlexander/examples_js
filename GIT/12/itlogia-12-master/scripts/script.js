/* изменения для учебного проекта */





/* Создайте обработчик события полной загрузки страницы и добавляйте новый код только в эту функцию. Внимание, в этом случае невозможно будет использовать подход с указанием функции в атрибуте html. То есть в JS коде вам надо находить элементы, и для них создавать функции-обработчики нужных событий. */
//window.onload = function () {}

//2. В поле "Full Name" запретите вводить цифры.
let fullName = document.getElementById("fullName"),
  userName = document.getElementById("userName"),
  userMail = document.getElementById("userMail"),
  userPass = document.getElementById("userPass"),
  repeatPass = document.getElementById("repeatPass"),
  checkbox = document.getElementById("checkbox"),
  button = document.getElementById("button"),
  form = document.getElementById("js-form"),
  fullNameVal = fullName.value,
  userNameVal = userName.value,
  userMailVal = userMail.value,
  userPassVal = userPass.value,
  repeatPassVal = repeatPass.value;

let reg = /[0-9]/g;
fullName.oninput = function () {
  this.value = this.value.replace(reg, "");
};

let reg2 = /[,.]/g;
userName.oninput = function () {
  this.value = this.value.replace(reg2, "");
};

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    console.log("Согласен");
  } else {
    console.log("Не согласен");
  }
});

const nextStep = (document.getElementById("btn-text").onclick = () => {
  document.querySelector("form").reset();
  document.getElementById("fullNameB").style.display = "none";
  document.getElementById("userMailB").style.display = "none";
  document.getElementById("repeatPassB").style.display = "none";
  document.getElementById("checkboxB").style.display = "none";
  document.getElementById("btn-text").style.display = "none";
  document.getElementById("button").innerText = "Sign In";
  document.getElementById("h1").innerText = "Log in to the system";
  form.onsubmit = function () {
    let userNameVal = userName.value,
      userPassVal = userPass.value;
    if (userNameVal === "") {
      alert('Заполните поле "Your username"');
    } else if (userPassVal === "") {
      alert('Заполните поле "Password"');
    } else {
      alert(`Добро пожаловать, ${userNameVal}!`);
    }
    return false;
  };
});

/* const secondWay = () => {
  if (userNameVal === "") {
    alert('Заполните поле "Your username"');
  } else if (userPassVal === "") {
    alert('Заполните поле "Password"');
  } else {
    alert(`Добро пожаловать, ${userNameVal}!`);
  }
  return false;
};
 */
form.onsubmit = function () {
  let fullNameVal = fullName.value,
    userNameVal = userName.value,
    userMailVal = userMail.value,
    userPassVal = userPass.value,
    repeatPassVal = repeatPass.value;
  if (fullNameVal === "") {
    alert('Заполните поле "Full Name"');
  } else if (userNameVal === "") {
    alert('Заполните поле "Your username"');
  } else if (userMailVal === "") {
    alert('Заполните поле "E-mail"');
  } else if (userPassVal === "") {
    alert('Заполните поле "Password"');
  } else if (repeatPassVal === "") {
    alert('Заполните поле "Repeat Password"');
  } else if (userPassVal.length < 8 || repeatPassVal.length < 8) {
    alert("Пароль не меньше 8 символов");
  } else if (userPassVal != repeatPassVal) {
    alert("Пароли не совпадают");
  } else if (!checkbox.checked) {
    alert("Вы не согласились с условиями!");
  } else document.getElementById("popup").style.display = "flex";
  return false;
};

document.getElementById("btn-ok").onclick = () => {
  document.getElementById("popup").style.display = "none";
  nextStep();
};
