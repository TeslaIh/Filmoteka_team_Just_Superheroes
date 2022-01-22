import Notiflix from 'notiflix';

const refs = {
  libraryBtn: document.querySelector('.nav__library'),
  gallery: document.querySelector('.card-set'),
  watchedEl: document.querySelector('.button__watched'),
  queueEl: document.querySelector('.button__queue'),
  sectionEl: document.querySelector('.gallery'),
  headerEl: document.querySelector('.header'),
  paginationEl: document.querySelector('.pagination-section'),
};

refs.libraryBtn.addEventListener('click', onLibraryBtnClick);
refs.watchedEl.addEventListener('click', onWatchedBtnClick);
refs.queueEl.addEventListener('click', onQueueBtnClick);

const STORAGE_KEY = 'FilmsArray';
const WATCHED_KEY = 'watched-films-LS';
const QUEUE_KEY = 'queue-films-LS';

const arrayOfFilms = JSON.parse(localStorage.getItem(STORAGE_KEY));
const arrayWatched = JSON.parse(localStorage.getItem(WATCHED_KEY));
const arrayQueue = JSON.parse(localStorage.getItem(QUEUE_KEY));

function onLibraryBtnClick(e) {
  refs.gallery.innerHTML = '';
  refs.paginationEl.innerHTML = '';
  refs.paginationEl.style.margin = '0';
  refs.sectionEl.style.margin = '0';
  refs.headerEl.style.margin = '0';

  if (localStorage.getItem(WATCHED_KEY) !== null) {
    return renderGalleryFilms(arrayOfFilms);
  }

  refs.sectionEl.classList.add('watched--bg');

  // Notiflix.Notify.init({
  //   width: '250px',
  //   position: 'center-center',
  //   distance: '23px', 
  //   timeout: 3000,
  //   clickToClose: true,
  //   showOnlyTheLastOne: true,
  //   fontFamily: 'Roboto',
  //   fontSize: '14px',
  //   info: {
  //     background: '#FF6B01',
  //     textColor: '#fff',
  //   },
  // });
  // Notiflix.Notify.info('Your library is empty.'); // Your library haven't films yet.
}

function renderGalleryFilms(array) {
  const markup = array
    .map(el => {
      if (el.genre_ids.length > 3) {
        el.genre_ids.splice(2, el.genre_ids.length);
        el.genre_ids.push('Other');
      }
      return `<li class='card-set_item'>
        <img class="card-set_img" src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt='film'>
        <div class="card-set_box">
        <p class="card-set_text">${el.title}</p>
        <p class="card-set_genres">${el.genre_ids.join(', ')} &#124 ${el.release_date.slice(
        0,
        4,
      )}</p>
        </div>
        </li>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onWatchedBtnClick(e) {
  refs.gallery.innerHTML = '';

  if (localStorage.getItem(WATCHED_KEY) !== null) {
    return renderGalleryFilms(arrayWatched);
  }

  //   Notiflix.Notify.init({
  //     width: '250px',
  //     position: 'center-center',
  //     distance: '23px',
  //     timeout: 3000,
  //     clickToClose: true,
  //     showOnlyTheLastOne: true,
  //     fontFamily: 'Roboto',
  //     fontSize: '14px',
  //     info: {
  //       background: '#FF6B01',
  //       textColor: '#fff',
  //     },
  //   });
  //   Notiflix.Notify.info("You don't have added movies in this section yet.");
}

function onQueueBtnClick(e) {
  refs.gallery.innerHTML = '';

  if (localStorage.getItem(QUEUE_KEY) !== null) {
    return renderGalleryFilms(arrayQueue);
  }

  // Notiflix.Notify.init({
  //   width: '250px',
  //   position: 'center-center',
  //   distance: '23px',
  //   timeout: 3000,
  //   clickToClose: true,
  //   showOnlyTheLastOne: true,
  //   fontFamily: 'Roboto',
  //   fontSize: '14px',
  //   info: {
  //     background: '#FF6B01',
  //     textColor: '#fff',
  //   },
  // });
  // Notiflix.Notify.info("You don't have added movies in this section yet.");
}
