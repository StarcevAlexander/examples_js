export class Registration {
//для регистрации и авторизации пользователя
  constructor() {
    document.getElementById('sidebar').style.display = 'none'
    document.getElementById('popup').style.display = 'none'

    this.inputName = document.getElementById('name')
    this.inputEmail = document.getElementById('email')
    this.inputPassword = document.getElementById('password')
    this.inputRePassword = document.getElementById('re-password')

    this.agreeCheck = document.getElementById('agree')
    this.submitButton = document.getElementById('submitButton')

    this.regexName = /^(?:[А-ЯЁ][а-яё]{2,}\s){1,}[А-ЯЁ][а-яё]{2,}$/
    this.regexEmail = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    this.regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

    this.fullName = null
    
    this.pageRouter()
    this.registration
    this.login
  }
  pageRouter() {
    this.submitButton.onclick = () => {
      if (window.location.hash === '#/registration') {
        this.registration();
      }
      if (window.location.hash === '#/') {
        this.login();
      }
    }
  }

  login() {
    this.valueEmail = this.inputEmail.value
    this.valuePassword = this.inputPassword.value;

    // Проверяем значение на соответствие регулярному выражению
    if (!this.regexEmail.test(this.valueEmail)) {
      alert("email должен быть корректным");
      this.inputEmail.style.border = '3px solid red';
      return
    }
    else {
      this.inputEmail.style.border = '3px solid green';
    }

    if (!this.regexPassword.test(this.valuePassword)) {
      alert("пароль должен быть не менее 8 символов, содержать как минимум 1 букву в верхнем регистре и как минимум 1 цифру");
      this.inputPassword.style.border = '3px solid red';
      return
    }
    else {
      this.inputPassword.style.border = '3px solid green';
    }

    if (this.regexEmail.test(this.valueEmail) && this.regexPassword.test(this.valuePassword)) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "email": this.valueEmail,
        "password": this.valuePassword,
        "rememberMe": !this.agreeCheck ? true : this.agreeCheck.checked,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/login", requestOptions)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Неверный логин или пароль');
          }
        })
        .then(data => {
          const { user, tokens } = data;
          if (user.lastName && user.name) {
            this.fullName = `${user.lastName} ${user.name}`;
            alert(`Добро пожаловать, ${this.fullName}!`);
            // сохраняем токен в localStorage
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            localStorage.setItem('fullName', this.fullName);
            location.assign("#/main");
          }
        })
        .catch(error => alert(error.message));
    }
    else {
      alert('Данные введены неверно!');
    }
  }
  registration() {
    this.valueName = this.inputName.value;
    this.valueEmail = this.inputEmail.value
    this.valuePassword = this.inputPassword.value;
    this.valueRePassword = this.inputRePassword.value;

    if (!this.regexName.test(this.valueName)) {
      alert("ФИО - может содержать русские буквы и пробелы. Каждое новое слово - с большой буквы")
      this.inputName.style.border = '3px solid red'
      return
    }
    else {
      this.inputName.style.border = '3px solid green'
    }

    if (!this.regexEmail.test(this.valueEmail)) {
      alert("email должен быть корректным")
      this.inputEmail.classList.remove('border-none')
      this.inputEmail.style.border = '3px solid red'
      return
    }
    else {
      this.inputEmail.style.border = '3px solid green'
    }

    if (!this.regexPassword.test(this.valuePassword)) {
      alert("пароль должен быть корректным")
      this.inputPassword.style.border = '3px solid red'
      return
    }
    else {
      this.inputPassword.style.border = '3px solid green'
    }


    if (!(this.valuePassword === this.valueRePassword)) {
      alert("пароли не совпадают")
      this.inputPassword.style.border = '3px solid red'
      this.inputRePassword.style.border = '3px solid red'
      return
    }
    else {
      this.inputPassword.style.border = '3px solid green'
      this.inputRePassword.style.border = '3px solid green'
    }



    // Если значение соответствует регулярному выражению, добавляем его в массив userInitial
    //из фио клепаем фамилию и имя
    let arr = this.valueName.split(" ");
    let name = arr[0];
    let lastName = arr[1];

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "name": name,
      "lastName": lastName,
      "email": this.valueEmail,
      "password": this.valuePassword,
      "passwordRepeat": this.valueRePassword,
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
      .then(response => {
        console.log(response)
        this.login()
      }
      )
      .catch(error => {
        alert('Ошибка регистрации')
        return
      }
      )
  }
}