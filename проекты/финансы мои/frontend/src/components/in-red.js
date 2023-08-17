import { SidebarMenu } from "../services/sidebar-menu.js"

export class InRed {
  constructor() {
    new SidebarMenu()
    this.param = null
    this.redirectLink = null
    this.checkPage()

    //стандартные элементы страницы
    this.start()
    this.redactCategoryIn()
    let filteredData
    function dataRed() {
      let xAuthToken = localStorage.getItem("accessToken")
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/operations?period=all", requestOptions)
        .then(response => response.json())
        .then(result => {
          let operationReductInTitle = localStorage.getItem("operationReductInTitle");
          filteredData = result.filter(obj => obj.category == operationReductInTitle);
        },
        )
    }
    dataRed()
  }


  checkPage() {
    if (window.location.hash === '#/in-red') {
      this.param = 'income'
      this.redirectLink = '#/in'
    }
    else {
      this.param = 'expense'
      this.redirectLink = '#/out'
    }
  }
  start() {
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

  redactCategoryIn() {
    let redact = document.getElementById('reduct')
    redact.addEventListener('click', () => {
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
          location.href = this.redirectLink
        })
        .catch(error => console.log('error', error));
    });
  }
}