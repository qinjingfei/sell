<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>


<script>
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    name: "goods",
    data() {
      return {
        goods: {}
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {    //因为是mock的数据，所以一定会成功，就不写失败的call back了
        response = response.body;                           //extract json from response
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      });
      this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    }
  };

</script>


<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    overflow: hidden
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.guarantee
            bg-image('guarantee_3')
          &.discount
            bg-image('discount_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px;

    .foods-wrapper
      flex: 1


</style>
