//поиск для инпута в хэдэре header__input
import ApiService from './api-service';
import { clearLocaLStor } from "./clear-local-stor"
import cardFilmTpl from '../templates/card-films.hbs';
import debounce from 'lodash-es/debounce';
// const Handlebars = require('handlebars');
const apiServ = new ApiService();

const refs = {
  searchInputEl: document.querySelector('.header__input'),
  galleryFilmsEl: document.querySelector('.gallery'),
  allarmTextEl: document.querySelector('.allarm-text'),
  galleryList: document.querySelector('.card-set'),
  headerSearchEl: document.querySelector('.header__search'),
};

refs.searchInputEl.addEventListener('input', onSearchFilms);

function onSearchFilms(event) {
  apiServ.query = wordCheck(event.currentTarget.value);

  if (apiServ.query) {
    apiServ.getSearchFilms(apiServ.query, apiServ.page).then(async function (res) {
      let { page, results, total_pages, total_results } = res.data;

      const addFilmToDom = film => refs.galleryList.insertAdjacentHTML('afterbegin', film);
      const clearHtml = () => (refs.galleryList.innerHTML = '');
      sessionStorage.setItem('FilmsArray', JSON.stringify(res.data.results));

     await  renderGalleryFilms(JSON.parse(sessionStorage.getItem('FilmsArray')));
      if (total_results < 1) {
        clearSearhInput();
        apiServ.reset;
        clearFilmsGallery()
        
        getAllarmText();
         
        // addFilmToDom(renderGalleryFilms(JSON.parse(localStorage.getItem('FilmsArray'))));
      } else {
         localStorage.setItem('FilmsArray', JSON.stringify(res.data.results))
      
        apiServ.getSearchFilms(apiServ.query, apiServ.page).then(async function (res) {
          return res
        }).then(async function (res) {
          
          sessionStorage.setItem('GenresArray', JSON.stringify(res.data.genres));
         sessionStorage.setItem('FilmsArray', JSON.stringify(res.data.results));
         await  getGenres();
         await addFilmToDom(renderGalleryFilms(JSON.parse(sessionStorage.getItem('FilmsArray'))));
     
        })  
      }
    });
  }
}

function wordCheck(text) {
  return text.trim().toLowerCase();
}

function clearSearhInput() {
  refs.searchInputEl.value = '';
}
function clearFilmsGallery() {
  refs.galleryFilmsEl.innerHTML = '';
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

  refs.galleryFilmsEl.insertAdjacentHTML('beforeend', markup);
}

function getGenres() {
  const genres = JSON.parse(localStorage.getItem('GenresArray'));
  const films = JSON.parse(sessionStorage.getItem('FilmsArray'));
  workForGenre(genres, films);
  sessionStorage.setItem('FilmsArray', JSON.stringify(films));
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
   refs.allarmTextEl.classList.remove("visually-hidden")
       setTimeout(function () {
       refs.allarmTextEl.classList.add("visually-hidden") 
     }, 2000);
}
