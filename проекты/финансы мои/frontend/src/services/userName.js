export class fullName {
  constructor() {
    let storedUserInitial = localStorage.getItem("fullName");
    document.getElementById('user').innerText = storedUserInitial
  }
}