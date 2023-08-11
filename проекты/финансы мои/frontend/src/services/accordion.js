export class Accordion {
  constructor() {
    this.accordeon = document.querySelector('.accordion');
    this.options = document.querySelector('.options');
    this.arrow = document.querySelector('#arrow');
    
    this.accordeon.addEventListener('click', this.toggleOptions.bind(this));
  }
  
  toggleOptions() {
    this.options.classList.toggle('none');
    this.arrow.classList.toggle('rotate-back');
    this.arrow.classList.toggle('rotate');
  }
}