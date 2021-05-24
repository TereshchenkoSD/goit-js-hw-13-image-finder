import ImagesApiService from './apiService';
import galleryTpl from '../templates/gallery.hbs';
import debounce from 'lodash.debounce';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  searchInput: document.querySelector('.search-input'),
  loadBtn: document.querySelector('.load-btn'),
  galleryList: document.querySelector('.js-gallery'),
};

const imagesApiService = new ImagesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
refs.loadBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  onInputClear();
  imagesApiService.query = e.target.value;

  if (!imagesApiService.query) {
    return;
  } else {
    imagesApiService.fetchImages().then(renderImages).catch(handleFetchError);
  }
}

const onInputClear = () => {
  refs.galleryList.innerHTML = '';
};

const renderImages = data => {
  const imageMarkup = galleryTpl(data);
  renderMarkup(imageMarkup);
  console.log(data);
};

const renderMarkup = markup => {
  refs.galleryList.insertAdjacentHTML('afterbegin', markup);
};

function handleFetchError(error) {
  console.log(error);
}

function onLoadMore() {
  imagesApiService.fetchImages().then(renderImages).catch(handleFetchError);
}
