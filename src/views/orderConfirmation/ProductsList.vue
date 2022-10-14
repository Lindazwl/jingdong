<template>
     <div class="products">
        <div class="products__title">{{shopName}}</div>
        <div class="products__warpper">
          <div class="products__list">
            <template
                v-for="item in productList"
                 :key="item._id">
                <div class="products__item"
                      v-if="item.count> 0"
                      >
                        <img class="products__item__img" :src="item.imgUrl" />
                        <div class="products__item__detail">
                          <h4 class="products__item__title">{{item.name}}</h4>
                          <p class="products__item__price">
                            <span class="products__item__singleprice">
                              <span class="products__item__yen">&yen;</span>{{item.price}} x {{item.count}}
                            </span>
                            <span class="products__item__totalprice">
                              <span class="products__item__yen">&yen;</span>
                              {{(item.price*item.count).toFixed(2)}}
                            </span>
                          </p>
                        </div>
                      </div>

            </template>
          </div>
        </div>
     </div>

</template>

<script>
// 这里使用的ts
// import { Options, Vue } from 'vue-class-component';
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'ProductsList',

  // props父组件传递下来的数据   context ：attrs（未被props定义的属性）、slots（插槽）、emit（触发事件）
  setup (props, context) {
    // 这里存放数据
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)

    return {
      shopId,
      shopName,
      productList
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/viribales.scss";
@import "../../style/mixins.scss";
  .wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
  overflow-y: scroll;
}
.products {
  margin: .06rem .18rem .55rem .18rem;
  background:$bgColor;
  &__title {
   padding: .16rem;
   font-size: .16rem;
   color: $content-font-clolor;
  }
  &__warpper {
    position: absolute;
    margin: 0 .16rem;
    overflow-y: scroll;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.52rem;
  }
  &__list {
    background:$bgColor;

  }

     &__item {
        position: relative;
        display: flex;
        padding: 0 .16rem .16rem .16rem;
        &__img {
          width: .46rem;
          height: .46rem;
          margin-right: .16rem;
    }
        &__detail {
           flex: 1;
          overflow: hidden;
        }

    &__title {
      line-height: .2rem;
      font-size: .14rem;
      color: $content-font-clolor;
      margin: 0;
      @include ellipsis
    }

    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      font-size: .14rem;
      line-height: .2rem;
      color: $hightlight-fontColor;
    }
    &__totalprice {
      flex: 1;
      text-align: right;
      color:$dark-fontColor
    }

    &__yen {
      font-size: .12rem
    }
   }
}
</style>
