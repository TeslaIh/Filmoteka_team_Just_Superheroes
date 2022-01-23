import BtnModal from './modal-btn';

const filmModalOpen = document.querySelector('[data-modal-open]');
const filmModalCntnr = document.querySelector('[data-modal-container]');

filmModalOpen.addEventListener('click', function modalRender(evt) {
  filmModalCntnr.classList.add('show-modal');
  filmFinder(evt);
});

function filmFinder(evt) {
  evt.preventDefault();
  let filmCardSelector = '';

  // if (evt.target.nodeName === "UL") {
  //     return;
  // };

  if (evt.target.nodeName !== 'LI') {
    filmCardSelector = evt.target.parentNode;
  }

  // else {
  //     filmCardSelector = evt.target;
  // };

  const filmTitle = filmCardSelector.querySelector('.card-set_text');
  const filmsInfoArray = JSON.parse(localStorage.getItem('FilmsArray')).find(
    film => film.title === filmTitle.textContent,
  );

  const changeBtnModal = new BtnModal(filmTitle.textContent);

  const refs = {
    poster: filmsInfoArray.poster_path,
    title: filmsInfoArray.title,
    vote: filmsInfoArray.vote_average,
    votes: filmsInfoArray.vote_count,
    popularity: filmsInfoArray.popularity,
    original_title: filmsInfoArray.original_title,
    genre: filmsInfoArray.genre_ids,
    overview: filmsInfoArray.overview,
  };

  const modalHTML = `
    <div class="film-modal">
        <button class="film-modal_close-btn" type="button" aria-label="Modal close button" data-modal-close>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L22 22" stroke-width="2"/>
            <path d="M8 22L22 8" stroke-width="2"/>
            </svg>
        </button>
        
        <div class="film-modal_poster">
            <img class="film-modal_img" alt="${refs.title}" src= "https://image.tmdb.org/t/p/w780${
    refs.poster
  }"/>
        </div>

        <div class="film-modal_discription">
            <h2 class="film-modal_title">${refs.title}</h2>
        
            <table class="film-modal_tbl">
                <tr>
                    <td class="film-modal_tbl-row">Vote / Votes</td>
                    <td> <span class="film-modal_tbl-d-vote">${
                      refs.vote
                    }</span> / <span class="film-modal_tbl-d-votes">${refs.votes}</span></span></td>
                </tr>
                <tr>
                    <td class="film-modal_tbl-row">Popularity</td>
                    <td class="film-modal_tbl-d">${refs.popularity}</td>
                </tr>
                <tr>
                    <td class="film-modal_tbl-row">Original Title</td>
                    <td class="film-modal_tbl-d">${refs.original_title}</td>
                </tr>
                <tr>
                    <td class="film-modal_tbl-row film-modal_tbl-last">Genre</td>
                    <td class="film-modal_tbl-d film-modal_tbl-last">${refs.genre.join(', ')}</td>
                </tr>
            </table>
        
            <h3 class="film-modal_subtitle">ABOUT</h3>
            <p class="film-modal_preambula">
                ${refs.overview}
            </p>

            <div class="film-modal_flex-btns">
                <button class="film-modal_btns" id="watched">Add to Watched</button> 
                <button class="film-modal_btns" id="queue">Add to Queue</button>
                
            </div> 
        </div>
    </div>
    `;

  filmModalCntnr.innerHTML = modalHTML;

  changeBtnModal.addFuncListener();

  ////////////////////////////////////Закрытие модального окна/////////////////////////////////////////////////
  const filmModalClose = document.querySelector('[data-modal-close]');

  filmModalClose.addEventListener('click', () => {
    filmModalCntnr.classList.remove('show-modal');
  });

  filmModalCntnr.addEventListener('click', () => {
    filmModalCntnr.classList.remove('show-modal');
  });
}
