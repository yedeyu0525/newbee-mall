import axios from '../utils/axios'

// 登录
export const login = (params) => axios.post('/user/login', params);

// 注册
export const register = (params) => axios.post('/user/register', params);

// 获取用户信息
export const getUserInfo = () => axios.get('/user/info');

// 修改用户信息
export const edifUserInfo = (params) => axios.put('/user/info', params)

// 退出登录
export const logout = () => axios.post('/user/logout')