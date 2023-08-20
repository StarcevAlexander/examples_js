import { SidebarMenu } from "../services/sidebar-menu.js";

export class Add {
  constructor(param) {
    new SidebarMenu()
    const doItButton = document.getElementById('create-redact-cetegory');
    const backButton = document.getElementById('back-to-category')
    this.titleElement = document.getElementById('hi-title')

    this.param = null
    this.link = null

    if (param === 'income') {
      this.param = 'income'
      this.titleElement.innerText = 'Создание категории доходов';
      this.link = '#/in'
      backButton.href = this.link
      doItButton.onclick = () => this.createCategory();
    }
    if (param === 'expense') {
      this.param = 'expense'
      this.titleElement.innerText = 'Создание категории расходов';
      this.link = '#/out'
      backButton.href = this.link
      doItButton.onclick = () => this.createCategory();
    }
    if (param === 'redact-in') {
      this.param = 'income'
      this.titleElement.innerText = 'Редактирование категории доходов';
      this.link = '#/in'
      backButton.href = this.link
      this.showRedactCategory();
      doItButton.onclick = () => this.saveRedactCategory()
    }
    if (param === 'redact-out') {
      this.param = 'expense'
      this.titleElement.innerText = 'Редактирование категории расходов';
      this.link = '#/out'
      backButton.href = this.link
      this.showRedactCategory();
      doItButton.onclick = () => this.saveRedactCategory()
    }
  }


  createCategory() {
    let xAuthToken = localStorage.getItem("accessToken")
    let inputValue = document.getElementById('category-add').value

    if (xAuthToken && inputValue) {
      let myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);
      myHeaders.append("Content-Type", "application/json");
      let raw = JSON.stringify({
        "title": inputValue
      });

      var requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://localhost:3000/api/categories/" + this.param, requestOptions)
        .then(() => {
          alert('Категория создана');
          location.href = this.link
        })
        .catch(error => console.log('error', error));
    }
    if (!inputValue) {
      alert("Нужно заполнить поле, блин!")
    }
  }

  showRedactCategory() {
    let num = Number(localStorage.getItem("operationReductInNum"))
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/categories/" + this.param, requestOptions)
        .then(response => response.json())
        .then(result => {
          let elementWithId = result.find(element => element.id === num);
          document.getElementById('red-category').value = elementWithId.title
        }
        )
        .catch(error => console.log('error', error));
    }
  }
  saveRedactCategory() {
    let number = Number(localStorage.getItem("operationReductInNum"))
    let inputValue = document.getElementById("red-category").value;
    var myHeaders = new Headers();
    let xAuthToken = localStorage.getItem("accessToken")
    myHeaders.append("x-auth-token", xAuthToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "title": inputValue
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/categories/" + this.param + "/" + number, requestOptions)
      .then(() => {
        alert('Категория изменена!')
        location.href = this.link
      })
      .catch(error => console.log('error', error));
  }
}