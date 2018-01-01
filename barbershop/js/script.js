var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
navMain.classList.remove("main-nav--nojs");
navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

var login = document.querySelector(".main-nav__user-login"),
  login_close = document.querySelector(".login__close"),
  login_form = document.querySelector(".login"),
  login_input = document.querySelector(".login__input");

login.addEventListener("click", function() {
  event.preventDefault();
  login_form.classList.add("login--open");
  login_input.focus();
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      login_form.classList.remove("login--open");
    }
  };
});

login_close.addEventListener("click", function() {
  event.preventDefault();
  login_form.classList.remove("login--open");
});

function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    new Image().src = arguments[i];
  }
}

preloadImages(
  "../barbershop/img/user.png",
  "../barbershop/img/locked.png",
  "../barbershop/img/corner-date-brown.svg",
  "../barbershop/img/corner-date-darkbrown.svg"
);