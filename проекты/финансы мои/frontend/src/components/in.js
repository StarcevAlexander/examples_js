import { fullName } from "../services/userName.js";
import { BalanceMoneyInMenu } from "../services/how-many-money.js";
import { Accordion } from "../services/accordion.js";
import { PopupLogout } from "../services/popup-log-out.js";
import { Refresh } from "../services/refresh.js";

export class In {
  constructor() {
    //стандартные элементы страницы
    new Accordion();
    new fullName()
    new BalanceMoneyInMenu()
    new PopupLogout()
    new Refresh()
    this.idOperation = null
    this.titleOperation = null
    this.filterByCategory = null;
    this.showAll()
  }
  showAll() {
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

          const cards = document.getElementById('cards');

          result.forEach(element => {
            const card = document.createElement('div');
            cards.appendChild(card);
            card.innerHTML = `<div class="card hov"><div class="card-title">${element.title}</div>
  <div class="card-buttons" id="${element.id}" title="${element.title}"><div class="card-btn blue hov redact">Редактировать</div>
  <div class="card-btn red hov delete">Удалить</div></div></div>`
          }
          );
          let cardAdd = document.createElement('div')
          cardAdd.innerHTML = `<div>
          <a
            href="#/in-add"
            style="text-decoration: none"
            class="card add-card hov"
          >
            <div class="add-card">+</div>
          </a>
        </div>`
          cards.appendChild(cardAdd)
          //ищем все кнопки удалить
          const deleteButtons = document.querySelectorAll('.delete');
          // Добавляем обработчик события клика для каждого элемента
          deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
              // Выводим значение и тип id родителя
              this.idOperation = button.parentNode.id;
              this.titleOperation = button.parentNode.title;
              this.deleteCategoryIn()
            });
          });
          //ищем все кнопки редактировать
          const putButtons = document.querySelectorAll('.redact');
          // Добавляем обработчик события клика для каждого элемента
          putButtons.forEach(button => {
            button.addEventListener('click', () => {
              // Выводим значение и тип id родителя
              this.idOperation = button.parentNode.id;
              this.titleOperation = button.parentNode.title;
              localStorage.setItem(
                'operationReductInNum', this.idOperation
              )
              localStorage.setItem(
                'operationReductInTitle', this.titleOperation
              )
              location.href = '#/in-red'
            });
          });
        }
        )
        .catch(error => console.log('error', error));
    }
  }


  deleteCategoryIn() {

    console.log(this.titleOperation);
    let xAuthToken = localStorage.getItem("accessToken")
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", xAuthToken);
    var raw = "";

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/categories/income/" + this.idOperation, requestOptions)
      .then(alert(
        'категория удалена'),
        document.getElementById('cards').innerHTML = '',
        this.showAll()
      )
      .catch(error => console.log('error', error));
    this.deleteOperationsByCategory()

  }

  deleteOperationsByCategory() {
    let xAuthToken = localStorage.getItem("accessToken")

    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", xAuthToken);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/operations?period=all", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.filteredArray = result.filter(item => item.category == undefined)
        let ids = this.filteredArray.map(obj => obj.id);
        console.log(ids);

        ids.forEach(element => {
          console.log(typeof element)
          let xAuthToken = localStorage.getItem("accessToken")
          let myHeaders = new Headers();
          myHeaders.append("x-auth-token", xAuthToken);

          let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch("http://localhost:3000/api/operations/" + element, requestOptions)
            .then(result =>
              console.log(result),
              document.getElementById('cards').innerHTML = '',
            )
            .catch(error => console.log('error', error));
        }
        )
        this.showAll()
      }
      );

  }
}