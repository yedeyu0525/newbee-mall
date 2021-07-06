import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('views/home/Home.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('views/category/Category.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('views/cart/Cart.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('views/user/User.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/seting',
    name: 'seting',
    component: () => import('views/seting/Seting.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/Login.vue'),
    meta: {
      index: 2
    }
  }, {
    path: '/product/:id',
    name: 'product',
    component: () => import('views/productDetail/ProductDetail.vue'),
    meta: {
      index: 3
    }
  }, {
    path: '/product-list',
    name: 'product-list',
    component: () => import('views/productList/ProductList.vue'),
    meta: {
      index: 2
    }
  }, {
    path: '/address',
    name: 'address',
    component: () => import('views/address/AddressList.vue'),
    meta: {
      index: 3
    }
  }, {
    path: '/address-edit',
    name: 'address-edit',
    component: () => import('views/address/AddressEdit.vue'),
    meta: {
      index: 4
    }
  }, {
    path: '/create-order',
    name: 'create-order',
    component: () => import('views/createOrder/CreateOrder'),
    meta: {
      index: 2
    }
  }, {
    path: '/order',
    name: 'order',
    component: () => import('views/order/Order'),
    meta: {
      index: 3
    }
  },{
    path: '/order-detail',
    name: 'order-detail',
    component: () => import('views/orderDetail/OrderDetail'),
    meta: {
      index: 4
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router