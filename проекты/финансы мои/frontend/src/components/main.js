import { SidebarMenu } from "../services/sidebar-menu.js";

export class Main {
  constructor() {
    //стандартные элементы страницы
    new SidebarMenu()
    this.clickButtons()
    this.showAllOperations('all')
  }
  clickButtons() {
    document.getElementById('today').addEventListener('click', () => {
      this.showAllOperations('today')
    })
    document.getElementById('week').addEventListener('click', () => {
      this.showAllOperations('week')
    })
    document.getElementById('month').addEventListener('click', () => {
      this.showAllOperations('month')
    })
    document.getElementById('year').addEventListener('click', () => {
      this.showAllOperations('year')
    })
    document.getElementById('all').addEventListener('click', () => {
      this.showAllOperations('all')
    })
    document.getElementById('interval').addEventListener('click', () => {
      let dateFrom = document.getElementById('date-start').value
      let dateTo = document.getElementById('date-end').value
      const regex = /^\d{4}-\d{2}-\d{2}$/;

      if (!dateFrom || !regex.test(dateFrom)) {
        alert('выберите дату отсчёта');
        return
      }
      else if (!dateTo || !regex.test(dateTo)) {
        alert('выберите дату окночания');
        return
      }
      else if (dateFrom && dateTo) {
        let interval = `interval&dateFrom=${dateFrom}&dateTo='${dateTo}`
        this.showAllOperations(interval)
      }
    })
  }

  showAllOperations(param) {
    document.getElementById('main-pies').innerHTML = ''
    document.getElementById('main-pies').innerHTML =
      `<div class="chart-container">
      <canvas id = "myChart1"></canvas>
    </div>
    <div class="chart-container">
      <canvas id="myChart2"></canvas>
    </div>`
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://localhost:3000/api/operations?period=" + param, requestOptions)
        .then(response => response.json())
        .then(result => {

          //отрисовываем суммы расходов
          let expenses = result.filter(operation => operation.type === "expense").map(operation => operation.amount);
          let expensesComment = result.filter(operation => operation.type === "expense").map(operation => operation.comment);

          // отрисовываем суммы доходов
          let incomes = result.filter(operation => operation.type === "income").map(operation => operation.amount);
          let incomesComment = result.filter(operation => operation.type === "income").map(operation => operation.comment);


          new Chart(document.getElementById("myChart1"), {
            type: "pie",
            data: {
              labels: incomesComment,
              datasets: [
                {
                  data: incomes,
                  backgroundColor: [
                    "red", "orange", "yellow", "green", "blue", "aqua", "black", "fuchsia", "gray", "lime", "maroon", "navy", "olive", "purple", "silver", "teal"],
                  hoverOffset: -20,
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 12
                    },
                    color: 'black',
                  },
                },
                title: {
                  display: true,
                  text: 'Доходы',
                  color: 'black',
                  font: {
                    size: 28,
                  },
                  padding: {
                    bottom: 20
                  }
                }
              }
            }
          });


          new Chart(document.getElementById("myChart2"), {
            type: "pie",
            data: {
              labels: expensesComment,
              datasets: [
                {
                  data: expenses,
                  backgroundColor: [
                    "red", "orange", "yellow", "green", "blue", "aqua", "black", "fuchsia", "gray", "lime", "maroon", "navy", "olive", "purple", "silver", "teal"],
                  hoverOffset: -20,
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 12
                    },
                    color: 'black',
                  },
                },
                title: {
                  display: true,
                  text: 'Расходы',
                  color: 'black',
                  font: {
                    size: 28,
                  },
                  padding: {
                    bottom: 20
                  }
                }
              }
            }
          });
        }
        )
        .catch(error => console.log('error', error));
    }
  }
}

