import axios from 'axios';

const clienteAxios = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL
  baseURL: 'https://api-bomberos-pinto.herokuapp.com/api',
});

export default clienteAxios;
