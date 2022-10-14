import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalCartList = () => {
  return localStorage.cartList ? JSON.parse(localStorage.cartList) : {}
}
export default createStore({
  state: {
    // {shopID:{shopName:"",productList:{productId:{} } } }
    cartList: getLocalCartList()
    // cartList: {
    // 第一层及是商铺的id
    // shopId: {
    //  shopName:"",
    //  productList:{
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
    //   // 第二层是商品id

    // }
    // }
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, shopName } = payload
      console.log(shopId, productId, productInfo, shopName, 'asdad')

      // 获取当前店铺商品的信息
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      // if (!shopInfo) {
      //   shopInfo = {}
      // }
      // 获取当前店铺产品详细的信息
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
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

      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      console.log(state.cartList, '++++++alskdalldaskl;')
      setLocalCartList(state)
    },
    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },

    cleanCartProducts (state, payload) {
      state.cartList[payload.shopId].productList = {}
      setLocalCartList(state)
    },

    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
