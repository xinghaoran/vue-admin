import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(token)
  // Cookies 过期时间为30天
  // return Cookies.set(TokenKey, token, { expires: 30 })
  // Cookies过期时间为默认 Session
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
