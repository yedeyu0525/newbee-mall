import axios from '../utils/axios'

// 获取商品分类
export const getCategory = () => axios.get('/categories');

// 获取商品详情
export const getDetail = (id) => axios.get(`/goods/detail/${id}`)

// 搜索商品
export const search = (params) => axios.get('/search', {params})