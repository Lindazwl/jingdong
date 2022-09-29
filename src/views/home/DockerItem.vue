<template>
  <div class="docer">
    <div v-for="(item, index) in dockerList" :key="index"
      :class="{ 'docer_item': true, 'docer_item--active': index === 0 }">
      <router-link :to="item.to">
        <div class="icon iconfont" :class="item.icon"></div>
        <div class="docker_title">{{ item.text }}</div>
      </router-link>

    </div>

  </div>
</template>

<script>

export default {
  name: 'DockerItem',
  setup () {
    const dockerList = [
      { icon: 'icon-home-fill', text: '首页', to: { name: 'Home' } },
      { icon: 'icon-gouwuche', text: '购物车', to: { name: 'CartList' } },
      { icon: 'icon-order', text: '订单', to: { name: 'Home' } },
      { icon: 'icon-wode', text: '我的', to: { name: 'Home' } }]

    return {
      dockerList
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../../style/viribales.scss';

.docer {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0, .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: .01rem solid $content-bgColor;
  color: $content-font-clolor;

  &_item {
    flex: 1;
    text-align: center;
    a {
      color: $content-font-clolor;
      text-decoration: none;
     }

    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }

    &--active {
      a {
         color: #1Fa4fC;
      }
    }

    &_title {
      font-size: .2rem;
      transform: scale(.5, .5);
      transform-origin: center top
    }
  }
}
</style>
