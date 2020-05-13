<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartLength != 0 ? cartLength : 0 }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list :cart-list="cartList"/>

    <!-- 底部全选 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./CartComps/CartList";
import CartBottomBar from "./CartComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar

  },

  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    // 辅助函数就是为了少写‘this.$store.getters.cartLength’
    ...mapGetters(["cartLength",'cartList'])
  }
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 10;
}
</style>
