import newsApi from './news_api';

function getNewsSuccess(data) {
  return { type: 'GET_NEWS_SUCCESS', data };
}

function getNews() {
  return async function getNewsThunk(dispatch) {
    try {
      const { data } = await newsApi.getNews();
      return dispatch(getNewsSuccess(data));
    } catch (err) {
      throw err;
    }
  };
}

export default {
  getNews,
};
