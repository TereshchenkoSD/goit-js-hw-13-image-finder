import fetchImages from './apiService';
import galleryTpl from '../templates/gallery.hbs';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  searchInput: document.querySelector('.search-input'),
  loadBtn: document.querySelector('.load-btn'),
  galleryContainer: document.querySelector('.js-gallery'),
};

refs.searchInput.addEventListener('input', onSearch);

function onSearch(e) {
  onInputClear();
  const searchQuery = e.target.value;

  if (!searchQuery) {
    return;
  } else {
    fetchImages(searchQuery).then(renderImages).catch(handleFetchError);
  }
}

const onInputClear = () => {
  refs.galleryContainer.innerHTML = '';
};

const renderImages = data => {
  const imageMarkup = galleryTpl(data);
  renderMarkup(imageMarkup);
  console.log(data);
};

const renderMarkup = markup => {
  refs.galleryContainer.insertAdjacentHTML('afterbegin', markup);
};

function handleFetchError(error) {
  console.log(error);
}
