export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_CURRENT_USER_WATCH_LIST_SUCCESS':
      return {
        ...state,
        watchListArray: action.data,
      };
    case 'GET_SYMBOLS_QUOTE_SUCCESS':
      return {
        ...state,
        watchListData: action.data,
      };
    case 'REMOVE_SYMBOL_FROM_WATCH_LIST_SUCCESS':
      return {
        ...state,
        watchListData: state.watchListData.filter(symbolObj => symbolObj.symbol !== action.symbol),
        watchListArray: action.watchList,
      };
    case 'SET_DIALOG_STATE':
      return {
        ...state,
        dialogState: action.state,
      };
    case 'ADD_SYMBOL_TO_WATCH_LIST_SUCCESS':
      return {
        ...state,
        watchListArray: action.watchList,
        watchListData: undefined,
      };
    default:
      return state;
  }
}
