import SimpleLightbox from 'simplelightbox';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});
export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => createImage(image)).join('');
  gallery.innerHTML = markup;
  lightbox.refresh();
}
export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}
export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}
function createImage(image) {
  return `<li><div class="image-box">
  <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}"></a>
  <div class="image-description">
    <p class="image-stats">Downloads: ${image.downloads}</p>
    <p class="image-stats">Likes: ${image.likes}</p>
    <p class="image-stats">Views: ${image.views}</p>
    <p class="image-stats">Comments: ${image.comments}</p>
  </div>
</div></li>`;
}
