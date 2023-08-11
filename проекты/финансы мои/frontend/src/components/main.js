import { fullName } from "../services/userName.js";
import { BalanceMoneyInMenu } from "../services/how-many-money.js";
import { Accordion } from "../services/accordion.js";
import { PopupLogout } from "../services/popup-log-out.js";
import { Refresh } from "../services/refresh.js";

export class Main {
  constructor() {
    //стандартные элементы страницы
    new Accordion();
    new fullName()
    new BalanceMoneyInMenu()
    new PopupLogout()
    this.restart()
    this.startMain()
    new Refresh()
    this.clickButtons()
  }
  clickButtons() {
    document.getElementById('today').addEventListener('click', () => {
      this.restart()
      this.showToday()
    })
    document.getElementById('week').addEventListener('click', () => {
      this.restart()
      this.showWeek()
    })
    document.getElementById('month').addEventListener('click', () => {
      this.restart()
      this.showMounth()
    })
    document.getElementById('year').addEventListener('click', () => {
      this.restart()
      this.showYear()
    })
    document.getElementById('all').addEventListener('click', () => {
      this.restart()
      this.startMain()
    })
    document.getElementById('interval').addEventListener('click', () => {
      this.restart()
      this.showInterval()
    })
  }
  restart() {
    document.getElementById('main-pies').innerHTML = ''
    document.getElementById('main-pies').innerHTML =
      `<div class="chart-container">
      <canvas id = "myChart1"></canvas>
    </div>
    <div class="chart-container">
      <canvas id="myChart2"></canvas>
    </div>`
  }
  showToday() {
    let today = new Date().toISOString().split('T')[0];
    let xAuthToken = localStorage.getItem("accessToken")

    if (xAuthToken) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch('http://localhost:3000/api/operations?period=interval&dateFrom=' + today + '&' + 'dateTo=' +
        today, requestOptions)
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
  showWeek() {
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/operations?period=week", requestOptions)
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
  showMounth() {
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/operations?period=month", requestOptions)
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
  showYear() {
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/operations?period=year", requestOptions)
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
  showInterval() {
    let dateFrom = document.getElementById('date-start').value
    let dateTo = document.getElementById('date-end').value
    let xAuthToken = localStorage.getItem("accessToken")
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFrom || !regex.test(dateFrom)) {
      alert('введите дату отсчёта в формате YYYY-MM-DD');
      this.startMain()
    }
    else if (!dateTo || !regex.test(dateTo)) {
      alert('введите дату отсчёта в формате YYYY-MM-DD');
      this.startMain()
    }

    else if (xAuthToken && dateFrom && dateTo) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };



      fetch('http://localhost:3000/api/operations?period=interval&dateFrom=' + dateFrom + '&' + 'dateTo=' +
        dateTo, requestOptions)
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
  startMain() {
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
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

