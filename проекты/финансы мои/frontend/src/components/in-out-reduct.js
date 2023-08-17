import { SidebarMenu } from "../services/sidebar-menu.js"

export class InOutReduct {
  constructor() {
    //стандартные элементы страницы

    new SidebarMenu()
    this.select = null
    this.category = null
    this.date = null
    this.summ = null
    this.object = null

    this.showOperation()
    this.refreshOperation()
  }

  showOperation() {
    let xAuthToken = localStorage.getItem("accessToken")
    let operationNum = localStorage.getItem("operation-num")
    console.log(xAuthToken);

    if (xAuthToken) {
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
          this.object = result.find(item => item.id === +operationNum);
          document.getElementById('select').value = this.object.type === 'income' ? 'Доход' : 'Расход'
          document.getElementById('category').value = this.object.category;
          this.summ = document.getElementById('summ').value = this.object.amount;
          this.date = document.getElementById('date').value = this.object.date;
          this.comment = document.getElementById('comment').value = this.object.comment;
          this.refreshOperation()
        }
        );
    }
  }

  refreshOperation() {
    document.getElementById('saveData').addEventListener('click', () => {
      let xAuthToken = localStorage.getItem("accessToken")
      let operationNum = localStorage.getItem("operation-num")
      let myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);
      myHeaders.append("Content-Type", "application/json");
      let raw = JSON.stringify({
        "type": 'income' ? 'Доход' : 'Расход',
        "amount": +document.getElementById('summ').value,
        "date": document.getElementById('date').value,
        "comment": document.getElementById('comment').value,
        "category_id": operationNum
      });

      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/operations/" + operationNum, requestOptions)
        .then(response => response.text(),
          location.href = "#/in-out")
        .catch(error => console.log('error', error));
    });
  }
}