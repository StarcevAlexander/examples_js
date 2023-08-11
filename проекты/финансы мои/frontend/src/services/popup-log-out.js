export class PopupLogout {
  constructor() {
    this.popup = document.getElementById('popup');
    this.logoutBtnAva = document.getElementById('log-out');
    this.logoutBtn = document.getElementById('logout');
    this.closeBtn = document.getElementById('dont-delete');

    this.logoutBtnAva.addEventListener('click', this.showPopup.bind(this));
    this.logoutBtn.addEventListener('click', this.logout.bind(this));
    this.closeBtn.addEventListener('click', this.closePopup.bind(this));
  }

  showPopup() {
    this.popup.style.display = 'flex';
  }

  logout() {
    window.location.href = '/#/';
    localStorage.clear();
  }
  closePopup() {
    this.popup.style.display = 'none';
  }
}