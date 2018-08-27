# 项目中的一些优化


## 图片懒加载

`main.js`

```javascript
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('@/common/img/default.png')
})

```

```html
<img v-lazy="food.icon" width="57px" height="57px" alt="">
```


## 路由懒加载（webpack按需加载）

[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)
[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)

`index.js`

```javascript
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
  ]
```

`build/webpack.prod.conf.js`

```javascript
output: {
    ...
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
},
```


## base64图片(减少HTTP请求)

```
 {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,   //当图片大小小于10kb时，生成字符串，打包到编译的js文件里
                      // 当图片大于10kb, 单独生成一个文件
      name: utils.assetsPath('img/[name].[hash:7].[ext]') //文件名字命名规则
	}
}
```

## webpack压缩,打包文件


## 组件缓存

`App.vue`

```html
<keep-alive>
      <router-view :seller="seller"></router-view>
</keep-alive>

```

## 字体图标

[准备工作](./notes/2_preparation.md) 中有介绍如何制作字体图标