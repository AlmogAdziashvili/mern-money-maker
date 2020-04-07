import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Card,
} from '@material-ui/core';

// CSS
import './style.css';

function FinancialCalendarTable({ events }) {
  function formatHour(date) {
    const dateObj = new Date(date);
    return `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
  }

  return (
    <TableContainer component={Card} className="calendar-table-container MuiPaper-elevation8">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Forecast</TableCell>
            <TableCell align="right">Hour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(event => (
            <TableRow key={`${event.title}-${event.country}`}>
              <TableCell component="th" scope="row">
                {event.country}
              </TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell align="right">{event.forecast}</TableCell>
              <TableCell align="right">{formatHour(event.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

FinancialCalendarTable.propTypes = {
  events: PropTypes.array.isRequired,
};

export default FinancialCalendarTable;
