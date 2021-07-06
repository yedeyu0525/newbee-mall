import axios from '../utils/axios.js';

export const getHome = (params) => axios.get('/index-infos')
