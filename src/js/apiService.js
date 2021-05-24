const BASE_URL = `https://pixabay.com/api/`;

const API_KEY = '21751428-6a671782556cc1e6de8f90ab7';

// export default function fetchImages(name) {
//   return fetch(
//     `${BASE_URL}?image_type=photo&orientation=horizontal&q=${name}&page=1&per_page=12&key=${API_KEY}`,
//   )
//     .then(response => response.json())
//     .then(({ hits }) => hits);
// }

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=1&per_page=12&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(({ hits }) => hits);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
