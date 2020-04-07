import { combineReducers } from 'redux';
import watchList from './watch_list/watch_list_reducer';
import news from './news/news_reducer';
import calendar from './calendar/calendar_reducer';

const rootReducer = combineReducers({
  watchList,
  news,
  calendar,
});

export default rootReducer;
