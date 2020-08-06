// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyLoad from 'vue-lazyload'
// import $ from 'jquery'

// 配置全局自定义设置
import settings from '@/assets/js/settings'
Vue.prototype.$settings = settings;
// 在所有需要与后台交互的组件中：this.$settings.base_url + '再拼接具体后台路由'

import axios from 'axios'   //导入安装的axios
//相当于把axios这个对象放到了vue对象中，以后用  vue对象.$axios
Vue.prototype.$axios = axios;

//vue-cookies配置
import cookies from 'vue-cookies'
Vue.prototype.$cookies = cookies;
//ElementUI的配置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//bootstrap配置
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/css/fonts.css'

//懒加载的默认图片
import def_lazy_img from './assets/images/loading.gif'

//使用懒加载组件
Vue.use(VueLazyLoad,{
	loading: def_lazy_img
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
