import axios from "axios";

export function request(config) {

    // 1. 创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/n3',
        timeout: 5000
    })

    // 2. 拦截器
    /*
    2.1 请求拦截的作用
      1. 比如config中的一些信息不符合服务器的要求
      2. 比如每次发送网络请求时，都希望在界面中显示一个请求的图标
      3. 某些网络请求（比如登录（token））,必须携带一些特殊信息
    */
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })

    // 2.2 响应拦截：获取指定的数据
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    // 3. 发送请求
    return instance(config)
}