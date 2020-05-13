<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      :is-checked="isSelectAll"
      @click.native="SelectAll"
    ></check-button>
    <span>全选</span>
    <span class="total-price">合计: {{ totalPrice }}</span>
    <span class="buy-product" @click="checkOut">结算({{ checkLength }})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preVal, item) => {
            return preVal + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },

    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },

    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        // return !this.cartList.filter(item => !item.checked).length;
        return !this.cartList.find(item => !item.checked);
      }
    }
  },
  methods: {
    // 不能做简化处理 this.cartList.forEach(item=>item.checked = !this.isSelectAll)
    // 会影响计算属性isSelectAll 状态
    SelectAll() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        //部分或全部不选中
        this.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },

    checkOut() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择商品")
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 18px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
