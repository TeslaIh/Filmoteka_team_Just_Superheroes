//поиск для инпута в хэдэре header__input
import ApiService from './api-service';
import Pagination from 'tui-pagination';
const pagination = new Pagination('pagination', options);
import { options } from './gallery-pagination';
import clearLocaLStor from './clear-local-stor';
// clearLocaLStor ("FilmsArray") вызывать при необходимости
// import cardFilmTpl from '../templates/card-films.hbs';
// const Handlebars = require('handlebars');
const apiServ = new ApiService();
const refs = {
  searchInputEl: document.querySelector('.header__input'),
  galleryFilmsEl: document.querySelector('.gallery'),
  allarmTextEl: document.querySelector('.allarm-text'),
  galleryList: document.querySelector('.card-set'),
  btnSearchEl: document.querySelector('.header__search'),
};
refs.btnSearchEl.addEventListener('submit', onSearchFilms);
function onSearchFilms(e) {
  e.preventDefault();
  let inputTextQwery = wordCheck(refs.searchInputEl.value);
  // refs.searchInputEl.value = "";
  const addFilmToDom = film => refs.galleryList.insertAdjacentHTML('afterbegin', film);
  const clearHtml = () => (refs.galleryList.innerHTML = '');
  if (!inputTextQwery) {
    getAllarmText();
    return;
  }
  apiServ.textQuery = inputTextQwery;
  apiServ.numbPage = 1;
  apiServ.getSearchFilms().then(async function (res) {
    if (!res.data.total_results) {
      refs.searchInputEl.value = '';
      pagination.reset();
      getAllarmText();
      apiServ.reset;
      clearHtml();
      console.log(apiServ.query);
      console.log(JSON.parse(localStorage.getItem('FilmsArray')));
      await addFilmToDom(renderGalleryFilms(JSON.parse(localStorage.getItem('FilmsArray'))));
      return;
    }
    let { page, results, total_pages, total_results } = res.data;
    let NumbersItemOnPage = res.data.results.length;
    clearHtml();
    localStorage.setItem('FilmsArray', JSON.stringify(res.data.results));
    await getGenresFromLocalStorage();
    await addFilmToDom(renderGalleryFilms(JSON.parse(localStorage.getItem('FilmsArray'))));
    document.querySelector('.spinner').style.display = 'none';
    await definePaginationParam(NumbersItemOnPage, total_results);
    await pagination.reset();
  });
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    apiServ.numbPage = currentPage;
    clearHtml();
    apiServ.getSearchFilms().then(async function (res) {
      console.log(res);
      let { page, results, total_pages, total_results } = res.data;
      let NumbersItemOnPage = res.data.results.length;
      localStorage.setItem('FilmsArray', JSON.stringify(res.data.results));
      await getGenresFromLocalStorage();
      await addFilmToDom(renderGalleryFilms(JSON.parse(localStorage.getItem('FilmsArray'))));
      await definePaginationParam(NumbersItemOnPage, total_results);
    });
  });
  function definePaginationParam(NumTotalPages, NumTotalResults) {
    pagination.setItemsPerPage(NumTotalPages);
    pagination.setTotalItems(NumTotalResults);
  }
  function wordCheck(text) {
    return text.trim().toLowerCase();
  }
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
  }
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
function getAllarmText() {
  refs.allarmTextEl.classList.remove('visually-hidden');
  setTimeout(function () {
    refs.allarmTextEl.classList.add('visually-hidden');
  }, 2500);
}
