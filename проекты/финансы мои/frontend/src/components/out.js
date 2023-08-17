import { SidebarMenu } from "../services/sidebar-menu.js"

export class Out {
  constructor() {
    //стандартные элементы страницы
    new SidebarMenu()
    this.idOperation = null
    this.titleOperation = null
    this.filterByCategory = null;
    this.showAll()
    this.createCategoryPopup
    this.deleteCategoryIn
  }
  showAll() {
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      let myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/categories/expense", requestOptions)
        .then(response => response.json())
        .then(result => {

          const cards = document.getElementById('cards');
          cards.innerHTML = '';
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
              this.createCategoryPopup()
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
              location.href = '#/out-red'
            });
          });

        }
        )
        .catch(error => console.log('error', error));
    }
  }

  createCategoryPopup() {
    const popup = document.getElementById('popup-category')
    popup.style.display = 'flex';

    document.getElementById('delete-category').addEventListener('click', () => {
      popup.style.display = 'none'
      document.getElementById('cards').innerHTML = '';
      this.deleteCategoryIn()
    });
    document.getElementById('dont-delete-category').addEventListener('click', () => popup.style.display = 'none');
  }

  deleteCategoryIn() {
    let xAuthToken = localStorage.getItem("accessToken")
    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", xAuthToken);
    let raw = "";

    let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/categories/expense/" + this.idOperation, requestOptions)
      .then(() => {
        this.showAll();
        this.deleteOperationsByCategory();
      })
      .catch(error => console.log('error', error));
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
        this.filteredArray = result.filter(item => item.category == undefined)
        let ids = this.filteredArray.map(obj => obj.id);
        ids.forEach(element => {
          let xAuthToken = localStorage.getItem("accessToken")
          let myHeaders = new Headers();
          myHeaders.append("x-auth-token", xAuthToken);

          let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch("http://localhost:3000/api/operations/" + element, requestOptions)
            .catch(error => console.log('error', error));
        }
        )
      }
      );

  }
}



/* import { SidebarMenu } from "../services/sidebar-menu.js";

export class Out {
  constructor() {
    new SidebarMenu()
    //стандартные элементы страницы
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

      fetch("http://localhost:3000/api/categories/expense", requestOptions)
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
            href="#/out-add"
            style="text-decoration: none"
            class="card add-card hov"
          >
            <div class="add-card">+</div>
          </a>
        </div>

`
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

    fetch("http://localhost:3000/api/categories/expense/" + this.idOperation, requestOptions)
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
} */