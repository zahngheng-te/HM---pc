import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '../views/login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)


const routes = [
    { path: '/login', component: login },
    {
        path: '/', component: Home, children: [
            { path: '/', component: Welcome }
        ]
    }

]

const router = new VueRouter({ routes })

export default router