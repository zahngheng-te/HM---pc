import Vue from 'vue'
import App from './App.vue'
//导入axios
import axios from '@/api'

// 导入自己封装好的插件
import Plugin from '@/utils/plugin.js'
Vue.use(Plugin)

//挂载axios
Vue.prototype.$http = axios
//导入路由
import router from './router/index.js'

//导入element样式并注册组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
