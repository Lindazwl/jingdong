<template>
  <div class="mask" v-if="showCart && calculations.total >0 " @click="handleCartShowChange"></div>
  <div class='cart'>
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="() =>setCartItemsChecked(shopId)">
           <span class="product__header__icon"
            :class="['icon iconfont',
            calculations.allChecked? 'icon-checked':'icon-icons-']"></span>
          全选</div>
        <div class="product__header__clear">
         <span class="product__header__clear__btn" @click="()=>cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <div class="product__item__checked" :class="[
            'icon iconfont',
            item.check ? ' icon-checked' : 'icon-icons-'
          ]" @click="() => changeCartItemCheck(shopId, item._id)"></div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
            {{ item.count || 0 }}
            <span class="product__number__plus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span>
          </div>
        </div>
      </template>
    </div>

    <div class="check">
      <div class="check__icon">
        <img class="check__icon__img"
         src="http://www.dell-lee.com/imgs/vue3/basket.png"
         @click="handleCartShowChange"
         />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>

      <div class="check__info">总计: <span class="check__info__price">&yen;{{ calculations.price }}</span></div>
      <div class="check__btn">
        <router-link :to="{path:`/OrderConfirmation/${shopId}`}">
           去结算
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const { productList, calculations, changeCartItemInfo } = useCommonCartEffect(shopId)
  const store = useStore()
  // const cartList = store.state.cartList

  // const total = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let count = 0
  //   if (productList) {
  //     for (const i in productList) {
  //       const product = productList[i]
  //       count += product.count
  //     }
  //   }
  //   return count
  // })

  // const price = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let count = 0
  //   if (productList) {
  //     for (const i in productList) {
  //       const product = productList[i]
  //       if (product.check) {
  //         count += (product.count * product.price)
  //       }
  //     }
  //   }
  //   return count.toFixed(2)
  // })

  // const allChecked = computed(() => {
  //   const productList = cartList[shopId]?.productList
  //   let result = true
  //   if (productList) {
  //     for (const i in productList) {
  //       const product = productList[i]
  //       if (product.count > 0 && !product.check) {
  //         result = false
  //       }
  //     }
  //   }
  //   return result
  // })

  //  获取购物车里面的商品的信息
  // const productList = computed(() => {
  //   const productList = cartList[shopId]?.productList || []
  //   return productList
  // })

  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemCheck', { shopId, productId })
  }

  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  // 全选逻辑
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  return {

    productList,
    calculations,
    changeCartItemInfo,
    changeCartItemCheck,
    cleanCartProducts,
    setCartItemsChecked,
    toggleCartEffect
  }
}

// 展示/隐藏购物车
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  components: {

  },
  // props父组件传递下来的数据   context ：attrs（未被props定义的属性）、slots（插槽）、emit（触发事件）
  setup (props, context) {
    // 这里存放数据
    const route = useRoute()
    const shopId = route.params.id

    const {
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId)

    const { showCart, handleCartShowChange } = toggleCartEffect()
    return {
      calculations,
      shopId,
      productList,
      showCart,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viribales.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top:0;
  background: rgba(0,0,0,.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}

.product {
  flex: 1;
  overflow-y: scroll;
  background: $bgColor;

  &__header {
    display: flex;
    line-height: .52rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: .14rem;
    color: $content-font-clolor;
    &__all {
      width: .64rem;
      margin-left: .18rem;

    }
    &__icon {
      color:$btn-bgColor;
      display: inline-block;
      vertical-align: top;
      font-size: .2rem;
    }
    &__clear {
      flex: 1;
      text-align: right;
      margin-right: .16rem;
      cursor: pointer;
      &__btn {
        display: inline-block;
      }
    }
  }

  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;

    &__detail {
      overflow: hidden;
    }

    &__checked {
      line-height: 0.5rem;
      color: $btn-bgColor;
      margin-right: .2rem;
      font-size: .2rem;
    }

    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__title {
      line-height: .2rem;
      font-size: .14rem;
      color: $content-font-clolor;
      margin: 0;
      @include ellipsis
    }

    &__price {
      margin: .06rem 0 0 0;
      font-size: .14rem;
      line-height: .2rem;
      color: $hightlight-fontColor;
    }

    &__yen {
      font-size: .12rem
    }

    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: .26rem;

      &__minus,
      &__plus {
        display: inline-block;
        border-radius: 50%;
        font-size: .2rem;
        text-align: center;
        width: .2rem;
        height: .2rem;
        line-height: .16rem;
      }

      &__minus {
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }

      &__plus {
        background: #0091FF;
        color: $bgColor;
        margin-left: .05rem;
      }
    }
  }

}

.check {
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  display: flex;

  &__icon {
    width: .84rem;
    position: relative;

    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }

    &__tag {
      position: absolute;
      min-width: .2rem;
      height: .2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      top: .04rem;
      left: .46rem;
      padding: 0 .04rem;
      color: $bgColor;
      transform: scale(.5);
      transform-origin: left center;
    }
  }

  &__info {
    flex: 1;
    color: $content-font-clolor;
    font-size: .12rem;

    &__price {
      color: $hightlight-fontColor;
      font-size: .18rem;
      padding-left: .03rem;
    }
  }

  &__btn {
    width: .98rem;
    background-color: #4FB0F9;
    line-height: .5rem;
    color: $bgColor;
    font-size: .14rem;
    text-align: center;
    a {
      color:  $btn-bgColor;
      text-decoration: none;
    }
  }
}
</style>
