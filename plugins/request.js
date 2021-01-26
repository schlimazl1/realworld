/** 
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取到上下文对象 (query/params/req/res/app/store...)
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // 此时请求还没有发出去就失败
    // Do something with request error
    return Promise.reject(error)
  })
}

// 响应拦截器
