import axios from 'axios'
import auth from '@/utils/auth.js'
import router from '@/router'
import JSONbig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
//拦截前转换数据格式
axios.defaults.transformResponse = [data => {
    // data为后台原始响应数据
    try {
        // 正确转换
        return JSONbig.parse(data)
    } catch (e) {
        // 转换失败就不处理
        return data
    }
}]
// 请求拦截器 发起请求前添加请求头
axios.interceptors.request.use(config => {
    const { token } = auth.getUser()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {

    return Promise.reject(error)
})

// 响应拦截器 401错误拦截返回登录面
axios.interceptors.response.use(res => res, err => {
    if (err.response && err.response.status === 401) {
        auth.delUser()
        router.push('/login')
    }
    return Promise.reject(err)

})
export default axios