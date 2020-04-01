
import MyBread from '@/components/my-bread.vue'
import Mychannel from '@/components/my-channel.vue'

export default {
    install(Vue) {
        Vue.component(MyBread.name, MyBread)
        Vue.component(Mychannel.name, Mychannel)
    }
}