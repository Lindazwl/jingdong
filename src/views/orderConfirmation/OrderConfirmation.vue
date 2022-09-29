<template>
  <div class="wrapper">
     <div class='top'>
  <!-- <div class="top__bgcor"></div> -->
  <div class="top__header">
    <div class="iconfont top__header__back icon-back"></div>
    确认订单
  </div>
  <div class="top__receiver">
    <div class="top__receiver__title">收货地址</div>
    <div class="top__receiver__address">北京大学理工科2号楼</div>
    <div class="top__receiver__info">
      <span class="top__receiver__info__name">张三</span>
      <span class="top__receiver__info__phone">135848951585</span>
    </div>
    <div class="iconfont top__receiver__icon icon-back"></div>
  </div>
 </div>
  </div>

</template>

<script >
// 这里使用的ts
// import { Options, Vue } from 'vue-class-component';

export default {
  name: 'OrderConfirmation',

  // props父组件传递下来的数据   context ：attrs（未被props定义的属性）、slots（插槽）、emit（触发事件）
  setup (props, context) {
    // 这里存放数据
    return {

    }
  }

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
}
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  &__header {
    padding-top: .26rem;
    line-height: .24rem;
    color: #fff;
    text-align: center;
    position: relative;
    font-size: .16rem;
    &__back {
    position: absolute;
    font-size: .22rem;
    left: .18rem;
    }
  }
  &__receiver{
     position: absolute;
     left: .18rem;
     right: .18rem;
     bottom: 0;
     height: 1.11rem;
     background: #fff;
     border-radius: .04rem;
     &__title {
      padding: .16rem 0 .14rem .19rem;
      font-size: .16rem;
      color: #333;
     }
     &__address {
      line-height: .2rem;
      padding: 0 0.4rem 0 .16rem;
      font-size: .14rem;
      color: #333;
     }
     &__info {
      padding: .06rem 0 0 .16rem;
      &__name {
        margin-right: .06rem;
        line-height: .08rem;
        font-size: .12rem;
        color: #666;
      }
     }
     &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: #666;
      font-size: .2rem;
     }
  }
}
</style>
