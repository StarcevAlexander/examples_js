import { fullName } from "../services/userName.js";
import { BalanceMoneyInMenu } from "../services/how-many-money.js";
import { Accordion } from "../services/accordion.js";
import { PopupLogout } from "../services/popup-log-out.js";
import { Refresh } from "../services/refresh.js";

export class InRed {
  constructor() {

    //стандартные элементы страницы
    new Accordion();
    new fullName()
    new BalanceMoneyInMenu()
    new PopupLogout()
    new Refresh()
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
          console.log(result);
          let operationReductInTitle = localStorage.getItem("operationReductInTitle");
          console.log(operationReductInTitle);
          filteredData = result.filter(obj => obj.category == operationReductInTitle);
          console.log(filteredData);
        },
        )
    }
    dataRed()
  }

  start() {
    let num = Number(localStorage.getItem("operationReductInNum"))
    let xAuthToken = localStorage.getItem("accessToken")
    console.log(xAuthToken);
    if (xAuthToken) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/categories/income", requestOptions)
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
    redact.addEventListener('click', function () {
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

      fetch("http://localhost:3000/api/categories/income/" + number, requestOptions)
        .then(alert('Категория изменена!'),
          location.href = "/#/in"
        )
        .catch(error => console.log('error', error));
    });
  }
}
