/* изменение в коммите мастер */

const sliderImages = document.querySelector('.slider-images');
let currentImageIndex = 0;

/* изменение фона при наведении */
const right = document.querySelector('.slider-arrow-right')
right.addEventListener('mouseenter', function () {
  this.classList.toggle('hover-right');
});
right.addEventListener('mouseleave', function () {
  this.classList.toggle('hover-right');
});

const left = document.querySelector('.slider-arrow-left')
left.addEventListener('mouseenter', function () {
  this.classList.toggle('hover-left');
});
left.addEventListener('mouseleave', function () {
  this.classList.toggle('hover-left');
});

/* клики по кнопкам, предельные */

right.addEventListener('click', doRight);
function doRight() {
  if (currentImageIndex === 3) {
    return
  }
  if (currentImageIndex === 2) {
    currentImageIndex = 3;
    right.style.background = 'url("arrow_disable_right.svg")';
  } else {
    currentImageIndex++;
    right.style.background = 'url("arrow_default_right.svg")';
  }
  left.style.background = 'url("arrow_default_left.svg")'
  sliderImages.style.transform = 'translateX(-' + (currentImageIndex * 345) + 'px)';
}

left.addEventListener('click', doLeft);
function doLeft() {
  if (currentImageIndex === 0) {
    return
  }
  if (currentImageIndex === 1) {
    currentImageIndex = 0;
    left.style.background = 'url("arrow_disable_left.svg")'
  } else {
    currentImageIndex--;
  }
  right.style.background = 'url("arrow_default_right.svg")';
  sliderImages.style.transform = 'translateX(-' + (currentImageIndex * 345) + 'px)';
}

function playTrack() {
  const audio = new Audio('m.mp3');
  audio.play();
}

document.querySelector('.play-button').addEventListener('click', playTrack)