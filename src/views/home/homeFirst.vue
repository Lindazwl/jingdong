<template>
  <div class="wrapper">
    <static-part></static-part>
    <!-- 中间部分的布局 -->
    <nearby-item></nearby-item>
  </div>
  <docker-item></docker-item>
</template>

<script>
import StaticPart from './StaticPart'
import NearbyItem from './NearbyItem'
import DockerItem from './DockerItem'
export default {
  name: 'homeFirst',
  components: {
    StaticPart,
    NearbyItem,
    DockerItem
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viribales.scss';
@import '../../style/mixins.scss';

.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .1rem .18rem;
  // background: #1Fa4fC;
}
</style>
