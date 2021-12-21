import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import VueRouter from 'vue-router'
import instance from "./router/axios"
import '../plugins/element'
import '../plugins/echarts'
import less from 'less'

Vue.use(less);

/**
 * css引入
 */
import "./styles/base.css"
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$ajax = instance;
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
