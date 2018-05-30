import request from '@/utils/request'

// export function fetchList(query, selectValue = []) {
//   console.log('api' + selectValue)
//   return request({
//     url: '/jtgk/list',
//     method: 'get',
//     params: { query, selectValue }
//   })
// }

export function fetchList(query, selectValue) {
  const data = {
    query,
    selectValue
  }
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
