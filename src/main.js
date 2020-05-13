import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from "components/common/toast";
import fastclick from "vue-fastclick";

Vue.use(toast);
fastclick.attach(document.body); //解决移动端300ms延迟问题

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(require('vue-moment'))



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')