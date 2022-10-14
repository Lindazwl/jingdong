<template>
      <div class="order">
       <div class="order__price">实付金额 <b>¥{{calculations.price}}</b></div>
       <div class="order__btn">提交订单</div>
     </div>
</template>

<script>

import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'Order',
  setup (props, context) {
    // 这里存放数据
    const route = useRoute()
    const shopId = route.params.id
    const { calculations } = useCommonCartEffect(shopId)

    return {
      shopId,
      calculations
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/viribales.scss";
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-font-clolor;
  }

  &__btn {
   width: .98rem;
   background: $btn-bgColor;
   color:$bgColor;
   text-align: center;
   font-size: .14rem;
  }
}
</style>
