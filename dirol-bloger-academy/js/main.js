var popupToggle = document.getElementById('popup-toggle');
var popup = document.getElementById('modal');
var close = document.getElementById('modal-close');
var popupWrapper = document.querySelector('.popup-wrapper');

var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

popupToggle.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.add('popup-rules--open');
  popupWrapper.style.display = 'block';
});

close.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.remove('popup-rules--open');
  popupWrapper.style.display = 'none';
});

jQuery(document).ready(function () {
  jQuery('.scrollbar-rail').scrollbar();
});

var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  grabCursor: false,
  noSwipingClass: 'gallery__item-hello',

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})