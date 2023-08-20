export class Refresh {
  constructor() {
    this.refreshTokens();   
  }

  refreshTokens() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let refreshToken = localStorage.getItem("refreshToken");

    let raw = JSON.stringify({
      refreshToken: refreshToken
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/refresh", requestOptions)
      .then(response => response.json())
      .then(response => {
        const data = response;
        localStorage.setItem("accessToken", data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
      })
      .catch(error => console.log("error", error));
  }
}