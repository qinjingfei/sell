<template>
    <div class="cartcontrol">
        <transition name='move'>
          <div class="cart-decrease" v-show='food.count>0' @click.stop.prevent="decreaseCart($event)"> <!--阻止冒泡-->
            <span class="icon-remove_circle_outline inner"></span>
          </div>
        </transition>
        <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>  <!--阻止冒泡-->
    </div>
</template>


<script>
import Vue from "vue";

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      //better-scroll派发的event事件和原生js的event有属性上的区别，其中有一个属性为event._constructed。better-scroll派发的事件中event._constructed为true，原生点击事件中没有这个属性。
      if (!event._constructed) {  //如果不存在这个属性,则为原生点击事件，不执行下面的函数
        return;
      }
      if (this.food.count) {
        this.food.count++;
      } else {
        Vue.set(this.food, "count", 1); //给 food添加count属性
      }
      console.log(event.target)
      this.$emit('add', event.target); //为了将evet.target传给food.vue,自定义一个事件 add
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) this.food.count--;
    }
  }
};
</script>



<style lang="stylus" scoped>
.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    padding: 6px
    opacity: 1
    transform: translate3d(0, 0, 0)
    .inner
      display: inline-block
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      transition: all 0.4s linear
      transform: rotate(0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
    &.move-enter, &.move-leave-to
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .cart-add
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
</style>
