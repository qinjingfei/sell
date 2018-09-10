<template>
  <div id="app">
    <Header></Header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Header from "./components/header/header.vue"  
import api from '@/api/api'

const ERR_OK = 0  
export default {
  name: "App",
  created() {
    this.$store.dispatch('api/getData',api())
  },
  components: {
    Header
  }
}  
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'  

.tab
  display: flex  
  width: 100%  
  height: 40px  
  line-height: 40px  
  border-1px(rgba(7, 17, 27, 0.1))  
  .tab-item
    flex: 1  
    text-align: center  
    & > a
      display: block  
      text-decoration: none  
      font-size: 14px  
      color: rgb(77, 85, 93)  
      &.active
        color: rgb(240, 20, 20)  
</style>
