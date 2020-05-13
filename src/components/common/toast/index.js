import Toast from "./Toast";

const obj = {}

obj.install = function(Vue) {
  // console.log('Toast函数');
  // document.body.appendChild(Toast.$el)
  // Vue.prototype.$toast = Toast

  // 创建组件构造器
  const toastConstrutor = Vue.extend(Toast)

  // new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstrutor();

  // 将组件对象，手动挂载到某一元素上
  toast.$mount(document.createElement('div'));

  // toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  // console.log(toast.$el);
  // console.log(toast);
 
  

  Vue.prototype.$toast = toast;
}

export default obj