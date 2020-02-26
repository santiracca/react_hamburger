import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactburger-1fcf9.firebaseio.com/'
})

export default instance;