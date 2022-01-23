const LocFilmsArray = JSON.parse(localStorage.getItem('FilmsArray'));
const LocWatched = JSON.parse(localStorage.getItem('LocWatched'));
const LocQueue = JSON.parse(localStorage.getItem('LocQueue'));

export default class BtnModal {
  constructor(film) {
    this.film = film;

    this.btnWatchedAdd = this.btnWatchedAdd.bind(this);
    this.btnQueueAdd = this.btnQueueAdd.bind(this);
    this.btnWatchedRemove = this.btnWatchedRemove.bind(this);
    this.btnQueueRemove = this.btnQueueRemove.bind(this);
  }
  //
  // =================== Function Cheсk =================
  //
  addFuncListener() {
    const modalBtnW = document.getElementById('watched');
    const modalBtnQ = document.getElementById('queue');

    if (LocWatched) {
      console.log('BtnModal ~ LocWatched', LocWatched);
      console.log('BtnModal ~ LocFilmsArray', LocFilmsArray);

      if (LocWatched.find(({ title }) => title === this.film)) {
        modalBtnW.textContent = 'Remove to Watched';

        modalBtnW.addEventListener('click', this.btnWatchedRemove);
        // modalBtnW.textContent = 'Add to Watched';
      } else {
        modalBtnW.addEventListener('click', this.btnWatchedAdd);
        // modalBtnW.textContent = 'Remove to Watched';
      }
    } else {
      modalBtnW.addEventListener('click', this.btnWatchedAdd);
      //   modalBtnW.textContent = 'Remove to Watched';
    }

    if (LocQueue) {
      if (LocQueue.find(({ title }) => title === this.film)) {
        modalBtnQ.textContent = 'Remove to Queue';

        modalBtnQ.addEventListener('click', this.btnQueueRemove);
        // modalBtnQ.textContent = 'Add to Queue';
      } else {
        modalBtnQ.addEventListener('click', this.btnQueueAdd);
        // modalBtnQ.textContent = 'Remove to Queue';
      }
    } else {
      modalBtnQ.addEventListener('click', this.btnQueueAdd);
      //   modalBtnQ.textContent = 'Remove to Queue';
    }
  }
  //
  // =================== Functions Add =================
  //
  btnWatchedAdd() {
    console.log('BtnModal ~ LocFilmsArray', LocFilmsArray);

    const modalBtnW = document.getElementById('watched');

    const dataInLocArray = LocFilmsArray.find(({ title }) => {
      return title === this.film;
    });

    if (!LocWatched) {
      localStorage.setItem('LocWatched', JSON.stringify([dataInLocArray]));
      modalBtnW.textContent = 'Remove to Watched';

      modalBtnW.removeEventListener('click', this.btnWatchedAdd);

      // this.addFuncListener();
      return;
    }

    LocWatched.push(dataInLocArray);
    localStorage.setItem('LocWatched', JSON.stringify(LocWatched));
    modalBtnW.textContent = 'Remove to Watched';

    modalBtnW.removeEventListener('click', this.btnWatchedAdd);

    // this.addFuncListener();

    // localStorage.setItem('LocQueue', JSON.stringify([dataInLocArray]));
    // this.modalBtnW.classList.add('remove-local');
  }

  btnQueueAdd() {
    const modalBtnQ = document.getElementById('queue');

    const dataInLocArray = LocFilmsArray.find(({ title }) => {
      return title === this.film;
    });

    if (!LocQueue) {
      localStorage.setItem('LocQueue', JSON.stringify([dataInLocArray]));
      console.log('film', dataInLocArray);
      modalBtnQ.textContent = 'Remove to Queue';

      modalBtnQ.removeEventListener('click', this.btnQueueAdd);

      // this.addFuncListener();
      return;
    }

    LocQueue.push(dataInLocArray);
    localStorage.setItem('LocQueue', JSON.stringify(LocQueue));
    modalBtnQ.textContent = 'Remove to Queue';

    modalBtnQ.removeEventListener('click', this.btnQueueAdd);

    // this.addFuncListener();
  }

  //
  // =================== Function Add =================
  //

  btnWatchedRemove() {
    const modalBtnW = document.getElementById('watched');

    const filterDataW = LocWatched.filter(({ title }) => {
      return title !== this.film;
    });
    localStorage.setItem('LocWatched', JSON.stringify(filterDataW));
    modalBtnW.textContent = 'Add to Watched';

    if (localStorage.getItem('LocWatched').length === 2) {
      localStorage.removeItem('LocWatched');
    }
    modalBtnW.removeEventListener('click', this.btnWatchedRemove);

    // this.addFuncListener();
  }

  
  btnQueueRemove() {
    const modalBtnQ = document.getElementById('queue');

    const filterDataQ = LocQueue.filter(({ title }) => {
      return title !== this.film;
    });
    localStorage.setItem('LocQueue', JSON.stringify(filterDataQ));
    modalBtnQ.textContent = 'Add to Queue';

    if (localStorage.getItem('LocQueue').length === 2) {
      localStorage.removeItem('LocQueue');
    }

    modalBtnQ.removeEventListener('click', this.btnQueueRemove);

    // this.addFuncListener();
  }
}
