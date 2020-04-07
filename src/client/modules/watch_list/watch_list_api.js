import axios from 'axios';

function getCurrentUserWatchList() {
  return axios.get('/authentication/user/current/watchlist');
}

function getSymbolsQuote(symbolsStr) {
  return axios.get(`/api/quote/${symbolsStr}p`);
}

function putCurrentUser(updateObj) {
  return axios.put('/authentication/user', updateObj);
}

export default {
  getCurrentUserWatchList,
  putCurrentUser,
  getSymbolsQuote,
};
