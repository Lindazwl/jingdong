<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
      <shopInfo :item="item" :hideBorder="false"></shopInfo>
    </router-link>

  </div>
</template>

<script >
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '@/components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    console.log(result)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'NearbyItem',
  components: {
    ShopInfo

  },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viribales.scss';
@import '../../style/mixins.scss';

.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    color: $content-font-clolor;
  }

  &__item {
    padding-top: .12rem;
    display: flex;

    &__img {
      margin-right: .16rem;
      width: .56rem;
      height: .56rem;
    }
  }

  &__content {
    flex: 1;
    padding-bottom: .12rem;
    border-bottom: 1px solid $content-bgColor;

    &__title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-font-clolor;
    }

    &__tags {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-font-clolor;
    }

    &__tag {
      margin-right: .16rem;
    }

    &__highlight {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: #e93b3b;
    }
  }

  a {
    text-decoration: none;
  }
}
</style>
