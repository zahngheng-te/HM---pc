
import MyBread from '@/components/my-bread.vue'
import Mychannel from '@/components/my-channel.vue'
import Mycover from '@/components/my-cover.vue'

export default {
    install(Vue) {
        Vue.component(MyBread.name, MyBread)
        Vue.component(Mychannel.name, Mychannel)
        Vue.component(Mycover.name, Mycover)
    }
}