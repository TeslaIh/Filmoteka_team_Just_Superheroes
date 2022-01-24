export { clearLocaLStor };
const MaxNumberFilmsInLocStor = 10;

const clearLocaLStor = function (keysElemLocStor) {
  window.addEventListener('storage', e => {
    keysElemLocStor.forEach(element => {
      let qw = Object.keys(JSON.parse(localStorage.getItem(element)));

      let dataKeyLocStor = e.currentTarget.localStorage.getItem(element).length;

      if (qw.length > MaxNumberFilmsInLocStor) {
        console.log(element);
        console.log(Object.entries(qw).slice(-qw.length / 2));
        localStorage.setItem(element,JSON.stringify(Object.entries(qw).slice(-qw.length / 2)));
      }
    });
  });
  window.dispatchEvent(new Event('storage'));
};
