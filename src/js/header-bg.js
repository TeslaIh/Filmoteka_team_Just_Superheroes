const headerEL = document.querySelector(".header");
const libraryBtn = document.querySelector(".nav__library");
const homeBtn = document.querySelector(".nav__home");
const formEl = document.querySelector(".header__form");

const changeBackgroundImageLibrary = event => {
    if (event.target.classList = "nav__library") {
        headerEL.classList.remove("header__home");
        headerEL.classList.add("header__library");
        homeBtn.classList.remove("accent-underline");
        libraryBtn.classList.add("accent-underline");
    }
}

const changeBackgroundImageHome = event => {
    if (event.target.classList = "nav__home") {
        headerEL.classList.remove("header__library");
        headerEL.classList.add("header__home");
        libraryBtn.classList.remove("accent-underline");
        homeBtn.classList.add("accent-underline");
    }
}

libraryBtn.addEventListener('click', changeBackgroundImageLibrary);
homeBtn.addEventListener('click', changeBackgroundImageHome);



