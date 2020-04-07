import calendarApi from './calendar_api';

function getCalendarSuccess(data) {
  return { type: 'GET_CALENDAR_SUCCESS', data };
}

function getCalendar() {
  return async function getNewsThunk(dispatch) {
    try {
      const { data } = await calendarApi.getCalendar();
      return dispatch(getCalendarSuccess(data));
    } catch (err) {
      throw err;
    }
  };
}

export default {
  getCalendar,
};
