import Vue from "vue"  
import Router from "vue-router"  
import Header from "@/components/header/header"  
import Goods from "@/components/goods/goods"  
import Ratings from "@/components/ratings/ratings"  
import Seller from "@/components/seller/seller"  

Vue.use(Router)  

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Header',
    //   component: Header
    // },
    {
      path: "/goods",
      name: "Goods",
      component: Goods
    },
    {
      path: "/ratings",
      name: "Ratings",
      component: Ratings
    },
    {
      path: "/seller",
      name: "Seller",
      component: Seller
    }
  ],
  linkActiveClass: "active" //自定义active时，添加的class为active
})  
