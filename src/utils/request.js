import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
// import { Message } from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 50008:没有权限; 50014:Token 失效;
    if (res.code === 50008) {
      Message({
        message: '你没有该操作权限',
        type: 'error',
        duration: 5 * 1000
      })
    }
    if (res.code === 50014) {
      MessageBox.confirm('你的登录已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }).catch(() => {})
    }

    // 处理流
    if (response.headers && response.headers['content-type'] === 'application/octet-stream') {
      const config = response.config
      if (config.method === 'post') {
        downloadPost(config)
      } else if (config.method === 'get') {
        downloadGet(config)
      }
      return
    }
    return response
  },
  // response => {
  //   /**
  //    * code为非20000是抛错 可结合自己业务进行修改
  //    */
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })

  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     console.log(response.data)
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const downloadPost = (config) => {
  const url = config.url
  const data = JSON.parse(config.data)
  const form = document.createElement('form')
  form.action = url
  form.method = 'post'
  form.style.display = 'none'
  Object.keys(data).forEach(key => {
    const input = document.createElement('input')
    input.name = key
    input.value = data[key]
    form.appendChild(input)
  })
  const button = document.createElement('input')
  button.type = 'submit'
  form.appendChild(button)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

const downloadGet = (config) => {
  const params = []
  for (const item in config.params) {
    params.push(`${item}=${config.params[item]}`)
  }
  const url = params.length ? `${config.url}?${params.join('&')}` : `${config.url}`
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function() {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

export default service
