import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/js/directives'
import api from './api'
Vue.use(ElementUI)
Vue.prototype.$api = api;
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  next()
})
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
