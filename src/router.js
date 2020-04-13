import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index'
import Mine from './pages/mine'
import WorksList from './pages/worksList'
import Upload from './pages/upload'

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',//首页
            name: 'index',
            meta: { title: '首页', showTab: true },
            component: Index,
        },
        {
            path: '/external',//跳转链接
            name: 'external',
            component: resolve => require(['./pages/external'], resolve),
        },
        {
            path: '/monthList',//月度排行
            name: 'monthList',
            meta: { title: '月度排行' },
            component: resolve => require(['./pages/monthList'], resolve),
        },
        {
            path: '/news/:id',//文章详情
            name: 'news',
            meta: { title: '文章详情' },
            component: resolve => require(['./pages/news'], resolve),
        },

        {
            path: '/upload',//上传作品
            name: 'upload',
            meta: { title: '上传作品', showTab: true },
            component: Upload,
        },
        {
            path: '/personal',//个人信息页面
            name: 'personal',
            meta: { title: '个人信息' },
            component: resolve => require(['./pages/personal'], resolve),
        },
        {
            path: '/login',//登录
            name: 'login',
            meta: { title: '登录' },
            component: resolve => require(['./pages/login'], resolve),
        },
        {
            path: '/register',//注册
            name: 'register',
            meta: { title: '注册' },
            component: resolve => require(['./pages/register'], resolve),
        },

        {
            path: '/workslist',//作品列表
            name: 'worksList',
            meta: { title: '作品列表', showTab: true },
            component: WorksList,
        },
        {
            path: '/worksdetail/:id',//作品详情
            name: 'worksDetail',
            meta: { title: '作品详情' },
            component: resolve => require(['./pages/worksdetail'], resolve),
        },

        {
            path: '/mine',
            name: 'mine',
            meta: { title: '我的', showTab: true },
            component: Mine,
        },
        {
            path: '/mywroks',//我的作品列表
            name: 'mywroks',
            meta: { title: '我的作品集' },
            component: resolve => require(['./pages/mywroks'], resolve),
        },
        {
            path: '/shop',//积分商城
            name: 'shop',
            meta: { title: '积分商城' },
            component: resolve => require(['./pages/shop'], resolve),
        },
        {
            path: '/integral',//积分
            name: 'integral',
            meta: { title: '积分' },
            component: resolve => require(['./pages/integral'], resolve),
        },
        {
            path: '/order',//订单
            name: 'order',
            meta: { title: '我的订单' },
            component: resolve => require(['./pages/order'], resolve),
        },
        {
            path: '/submitOrder/:id',//提交订单
            name: 'submitOrder',
            meta: { title: '提交订单' },
            component: resolve => require(['./pages/submitOrder'], resolve),
        },
        {
            path: '/addressList',//地址列表
            name: 'addressList',
            meta: { title: '地址列表' },
            component: resolve => require(['./pages/addressList'], resolve),
        },
        {
            path: '/addAddress',//添加地址信息
            name: 'addAddress',
            meta: { title: '添加地址信息' },
            component: resolve => require(['./pages/addAddress'], resolve),
        },

        {
            path: '/logistics/:id',//物流
            name: 'logistics',
            meta: { title: '物流信息' },
            component: resolve => require(['./pages/logistics'], resolve),
        },
        {
            path: '/userInfo',//用户基本资料
            name: 'userInfo',
            meta: { title: '用户基本资料' },
            component: resolve => require(['./pages/userInfo'], resolve),
        },
        {
            path: '/about',//关于
            name: 'about',
            meta: { title: '关于我们' },
            component: resolve => require(['./pages/about'], resolve),
        },
        {
            path: '/feedback',//反馈
            name: 'feedback',
            meta: { title: '反馈' },
            component: resolve => require(['./pages/feedback'], resolve),
        },
        {
            path: '/reply',//回复
            name: 'reply',
            meta: { title: '回复我的点评' },
            component: resolve => require(['./pages/reply'], resolve),
        },
        {
            path: '/forget',//忘记密码
            name: 'forget',
            meta: { title: '忘记密码' },
            component: resolve => require(['./pages/forget'], resolve),
        },
        {
            path: '/productDetail/:id',//商品详情
            name: 'productDetail',
            meta: { title: '商品详情' },
            component: resolve => require(['./pages/productDetail'], resolve),
        },
        {
            path: '/rules',//积分规则
            name: 'rules',
            meta: { title: '积分规则' },
            component: resolve => require(['./pages/rules'], resolve),
        },
        {
            path: '/newList',//新闻列表
            name: 'newList',
            meta: { title: '新闻列表' },
            component: resolve => require(['./pages/newList'], resolve),
        },
        {
            path: '/search',//搜索列表
            name: 'search',
            meta: { title: '搜索列表' },
            component: resolve => require(['./pages/search'], resolve),
        },

        {
            path: '/uploadText/:id',//用户评论
            name: 'uploadText',
            meta: { title: '用户评论' },
            component: resolve => require(['./pages/uploadText'], resolve),
        },
        {
            path: '/teacherWorks',//老师点评
            name: 'teacherWorks',
            meta: { title: '我的点评' },
            component: resolve => require(['./pages/teacherWorks'], resolve),
        }

    ]
}) 