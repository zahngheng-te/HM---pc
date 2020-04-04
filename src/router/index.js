import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入组件(路由懒加载)
const Login = () => import('../views/login.vue')
const Home = () => import('../views/Home.vue')
const Welcome = () => import('../views/Welcome.vue')
const NotFound = () => import('../views/404.vue')
const Article = () => import('../views/Article.vue')
const Image = () => import('../views/image.vue')
const Publish = () => import('../views/Publish.vue')
const comment = () => import('../views/comment.vue')
const Fans = () => import('../views/Fans.vue')
const Setting = () => import('../views/Setting.vue')
import auth from '@/utils/auth.js'

Vue.use(VueRouter)


const routes = [
    { path: '/login', component: Login },
    {
        path: '/', component: Home, children: [
            { path: '/', component: Welcome },
            { path: '/article', component: Article },
            { path: '/image', component: Image },
            { path: '/publish', component: Publish },
            { path: '/comment', component: comment },
            { path: '/fans', component: Fans },
            { path: '/setting', component: Setting }

        ]
    },
    { path: '*', component: NotFound }

]

const router = new VueRouter({ routes })


router.beforeEach((to, from, next) => {
    const user = auth.getUser()
    if (to.path !== '/login' && !user.token) return next('/login')
    next()
})

export default router