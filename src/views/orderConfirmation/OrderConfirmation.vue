<template>
  <div class="wrapper">
    <TopArea></TopArea>
    <ProductsList></ProductsList>
    <Order/>
</div>

</template>

<script>
// 这里使用的ts
// import { Options, Vue } from 'vue-class-component';
// import { useRoute } from 'vue-router'
// import { useCommonCartEffect } from '../../effects/cartEffects'
import TopArea from './TopArea.vue'
import ProductsList from './ProductsList.vue'
import Order from './Order.vue'
export default {
  name: 'OrderConfirmation',
  components: {
    TopArea,
    ProductsList,
    Order
  }

  // props父组件传递下来的数据   context ：attrs（未被props定义的属性）、slots（插槽）、emit（触发事件）
  // setup (props, context) {
  //   // 这里存放数据
  //   const route = useRoute()
  //   const shopId = route.params.id
  //   const { productList, shopName, calculations } = useCommonCartEffect(shopId)

  //   return {
  //     shopId,
  //     shopName,
  //     calculations,
  //     productList
  //   }
  // }

}
</script>

<style lang="scss" scoped>
  .wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
  overflow-y: scroll;
}

</style>
