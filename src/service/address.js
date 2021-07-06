import axios from '../utils/axios'

// 添加地址
export const addAddress = (params) => axios.post('/address', params);

// 编辑地址
export const editAddress = (params) => axios.put('address', params)

// 获取地址
export const getAddress = () => axios.get('/address', {
  pageNumber: 1,
  pageSize: 1000
})

// 获取地址详情
export const getAddressDetail = (id) => axios.get(`/address/${id}`)

// 删除地址
export const delAddress = (id) => axios.delete(`/address/${id}`)

// 获取默认地址
export const getDefaultAddress = ()=> axios.get('/address/default')