let headerNav = document.querySelector('.header__nav');
let headerIcons = document.querySelector('.header__icons');
let headerMenu = document.querySelector('.header__menu');
let headerWrapper = document.querySelector('.header__wrapper')
let isElemsMoved = false;
let burger = document.querySelector('.header__burger')

window.addEventListener("resize", moveElem)
moveElem()

function moveElem() {
    if ((window.innerWidth < 768) && (isElemsMoved === false)) {
        headerMenu.appendChild(headerIcons);
        headerMenu.appendChild(headerNav);
        isElemsMoved = true;
    } else if ((window.innerWidth >= 768) && (isElemsMoved === true)) {
        headerWrapper.appendChild(headerNav);
        headerWrapper.appendChild(headerIcons);
        isElemsMoved = false;
    }
}

burger.addEventListener('click', showMenu)

function showMenu() {
    headerMenu.classList.toggle('header__menu_hidden')
    burger.firstElementChild.classList.toggle('header__burger-line_cross')
}