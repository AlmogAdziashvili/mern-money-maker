/* eslint-disable no-use-before-define */
import axios from 'axios';

const publicAPI = {
  putReset,
};

export function putReset(values) {
  return axios.put('/authentication/user/reset', values);
}

export default publicAPI;
