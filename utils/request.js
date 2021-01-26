/** 
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = `Token `
  return config
}, function (error) {
  // 此时请求还没有发出去就失败
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器

export default request