import { SidebarMenu } from "../services/sidebar-menu.js";


export class InOutAdd {
  constructor() {
    new SidebarMenu()
    //стандартные элементы страницы
    this.createCategoryList()
    this.restartCreateCategoryList()
    this.addCategoryPopup()
  }


  checkInputData() {
    let selectElement = document.getElementById("mySelect").value
    let categoryElement = document.getElementById("category").value;
    let summ = document.getElementById('summ')
    let date = document.getElementById('date')
    let comment = document.getElementById('comment')
    let summVal = summ.value
    let dateVal = date.value
    let commentVal = comment.value
    const summRegex = /^[0-9.]+$/
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/


    if (!summVal) {
      alert('сумма не указана')
      summ.style.border = '1px solid red'
      return false;
    }
    if (!summRegex.test(summVal)) {
      alert('сумма указывается только числами и точками')
      summ.style.border = '1px solid red'
      return false;
    }
    else {
      summ.style.border = '1px solid green'
    }

    if (!dateVal) {
      date.style.border = '1px solid red'
      alert('не указана дата')
      return false;
    }
    if (!dateRegex.test(dateVal)) {
      date.style.border = '1px solid red'
      alert('введите дату в формате YYYY-MM-DD')
      return false;
    }
    else {
      date.style.border = '1px solid green'
    }

    if (!commentVal) {
      comment.style.border = '1px solid red'
      alert('не указан комментарий')
      return false;
    }
    else {
      comment.style.border = '1px solid green'
    }


    if (!selectElement) {
      alert('не выбрано направление')
      return false;
    }
    if (!categoryElement) {
      alert('не выбрана категория? возможно она не создана')
      return false;
    }
    return true
  }

  restartCreateCategoryList() {
    document.getElementById("mySelect").addEventListener('change', this.createCategoryList.bind(this))
  }

  createCategoryList() {
    let value = document.getElementById("mySelect").value;

    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      let myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/categories/" + value, requestOptions)
        .then(response => response.json())

        .then(result => {
          const categoryElement = document.getElementById("category");
          categoryElement.innerHTML = ''
          result.forEach(item => {
            let optionElement = document.createElement("option");
            optionElement.text = item.title;
            optionElement.value = item.id;
            categoryElement.appendChild(optionElement);
          });
        });
    }
  }

  addCategoryPopup() {

    document.getElementById('create-operation').addEventListener('click', () => {
      const popup = document.createElement('div');
      document.body.appendChild(popup);
      popup.innerHTML = `<div class="popup" id='pop-off' style="display: flex">
  <div class="sure">
  <div class="sure-text">
  Вы действительно хотите создать новый элемент?
  </div>
  <div class="card-buttons">
  <div class="card-btn green hov" id="yes">Да</div>
  <div class="card-btn red hov" id="no">Нет</div></div>
  </div>
  </div>`

      document.getElementById('no').addEventListener('click', function () {
        let popOffElement = document.getElementById("pop-off");
        popOffElement.parentNode.removeChild(popOffElement);
      });
      document.getElementById('yes').addEventListener('click',
        () => {
          let popOffElement = document.getElementById("pop-off");
          popOffElement.parentNode.removeChild(popOffElement);
          this.addCategory()
        });
    })
  }
  addCategory() {
    if (this.checkInputData()) {
      let date = document.getElementById('date').value
      let comment = document.getElementById('comment').value
      let selectElement = document.getElementById("mySelect").value
      let categoryElement = document.getElementById("category").value;
      let summ = document.getElementById('summ').value

      let xAuthToken = localStorage.getItem("accessToken")
      let myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "type": selectElement,
        "amount": summ,
        "date": date,
        "comment": comment,
        "category_id": +categoryElement,
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/operations", requestOptions)
        .then(response => response.json())
        .then(location.href = "#/in-out")
        .catch(error => console.log('error', error));
    }
  }
}
