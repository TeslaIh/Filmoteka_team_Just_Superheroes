//поиск для инпута в хэдэре header__input
import { getFilmsArray, getFilmsGenres } from './api-service.js';
import axios from 'axios'; // временно
import cardFilmTpl from '../templates/card-films.hbs';
import debounce from 'lodash-es/debounce';

const Handlebars = require('handlebars');

async function getSearchFilms(searchQuery, page = 1) {
  // надо перенести  в api-service и  желательно использовать как метод класса
  return axios({
    method: 'GET',
    url: '/search/movie',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'f792bc0e541efe7531ca1576bffe5aa2',
      // page: `${page}`, // в дальнейшем  использовать при пагинации
      page,
      query: `${searchQuery}`,
    },
  });
}
const refs = {
  searchInputEl: document.querySelector('.header__input'),
  galleryFilmsEl: document.querySelector('.gallery'),
  //  allarmTextEl: document.querySelector('.'), // нужен div в разметке
};

refs.searchInputEl.addEventListener(
  'input',
  debounce(e => {
    onSearchFilms(e);
  }, 500),
);

function onSearchFilms(event) {
  getSearchFilms(refs.searchInputEl.value).then(async function (res) {
    try {
      let { page, results, total_pages, total_results } = res.data;
      if (total_results > 0) {
        
        //    console.log(cardMarkup(results));
      } else {
        clearFilmsGallery();
        getAllarmText();
        return;
      }
    } catch {
      alert('error');
    } finally {
      clearSearhInput();
    }
  });
}

function clearSearhInput() {
  refs.searchInputEl.value = '';
}
function clearFilmsGallery() {
  refs.galleryFilmsEl.innerHTML = '';
}

const cardMarkup = function createSearchGalleryFilms(films) {
  // рендер карточки фильма
  console.log(films.map(film => cardFilmTpl(film)).join(''));
};

function getAllarmText() {
  // нужен в разметке доп. div с классом

  refs.allarmTextEl.classList.add('visually-hidden');

  setTimeout(function () {
    refs.allarmTextEl.classList.remove('visually-hidden');
  }, 2000);
}
