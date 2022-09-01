import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一层及是商铺的id
      // shopId: {
      //   // 第二层是商品id
      //   productId: {
      //     // 第二层是商品内容及购物数量
      //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //     name: '番茄 250g / 份',
      //     oldPrice: 39.6,
      //     price: 33.6,
      //     sales: 10,
      //     _id: '1',
      //     count:2
      //   }
      // }
    }
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo } = payload
      console.log(shopId, productId, productInfo)
      // 获取当前店铺商品的信息
      const shopInfo = state.cartList[shopId] || {}
      // if (!shopInfo) {
      //   shopInfo = {}
      // }
      // 获取当前店铺产品详细的信息
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + payload.num;
      (product.count < 0) && (product.count = 0);
      // 另外一种写法
      (payload.num > 0) && (product.check = true)
      // if (payload.num > 0) {
      //   product.check = true
      // }
      // if (product.count < 0) {
      //   product.count = 0
      // }

      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      console.log(state.cartList, '++++++alskdalldaskl;')
    },
    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    },

    cleanCartProducts (state, payload) {
      state.cartList[payload.shopId] = {}
    },

    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
