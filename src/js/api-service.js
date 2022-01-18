import axios from "axios";


async function getFilmsArray() { 
    return axios({
        method: 'GET',
        url: '/trending/movie/day',
        baseURL: 'https://api.themoviedb.org/3',
        params: {
            api_key: 'f792bc0e541efe7531ca1576bffe5aa2',
        }
    });
};
async function getFilmsGenres() { 
    return axios({
        method: 'GET',
        url: '/genre/movie/list',
        baseURL: 'https://api.themoviedb.org/3',
        params: {
            api_key: 'f792bc0e541efe7531ca1576bffe5aa2',
        }
    });
};

export { getFilmsArray, getFilmsGenres };