// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from '@/store/index'

Vue.config.productionTip = false  
Vue.use(VueResource)  	//引用VueResource

Vue.use(VueLazyLoad, {
  loading: require('@/common/img/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})  
