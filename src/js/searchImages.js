import ImagesApiService from './apiService';
import LoadMoreBtn from './loadMoreBtn';
import galleryTpl from '../templates/gallery.hbs';
import debounce from 'lodash.debounce';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  searchInput: document.querySelector('.search-input'),
  galleryList: document.querySelector('.js-gallery'),
};

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  onInputClear();
  imagesApiService.query = e.target.value;

  if (!imagesApiService.query) {
    return;
  } else {
    loadMoreBtn.show();
    imagesApiService.resetPage();
    fetchImages();
  }
}

const onInputClear = () => {
  refs.galleryList.innerHTML = '';
};

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService
    .fetchImages()
    .then(renderImages, loadMoreBtn.enable())
    .catch(handleFetchError);
}

const renderImages = data => {
  const imageMarkup = galleryTpl(data);
  renderMarkup(imageMarkup);
};

const renderMarkup = markup => {
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
};

function handleFetchError(error) {
  console.log(error);
}

function onLoadMore() {
  fetchImages();
}
