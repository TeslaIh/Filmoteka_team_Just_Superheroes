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
        query: `${this.query}`,
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

  get numbPage() {
    return this.page;
  }

  set numbPage(newPage) {
    this.page = newPage;
  }

  // get query() {
  //   return this.query
  // }
  // set query(newQuery) {
  //   this.query = newQuery;
  // }
}
