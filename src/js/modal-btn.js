import { onWatchedBtnClick, onQueueBtnClick } from './my-library';
export default class BtnModal {
  constructor(film) {
    this.film = film;

    this.btnWatchedAdd = this.btnWatchedAdd.bind(this);
    this.btnQueueAdd = this.btnQueueAdd.bind(this);
    this.btnWatchedRemove = this.btnWatchedRemove.bind(this);
    this.btnQueueRemove = this.btnQueueRemove.bind(this);
  }

  // =================== Function Cheсk =================

  addFuncListener() {
    const LocFilmsArray = JSON.parse(localStorage.getItem('FilmsArray'));
    const LocWatched = JSON.parse(localStorage.getItem('LocWatched'));
    const LocQueue = JSON.parse(localStorage.getItem('LocQueue'));

    const modalBtnW = document.getElementById('watched');
    const modalBtnQ = document.getElementById('queue');

    if (LocWatched) {
      

      if (LocWatched.find(({ title }) => title === this.film)) {
        modalBtnW.textContent = 'Remove to Watched';
        modalBtnW.addEventListener('click', this.btnWatchedRemove);
      } else {
        modalBtnW.addEventListener('click', this.btnWatchedAdd);
      }
    } else {
      modalBtnW.addEventListener('click', this.btnWatchedAdd);
    }

    if (LocQueue) {
      if (LocQueue.find(({ title }) => title === this.film)) {
        modalBtnQ.textContent = 'Remove to Queue';
        modalBtnQ.addEventListener('click', this.btnQueueRemove);
      } else {
        modalBtnQ.addEventListener('click', this.btnQueueAdd);
      }
    } else {
      modalBtnQ.addEventListener('click', this.btnQueueAdd);
    }
  }

  // =================== Functions Add =================

  btnWatchedAdd() {
    const LocFilmsArray = JSON.parse(localStorage.getItem('FilmsArray'));
    const LocWatched = JSON.parse(localStorage.getItem('LocWatched'));

    const cardInWatched = document.querySelector('.header__library');

    const modalBtnW = document.getElementById('watched');
    const dataInLocArray = LocFilmsArray.find(({ title }) => {
      return title === this.film;
    });

    if (!LocWatched) {
      localStorage.setItem('LocWatched', JSON.stringify([dataInLocArray]));
      modalBtnW.textContent = 'Remove to Watched';

      modalBtnW.removeEventListener('click', this.btnWatchedAdd);
      modalBtnW.addEventListener('click', this.btnWatchedRemove);

      return;
    }

    LocWatched.push(dataInLocArray);
    localStorage.setItem('LocWatched', JSON.stringify(LocWatched));
    modalBtnW.textContent = 'Remove to Watched';

    if (cardInWatched) {
      onWatchedBtnClick();
    }

    modalBtnW.removeEventListener('click', this.btnWatchedAdd);
    modalBtnW.addEventListener('click', this.btnWatchedRemove);
  }

  btnQueueAdd() {
    const LocFilmsArray = JSON.parse(localStorage.getItem('FilmsArray'));
    const LocQueue = JSON.parse(localStorage.getItem('LocQueue'));
    const modalBtnQ = document.getElementById('queue');

    const cardInQueue = document.querySelector('.header__library');

    const dataInLocArray = LocFilmsArray.find(({ title }) => {
      return title === this.film;
    });

    if (!LocQueue) {
      localStorage.setItem('LocQueue', JSON.stringify([dataInLocArray]));
      modalBtnQ.textContent = 'Remove to Queue';

      modalBtnQ.removeEventListener('click', this.btnQueueAdd);
      modalBtnQ.addEventListener('click', this.btnQueueRemove);

      return;
    }

    LocQueue.push(dataInLocArray);
    localStorage.setItem('LocQueue', JSON.stringify(LocQueue));
    modalBtnQ.textContent = 'Remove to Queue';

    if (cardInQueue) {
      onQueueBtnClick();
    }

    modalBtnQ.removeEventListener('click', this.btnQueueAdd);
    modalBtnQ.addEventListener('click', this.btnQueueRemove);
  }

  // =================== Function Add =================

  btnWatchedRemove() {
    const LocWatched = JSON.parse(localStorage.getItem('LocWatched'));
    const modalBtnW = document.getElementById('watched');

    const cardInWatched = document.querySelector('.header__library');

    const filterDataW = LocWatched.filter(({ title }) => {
      return title !== this.film;
    });

    localStorage.setItem('LocWatched', JSON.stringify(filterDataW));
    modalBtnW.textContent = 'Add to Watched';

    if (localStorage.getItem('LocWatched').length === 2) {
      localStorage.removeItem('LocWatched');
    }

    if (cardInWatched) {
      onWatchedBtnClick();
    }

    modalBtnW.removeEventListener('click', this.btnWatchedRemove);
    modalBtnW.addEventListener('click', this.btnWatchedAdd);
  }

  btnQueueRemove() {
    const LocQueue = JSON.parse(localStorage.getItem('LocQueue'));
    const modalBtnQ = document.getElementById('queue');

    const cardInQueue = document.querySelector('.header__library');

    const filterDataQ = LocQueue.filter(({ title }) => {
      return title !== this.film;
    });

    localStorage.setItem('LocQueue', JSON.stringify(filterDataQ));
    modalBtnQ.textContent = 'Add to Queue';

    if (localStorage.getItem('LocQueue').length === 2) {
      localStorage.removeItem('LocQueue');
    }

    if (cardInQueue) {
      onQueueBtnClick();
    }
    
    modalBtnQ.removeEventListener('click', this.btnQueueRemove);
    modalBtnQ.addEventListener('click', this.btnQueueAdd);
  }
}