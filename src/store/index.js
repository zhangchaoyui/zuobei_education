import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);

const state = {
    token: '',//token
    status: 0,//用户登录状态
    type: ''//用户类型
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})