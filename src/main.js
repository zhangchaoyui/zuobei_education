import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import vueAxios from 'vue-axios'
import lazyload from 'vue-lazyload'
import vueCookie from 'vue-cookie'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

Vue.use(MintUI);

//根据前端跨域做调整,/api是接口代理，代理是最安全的
axios.defaults.baseURL = "/api";

//全局接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  let path = location.hash;
  if (res.code == 1 || res.code == 2) {   //拦截业务错误码
    return res;
  } else if (res.code == 0) {
    if (path != "#/index") {
      window.location.href = "/#/login"
    } else {
      MintUI.Toast(res.data);
    }
    return Promise.reject(res);
  } else {
    MintUI.Toast(res.data);
    return Promise.reject(res);
  }
}, (error) => { //这部分拦截服务器错误码
  let res = error.response;
  alert(res.data.message);
  return Promise.reject(error);
});

Vue.use(vueAxios, axios);
Vue.use(vueCookie);

Vue.use(lazyload, {
  loading: '/images/loading-spin.svg'
})

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
