import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import { Grid } from '@material-ui/core';
import WatchList from './components/watch_list';
import NewsFeed from './components/news_feed';
import FinancialCalendar from './components/financial_calendar';

// Redux Actions
import watchListActions from '../../modules/watch_list/watch_list_actions';
import newsActions from '../../modules/news/news_actions';
import calendarActions from '../../modules/calendar/calendar_actions';

function Homepage({
  watchListActionsAPI,
  newsActionsAPI,
  calendarActionsAPI,
  watchListScope,
  newsScope,
  calendarScope,
}) {
  useEffect(() => {
    watchListActionsAPI.getCurrentUserWatchList();
    newsActionsAPI.getNews();
    calendarActionsAPI.getCalendar();
  }, []);

  useEffect(() => {
    if (watchListScope.watchListArray && !watchListScope.watchListData) {
      watchListActionsAPI.getSymbolsQuote(watchListScope.watchListArray);
    } else if (watchListScope.watchListArray && watchListScope.watchListData) {
      const watchListInterval = setInterval(
        () => watchListActionsAPI.getSymbolsQuote(watchListScope.watchListArray),
        10 * 1000,
      );
      return function clearIntervals() {
        clearInterval(watchListInterval);
      };
    }
    return () => { };
  }, [watchListScope]);

  return (
    <>
      <WatchList
        watchListScope={watchListScope}
        removeSymbolFromWatchList={watchListActionsAPI.removeSymbolFromWatchList}
        setDialogState={watchListActionsAPI.setDialogState}
      />
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <NewsFeed newsScope={newsScope} />
        </Grid>
        <Grid item lg={4}>
          <FinancialCalendar calendarScope={calendarScope} />
        </Grid>
      </Grid>
    </>
    // <Snackbar
    //   anchorOrigin={{
    //     vertical: 'bottom',
    //     horizontal: 'center',
    //   }}
    //   // open={snackbarShow}
    //   autoHideDuration={6000}
    //   // message={snackbarText}
    //   // onClose={createSnackbarCloseHandler}
    //   TransitionComponent={Slide}
    //   transitionDuration={300}
    // />
  );
}

Homepage.propTypes = {
  watchListActionsAPI: PropTypes.object.isRequired,
  watchListScope: PropTypes.object.isRequired,
  newsActionsAPI: PropTypes.object.isRequired,
  newsScope: PropTypes.object.isRequired,
  calendarActionsAPI: PropTypes.object.isRequired,
  calendarScope: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    watchListScope: state.watchList,
    newsScope: state.news,
    calendarScope: state.calendar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    watchListActionsAPI: bindActionCreators(watchListActions, dispatch),
    newsActionsAPI: bindActionCreators(newsActions, dispatch),
    calendarActionsAPI: bindActionCreators(calendarActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
