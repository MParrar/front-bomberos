import axios from 'axios';

const clienteAxios = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  // baseURL: 'https://api-bomberos-pinto.herokuapp.com/api',
  baseURL: 'https://api-bomberos-production-0818.up.railway.app/api'
});

export default clienteAxios;
