import axios from 'axios';

// 创建订单
export const createOrder = (params) => axios.post('/saveOrder', params);

// 订单支付
export const payOrder = (params) => axios.get('/paySuccess', { params });

// 获取订单列表
export const getOrderList = (params) => axios.get('/order',{params});

// 获取订单详情
export const getOrderDetail = (id) => axios.get(`/order/${id}`);

// 取消订单
export const cancelOrder = (id) => axios.put(`/order/${id}/cancel`)