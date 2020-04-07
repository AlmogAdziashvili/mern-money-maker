import watchListApi from './watch_list_api';

function setDialogState(state) {
  return { type: 'SET_DIALOG_STATE', state };
}

function getCurrentUserWatchListSuccess(data) {
  return { type: 'GET_CURRENT_USER_WATCH_LIST_SUCCESS', data };
}

function getSymbolsQuoteSuccess(data) {
  return { type: 'GET_SYMBOLS_QUOTE_SUCCESS', data };
}

function removeSymbolFromWatchListSuccess(symbol, watchList) {
  return { type: 'REMOVE_SYMBOL_FROM_WATCH_LIST_SUCCESS', symbol, watchList };
}

function addSymbolToWatchListSuccess(watchList) {
  return { type: 'ADD_SYMBOL_TO_WATCH_LIST_SUCCESS', watchList };
}

function addSymbolToWatchList(symbol, watchList) {
  return async function removeSymbolFromWatchListThunk(dispatch) {
    try {
      const newWatchListData = [...watchList, symbol];
      await watchListApi.putCurrentUser({
        watchList: newWatchListData,
      });
      return dispatch(addSymbolToWatchListSuccess(newWatchListData));
    } catch (err) {
      throw err;
    }
  };
}

function removeSymbolFromWatchList(symbol, watchList) {
  return async function removeSymbolFromWatchListThunk(dispatch) {
    try {
      const newWatchListData = watchList.filter(value => value !== symbol);
      await watchListApi.putCurrentUser({
        watchList: newWatchListData,
      });
      return dispatch(removeSymbolFromWatchListSuccess(symbol, newWatchListData));
    } catch (err) {
      throw err;
    }
  };
}

function getCurrentUserWatchList() {
  return async function getCurrentUserThunk(dispatch) {
    try {
      const { data } = await watchListApi.getCurrentUserWatchList();
      return dispatch(getCurrentUserWatchListSuccess(data.watchList));
    } catch (err) {
      throw err;
    }
  };
}

function getSymbolsQuote(symbolsArr) {
  return async function getSymbolsQuoteThunk(dispatch) {
    try {
      let symbolsStr = '';
      symbolsArr.map((symbol) => {
        symbolsStr += `${symbol},`;
        return 0;
      });
      const { data } = await watchListApi.getSymbolsQuote(symbolsStr);
      return dispatch(getSymbolsQuoteSuccess(data));
    } catch (err) {
      throw err;
    }
  };
}

export default {
  getCurrentUserWatchList,
  getSymbolsQuote,
  removeSymbolFromWatchList,
  setDialogState,
  addSymbolToWatchList,
};
