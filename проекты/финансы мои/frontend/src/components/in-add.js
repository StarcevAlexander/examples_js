import { fullName } from "../services/userName.js";
import { BalanceMoneyInMenu } from "../services/how-many-money.js";
import { Accordion } from "../services/accordion.js";
import { PopupLogout } from "../services/popup-log-out.js";
import { Refresh } from "../services/refresh.js";

export class InAdd {
  constructor() {
    const addButton = document.getElementById('create-cetegory-in');
    addButton.addEventListener('click', this.createCategoryIn);

    //стандартные элементы страницы
    new Accordion();
    new fullName()
    new BalanceMoneyInMenu()
    new PopupLogout()
    new Refresh()
  }


  createCategoryIn() {
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

      fetch("http://localhost:3000/api/categories/income", requestOptions)
        .then(() => {
          alert('Категория создана');
          location.href = '#/out'
        })
        .catch(error => console.log('error', error));
    }
    if (!inputValue) {
      alert("Нужно заполнить поле, блин!")
    }
  }
}


