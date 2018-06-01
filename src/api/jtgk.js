import request from '@/utils/request'

// export function fetchList(query, selectValue = []) {
//   console.log('api' + selectValue)
//   return request({
//     url: '/jtgk/list',
//     method: 'get',
//     params: { query, selectValue }
//   })
// }

export function fetchList(query) {
  const data = {
    query
  }
  // console.log(data)
  return request({
    url: '/jtgk/list',
    method: 'post',
    data
  })
}

export function getOverViewInfoTable() {
  return request({
    url: 'jtgk/overviewinfogtable',
    method: 'post'
  })
}

export function getFzjtPieData() {
  return request({
    url: 'jtgk/getfzjtpiedata',
    method: 'post'
  })
}

export function getZdjtPieData() {
  return request({
    url: 'jtgk/getzdjtpiedata',
    method: 'post'
  })
}

export function getCountBarData_Api(params) {
  const data = {
    params
  }
  return request({
    url: '/jtgk/getCountBarData',
    method: 'post',
    data
  })
}

export function getFundBarData_Api(params) {
  const data = {
    params
  }
  return request({
    url: '/jtgk/getFundBarData',
    method: 'post',
    data
  })
}
