import Notiflix from 'notiflix';

const refs = {
  libraryBtn: document.querySelector('.nav__library'),
  gallery: document.querySelector('.card-set'),
  watchedBtn: document.querySelector('.watched-btn'),
  queueBtn: document.querySelector('.queue-btn'),
  searchForm: document.querySelector('.search-form'),
};

refs.libraryBtn.addEventListener('click', onLibraryBtnClick);
// refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
// refs.queueBtn.addEventListener('click', onQueueBtnClick);

const STORAGE_KEY = 'FilmsArray';
const WATCHED_KEY = 'watched-films-LS';
const QUEUE_KEY = 'queue-films-LS';

const arrayOfFilms = JSON.parse(localStorage.getItem(STORAGE_KEY));

const arrayWatched = JSON.parse(localStorage.getItem(WATCHED_KEY));

const arrayQueue = JSON.parse(localStorage.getItem(QUEUE_KEY));

function onLibraryBtnClick(e) {
  refs.gallery.innerHTML = '';

  if (localStorage.getItem(WATCHED_KEY) !== null) {
    return renderGalleryFilms(arrayOfFilms);
  }

  Notiflix.Notify.init({
    width: '300px',
    position: 'center-top',
    distance: '215px', // - еще стоит настроить ⚠️⚠️⚠️
    timeout: 3000,
    clickToClose: true,
    fontFamily: 'Roboto',
    fontSize: '15px',
    info: {
      background: '#FF6B01',
      textColor: '#fff',
    },
  });
  Notiflix.Notify.info('Your library is empty.'); // Your library haven't films yet.
}


function renderGalleryFilms(array) {
     const markup = array.map(el => {
        if (el.genre_ids.length >= 3) {
            el.genre_ids.splice(2, el.genre_ids.length);
            el.genre_ids.push('Other');
        };
        return `<li class='card-set__item'>
        <img class="card-set__img" src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt='film'>
        <p class="card-set__text">${el.title}</p>
        <p class="card-set__genres">${el.genre_ids}</p>
        </li>`
     }).join('');
    
    refs.gallery.insertAdjacentHTML('beforeend', markup);
};


function onWatchedBtnClick(e) {
    refs.gallery.innerHTML = '';
    refs.queueBtn.classList.remove('is-active');
    refs.watchedBtn.classList.add('is-active');

    if (localStorage.getItem(WATCHED_KEY) !== null) {
      return renderFilmCard(arrayWatched);
    }

    Notiflix.Notify.init({
      width: '300px',
      position: 'center-top',
      distance: '400px', // - еще стоит настроить ⚠️⚠️⚠️
      timeout: 3000,
      clickToClose: true,
      fontFamily: 'Roboto',
      fontSize: '15px',
      info: {
        background: '#FF6B01',
        textColor: '#fff',
      },
    });
    Notiflix.Notify.info("You don't have added movies in this section yet.");
}


function onQueueBtnClick(e) {
    refs.gallery.innerHTML = '';
    refs.watchedBtn.classList.remove('is-active');
    refs.queueBtn.classList.add('is-active');

    if (localStorage.getItem(QUEUE_KEY) !== null) {
      return renderFilmCard(arrayQueue);
    }

    Notiflix.Notify.init({
      width: '300px',
      position: 'center-top',
      distance: '400px', // - еще стоит настроить ⚠️⚠️⚠️
      timeout: 3000,
      clickToClose: true,
      fontFamily: 'Roboto',
      fontSize: '15px',
      info: {
        background: '#FF6B01',
        textColor: '#fff',
      },
    });
    Notiflix.Notify.info("You don't have added movies in this section yet.");
}