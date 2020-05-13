import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addToCart(context, payload) {
    // 查找购物车是否有该商品有就数量加1，没有就设置count属性，再加入购物车
    let oldProduct = context.state.cartList.find(
      item => item.iid === payload.iid
    );
    // 判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      // state.cartList.push(payload);
      context.commit(ADD_TO_CART, payload);
    }
  }
};