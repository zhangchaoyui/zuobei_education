import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import vueAxios from 'vue-axios'
import lazyload from 'vue-lazyload'
import vueCookie from 'vue-cookie'

Vue.config.productionTip = false

//根据前端跨域做调整,/api是接口代理，代理是最安全的
axios.defaults.baseURL = "/api";

//全局接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) {   //拦截业务错误码
    return res.data;
  } else if (res.status == 10) {
    if (path != "#/index") {
      window.location.href = "/#/login"
    }
    return Promise.reject(res);
  } else {
    Message.error(res.msg)
    return Promise.reject(res);
  }
},(error)=>{ //这部分拦截服务器错误码
  let res = error.response;
  Message.error(res.data.message);
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
