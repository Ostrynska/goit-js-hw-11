export { onScroll, onScrollToTopBtn };

const btnToTop = document.querySelector('.btn-to-top');

window.addEventListener('scroll', onScroll);
btnToTop.addEventListener('click', onScrollToTopBtn);

function onScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    btnToTop.classList.add('btn-to-top--visible');
  }
  if (scrolled < coords) {
    btnToTop.classList.remove('btn-to-top--visible');
  }
}

function onScrollToTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
