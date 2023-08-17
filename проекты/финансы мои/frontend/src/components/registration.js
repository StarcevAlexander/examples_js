export class Registration {

  constructor() {
    document.getElementById('sidebar').style.display = 'none'
    document.getElementById('popup').style.display = 'none'

    // Получаем ссылки на элементы input и button
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const inputRePassword = document.getElementById('re-password');
    const submitButton = document.getElementById('submitButton');

    // Добавляем обработчик события клика на кнопку
    submitButton.addEventListener('click', function () {
      // Получаем значение из инпута
      let name = inputName
      let email = inputEmail;
      let password = inputPassword;
      let rePassword = inputRePassword;

      let valueName = inputName.value;
      let valueEmail = inputEmail.value;
      let valuePassword = inputPassword.value;
      let valueRePassword = inputRePassword.value;

      // Проверяем значение на соответствие регулярному выражению
      const regexName = /^(?:[А-ЯЁ][а-яё]{2,}\s){1,}[А-ЯЁ][а-яё]{2,}$/;
      const regexEmail = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (!regexName.test(valueName)) {
        alert("ФИО - может содержать русские буквы и пробелы. Каждое новое слово - с большой буквы")
        name.style.border = '1px solid red'
      }
      else {
        name.style.border = '1px solid green'
      }
      if (!regexEmail.test(valueEmail)) {
        alert("email должен быть корректным")
        email.style.border = '1px solid red'
      }
      else {
        email.style.border = '1px solid green'
      }

      if (!regexPassword.test(valuePassword)) {
        alert("пароль должен быть не менее 8 символов, содержать как минимум 1 букву в верхнем регистре и как минимум 1 цифру")
        password.style.border = '1px solid red'
      }
      else {
        password.style.border = '1px solid green'
      }

      if (!(valuePassword === valueRePassword)) {
        alert("пароли не совпадают")
        password.style.border = '1px solid red'
        rePassword.style.border = '1px solid red'
      }
      else {
        password.style.border = '1px solid green'
        rePassword.style.border = '1px solid green'
      }

      if (regexName.test(valueName) && regexEmail.test(valueEmail) && regexPassword.test(valuePassword) && valuePassword === valueRePassword) {

        // Если значение соответствует регулярному выражению, добавляем его в массив userInitial
        //из фио клепаем фамилию и имя
        let arr = valueName.split(" ");
        let name = arr[0];
        let lastName = arr[1];

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          "name": name,
          "lastName": lastName,
          "email": valueEmail,
          "password": valuePassword,
          "passwordRepeat": valueRePassword,
        });

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };


        //        регистририуем пользователя
        fetch("http://localhost:3000/api/signup", requestOptions)
          .then(response =>
            response.json())
          .catch(error =>
            aler('Ошибка регистрации')
          )
          .then(response => {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let raw = JSON.stringify({
              "email": valueEmail,
              "password": valuePassword,
              "rememberMe": true,
            });

            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            //сразу же логинимся
            fetch("http://localhost:3000/api/login", requestOptions)
              .then(response => {
                return response.json();
              })
              .then(data => {
                const { user, tokens } = data;

                if (user.lastName && user.name) {
                  const fullName = `${user.lastName} ${user.name}`;
                  alert(`Добро пожаловать, ${fullName}! Поздравляю с регистрацией!`);
                  // сохраняем токен в localStorage
                  localStorage.setItem('accessToken', tokens.accessToken);
                  localStorage.setItem('refreshToken', tokens.refreshToken);
                  localStorage.setItem('fullName', fullName);
                  location.href = "#/main";
                }
              })
              .catch(error => alert('Ошибка регистрации'));
          })



      }
    })
  }
}