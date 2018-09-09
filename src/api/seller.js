/**
 * get seller's mocking data
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

 export default function () {
    const url = 'https://gogs.qinjingfei.cn/qinjingfei/sell/raw/master/data.json'
    return Vue.http.get(url).then(response => {
      response = response.body  
      return response.seller     
    })
 }