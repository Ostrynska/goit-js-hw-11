import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import { onScroll, onScrollToTopBtn } from './js/loadingBtn';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn-load-more'),
};

let searchImgName = '';
let page = 1;

refs.form.addEventListener('submit', onFormSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

onScroll();
onScrollToTopBtn();

function onFormSearch(e) {
  e.preventDefault();
  searchImgName = e.currentTarget.searchQuery.value.trim();
  // console.log(searchImgName);
  refs.gallery.innerHTML = '';
  page = 1;
  window.scrollTo({ top: 0 });
  refs.loadMoreBtn.classList.add('is-hidden');

  if (searchImgName === '') {
    Notiflix.Notify.failure('Please enter a search term in the search box.');
    return;
  }

  fetchImages(searchImgName, page)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

        if (data.totalHits > 40) {
          refs.loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

function onLoadMoreBtn() {
  page += 1;
  fetchImages(searchImgName, page)
    .then(({ data }) => {
      renderGallery(data.hits);

      const totalPages = Math.ceil(data.totalHits / 40);

      if (page >= totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}
