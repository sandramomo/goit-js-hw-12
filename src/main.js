import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  loadMoreGallery,
} from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loadmore: document.querySelector('.loadmore-js'),
};

let page = 1;
let userValue;
let maxPages;

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadmore.addEventListener('click', handleLoadMoreClick);

async function handleFormSubmit(e) {
  e.preventDefault();
  userValue = refs.form.elements.searchtext.value;
  page = 1;
  if (userValue.trim() === '') {
    iziToast.show({
      title: 'Oi!',
      message: 'Please enter a valid search option.',
      backgroundColor: '#fff0f6',
      titleColor: '#ff4d79',
      messageColor: '#ff80a0',
      progressBarColor: '#ffb3c6',
    });
    e.target.reset();
    return;
  }
  clearGallery();
  hideLoadMoreBtn();
  showLoader();
  try {
    const result = await getImagesByQuery(userValue, page);
    maxPages = Math.ceil(result.totalHits / 15);
    if (result.hits.length === 0) {
      iziToast.show({
        title: 'Oops!',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#fff0f6',
        titleColor: '#ff4d79',
        messageColor: '#ff80a0',
        progressBarColor: '#ffb3c6',
      });
      hideLoader();
      e.target.reset();
      return;
    } else {
      createGallery(result.hits);
      hideLoader();
      checkPages();
    }
  } catch {
    maxPages = 0;
    iziToast.error({ message: 'ERROR' });
    hideLoader();
    e.target.reset();
  }
}
async function handleLoadMoreClick(e) {
  e.preventDefault();
  page += 1;
  showLoader();
  try {
    const result = await getImagesByQuery(userValue, page);
    hideLoader();
    loadMoreGallery(result.hits);
    checkPages();
    window.scrollBy({
      top: 500,
      behavior: 'smooth',
    });
  } catch {
    iziToast.error({ message: 'ERROR' });
    hideLoader();
    e.target.reset();
  }
}

function checkPages() {
  if (maxPages > page) {
    showLoadMoreBtn();
  } else if (page === maxPages) {
    hideLoadMoreBtn();
    iziToast.show({
      message: 'We are sorry, but you have reached the end of search results.',
      backgroundColor: '#fff0f6',
      titleColor: '#ff4d79',
      messageColor: '#ff80a0',
      progressBarColor: '#ffb3c6',
    });
    return;
  }
}
