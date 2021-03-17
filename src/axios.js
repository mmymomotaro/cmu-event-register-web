import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://ronin-test.tlic.cmu.ac.th/event-register/',
  /*baseURL: process.env.VUE_APP_BASE_URL,*/
  // baseURL: 'https://ronin-test.tlic.cmu.ac.th/event-register/',
});