export class BalanceMoneyInMenu {
  constructor() {
    let xAuthToken = localStorage.getItem("accessToken")
    if (xAuthToken) {
      let myHeaders = new Headers();
      myHeaders.append("x-auth-token", xAuthToken);
      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      setInterval(() => {
        fetch("http://localhost:3000/api/balance", requestOptions)
          .then(response => response.json())
          .then(result => {
            let balance = result.balance
            document.getElementById('balance').innerText = balance + '₽'
          })
          .catch(error => console.log('error', error))
      }, 2000);
    }
  }
}