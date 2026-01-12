// import MicroModal from 'micromodal';

// const { doc } = require("prettier");

var slideout = new Slideout({
  panel: document.getElementById('panel'),
  menu: document.getElementById('menu'),
  padding: 256,
  tolerance: 70,
});

// Toggle button
document.querySelector('.toggle').addEventListener('click', function() {
  slideout.toggle();
});
function close(eve) {
  eve.preventDefault();
  slideout.close();
}
slideout
  .on('beforeopen', function() {
    this.panel.classList.add('panel-open');
  })
  .on('open', function() {
    this.panel.addEventListener('click', close, {
      passive: false,
    });
  })
  .on('beforeclose', function() {
    this.panel.classList.remove('panel-open');
    this.panel.removeEventListener('click', close, {
      passive: false,
    });
  });
new SimpleBar(document.getElementById('menu'));
document.querySelectorAll('.link--button').forEach(function(nav__filter) {
  return nav__filter.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});
var lightGalleryBox = document.getElementById('lightgallery');
lightGallery(lightGalleryBox, {
  slideEndAnimation: false,
});
var grid = document.querySelector('.gallery');
var iso = new Isotope(grid, {
  itemSelector: '.gallery-item',
  sortBy: 'random',
});
imagesLoaded(grid).on('progress', function() {
  // layout Isotope after each image loads
  iso.layout();
});
var navFilters = document.querySelectorAll('.nav__filter');
document.querySelectorAll('.nav__filter').forEach(function(nav__filter) {
  return nav__filter.addEventListener('click', function(event) {
    event.preventDefault();
    [].forEach.call(navFilters, function(el) {
      el.classList.remove('is-checked');
    });
    this.classList.add('is-checked');
    var filterValue = this.getAttribute('data-filter');
    iso.arrange({
      filter: filterValue,
    });
    window.lgData[lightGalleryBox.getAttribute('lg-uid')].destroy(true);
    lightGallery(document.getElementById('lightgallery'), {
      selector: filterValue.replace('*', ''),
      showThumbByDefault: false,
    });
  });
});
var arrLang = {
  ru: {
    name: 'Сергей Примиренков',
    desc: 'Графика. Интерфейсы. Фронтенд.',
    hey: 'Привет 👋',
    about:
      'Я начинающий дизайнер. Люблю простые и понятные интерфейсы и помогаю людям полюбить их. В работе использую Figma, Photoshop, Illustrator, Blender.',
    about2:
      'Есть опыт во фронтенд-разработке - HTML, CSS, SASS, JS, Vue, React, Git. Открыт новым профессиональным знакомствам и предложениям о сотрудничестве.',
    open: 'Открыть',
    filter: 'Фильтр',
    all: 'Все',
    photo: 'Фото',
    graphic: 'Графика',
    ill: 'Иллюстрации',
    typo: 'Типографика',
    interfaces: 'Интерфейсы',
    modeling: 'Моделирование',
    frontend: 'Фронтенд',
    social: 'Сети',
    contacts: 'Контакты',
    resume: 'Резюме',
  },
  en: {
    name: 'Sergey Primirenkov',
    desc: 'Graphic. Interfaces. Frontend.',
    hey: 'Hi 👋',
    about:
      'I am a novice designer. I love simple and intuitive interfaces and help people love them. I use Figma, Photoshop, Illustrator and Blender in my work.',
    about2:
      'I have experience in frontend development - HTML, CSS, SASS, JS, Vue, React, Git. I am open to new professional acquaintances and offers of cooperation.',
    open: 'Open',
    filter: 'Filter',
    all: 'All',
    photo: 'Photo',
    graphic: 'Graphic',
    ill: 'Illustrations',
    typo: 'Typography',
    interfaces: 'Interfaces',
    modeling: 'Modeling',
    frontend: 'Frontend',
    social: 'Social',
    contacts: 'Contacts',
    resume: 'Resume',
  },
};

// The default language is Russian
var lang = 'ru';

// Check for localStorage support
if ('localStorage' in window) {
  var usrLang = localStorage.getItem('language');
  if (usrLang) {
    lang = usrLang;
    document.querySelector('#' + lang).classList.add('link--is-checked');
    var lll = document.querySelector('.translate');
    if (lll.getAttribute('id') !== lang) {
      lll.classList.remove('link--is-checked');
    }
  }
}
var langs = document.querySelectorAll('.lang');
var translates = document.querySelectorAll('.translate');
document.addEventListener('DOMContentLoaded', function() {
  [].forEach.call(langs, function(el) {
    el.textContent = arrLang[lang][el.getAttribute('data-key')];
  });
  [].forEach.call(translates, function(el) {
    if (el.getAttribute('id') !== lang) {
      el.classList.remove('link--is-checked');
    }
  });
});
document.querySelectorAll('.translate').forEach(function(translate) {
  return translate.addEventListener('click', function(event) {
    event.preventDefault();
    var lang = translate.getAttribute('id');
    if ('localStorage' in window) {
      localStorage.setItem('language', lang);
    }
    document
      .querySelector('.link--is-checked')
      .classList.remove('link--is-checked');
    this.classList.add('link--is-checked');
    [].forEach.call(langs, function(el) {
      el.textContent = arrLang[lang][el.getAttribute('data-key')];
    });
  });
});
var hey = document.getElementById('hey');
var sayHey = document.querySelector('.hey');
if ('localStorage' in window) {
  var usrHi = localStorage.getItem('hello');
  if (usrHi) {
    hey.classList.remove('wave--anim');
  }
}
hey.addEventListener('mouseover', function() {
  this.classList.remove('wave--anim');
});
hey.addEventListener('click', function() {
  if ('localStorage' in window) {
    localStorage.setItem('hello', true);
  }
});
sayHey.addEventListener('click', function() {
  MicroModal.show('modal-1');
  MicroModal.init({
    disableFocus: true,
  });
});
document.getElementById('year').innerHTML = new Date().getFullYear();
(function() {
  if (typeof EventTarget !== 'undefined') {
    var func = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, fn, capture) {
      this.func = func;
      if (typeof capture !== 'boolean') {
        capture = capture || {};
        capture.passive = false;
      }
      this.func(type, fn, capture);
    };
  }
})();
