import axios from 'axios';

export default class ApiSettings {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  async getFilmsArray() {
    return axios({
      method: 'GET',
      url: '/trending/movie/day',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: 'f792bc0e541efe7531ca1576bffe5aa2',
        page: `${this.page}`,
      },
    });
  }

  async getFilmsGenres() {
    return axios({
      method: 'GET',
      url: '/genre/movie/list',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: 'f792bc0e541efe7531ca1576bffe5aa2',
      },
    });
  }

   async getSearchFilms() {
    return axios({
      method: 'GET',
      url: '/search/movie',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: 'f792bc0e541efe7531ca1576bffe5aa2',
         page: `${this.page}`,
        query: `${this.query}`,
        language : "en-US",
      },
    });
  }

  get numbPage() {
    return this.page;
  }

  set numbPage(newPage) {
    this.page = newPage;
  }

  get textQuery() {
    return this.query
  }
  set textQuery(newQuery) {
    this.query = newQuery;
  }

}