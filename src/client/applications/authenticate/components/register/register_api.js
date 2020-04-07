/* eslint-disable no-use-before-define */
import axios from 'axios';

const publicAPI = {
  postRegister,
};

export function postRegister(values) {
  return axios.post('/authentication/user', values);
}

export default publicAPI;
