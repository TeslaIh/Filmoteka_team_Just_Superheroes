const filmGalleryItem = document.querySelector('.card-set');
const filmModalWindow = document.querySelector('.film-modal')
filmGalleryItem.addEventListener('click', filmFinder);

function filmFinder(evt) { 
    evt.preventDefault();
    let filmCardSelector = "";
    
    if (evt.target.nodeName === "UL") {
        return;
    }
    
    if (evt.target.nodeName !== "LI") {
        filmCardSelector = evt.target.parentNode;
    } else {
        filmCardSelector = evt.target; 
    };

    const filmTitle = filmCardSelector.querySelector('.card-set_text')
    const filmsInfoArray = JSON.parse(localStorage.getItem('FilmsArray'))
        .find(film => film.title === filmTitle.textContent);

    const refs = {
        poster: filmsInfoArray.poster_path,
        title: filmsInfoArray.title,
        vote: filmsInfoArray.vote_average,
        votes: filmsInfoArray.vote_count,
        popularity: filmsInfoArray.popularity,
        original_title: filmsInfoArray.original_title,
        genre: filmsInfoArray.genre_ids,
        overview: filmsInfoArray.overview,
    }

    const modalHTML = `
    <div class="film-modal_poster">
        <img alt="${refs.title}" src= "https://image.tmdb.org/t/p/w780${refs.poster}"/>
    </div>
    <div class="film-modal_discription">
        <h2 class="film-modal_title">${refs.title}</h2>
    
        <table class="film-modal_tbl">
            <tr>
                <td class="film-modal_tbl-row">Vote / Votes</td>
                <td> <span class="film-modal_tbl-d-vote">${refs.vote}</span> / <span class="film-modal_tbl-d-votes">${refs.votes}</span></span></td>
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
                <td class="film-modal_tbl-d film-modal_tbl-last">${refs.genre}</td>
            </tr>
        </table>
    
        <h3 class="film-modal_subtitle">ABOUT</h3>
        <p class="film-modal_preambula">
            ${refs.overview}
        </p>

        <div>
            <button class="film-modal_btns">Add to Watched</button> 
            <button class="film-modal_btns">Add to Queue</button>
        </div> 
        
    </div>`;

    
    filmModalWindow.innerHTML = modalHTML;
    filmModalWindow.classList.remove('visually-hidden');
};


{/* <div>
            <button class="${classBtnWatched}">${nameBtnWatched}</button>
            <button class="${classBtnQueue}">${nameBtnQueue}</button>
        </div>  */}

// const refs = {
//   rootStartDiv: document.querySelector(".firstDiv"),
//   rootEndDivW: document.querySelector(".lastDiv"),
// };

// export default function renderModal(evt) {
//   console.log(evt.currentTarget.textContent);

//   const LocFilmsArray = JSON.parse(localStorage.getItem("FilmsArray"));
//   const LocWached = JSON.parse(localStorage.getItem("booksLocWached"));
//   const LocQueue = JSON.parse(localStorage.getItem("booksLocQueue"));

//   const book = LocFilmsArray.find(({ title }) => {
//     return title === evt.currentTarget.textContent;
//   });
//   console.log("bookFind", book);

//   let nameBtnWatched = "Add to Watched";
//   let nameBtnQueue = "Add to Queue";
//   let classBtnWatched = "button-add_watched";
//   let classBtnQueue = "button-add_queue";

//   if (LocWached) {
//     if (LocWached.find(({ title }) => title === book.title)) {
//       nameBtnWatched = "Remove to Watched";
//       classBtnWatched = "button-remove_watched";
//     }
//   }

//   if (LocQueue) {
//     if (LocQueue.find(({ title }) => title === book.title)) {
//       nameBtnQueue = "Remove to Queue";
//       classBtnQueue = "button-remove_queue";
//     }
//   }

//   const addNewRender = `
//     <div class="film-modal_poster">
//         <img alt="${FILM_TITLE}" src= "${FILM_POSTER}"/>
//     </div>
//     <div class="film-modal_discription">
//         <h2 class="film-modal_title">${FILM_TITLE}</h2>
    
//         <table class="film-modal_tbl">
//             <tr>
//                 <td class="film-modal_tbl-row">Vote / Votes</td>
//                 <td> <span class="film-modal_tbl-d-vote">${FILM_VOTE}</span> / <span class="film-modal_tbl-d-votes">${FILM_VOTES}</span></span></td>
//             </tr>
//             <tr>
//                 <td class="film-modal_tbl-row">Popularity</td>
//                 <td class="film-modal_tbl-d">${FILM_POPULARITY}</td>
//             </tr>
//             <tr>
//                 <td class="film-modal_tbl-row">Original Title</td>
//                 <td class="film-modal_tbl-d">${FILM_ORIGINAL_TITLE}</td>
//             </tr>
//             <tr>
//                 <td class="film-modal_tbl-row film-modal_tbl-last">Genre</td>
//                 <td class="film-modal_tbl-d film-modal_tbl-last">${FILM_GENRES}</td>
//             </tr>
//         </table>
    
//         <h3 class="film-modal_subtitle">ABOUT</h3>
//         <p class="film-modal_preambula">
//             ${FILM_PREAMBULA}
//         </p>
        
//         <div>
//             <button class="${classBtnWatched}">${nameBtnWatched}</button>
//             <button class="${classBtnQueue}">${nameBtnQueue}</button>
//         </div> 
//     </div>
//     `;

// //   refs.rootEndDivW.innerHTML = addNewRender;
// refs.rootEndDivW.insertAdjacentHTML("afterbegin", addNewRender);
 
//   // const BtnWatched = document.querySelector(`.${classBtnWatched}`);
//   // BtnWatched.addEventListener("click", (evt) => {
//   //   console.log(evt.currentTarget.className);
//   //   console.log(evt.target);

//   //   console.log("Work");
//   // });
// }





// // function openCard(evt) {
// //   const LocFilmsArray = JSON.parse(localStorage.getItem("FilmsArray"));

// //   const findCard = LocFilmsArray.find((option) => option.id === evt);
// // }
