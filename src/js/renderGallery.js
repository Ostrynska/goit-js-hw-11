export { renderGallery };

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  const markup = images
    .map(image => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
        <a class="gallery-link" href="${largeImageURL}" width="800" height="600">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
            <div class="info">
              <p class="info-item"><span>Likes</span>${likes}</p>
              <p class="info-item"><span>Views</span>${views}</p>
              <p class="info-item"><span>Comments</span>${comments}</p>
              <p class="info-item"><span>Downloads</span>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

  // console.log(markup);
  gallery.insertAdjacentHTML('beforeend', markup);

  let simpleLightbox = new SimpleLightbox('.gallery a').refresh();
}
