/* eslint-disable no-use-before-define */
import axios from 'axios';

const publicAPI = {
  postLogin,
};

export function postLogin(values) {
  return axios.post('/authentication/user/login', values);
}

export default publicAPI;
