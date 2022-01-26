const refs = {
  libraryBtn: document.querySelector('.nav__library'),
  gallery: document.querySelector('.card-set'),
  watchedEl: document.querySelector('.button__watched'),
  queueEl: document.querySelector('.button__queue'),
  sectionEl: document.querySelector('.gallery'),
  paginationEl: document.querySelector('.pagination-section'),
};

refs.libraryBtn.addEventListener('click', onLibraryBtnClick);
refs.watchedEl.addEventListener('click', onWatchedBtnClick);
refs.queueEl.addEventListener('click', onQueueBtnClick);

window.addEventListener('storage', e => {
  if (e.key === 'LocWatched' || e.key === 'LocQueue') {
    window.location.reload();
  }
});

function onLibraryBtnClick(e) {
  refs.gallery.innerHTML = '';
  refs.paginationEl.innerHTML = '';
  const arrayWatched = JSON.parse(localStorage.getItem('LocWatched'));

  if (localStorage.getItem('LocWatched') !== null) {
    refs.watchedEl.classList.add('accent-filling');
    refs.queueEl.classList.remove('accent-filling');
    return renderGalleryFilms(arrayWatched);
  }
  
  refs.sectionEl.classList.add('watched--bg');
}

function renderGalleryFilms(array) {
  const markup = array
    .map(el => {
      let date = '21 Century';
      let img = 'https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png';
      if (el.genre_ids.length > 3) {
        el.genre_ids.splice(2, el.genre_ids.length);
        el.genre_ids.push('Other');
      }

      if (el.hasOwnProperty('release_date') && el.release_date.length === 10) {
        date = el.release_date.slice(0, 4);
      }
      if (el.poster_path !== null) {
        img = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
      }

      return `<li class='card-set_item'>
        <img class="card-set_img" src="${img}" alt='film'>
        <div class="card-set_box">
        <p class="card-set_text">${el.title}</p>
        <p class="card-set_genres">${el.genre_ids.join(', ')} &#124 ${date}</p>
        <p class="card-set_vote">${el.vote_average}</p>
        </div>
        </li>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onWatchedBtnClick(e) {
  refs.gallery.innerHTML = '';
  const arrayWatched = JSON.parse(localStorage.getItem('LocWatched'));
  
  if (localStorage.getItem('LocWatched') !== null) {

    refs.watchedEl.classList.add('accent-filling');
    refs.queueEl.classList.remove('accent-filling');

    refs.sectionEl.classList.remove('watched--bg');
    return renderGalleryFilms(arrayWatched);
  }
  refs.sectionEl.classList.add('watched--bg');
}

function onQueueBtnClick(e) {
  refs.gallery.innerHTML = '';
  const arrayQueue = JSON.parse(localStorage.getItem('LocQueue'));

  if (localStorage.getItem('LocQueue') !== null) {

    refs.queueEl.classList.add('accent-filling');
    refs.watchedEl.classList.remove('accent-filling');

    refs.sectionEl.classList.remove('watched--bg');
    return renderGalleryFilms(arrayQueue);
  }
  refs.sectionEl.classList.add('watched--bg');
}

export { onWatchedBtnClick, onQueueBtnClick };
  
// if (arrayQueue.length !== null ||0 < arrayQueue.length < 4) {
  //   refs.sectionEl.classList.add('library--size');
  // } else {
  //   refs.sectionEl.classList.remove('library--size');
  // }