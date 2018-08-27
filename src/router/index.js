import Vue from "vue"  
import Router from "vue-router"    

Vue.use(Router)  

export default new Router({
  // mode: 'history', // 去掉url中#
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: "/goods",
      // 路由懒加载（webpack按需加载） 
      // https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
      component: () => import(/* webpackChunkName: "goods" */ "@/components/goods/goods")
    },
    {
      path: "/ratings",
      component: () => import(/* webpackChunkName: "ratings" */ "@/components/ratings/ratings")
    },
    {
      path: "/seller",
      component: () => import(/* webpackChunkName: "seller" */ "@/components/seller/seller")
    }
  ],
  linkActiveClass: "active" //自定义active时，添加的class为active
})  
