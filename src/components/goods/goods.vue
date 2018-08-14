<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)" ref="menuList" :key="index">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="food-list" ref="foodList" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food, $event)" v-for="(food,index) in item.foods" class="food-item border-1px" :key="index">
                <div class="icon">
                  <img :src="food.icon" width="57px" height="57px" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <!--清除换行-->
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--把food传给子组件cartcontrol， add是在food.vue里自定义的事件, 是为了将target传给父组件(goods.vue)-->
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>

</template>


<script>
import BScroll from "better-scroll";
import shopcart from "@/components/shopcart/shopcart";
import food from "@/components/food/food";
import cartcontrol from "@/components/cartcontrol/cartcontrol";

const ERR_OK = 0;

export default {
  props: {  
    seller: {                   //接收seller对象
      type: Object
    }
  },
  name: "goods",
  data() {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  created() {                                           
    this.$http.get("/api/goods").then(response => {     //因为是mock的数据，所以一定会成功，就不写失败的call back了
      response = response.body;                         //extract json from response
      if (response.errno === ERR_OK) {
        this.goods = response.data;                     //数据会立即更新，但DOM还未渲染
        this.$nextTick(() => {                          //会在下一次DOM更新时，执行
          this._initScroll();                           //初始化BScroll
          this._calculateHeight();                      //计算每个foodlist高度，并把它们的accumulator放入到数组listHeight中
        });
      }
    });
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  computed: {                                           //需要缓存的计算属性
    currentIndex() {                                     
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      Array.from(this.goods).forEach(good => {
        good.foods.forEach(food => (food.count ? foods.push(food) : ""));
      });
      return foods;
    }
  },
  methods: {
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();                         //父组件调用子组件的方法
    },
    addFood(target) {
      this.$nextTick(() => {                        //DOM更新完后，执行shopcart的drop方法
        this.$refs.shopcart.drop(target);           //traget是来自于子组件cartcontrol
      });
    },
    //下划线代表私有方法
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {   //初始化menuScroll
        click: true          //better-scroll会将点击事件去掉，如果滚动部分需要有点击事件，需要在参数里加上click：true
      });
      this.foodsScroll = new BScroll(this.$refs.foodWrapper, {   //初始化foodScroll
        probeType: 3,      
        click: true         //better-scroll会将点击事件去掉，如果滚动部分需要有点击事件，需要在参数里加上click：true
      });
      this.foodsScroll.on(
        "scroll",
        pos => (this.scrollY = Math.abs(Math.round(pos.y)))
      );
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {                    
        this.$refs.shopcart.drop(target);       //调用子组件drop方法
      });
    }
  },
  //注册子组件
  components: {
    shopcart,
    cartcontrol,
    food
  }
};
</script>


<style lang="stylus">
@import '../../common/stylus/mixin.styl';

.goods {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;

        &.decrease {
          bg-image('decrease_3');
        }

        &.guarantee {
          bg-image('guarantee_3');
        }

        &.discount {
          bg-image('discount_3');
        }

        &.invoice {
          bg-image('invoice_3');
        }

        &.special {
          bg-image('special_3');
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          font-size: 14px;
          line-height: 14px;
          height: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
