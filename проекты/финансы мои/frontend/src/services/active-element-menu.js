export class ActiveElement {
  constructor() {
    this.delStyles
    this.addStyles()
  }
  delStyles() {
    let activeList = document.getElementsByClassName("active");
    for (let i = 0; i < activeList.length; i++) {
      activeList[i].classList.remove("active");
    }
    let borderList = document.getElementsByClassName("border");
    for (let i = 0; i < borderList.length; i++) {
      borderList[i].classList.remove("border");
    }
  }
  addStyles() {
    if (window.location.hash === '#/main') {
      this.delStyles()
      document.getElementById("main-page").classList.add("active");
      document.getElementById('options').classList.add("none")
    }
    if (window.location.hash === '#/in-out') {
      this.delStyles()
      document.getElementById('in-out').classList.add("active");
      document.getElementById('options').classList.add("none")

    }
    if (window.location.hash === '#/in') {
      this.delStyles()
      document.getElementById('accordion-header').classList.add("active")
      document.getElementById('accordion').classList.add("border")
      document.getElementById('in').classList.add("active")
      document.getElementById('options').classList.remove("none")
    }
    if (window.location.hash === '#/out') {
      this.delStyles()
      document.getElementById('accordion-header').classList.add("active")
      document.getElementById('accordion').classList.add("border")
      document.getElementById('out').classList.add("active")
      document.getElementById('options').classList.remove("none")
    }
    if (window.location.hash === '#/in-red') {
      this.delStyles()
      document.getElementById('accordion-header').classList.add("active")
      document.getElementById('accordion').classList.add("border")
      document.getElementById('in').classList.add("active")
      document.getElementById('options').classList.remove("none")
    }
    if (window.location.hash === '#/out-red') {
      this.delStyles()
      document.getElementById('accordion-header').classList.add("active")
      document.getElementById('accordion').classList.add("border")
      document.getElementById('out').classList.add("active")
      document.getElementById('options').classList.remove("none")
    }
    if (window.location.hash === '#/in-out-add') {
      this.delStyles()
      document.getElementById('accordion-header').classList.add("active")
      document.getElementById('accordion').classList.add("border")
      document.getElementById('options').classList.remove("none")
      document.getElementById('in').classList.add("active")
      document.getElementById('out').classList.add("active")
      /*  
       document.getElementById('accordion').classList.add("border")
       */
    }
    if (window.location.hash === '#/out-red') {
      this.delStyles()
      document.getElementById('accordion-header').classList.add("active")
      document.getElementById('accordion').classList.add("border")
      document.getElementById('out').classList.add("active")
      document.getElementById('options').classList.remove("none")
    }
  }
}