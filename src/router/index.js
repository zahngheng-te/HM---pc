import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '../views/login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import NotFund from '@/views/404.vue'

import auth from '@/utils/auth.js'

Vue.use(VueRouter)


const routes = [
    { path: '/login', component: login },
    {
        path: '/', component: Home, children: [
            { path: '/', component: Welcome }
        ]
    },
    { path: '*', component: NotFund }

]

const router = new VueRouter({ routes })


router.beforeEach((to, from, next) => {
    const user = auth.getUser()
    if (to.path !== '/login' && !user.token) return next('/login')
    next()
})

export default router