import axios from '../utils/axios'

// 获取购物车列表
export const getCart = (params) => axios.get('/shop-cart', params);

// 添加到购物车
export const addCart = (params) => axios.post('/shop-cart', params)

// 修改购物车
export const modifyCart = (params) => axios.put('/shop-cart', params);

// 删除购物车
export const delCartItem = (id) => axios.delete(`/shop-cart/${id}`)

// 获取购物车选中的商品
export const getByCartItemIds = (params) => axios.get('/shop-cart/settle', {params})