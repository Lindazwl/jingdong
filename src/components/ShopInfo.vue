<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img" />
    <div :class="{ 'shop__content': true, 'shop__content--bordered': hideBorder ? false : true }">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售:{{ item.sales }}</span>
        <span class="shop__content__tag">起送:{{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费:{{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script  >

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShopInfo',
  props: {
    item: Object,
    hideBorder: {
      type: Boolean
    }
  },
  components: {

  },

  // props父组件传递下来的数据   context ：attrs（未被props定义的属性）、slots（插槽）、emit（触发事件）
  setup (props, context) {
    // 这里存放数据
    return {

    }
  }

})
</script>

<style lang="scss" scoped>
@import "../style/viribales.scss";

.shop {
  padding-top: .12rem;
  display: flex;

  &__img {
    margin-right: .16rem;
    width: .56rem;
    height: .56rem;
  }

  &__content {
    flex: 1;
    padding-bottom: .12rem;

    &--bordered {
      border-bottom: 1px solid $content-bgColor;
    }

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

}
</style>
