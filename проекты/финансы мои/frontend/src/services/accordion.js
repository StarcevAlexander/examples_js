export class Accordion {
  constructor() {
    const accordion = document.getElementById('accordion');
    const accordionHeader = document.getElementById('accordion-header');
    const options = document.getElementById('options');
    const arrow = document.getElementById('arrow');
    accordion.onclick = () => {
      accordion.classList.toggle('border');
      options.classList.toggle('none');
      arrow.classList.toggle('rotate-back');
      arrow.classList.toggle('rotate');
      accordionHeader.classList.toggle('active');
    };
  }
}