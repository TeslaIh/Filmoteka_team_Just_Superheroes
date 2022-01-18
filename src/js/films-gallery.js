import { getFilmsArray, getFilmsGenres } from './api-service.js';

const refs = {
    galleryList: document.querySelector('.card-set'),
};

getFilmsGenres().then(async function (res) {
    localStorage.setItem('GenresArray', JSON.stringify(res.data.genres));
})

const addFilmToDom = film => refs.galleryList.insertAdjacentHTML('afterbegin', film);

getFilmsArray().then(async function (res) {
    localStorage.setItem('FilmsArray', JSON.stringify(res.data.results));
    await getGenresFromLocalStorage();
    await addFilmToDom(renderGalleryFilms(JSON.parse(localStorage.getItem('FilmsArray'))));
});

function renderGalleryFilms(array) {
    return array.map(el => {
        if (el.genre_ids.length > 3) {
            el.genre_ids.splice(2, el.genre_ids.length);
            el.genre_ids.push('Other');
        };
        return `<li class='card-set_item'>
        <img class="card-set_img" src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt='film'>
        <p class="card-set_text">${el.title}</p>
        <p class="card-set_genres">${el.genre_ids}</p>
        </li>`
    }).join('');
}

function getGenresFromLocalStorage() {
    const genres = JSON.parse(localStorage.getItem('GenresArray'));
    const films = JSON.parse(localStorage.getItem('FilmsArray'));
    console.log(films);
    console.log(genres);
    console.log(workForGenre(genres, films));  
    localStorage.setItem('FilmsArray', JSON.stringify(films));
};


function workForGenre(array, secArray) { 
    const arrayFilmGenre = secArray.map(val => val.genre_ids);
    for (let i = 0; i < arrayFilmGenre.length; i += 1) { 
                arrayFilmGenre[i].map(p1 => {
                for (const genre of array) { 
                    if (genre.id === p1) {
                        arrayFilmGenre[i].splice(arrayFilmGenre[i].indexOf(p1), 1, genre.name);
                };
            };
        });
    };
};