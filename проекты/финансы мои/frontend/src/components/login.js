export class Login {
  constructor() {
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const submitButton = document.getElementById('submitButton');
    const agreeCheck = document.getElementById('agree');

    submitButton.addEventListener('click', function () {
      // Получаем значение из инпута

      let email = inputEmail;
      let password = inputPassword;
      let valueEmail = inputEmail.value;
      let valuePassword = inputPassword.value;

      const regexEmail = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

      // Проверяем значение на соответствие регулярному выражению
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

      if (regexEmail.test(valueEmail) && regexPassword.test(valuePassword)) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          "email": valueEmail,
          "password": valuePassword,
          "rememberMe": agreeCheck.checked ? true : false,
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/login", requestOptions)
          .then(response => {
            return response.json();
          })
          .then(data => {
            const { user, tokens } = data;

            if (user.lastName && user.name) {
              const fullName = `${user.lastName} ${user.name}`;
              alert(`Добро пожаловать, ${fullName}!`);
              // сохраняем токен в localStorage
              localStorage.setItem('accessToken', tokens.accessToken);
              localStorage.setItem('refreshToken', tokens.refreshToken);
              localStorage.setItem('fullName', fullName);
              location.href = "#/main";
            }
          })
          .catch(error => alert('Неверный логин или пароль'));
      }
      else {
        alert('Данные введены неверно!')
      }
    })
  }
}