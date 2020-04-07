export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_NEWS_SUCCESS':
      return {
        ...state,
        news: action.data,
      };
    default:
      return state;
  }
}
