'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModalWindow.length; i++)
  btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});
// Имплементация плавного скрола
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();
  console.log(section1Coords);
  console.log(e.target.getBoundingClientRect());
  console.log(
    'Текущее прокручивание: x, y',
    window.pageXOffset,
    window.pageYOffset
  );
  console.log(
    'Ширина и высота viewport',
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  );
  // window.scrollTo(
  // section1Coords.left + window.pageXOffset,
  // section1Coords.top + window.pageYOffset
  // );
  // window.scrollTo({
  // left: section1Coords.left + window.pageXOffset,
  // top: section1Coords.top + window.pageYOffset,
  // behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Smooth page navigation (soft scroll)

// Bad practise becouse every link has own eventListener and use much memory
// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Добавляем event listener для общего родителя
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. Определить target элемент
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// Имплементация компонента вкладок
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  console.log(clickedButton);
  // Guard clause - пункт охраны
  if (!clickedButton) return;

  // Активная вкладка
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');
  // Активный контент
  tabContents.forEach((content) =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Анимация потускнения на панели навигации

// function navLinksHoverAnimation(e, opacity) {
function navLinksHoverAnimation(e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    // console.log(linkOver);
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');
    // console.log(siblingLinks, logo, logoText);
    siblingLinks.forEach((el) => {
      if (el !== linkOver) {
        // el.style.opacity = opacity;
        el.style.opacity = this;
      }
      // logo.style.opacity = opacity;
      logo.style.opacity = this;
      // logoText.style.opacity = opacity;
      logoText.style.opacity = this;
    });
  }
}

const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', function (e) {
//   navLinksHoverAnimation(e, 0.5);
// });
// Work with argument with bind() / this
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.5));
// nav.addEventListener('mouseout', function (e) {
//   navLinksHoverAnimation(e, 1);
// });
nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// Sticky Navigation
const section1Coords = section1.getBoundingClientRect();
console.log(section1Coords);

window.addEventListener('scroll', function (e) {
  // console.log(e);
  // console.log(window.scrollY);
  // const navBar = e.target.querySelector('.nav');
  if (window.scrollY >= section1Coords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
