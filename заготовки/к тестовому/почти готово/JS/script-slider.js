const sliderImages1 = document.querySelector('.slider-images-1');
const sliderImages2 = document.querySelector('.slider-images-2');
let currentImageIndex1 = 0;
let currentImageIndex2 = 0;

/* изменение фона при наведении */

/* 1 слайдер  */

const right1 = document.querySelector('.right-1')
right1.addEventListener('mouseenter', function () {
  this.classList.toggle('hover-right');
});
right1.addEventListener('mouseleave', function () {
  this.classList.toggle('hover-right');
});

const left1 = document.querySelector('.left-1')
left1.addEventListener('mouseenter', function () {
  this.classList.toggle('hover-left');
});
left1.addEventListener('mouseleave', function () {
  this.classList.toggle('hover-left');
});

/* клики по кнопкам, предельные */

right1.addEventListener('click', doRight1);
function doRight1() {
  if (currentImageIndex1 === 3) {
    return
  }
  if (currentImageIndex1 === 2) {
    currentImageIndex1 = 3;
    right1.style.background = 'url("../images/arrow_disable_right.svg")';
  } else {
    currentImageIndex1++;
    right1.style.background = 'url("../images/arrow_default_right.svg")';
  }
  left1.style.background = 'url("../images/arrow_default_left.svg")'
  sliderImages1.style.transform = 'translateX(-' + (currentImageIndex1 * 333) + 'px)';
}

left1.addEventListener('click', doLeft1);
function doLeft1() {
  if (currentImageIndex1 === 0) {
    return
  }
  if (currentImageIndex1 === 1) {
    currentImageIndex1 = 0;
    left1.style.background = 'url("../images/arrow_disable_left.svg")'
  } else {
    currentImageIndex1--;
  }
  right1.style.background = 'url("../images/arrow_default_right.svg")';
  sliderImages1.style.transform = 'translateX(-' + (currentImageIndex1 * 333) + 'px)';
}


/* 2 слайдер  */

const right2 = document.querySelector('.right-2')
right2.addEventListener('mouseenter', function () {
  this.classList.toggle('hover-right');
});
right2.addEventListener('mouseleave', function () {
  this.classList.toggle('hover-right');
});

const left2 = document.querySelector('.left-2')
left2.addEventListener('mouseenter', function () {
  this.classList.toggle('hover-left');
});
left2.addEventListener('mouseleave', function () {
  this.classList.toggle('hover-left');
});

/* клики по кнопкам, предельные */

right2.addEventListener('click', doRight2);
function doRight2() {
  if (currentImageIndex2 === 2) {
    return
  }
  if (currentImageIndex2 === 1) {
    currentImageIndex2 = 2;
    right2.style.background = 'url("../images/arrow_disable_right.svg")';
  } else {
    currentImageIndex2++;
    right2.style.background = 'url("../images/arrow_default_right.svg")';
  }
  left2.style.background = 'url("../images/arrow_default_left.svg")'
  sliderImages2.style.transform = 'translateX(-' + (currentImageIndex2 * 372) + 'px)';
}

left2.addEventListener('click', doLeft2);
function doLeft2() {
  if (currentImageIndex2 === 0) {
    return
  }
  if (currentImageIndex2 === 1) {
    currentImageIndex2 = 0;
    left2.style.background = 'url("../images/arrow_disable_left.svg")'
  } else {
    currentImageIndex2--;
  }
  right2.style.background = 'url("../images/arrow_default_right.svg")';
  sliderImages2.style.transform = 'translateX(-' + (currentImageIndex2 * 372) + 'px)';
}