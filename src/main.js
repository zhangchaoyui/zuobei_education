import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import vueAxios from 'vue-axios'
import vueCookie from 'vue-cookie'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import http from './https'
//挂载到VUE实例，以便全局使用;
Vue.prototype.http = http;

import { Step, Steps } from 'vant';
import 'vant/lib/index.css';
Vue.use(Step);
Vue.use(Steps);

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)

import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)

Vue.config.productionTip = false

//根据前端跨域做调整,/api是接口代理，代理是最安全的
axios.defaults.baseURL = "/vapi";
Vue.use(vueAxios, axios);
Vue.use(vueCookie);
Vue.use(MintUI);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

//监听路由
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
