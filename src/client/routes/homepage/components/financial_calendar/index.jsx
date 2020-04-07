import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
  Typography, Grid,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import FinancialCalendarTable from '../financial_calendar_table';

// CSS
import './style.css';

function FinancialCalendar({ calendarScope }) {
  function filterEvents(event) {
    return (new Date()).getDate() === (new Date(event.date)).getDate();
  }

  return (
    <>
      <Typography variant="h4" className="calendar-title" display="inline">
        Today&apos;s Events
      </Typography>
      {calendarScope.events
        ? (
          <FinancialCalendarTable events={calendarScope.events.filter(filterEvents)} />
        ) : (
          <Grid container className="news-container" spacing={3}>
            <Grid item sm={12}>
              <Skeleton variant="rect" height={303} />
            </Grid>
          </Grid>
        )
      }
    </>
  );
}

FinancialCalendar.defaultProps = {
  calendarScope: {},
};

FinancialCalendar.propTypes = {
  calendarScope: PropTypes.object,
};

export default FinancialCalendar;
