import {
  getCart
} from 'service/cart'

const actions = {
  async updateCart({
    commit
  }) {
    const { data } = await getCart()
    commit({
      type: 'addCartCount',
      count: data.length || ''
    })
  }
}

export default actions