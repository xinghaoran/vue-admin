import request from '@/utils/request'

export function login(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/Login/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  const data = {
    token
  }
  return request({
    url: '/user/info',
    method: 'post',
    data
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
