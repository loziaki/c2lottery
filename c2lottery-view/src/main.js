// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

import Login from './components/Login';
import CommentList from './components/CommentList';
import Signin from './components/Signin';
import Axios from 'axios';

Vue.prototype.$http = Axios;

const router =  new VueRouter({
  mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合，讲Koa的时候会说）
  base: __dirname, 
  routes: [
    {
      path: '/',  // 默认首页打开是登录页
      component: Login
    },
    {
      path: '/signin',  // 默认首页打开是登录页
      component: Signin
    },
    {
      path: '/commentList',
      component: CommentList
    },
    {
      path: '*',
      redirect: '/' // 输入其他不存在的地址自动跳回首页
    }
  ]
});

const app = new Vue({
  router: router, // 启用router
  render: h => h(App) 
}).$mount('#app') //挂载到id为app的元素上