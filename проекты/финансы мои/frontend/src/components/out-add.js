import { SidebarMenu } from "../services/sidebar-menu.js";

export class OutAdd {
  constructor() {
    const addButton = document.getElementById('create-cetegory-in');
    addButton.addEventListener('click', this.createCategoryIn);

    //стандартные элементы страницы
    new SidebarMenu()
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

      fetch("http://localhost:3000/api/categories/expense", requestOptions)
        .then(response => response.json())
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


