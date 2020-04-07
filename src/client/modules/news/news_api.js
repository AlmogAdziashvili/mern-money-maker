import axios from 'axios';

function getNews() {
  return axios.get('api/news');
}

export default {
  getNews,
};
