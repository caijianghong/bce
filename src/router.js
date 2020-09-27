import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      children:[{
        path:'/',
        name:'BigScreen',
        component:()=>import('./views/BigScreen/index.vue')
      },
      {
        path:'/home',
        name:'home',
        component:()=>import('./views/Home/index.vue')
      }
    ]
    },
  ]
})
