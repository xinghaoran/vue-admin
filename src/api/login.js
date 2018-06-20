import request from '@/utils/request'

export function login(account, password) {
  const data = {
    account,
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
    url: '/User/info',
    method: 'post',
    data
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/Login/logout',
    method: 'post'
  })
}
