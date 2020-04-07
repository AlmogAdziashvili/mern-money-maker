import axios from 'axios';

function getCalendar() {
  return axios.get('api/calendar');
}

export default {
  getCalendar,
};
