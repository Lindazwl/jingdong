<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back icon iconfont icon-back" @click="handleBackClik"></div>
      <div class="search__content">
        <span class="search__content__icon icon iconfont icon-search"></span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <shopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"></shopInfo>
    <Content></Content>
    <Cart></Cart>
  </div>

</template>

<script>
import { reactive, toRefs } from 'vue'
import ShopInfo from '@/components/ShopInfo'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../utils/request'
import Content from './Content'
import Cart from './Cart'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    console.log(result)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退流程
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClik = () => {
    router.back()
  }
  return {
    handleBackClik
  }
}

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClik } = useBackRouterEffect()
    getItemData()
    return { item, handleBackClik }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viribales.scss";

.wrapper {
  padding: 0 .18rem;
}

.search {
  margin: .14rem 0 .04rem 0;
  display: flex;
  line-height: .32rem;

  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #b6b6b6;

  }

  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;

    &__icon {
      width: .44rem;
      text-align: center;
      color: $search-fontColor;
    }

    &__input {
      padding-right: .2rem;
      display: block;
      width: 100%;
      height: .32rem;
      border: none;
      outline: none;
      background: none;
      font-size: .14rem;
      color: $content-font-clolor;

      &::placeholder {
        color: $content-font-clolor
      }
    }
  }
}
</style>
