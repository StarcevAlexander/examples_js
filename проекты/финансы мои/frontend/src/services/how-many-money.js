export class BalanceMoneyInMenu {
  constructor() {
    let xAuthToken = localStorage.getItem("accessToken")
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", xAuthToken);

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
          let totalIncome = 0;
          let totalExpense = 0;
          for (let i = 0; i < result.length; i++) {
            if (result[i].type === "income") {
              totalIncome += result[i].amount;
            } else if (result[i].type === "expense") {
              totalExpense += result[i].amount;
            }
          }
          let balance  = totalIncome - totalExpense;
          document.getElementById('balance').innerText = balance + "₽"

        }
        )
        .catch(error => console.log('error', error));
    }
  }
}