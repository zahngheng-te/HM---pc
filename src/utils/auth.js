
const KEY = 'hm-toutiao-pc-user'

//设置用户信息
const setUser = (user) => {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
}
//获取用户信息
const getUser = () => {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
//删除用户信息
const delUser = () => {
    window.sessionStorage.removeItem(KEY)
}

export default { setUser, getUser, delUser }