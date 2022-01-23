import ApiSettings from './api-service.js';
import Pagination from 'tui-pagination';
import { options } from './gallery-pagination';

const pagination = new Pagination('pagination', options);
const apiPost = new ApiSettings();
const refs = {
  galleryList: document.querySelector('.card-set'),
};

apiPost.getFilmsGenres().then(async function (res) {
  localStorage.setItem('GenresArray', JSON.stringify(res.data.genres));
});

const clearHtml = () => (refs.galleryList.innerHTML = '');
const addFilmToDom = film => refs.galleryList.insertAdjacentHTML('afterbegin', film);


apiPost.getFilmsArray().then(async function (res) {
  localStorage.setItem('FilmsArray', JSON.stringify(res.data.results));
  await getGenresFromLocalStorage();
  await addFilmToDom(renderGalleryFilms(JSON.parse(localStorage.getItem('FilmsArray'))));
  pagination.setItemsPerPage(res.data.results.length);
  pagination.setTotalItems(res.data.total_results);
  document.querySelector('.spinner').style.display = 'none';
  await pagination.reset();
});


pagination.on('afterMove', event => {
    const currentPage = event.page;
    apiPost.numbPage = currentPage;
  clearHtml();
  apiPost.getFilmsArray().then(async function (res) {
    localStorage.setItem('FilmsArray', JSON.stringify(res.data.results));
    await getGenresFromLocalStorage();
    await addFilmToDom(renderGalleryFilms(JSON.parse(localStorage.getItem('FilmsArray'))));
    pagination.setItemsPerPage(res.data.results.length);
    pagination.setTotalItems(res.data.total_results);
  });
});

function renderGalleryFilms(array) {
  return array
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
      };

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
}

function getGenresFromLocalStorage() {
  const genres = JSON.parse(localStorage.getItem('GenresArray'));
  const films = JSON.parse(localStorage.getItem('FilmsArray'));
  workForGenre(genres, films);
  localStorage.setItem('FilmsArray', JSON.stringify(films));
}

function workForGenre(array, secArray) {
  const arrayFilmGenre = secArray.map(val => val.genre_ids);
  for (let i = 0; i < arrayFilmGenre.length; i += 1) {
    arrayFilmGenre[i].map(p1 => {
      for (const genre of array) {
        if (genre.id === p1) {
          arrayFilmGenre[i].splice(arrayFilmGenre[i].indexOf(p1), 1, genre.name);
        }
      }
    });
  }
}

export { renderGalleryFilms, };