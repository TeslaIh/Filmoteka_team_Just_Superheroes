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

window.addEventListener('storage', locStor); //слушатель на сторедж


const WATCHED_KEY = 'LocWatched';
const QUEUE_KEY = 'LocQueue';

const arrayWatched = JSON.parse(localStorage.getItem(WATCHED_KEY));
const arrayQueue = JSON.parse(localStorage.getItem(QUEUE_KEY));

console.log('arrayWatched: ', arrayWatched);
console.log('LocQueue: ', arrayQueue);

function renderGalleryFilms(array) {
  if (array) {
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
}

function locStor(e) {  // функция, с помощью которой проверил, что если открыть две вкладки, то консол.лог отработает в другой вкладке (не в той где производятся действия с ЛокалСторедж) 
  console.log(e);
}

function onLibraryBtnClick() {
  refs.gallery.innerHTML = '';
  refs.paginationEl.innerHTML = '';

  if (localStorage.getItem(WATCHED_KEY) !== null) {
    return renderGalleryFilms(arrayWatched);
  }

  refs.sectionEl.classList.add('watched--bg');
}


function onWatchedBtnClick() {
  refs.gallery.innerHTML = '';

  if (localStorage.getItem(WATCHED_KEY) !== null) {
    refs.sectionEl.classList.remove('watched--bg');
    return renderGalleryFilms(arrayWatched);
  }
   refs.sectionEl.classList.add('watched--bg');
}

function onQueueBtnClick() {
  refs.gallery.innerHTML = '';

  if (localStorage.getItem(QUEUE_KEY) !== null) {
    refs.sectionEl.classList.remove('watched--bg');
    return renderGalleryFilms(arrayQueue);
  }
   refs.sectionEl.classList.add('watched--bg');
}

function reloadPage() {
  window.location.reload();
}

// window.dispatchEvent(new Event('storage'));   // - то, что скинул саша в чат
 
// window.addEventListener('storage', e => {
// }
// );

