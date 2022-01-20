const headerEL = document.querySelector(".header");
const libraryBtn = document.querySelector(".nav__library");
const homeBtn = document.querySelector(".nav__home");
const searchEl = document.querySelector(".header__search");
const buttonsEl = document.querySelector(".header__buttons");
const watchedEl = document.querySelector(".button__watched");
const queueEl = document.querySelector(".button__queue");

const changeBackgroundImageLibrary = event => {
    if (event.target.classList = "nav__library") {
        headerEL.classList.remove("header__home");
        headerEL.classList.add("header__library");
        homeBtn.classList.remove("accent-underline");
        libraryBtn.classList.add("accent-underline");
        searchEl.style.display = "none";
        buttonsEl.style.display = "block";
    }
}

const changeBackgroundImageHome = event => {
    if (event.target.classList = "nav__home") {
        headerEL.classList.remove("header__library");
        headerEL.classList.add("header__home");
        libraryBtn.classList.remove("accent-underline");
        homeBtn.classList.add("accent-underline");
        searchEl.style.display = "block";
        buttonsEl.style.display = "none";
    }
}

libraryBtn.addEventListener('click', changeBackgroundImageLibrary);
homeBtn.addEventListener('click', changeBackgroundImageHome);

// Изменение цвета кнопок при переключении в Библиотеке
const changeBackgroundColorWatched = event => {
    if (event.target.classList = "button__watched") {
        watchedEl.classList.add("accent-filling");
        queueEl.classList.remove("accent-filling");
    }
}

const changeBackgroundColorQueue = event => {
    if (event.target.classList = "button__queue") {
        queueEl.classList.add("accent-filling");
        watchedEl.classList.remove("accent-filling");
    }
}

watchedEl.addEventListener('click', changeBackgroundColorWatched);
queueEl.addEventListener('click', changeBackgroundColorQueue);