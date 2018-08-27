<template>
  <div id="app">
    <!-- 把seller 传给子组件 header.vue -->
    <Header :seller="seller"></Header>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
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
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!-- <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Header from "./components/header/header.vue"  

const ERR_OK = 0  
export default {
  name: "App",
  data() {
    return {
      seller: {}
    }  
  },
  created() {
    const url = 'https://raw.githubusercontent.com/qinjingfei/sell/master/data.json'
    this.$http.get(url).then(response => {
      response = response.body  
      this.seller = response.seller  
      
    })
  },
  components: {
    Header //es6 相当于 Header: Header
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
