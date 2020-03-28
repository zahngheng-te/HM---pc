import axios from 'axios'
import auth from '@/utils/auth.js'
import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

axios.interceptors.request.use(config => {
    const { token } = auth.getUser()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {

    return Promise.reject(error)
})


axios.interceptors.response.use(res => res, err => {
    if (err.response && err.response.status === 401) {
        auth.delUser()
        router.push('/login')
    }
    return Promise.reject(err)

})
export default axios