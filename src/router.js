import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index'
import User from './pages/user'
import Mine from './pages/mine'
import Works from './pages/works'
import WorksList from './pages/worksList'

Vue.use(Router);
export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        children: [
            {
                path: '/external',//跳转链接
                name: 'external',
                component: resolve => require(['./pages/external'], resolve),
            },
            {
                path: '/monthList',//月度排行
                name: 'monthList',
                component: resolve => require(['./pages/monthList'], resolve),
            },
            {
                path: '/news/:id',//文章详情
                name: 'news',
                component: resolve => require(['./pages/news'], resolve),
            },
        ]
    },

    {
        path: '/upload',//上传作品
        name: 'upload',
        component: resolve => require(['./pages/upload'], resolve),
    },
    {
        path: '/login',//登录
        name: 'login',
        component: resolve => require(['./pages/login'], resolve),
    },
    {
        path: '/register',//注册
        name: 'register',
        component: resolve => require(['./pages/register'], resolve),
    },

    {
        path: '/works',//作品排行
        name: 'works',
        component: Works,
        redirect: 'worksList',
        children: [
            {
                path: '/workslist',//作品列表
                name: 'worksList',
                component: WorksList,
            },
            {
                path: '/worksdetail/:id',//作品详情
                name: 'worksDetail',
                component: resolve => require(['./pages/worksdetail'], resolve),
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        redirect: 'mine',
        children: [
            {
                path: '/mine',
                name: 'mine',
                component: Mine,
            },
            {
                path: '/shop',//积分商城
                name: 'shop',
                component: resolve => require(['./pages/shop'], resolve),
            },
            {
                path: '/integral',//积分
                name: 'integral',
                component: resolve => require(['./pages/integral'], resolve),
            },
            {
                path: '/order',//订单
                name: 'order',
                component: resolve => require(['./pages/order'], resolve),
            },
            {
                path: '/submitOrder',//提交订单
                name: 'submitOrder',
                component: resolve => require(['./pages/submitOrder'], resolve),
            },
            {
                path: '/addressList',//地址列表
                name: 'addressList',
                component: resolve => require(['./pages/addressList'], resolve),
            },
            {
                path: '/addAddress',//添加地址信息
                name: 'addAddress',
                component: resolve => require(['./pages/addAddress'], resolve),
            },
            {
                path: '/myOrder',//我的订单
                name: 'myOrder',
                component: resolve => require(['./pages/myOrder'], resolve),
            },
            {
                path: '/logistics',//物流
                name: 'logistics',
                component: resolve => require(['./pages/logistics'], resolve),
            },
            {
                path: '/userInfo',//用户基本资料
                name: 'userInfo',
                component: resolve => require(['./pages/userInfo'], resolve),
            },
            {
                path: '/about',//关于
                name: 'about',
                component: resolve => require(['./pages/about'], resolve),
            },
            {
                path: '/feedback',//反馈
                name: 'feedback',
                component: resolve => require(['./pages/feedback'], resolve),
            },
            {
                path: '/reply',//回复
                name: 'reply',
                component: resolve => require(['./pages/reply'], resolve),
            },
        ]
    },
    ]
}) 