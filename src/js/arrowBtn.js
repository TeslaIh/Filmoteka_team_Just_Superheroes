
    const  toTopBtn = document.querySelector('.arrow-btn');
    window.onscroll = function () {
        if (window.pageYOffset > 400) {
            toTopBtn.style.display = 'block'
        } else {
            toTopBtn.style.display = 'none'
        }
    }
    