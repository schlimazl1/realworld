import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// settings
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// updateSettings
export const updateUserInfo = data => {
  return request({
    method: 'POST',
    url: '/api/user',
    data
  })
}
