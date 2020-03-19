import axios from 'axios';

axios.defaults.baseURL = 'https://deckofcardsapi.com/api/deck/';

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
